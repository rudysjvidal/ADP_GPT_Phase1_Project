import React from 'react'
import NavigationBar from './NavigationBar'
import CustomerList from './CustomerList'

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <NavigationBar />
      <div className="py-8">
        <div className="max-w-7xl mx-auto px-8">
          <h1 className="text-slate-800 text-4xl font-bold mb-4">Dashboard</h1>
          <p className="text-slate-600 text-lg mb-8">Welcome to the ADP System Dashboard</p>
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Customer List</h2>
            <CustomerList />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
