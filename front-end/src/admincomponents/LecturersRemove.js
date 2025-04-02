import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import adminService from '../services/adminService';

const LecturerRemove = ({ onLecturerRemoved }) => {
    const {userId, adminId, facultyId, departmentId, lecturerId } = useParams();
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const navigate = useNavigate();

    const handleRemoveLecturer = async () => {
        setError(null);
        setSuccess(null);
        try {
            await adminService.deleteLecturer(userId, adminId, facultyId, departmentId, lecturerId);
            setSuccess('Lecturer removed successfully!');
            navigate(-1);
            if (onLecturerRemoved) onLecturerRemoved(); // Notify parent to refresh list
        } catch (err) {
            setError('Failed to remove lecturer. Please try again.');
        }
    };

    return (
        <div>
            <h2>Remove Lecturer</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
            <button onClick={handleRemoveLecturer}>Confirm Remove Lecturer</button>
        </div>
    );
};

export default LecturerRemove;