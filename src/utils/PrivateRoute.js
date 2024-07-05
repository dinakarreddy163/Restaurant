import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element: Component, allowedRoles, ...rest }) => {
    const loginDetails = useSelector((state) => state.login.loginDetails);
    const userRole = loginDetails.length > 0 ? loginDetails[0].role : null;

    return allowedRoles.includes(userRole) ? (
        <Component {...rest} />
    ) : (
        <Navigate to="/login" />
    );
};

export default ProtectedRoute;
