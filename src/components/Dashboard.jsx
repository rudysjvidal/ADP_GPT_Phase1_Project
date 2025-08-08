import React from 'react'
import './Dashboard.css'

const Dashboard = () => {
  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Customer Records</h1>
        <p>ADP GPT Phase 1 React Project by Alex Hai, Conner Kelly and Rudys Vidal</p>
      </header>
      
      <main className="dashboard-main">
        <div className="customer-records">
          <h2>Customer Records</h2>
          <p>No records found. Please add a customer.</p>
        </div>
      </main>
    </div>
  )
}

export default Dashboard
