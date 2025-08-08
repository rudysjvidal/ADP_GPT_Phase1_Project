import React, { useState } from 'react'
import customersData from '../data/customers.json'
import CustomerInformation from './CustomerInformation'

interface Customer {
  id: number
  name: string
  email: string
  password: string
  phone_number: string
  profile_picture: string
}

const CustomerList: React.FC = () => {
  const customers: Customer[] = customersData
  const [selectedCustomers, setSelectedCustomers] = useState<Customer[]>([])

  const handleCustomerClick = (customer: Customer) => {
    setSelectedCustomers(prev => {
      const isAlreadySelected = prev.some(c => c.id === customer.id)
      
      if (isAlreadySelected) {
        // Remove customer if already selected
        return prev.filter(c => c.id !== customer.id)
      } else {
        // Add customer if not selected and under limit
        if (prev.length < 10) {
          return [...prev, customer]
        }
        return prev
      }
    })
  }

  return (
    <div className="flex min-h-96">
      <div className="w-3/10 border-r border-gray-300 p-5">
        <h3 className="mb-4">Customer List</h3>
        <ul className="list-none p-0">
          {customers.map((customer) => (
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
      
      <div className="w-7/10 p-5">
        <CustomerInformation customers={selectedCustomers} />
      </div>
    </div>
  )
}

export default CustomerList
