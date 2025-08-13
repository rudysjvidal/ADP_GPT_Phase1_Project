import React, { useState, useEffect } from 'react'
import { useNavigate, useOutletContext } from 'react-router-dom';
import CustomerInformation from './CustomerInformation'
import CustomerSearch from './CustomerSearch';

const CustomerList = () => {
  const { customers } = useOutletContext();
  const navigate = useNavigate();

  const [selectedCustomers, setSelectedCustomers] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [customersPerPage, setCustomersPerPage] = useState(10);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // useEffect(() => {
  //   const fetchCustomers = async () => {
  //     try {
  //       const response = await fetch('/customers');
  //       if (!response.ok) {
  //         throw new Error('Failed to fetch customers');
  //       }
  //       const data = await response.json();
  //       setCustomers(data);
  //       setLoading(false);
  //     } catch (err) {
  //       setError(err.message);
  //       setLoading(false);
  //     }
  //   };

  //   fetchCustomers();
  // }, []);

  useEffect(() => {
    const updateCustomersPerPage = () => {
      const availableHeight = window.innerHeight - 300 // Account for header and padding
      const customerItemHeight = 50 // Approximate height per customer item
      const newCustomersPerPage = Math.max(5, Math.floor(availableHeight / customerItemHeight))
      setCustomersPerPage(newCustomersPerPage)
    }

    updateCustomersPerPage()
    window.addEventListener('resize', updateCustomersPerPage)
    
    return () => window.removeEventListener('resize', updateCustomersPerPage)
  }, [])

  // if (loading) {
  //   return <div>Loading customers...</div>
  // }

  // if (error) {
  //   return <div>Error: { error }</div>
  // }

  const startIndex = currentPage * customersPerPage
  const endIndex = startIndex + customersPerPage
  const currentCustomers = customers.slice(startIndex, endIndex)
  const totalPages = Math.ceil(customers.length / customersPerPage)

  const handleCustomerClick = (customer) => {
    setSelectedCustomers(prev => {
      const isAlreadySelected = prev.some(c => c.id === customer.id)
      
      if (isAlreadySelected) {
        // Remove customer if already selected
        return prev.filter(c => c.id !== customer.id)
      } else {
        // Add customer if not selected and under limit
        if (prev.length < 6) {
          return [...prev, customer]
        }
        return prev
      }
    })
  }

  const handleRemoveCustomer = (customerId) => {
    setSelectedCustomers(prev => prev.filter(c => c.id !== customerId))
  }

  const handlePrevious = () => {
    setCurrentPage(prev => Math.max(0, prev - 1))
  }

  const handleNext = () => {
    setCurrentPage(prev => Math.min(totalPages - 1, prev + 1))
  }

  return (
    <div className="flex min-h-96">
      <div className="w-3/10 border-r border-gray-300 p-5 flex flex-col">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-x-3 gap-y-2">
            <h3>Customer Names:</h3>
            <button
              onClick={() => navigate('/dashboard/add')}
              className="px-3 py-1 bg-green-600 text-white rounded"
            >
              Add
            </button>
          </div>        
        <div className="flex-1 overflow-y-auto">
          <ul className="list-none p-0">
            {currentCustomers.map((customer) => (
              <li 
                key={customer.id}
                onClick={() => handleCustomerClick(customer)}
                className={`p-2.5 cursor-pointer border-b border-gray-200 hover:bg-gray-100 ${
                  selectedCustomers.some(c => c.id === customer.id) ? 'bg-gray-200 font-bold' : ''
                }`}
              >
                {customer.name}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-200">
          <button 
            onClick={handlePrevious}
            disabled={currentPage === 0}
            className="px-3 py-1 bg-blue-500 text-white rounded disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          
          <span className="text-sm text-gray-600">
            Page {currentPage + 1} of {totalPages}
          </span>
          
          <button 
            onClick={handleNext}
            disabled={currentPage === totalPages - 1}
            className="px-3 py-1 bg-blue-500 text-white rounded disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      </div>
      
      <div className="w-7/10 p-5">
        <CustomerSearch customers={customers} onSelectCustomer={handleCustomerClick}/>
        <CustomerInformation customers={selectedCustomers} onRemoveCustomer={handleRemoveCustomer} />
      </div>
    </div>
  )
}

export default CustomerList