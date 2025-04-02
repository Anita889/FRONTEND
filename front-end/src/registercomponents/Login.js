import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/auth';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            const data = await authService.login(email, password);
            localStorage.setItem('userRole', data.role);
            localStorage.setItem('studentId', data.user.id);
            localStorage.setItem('userId', data.user.userId);

            if (data.role === 'STUDENT') {
                navigate(`user/${data.user.userId}/student/${data.user.id}`);
            } else if (data.role === 'LECTURER') {
                navigate(`user/${data.user.userId}/lecturers/${data.user.id}`);
            } else if (data.role === 'ADMIN') {
                navigate(`user/${data.user.userId}/admins/${data.user.id}`);
            }
        } catch (error) {
            console.error('Login failed:', error.response?.data?.message || error.message);
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

    const loginBtnStyle = {
        ...buttonStyle,
        backgroundColor: '#4CAF50',
        color: 'white',
    };

    const signupBtnStyle = {
        ...buttonStyle,
        backgroundColor: '#2196F3',
        color: 'white',
    };

    return (
        <div style={containerStyle}>
            <h2 style={headingStyle}>Login</h2>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={inputStyle}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={inputStyle}
            />
            <button onClick={handleLogin} style={loginBtnStyle}>
                Login
            </button>
            <button onClick={() => navigate('/signup')} style={signupBtnStyle}>
                Sign Up
            </button>
        </div>
    );
};

export default Login;
