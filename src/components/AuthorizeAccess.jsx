import React, { use } from 'react';
import { Navigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

const AuthorizeAccess = ({children}) => {
    const [cookies] = useCookies(['admin']);
    if (cookies.admin) {
        return children;
    } else {
        return <Navigate to="/login" replace />;
    }
}

export default AuthorizeAccess;
