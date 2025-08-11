import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import CustomerList from './components/CustomerList';
import AddCustomerForm from './components/AddCustomerForm';
import Login from './components/Login';
import UpdateCustomerForm from './components/UpdateCustomerForm';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />}>
            <Route index element={<CustomerList />} />
            <Route path="/add" element={<AddCustomerForm />} />
            <Route path="/:id/update" element={<UpdateCustomerForm />} />
          </Route>
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

