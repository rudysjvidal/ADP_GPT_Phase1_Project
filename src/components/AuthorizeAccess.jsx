import React from 'react';
import { Navigate } from 'react-router-dom';
// import { useCookies } from 'react-cookie';

const AuthorizeAccess = ({children}) => {
    const isAdmin = sessionStorage.getItem('isAdmin') === 'true';
    // const [cookies] = useCookies(['admin']);
    if (isAdmin) {
        return children;
    } else {
        return <Navigate to="/login" replace />;
    }
}

export default AuthorizeAccess;
