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

            if (data.role === 'STUDENT') {
                navigate(`/students/${data.user.id}`);
            } else if (data.role === 'LECTURER') {
                navigate(`/lecturers/${data.user.id}`);
            } else if (data.role === 'ADMIN') {
                navigate(`/admin/${data.user.id}`);
            }
        } catch (error) {
            console.error('Login failed:', error.response?.data?.message || error.message);
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleLogin}>Login</button>
            <button onClick={() => navigate('/signup')}>Sign Up</button>
        </div>
    );
};

export default Login;
