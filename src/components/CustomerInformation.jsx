import React from 'react'

const CustomerInformation = ({ customers, onRemoveCustomer }) => {
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {customers.map((customer) => (
          <div key={customer.id} className="border border-gray-300 p-4 rounded-lg relative min-h-fit">
            {onRemoveCustomer && (
              <button
                onClick={() => onRemoveCustomer(customer.id)}
                className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-sm hover:bg-red-600 cursor-pointer"
              >
                ×
              </button>
            )}
            <div className="flex flex-col items-center text-center">
              <img 
                src={customer.profile_picture} 
                alt={customer.name}
                className="w-20 h-20 rounded-lg object-cover mb-3"
              />
              <div className="w-full">
                <h4 className="text-lg font-semibold mb-2 truncate">{customer.name}</h4>
                <div className="text-sm space-y-1">
                  <p><strong>Email:</strong></p>
                  <p className="break-all text-xs">{customer.email}</p>
                  <p><strong>Password:</strong> {customer.password}</p>
                  <p><strong>Phone:</strong> {customer.phone_number}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CustomerInformation