import React from 'react'
import customersData from '../data/customers.json'

interface Customer {
  id: number
  name: string
  email: string
  password: string
}

const CustomerList: React.FC = () => {
  const customers: Customer[] = customersData

  return (
    <div>
      <h3>Customer List</h3>
    <ul>
      {customers.map((customer) => (
        <li key={customer.id} className="mb-6 p-4 border-b border-gray-300">
        <div><strong>Name:</strong> {customer.name}</div>
        <div><strong>Email:</strong> {customer.email}</div>
        <div><strong>Password:</strong> {customer.password}</div>
        </li>
      ))}
      </ul>
    </div>
  )
}

export default CustomerList
