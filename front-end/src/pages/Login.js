import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import './Login.css'; // Your CSS file for styling

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate(); // Initialize useNavigate hook

    const handleSubmit = async (e) => {
        e.preventDefault();

        const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000'; // Backend URL from .env or default to localhost

        try {
            const response = await axios.post(
                `${backendUrl}/api/user/authentication/login`, // Backend login URL
                { email, password } // Send email and password in the request body
            );

            if (response.data.accessToken) {
                // Store the access token (e.g., in localStorage or state)
                localStorage.setItem('accessToken', response.data.accessToken);
                // You can also store the user data if needed
                localStorage.setItem('user', JSON.stringify(response.data.user));

                // Check user role and redirect accordingly
                const userRole = response.data.role; // Get the role from the response

                if (userRole === 'student') {
                    // Redirect to lessons page if user is a student
                    navigate('/lessons');
                } else {
                    // Redirect to the platform page (or another page) for other roles
                    navigate('/platform');
                }
            }
        } catch (err) {
            console.error('Login failed:', err);
            setError('Invalid email or password. Please try again.');
        }
    };

    return (
        <div className="login-container">
            <div className="login-form">
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label>Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="input-field"
                        />
                    </div>
                    <div className="input-group">
                        <label>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="input-field"
                        />
                    </div>
                    {error && <p className="error-message">{error}</p>}
                    <button type="submit" className="submit-button">Login</button>
                </form>
            </div>
        </div>
    );
};

export default Login;
