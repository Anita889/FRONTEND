import React, { useState } from 'react';
import authService from '../services/authService';

const PasswordChange = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handlePasswordChange = async (e) => {
        e.preventDefault();
        try {
            await authService.passwordChange(email);
            setMessage('Password change request sent successfully');
        } catch (error) {
            setMessage(error.response.data.message);
        }
    };

    return (
        <div>
            <h2>Password Change</h2>
            <form onSubmit={handlePasswordChange}>
                <div>
                    <label>Email:</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <button type="submit">Change Password</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default PasswordChange;