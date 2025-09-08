import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
// import { useCookies } from 'react-cookie';

const AuthorizeAccess = ({children}) => {
    const location = useLocation();

    const token =
        localStorage.getItem('access_token') ||
        sessionStorage.getItem('access_token');
    const isAdmin = localStorage.getItem('isAdmin') === 'true';

    const isLoggedIn = !!token;

    // const [cookies] = useCookies(['admin']);
    if (isAdmin && isLoggedIn) {
        return children;
    } else if (!isAdmin && isLoggedIn) {
        return <Navigate to="/dashboard" replace state={{ from: location }} />;
    } else {
        return <Navigate to="/login" replace state={{ from: location }} />;
    }
}

export default AuthorizeAccess;
