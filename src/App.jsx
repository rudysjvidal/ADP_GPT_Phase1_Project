import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import CustomerList from './components/CustomerList';
import AddCustomerForm from './components/AddCustomerForm';
import Login from './components/Login';
import UpdateCustomerForm from './components/UpdateCustomerForm';
// import {CookiesProvider} from 'react-cookie';
import AuthorizeAccess from './components/AuthorizeAccess';
import OrgChart from './components/OrgChart';
import Register from './components/Register';
import AdminAccess from './components/AdminAccess';
import MyEvents from './components/MyEvents';


function App() {
  return (
    // <CookiesProvider>
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />}>
          <Route path="myevents" element={<MyEvents />} />
          <Route path="orgchart" element={
            <AdminAccess>
              <OrgChart />
              </AdminAccess>} />
            <Route index element={<CustomerList />} />
            <Route path="add" element={
              <AdminAccess>
                <AddCustomerForm />
              </AdminAccess>
              } />
            <Route path=":id/update" element={
              <AuthorizeAccess>
                <UpdateCustomerForm />
              </AuthorizeAccess>
              } />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    

    </Router>
    // </CookiesProvider>
  );
}

export default App;

