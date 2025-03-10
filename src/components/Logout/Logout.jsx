import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";


export default function Logout() {
    const navigate = useNavigate();
    useEffect(() => {
        const logoutUser = async () => {
            try {
                await fetch('http://localhost:5001/auth/logout', {
                    method: 'POST',
                    credentials: 'include',
                });
                alert('Logged out successfully!')
                navigate('/login');
            } catch (err) {
                console.error('Error logging out:', err);

            }
        }
        logoutUser();
    }, [navigate]);

    return <p>Logging out...</p>;

}
