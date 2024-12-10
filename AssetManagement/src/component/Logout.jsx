import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider';

const Logout = () => {
    const { setAuth } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        // Clear authentication context and token
        setAuth(null);
        localStorage.removeItem('token'); // or sessionStorage.removeItem if you're using session storage

        // Navigate back to login page or homepage
        navigate('/', { replace: true });
    };

    return (
        <button onClick={handleLogout}>
            Logout
        </button>
    );
};

export default Logout;
