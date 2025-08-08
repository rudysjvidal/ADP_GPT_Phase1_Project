import React from 'react'
import customersData from '../data/customers.json'

interface Customer {
  id: number
  name: string
}

const CustomerList: React.FC = () => {
  const customers: Customer[] = customersData

  return (
    <div>
      <h3>Customer List</h3>
      <ul>
        {customers.map((customer) => (
          <li key={customer.id}>
            {customer.name}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default CustomerList
