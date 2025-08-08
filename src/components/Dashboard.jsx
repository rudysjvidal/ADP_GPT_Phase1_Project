import React from 'react'

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b px-6 py-4">
        <h1 className="text-3xl font-bold text-gray-900">Customer Records</h1>
        <p className="text-gray-600 mt-1">ADP GPT Phase 1 React Project by Alex Hai, Conner Kelly and Rudys Vidal</p>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Customer Records</h2>
          <p className="text-gray-500">No records found. Please add a customer.</p>
        </div>
      </main>
    </div>
  )
}

export default Dashboard
