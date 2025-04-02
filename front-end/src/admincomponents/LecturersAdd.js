import React, { useState } from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import adminService from '../services/adminService';

const LecturerAdd = ({ onLecturerAdded }) => {
    const {userId, adminId, facultyId, departmentId } = useParams();
    const [lecturerDTO, setLecturerDTO] = useState({ name: '', email: '' , surName: '', password: '', rating: ''});
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const navigate = useNavigate();
    const handleInputChange = (e) => {
        setLecturerDTO({ ...lecturerDTO, [e.target.name]: e.target.value });
    };

    const handleAddLecturer = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        try {
            await adminService.addLecturer(userId, adminId, facultyId, departmentId, lecturerDTO);
            setSuccess('Lecturer added successfully!');
            navigate(-1)
            if (onLecturerAdded) onLecturerAdded(); // Notify parent to refresh list
        } catch (err) {
            setError('Failed to add lecturer. Please try again.');
        }
    };

    return (
        <div>
            <h2>Add Lecturer</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}

            <form onSubmit={handleAddLecturer}>
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={lecturerDTO.name}
                    onChange={handleInputChange}
                    required
                />
                <input
                    type="text"
                    name="surName"
                    placeholder="Surname"
                    value={lecturerDTO.surName}
                    onChange={handleInputChange}
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={lecturerDTO.email}
                    onChange={handleInputChange}
                    required
                />
                <input
                    type="text"
                    name="password"
                    placeholder="Password"
                    value={lecturerDTO.password}
                    onChange={handleInputChange}
                    required
                />
                <input
                    type="double"
                    name="rating"
                    placeholder="Rating"
                    value={lecturerDTO.rating}
                    onChange={handleInputChange}
                    required
                />
                <button type="submit">Add Lecturer</button>
            </form>
        </div>
    );
};

export default LecturerAdd;
