import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/auth';

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            const data = await authService.signUp(email, password);
            setMessage(`User ${data.user.email} registered successfully`);
            navigate('/');
        } catch (error) {
            setMessage(error.response.data.message);
        }
    };

    // Inline Styles
    const containerStyle = {
        maxWidth: '400px',
        margin: '50px auto',
        padding: '30px',
        backgroundColor: '#f5f5f5',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    };

    const headingStyle = {
        textAlign: 'center',
        fontSize: '28px',
        color: '#333',
        marginBottom: '20px',
    };

    const inputStyle = {
        padding: '12px',
        margin: '10px 0',
        border: '1px solid #ccc',
        borderRadius: '4px',
        width: '100%',
        fontSize: '16px',
    };

    const buttonStyle = {
        padding: '12px 20px',
        margin: '10px 0',
        borderRadius: '5px',
        fontSize: '16px',
        cursor: 'pointer',
        border: 'none',
    };

    const signUpBtnStyle = {
        ...buttonStyle,
        backgroundColor: '#4CAF50',
        color: 'white',
    };

    const messageStyle = {
        textAlign: 'center',
        color: '#FF0000',
        marginTop: '10px',
    };

    return (
        <div style={containerStyle}>
            <h2 style={headingStyle}>Sign Up</h2>
            <form onSubmit={handleSignUp}>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        style={inputStyle}
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={inputStyle}
                    />
                </div>
                <button type="submit" style={signUpBtnStyle}>
                    Sign Up
                </button>
            </form>
            {message && <p style={messageStyle}>{message}</p>}
        </div>
    );
};

export default SignUp;
