import React from 'react'
import customersData from '../data/customers.json'

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

  return (
    <div>
    <ul>
      {customers.map((customer) => (
        <li key={customer.id} className="mb-6 p-4 border-b border-gray-300">
        <div><strong>Name:</strong> {customer.name}</div>
        <div><strong>Email:</strong> {customer.email}</div>
        <div><strong>Password:</strong> {customer.password}</div>
        <div><strong>Phone Number:</strong> {customer.phone_number}</div>
        <div><strong>Profile Picture:</strong> <img src={customer.profile_picture} alt={customer.name} /></div>
        </li>
      ))}
      </ul>
    </div>
  )
}

export default CustomerList
