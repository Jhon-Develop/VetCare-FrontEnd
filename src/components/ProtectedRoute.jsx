import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    // Obtener el token del localStorage
    const token = localStorage.getItem('token');

    // Si no hay token, redirige al usuario a la página de login
    if (!token) {
        return <Navigate to="/" />; // Redirige a la ruta de login
    }

    // Si hay token, renderiza el componente hijo (es decir, la ruta protegida)
    return children;
};

export default ProtectedRoute;
