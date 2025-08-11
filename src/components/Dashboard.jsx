import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import NavigationBar from './NavigationBar'
//import CustomerList from './CustomerList'
import customersSeed from '../data/customers.json';


const Dashboard = () => {
  const [customers, setCustomers] = useState([]);

  //Add Customer Handler
  useEffect(() => {
    setCustomers(customersSeed);
  }, []);

  const addCustomer = (cust) => setCustomers(prev => [...prev, cust]);

  //Update Customer Handler
  const updateCustomer = (cust) => {
    setCustomers(prev => prev.map(c => (c.id === cust.id ? cust : c)));
  };

  //Delete Customer Handler
  const deleteCustomer = (id) => {
    setCustomers(prev => prev.filter(c => c.id !== id));
  };

  
  return (
    <div className="min-h-screen bg-gray-50">
      <NavigationBar />
      <div className="py-8">
        <div className="max-w-7xl mx-auto px-8">
          <h1 className="text-slate-800 text-4xl font-bold mb-4">Dashboard</h1>
          <p className="text-slate-600 text-lg mb-8">Welcome to the ADP System Dashboard</p>
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Customer List</h2>
            <Outlet context={{ customers, addCustomer, updateCustomer, deleteCustomer }} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
