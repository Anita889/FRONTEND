import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import adminService from '../services/adminService';

const StudentGroupRemove = () => {
    const { userId, adminId, facultyId, departmentId, studentGroupId } = useParams();
    const [studentGroup, setStudentGroup] = useState({ name: '', speciality: null });
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchStudentGroup = async () => {
            try {
                const response = await adminService.getStudentGroup(userId, adminId, facultyId, departmentId, studentGroupId);
                setStudentGroup(response);
            } catch (err) {
                console.error("Failed to fetch student group:", err);
                setError("Failed to fetch student group.");
            }
        };

        fetchStudentGroup();
    }, [userId, adminId, facultyId, departmentId, studentGroupId]);

    const handleRemoveStudentGroup = async () => {
        setError(null);
        setSuccess(null);

        try {
            await adminService.deleteStudentGroup(userId, adminId, facultyId, departmentId, studentGroupId);
            setSuccess('Student Group removed successfully!');
            navigate(-1); // Navigate back to the previous page
        } catch (err) {
            setError('Failed to remove student group. Please try again.');
        }
    };

    return (
        <div>
            <h2>Remove Student Group</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}

            <p>Are you sure you want to remove the student group: <strong>{studentGroup.name}</strong>?</p>

            <button onClick={handleRemoveStudentGroup} style={{ backgroundColor: 'red', color: 'white' }}>
                Remove Student Group
            </button>
        </div>
    );
};

export default StudentGroupRemove;
