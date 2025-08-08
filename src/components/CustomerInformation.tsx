import React from 'react'

interface Customer {
  id: number
  name: string
  email: string
  password: string
  phone_number: string
  profile_picture: string
}

interface CustomerInformationProps {
  customers: Customer[]
}

const CustomerInformation: React.FC<CustomerInformationProps> = ({ customers }) => {
  if (customers.length === 0) {
    return (
      <div className="text-center py-10">
        <p>Please click a customer on the left side to view their information.</p>
      </div>
    )
  }

  return (
    <div>
      <h3>Customer Information ({customers.length}/10)</h3>
      <div className="grid gap-5">
        {customers.map((customer) => (
          <div key={customer.id} className="border border-gray-300 p-5 rounded-lg">
            <div className="flex items-start gap-5">
              <img 
                src={customer.profile_picture} 
                alt={customer.name}
                className="w-24 h-24 rounded-lg object-cover"
              />
              <div>
                <h4>{customer.name}</h4>
                <p><strong>Email:</strong> {customer.email}</p>
                <p><strong>Password:</strong> {customer.password}</p>
                <p><strong>Phone:</strong> {customer.phone_number}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CustomerInformation
