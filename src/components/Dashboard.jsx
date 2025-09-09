import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import NavigationBar from './NavigationBar'
import EventCard from './EventCard';
import MyEvents from './MyEvents';
//import CustomerList from './CustomerList'
import * as customersApi from '../api/customers';
import AuthorizeAccess from './AuthorizeAccess';

const Dashboard = () => {
  const [customers, setCustomers] = useState([]);
  const [visibleCustomers, setVisibleCustomers] = useState([]);
  const [me, setMe] = useState([]);
  const isAdmin = localStorage.getItem('isAdmin') === 'true';
  const username = localStorage.getItem("username");

  //Grabs all the Customer data
  useEffect( () => {
    async function fetchData(){

      if (isAdmin){
        const clist = await customersApi.getAll();
        setCustomers(clist);
        //setVisibleCustomers(clist);
      } else{
        const clist = await customersApi.getByEmail(username);
        setCustomers([clist]);
        //setVisibleCustomers(clist);
        /* const filtered = clist.filter(c =>
          c.email == username
        );
        console.log(filtered);
        setVisibleCustomers(filtered); */
      }
      const current = await customersApi.getMe();      
      setMe(current);
    }
    fetchData();
    
      
    }, []);
  //console.log(customers);
 
  
  //Add Customer Handler
  const addCustomer = async (cust) => {
    const created = await customersApi.create(cust);
    setCustomers(prev => [...prev, created]);// refreshes the state after customer is added
  };
  
  //Update Customer Handler
  const updateCustomer = async (cust) => {
    await customersApi.update(cust);
    const data = await customersApi.getAll(); // grabs new/updated data from api
    setCustomers(data);
  };

  //Delete Customer Handler
  const deleteCustomer = async (id) => {
    await customersApi.remove(id);
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
            <Outlet context={{ customers, me, addCustomer, updateCustomer, deleteCustomer }} />
          </div>
          <h1 className="text-slate-800 text-3xl font-bold mb-4">Events</h1>
          <EventCard/>
        </div>
      </div>
      
       
      
    </div>
  )
}

export default Dashboard
