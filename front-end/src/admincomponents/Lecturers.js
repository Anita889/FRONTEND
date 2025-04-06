import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import adminService from '../services/adminService';

const Lecturers = () => {
    const { userId, adminId, facultyId, departmentId } = useParams();
    const [lecturers, setLecturers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchLecturers = async () => {
            try {
                const data = await adminService.getLecturers(userId, adminId, facultyId, departmentId);
                setLecturers(data);
            } catch (error) {
                console.error('Failed to load lecturers', error);
            }
        };

        fetchLecturers();
    }, [userId, adminId, facultyId, departmentId]);

    const pageStyles = {
        fontFamily: 'Arial, sans-serif',
        margin: '20px',
        backgroundColor: '#f4f7f6',
        borderRadius: '8px',
        padding: '20px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    };

    const titleStyles = {
        color: '#4ca0af',
        fontSize: '28px',
        textAlign: 'center',
        marginBottom: '20px',
    };

    const buttonStyles = {
        padding: '10px 20px',
        margin: '10px',
        fontSize: '16px',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
    };

    const addButtonStyles = {
        ...buttonStyles,
        backgroundColor: '#4ca0af',
        color: 'white',
        border: 'none',
    };

    const actionButtonStyles = {
        ...buttonStyles,
        backgroundColor: '#4ca0af',
        color: 'white',
        border: 'none',
    };

    const lecturerCardStyles = {
        backgroundColor: '#fff',
        borderRadius: '8px',
        padding: '15px',
        marginBottom: '15px',
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    };

    return (
        <div style={pageStyles}>
            <h1 style={titleStyles}>Lecturers</h1>
            <div>
                <button style={addButtonStyles} onClick={() => navigate('add')}>Add Lecturer</button>
                <button style={addButtonStyles} onClick={() => navigate('addLesson')}>Add Lesson</button>
            </div>
            {lecturers.length > 0 ? (
                lecturers.map((lecturer) => (
                    <div key={lecturer.id} style={lecturerCardStyles}>
                        <h2>{lecturer.name} {lecturer.surName}</h2>
                        <div>
                            <button style={actionButtonStyles} onClick={() => navigate(`${lecturer.id}/remove`)}>
                                Delete Lecturer
                            </button>
                            <button style={actionButtonStyles} onClick={() => navigate(`${lecturer.id}/update`)}>
                                Update Lecturer
                            </button>
                        </div>
                    </div>
                ))
            ) : (
                <p>No Lecturers found.</p>
            )}
        </div>
    );
};

export default Lecturers;
