import React from 'react'
import { useNavigate } from 'react-router-dom';

const CustomerInformation = ({ customers, onRemoveCustomer }) => {
  const navigate = useNavigate();

  if (customers.length === 0) {
    return (
      <div className="text-center py-10">
        <p>Please click a customer on the left side to view their information.</p>
      </div>
    )
  }

  return (
    <div>
      <h3>Customer Information ({customers.length}/6)</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {customers.map((customer) => (
          <div key={customer.id} className="border border-gray-300 p-6 rounded-lg relative min-h-fit w-full">
            {onRemoveCustomer && (
              <button
                onClick={() => onRemoveCustomer(customer.id)}
                className="absolute top-3 right-3 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-sm hover:bg-red-600 cursor-pointer"
              >
                ×
              </button>
            )}
            <div className="flex flex-col items-center text-center">
              <img 
                src={customer.profile_picture} 
                alt={customer.name}
                className="w-24 h-24 rounded-lg object-cover mb-4"
              />
              <div className="w-full">
                <h4 className="text-lg font-semibold mb-3">{customer.name}</h4>
                <div className="text-sm space-y-2 text-left">
                  <div>
                    <p className="font-semibold">Email:</p>
                    <p className="text-xs break-words">{customer.email}</p>
                  </div>
                  <div>
                    <p className="font-semibold">Password:</p>
                    <p>{customer.password}</p>
                  </div>
                  <div>
                    <p className="font-semibold">Phone:</p>
                    <p>{customer.phone_number}</p>
                  </div>
                  <div>
                    <p className="font-semibold">Job Title:</p>
                    <p>{customer.job_title}</p>
                  </div>
                  <div>
                    <p className="font-semibold">Salary:</p>
                    <p>${customer.salary}</p>
                  </div>
                  <div>
                    <p className="font-semibold">Benefits:</p>
                    <p>{customer.benefits_selection.join(", ")}</p>
                  </div>
                </div>

                <div className="mt-4 flex justify-center">
                  <button
                    onClick={() => navigate(`/dashboard/${customer.id}/update`)}
                    className="px-3 py-1 bg-amber-600 text-white rounded"
                  >
                    Update
                  </button>
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