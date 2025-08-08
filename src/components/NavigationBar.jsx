import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const NavigationBar = () => {
  const location = useLocation();

  return (
    <nav className="bg-slate-800 p-4 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-8">
        <div className="nav-brand">
          <h2 className="text-slate-100 text-2xl font-semibold">ADP System</h2>
        </div>
        <ul className="flex space-x-8">
          <li>
          <Link 
              to="/login" 
              className={`px-4 py-2 rounded font-medium transition-all duration-300 ${
                location.pathname === '/login' 
                  ? 'text-blue-400 bg-slate-700' 
                  : 'text-slate-300 hover:text-slate-100 hover:bg-slate-700'
              }`}
            >
              Login
            </Link>
            <Link 
              to="/dashboard" 
              className={`px-4 py-2 rounded font-medium transition-all duration-300 ${
                location.pathname === '/dashboard' 
                  ? 'text-blue-400 bg-slate-700' 
                  : 'text-slate-300 hover:text-slate-100 hover:bg-slate-700'
              }`}
            >
              Dashboard
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavigationBar;
