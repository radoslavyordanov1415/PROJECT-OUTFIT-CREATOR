import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Login.css'

export default function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:5001/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
                credentials: 'include',
            });

            const data = await response.json();

            if (response.ok) {
                navigate('/');
            } else {
                console.error('Error:', data);
            }
        } catch (err) {
            alert('Something went wrong')
            console.error(err)
        };
    };



    return (
        <div className="form-container">
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <div className="input-field">
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder=" "
                    />
                    <label htmlFor="email">Email Address</label>
                </div>
                <div className="input-field">
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        placeholder=" "
                    />
                    <label htmlFor="password">Password</label>
                </div>
                <button type="submit" className="btn-submit">Login</button>
            </form>
            <div className="text-center">
                <p>Don't have an account? <a href="/register">Sign Up</a></p>
            </div>
        </div>
    );
}