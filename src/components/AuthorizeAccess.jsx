import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
// import { useCookies } from 'react-cookie';

const AuthorizeAccess = ({children}) => {
    const location = useLocation();

    const token =
        localStorage.getItem('access_token') ||
        sessionStorage.getItem('access_token');
    const isAdmin = sessionStorage.getItem('isAdmin') === 'true';

    const isLoggedIn = !!token || isAdmin;

    // const [cookies] = useCookies(['admin']);
    if (isLoggedIn) {
        return children;
    } else {
        return <Navigate to="/login" replace state={{ from: location }} />;
    }
}

export default AuthorizeAccess;
