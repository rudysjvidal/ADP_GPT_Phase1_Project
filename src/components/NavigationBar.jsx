import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie'

const NavigationBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  //const [cookies, updateCookie] = useCookies(['admin']);

  const token = localStorage.getItem('access_token') || sessionStorage.getItem('access_token');
  const isAdmin = localStorage.getItem('isAdmin') === 'true';
  const isLoggedIn = !!token;


  const handleLogout = () => {
    sessionStorage.removeItem('isAdmin');
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('access_token');
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('username');
    localStorage.removeItem('access_token');
    alert('User logged out successfully');
    navigate('/login');
  }


  return (
    <nav className="bg-[#7B6FB4] p-4 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-8">
        <div className="nav-brand">
          <h2 className="text-[#fff] text-2xl font-semibold">HR Express</h2>
        </div>
        <ul className="flex space-x-8">
          <li>
            <Link
              to={"/login"}
              className={`px-4 py-2 rounded font-medium transition-all duration-300 ${location.pathname === '/login'
                ? 'text-[#fff] bg-[#000000]'
                : 'text-[#fff] hover:text-slate-100 hover:bg-[#000000]'
                }`}
              onClick={() => { if (isLoggedIn) handleLogout(); }}
            >
              {isLoggedIn ? 'Logout' : 'Login'}
            </Link>
            <Link
              to="/dashboard"
              className={`px-4 py-2 rounded font-medium transition-all duration-300 ${location.pathname === '/dashboard'
                ? 'text-[#fff] bg-[#000000]'
                : 'text-[#fff] hover:text-slate-100 hover:bg-[#000000]'
                }`}
            >
              Dashboard
            </Link>
            <Link
                to="/dashboard/orgchart"
                className={`px-4 py-2 rounded font-medium transition-all duration-300 ${location.pathname === '/dashboard/orgchart'
                  ? 'text-[#fff] bg-[#000000]'
                  : 'text-[#fff] hover:text-slate-100 hover:bg-[#000000]'
                  }`}
                  hidden={!isAdmin}
            >
              Org Chart
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavigationBar;
