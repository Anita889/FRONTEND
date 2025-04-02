import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import adminService from '../services/adminService';

const StudentRemove = () => {
    const { userId, adminId, facultyId, departmentId, studentGroupId, studentId } = useParams();
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const navigate = useNavigate();

    const handleRemoveStudent = async () => {
        setError(null);
        setSuccess(null);

        try {
            await adminService.removeStudent(userId, adminId, facultyId, departmentId, studentGroupId, studentId);
            setSuccess('Student removed successfully!');
            setTimeout(() => navigate(-1), 2000);
        } catch (error) {
            console.error('Failed to remove student', error);
            setError('Failed to remove student. Please try again later.');
        }
    };

    return (
        <div>
            <h2>Remove Student</h2>
            <p>Are you sure you want to remove this student?</p>
            <button onClick={handleRemoveStudent} style={{ marginRight: '10px', background: 'red', color: 'white' }}>Yes, Remove</button>
            <button onClick={() => navigate(-1)}>Cancel</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
        </div>
    );
};

export default StudentRemove;