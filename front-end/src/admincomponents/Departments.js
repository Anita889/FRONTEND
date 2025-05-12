import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import adminService from '../services/adminService';

const Faculties = () => {
    const { userId, adminId, facultyId } = useParams();
    const [departments, setDepartments] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchFaculties = async () => {
            try {
                const data = await adminService.getDepartments(userId, adminId, facultyId);
                setDepartments(data);
            } catch (error) {
                console.error('Failed to load subjects', error);
            }
        };

        fetchFaculties();
    }, [userId, adminId, facultyId]);

    // Inline CSS for styling
    const styles = {
        container: {
            backgroundColor: '#f9f9f9',
            borderRadius: '8px',
            padding: '20px',
            maxWidth: '600px',
            margin: '20px auto',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        },
        heading: {
            textAlign: 'center',
            color: '#2c3e50',
            fontSize: '1.8rem',
            marginBottom: '20px',
        },
        departmentContainer: {
            padding: '15px',
            borderBottom: '1px solid #ddd',
            marginBottom: '15px',
            backgroundColor: '#fff',
            borderRadius: '5px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        },
        departmentName: {
            fontSize: '1.4rem',
            color: '#2980b9',
            marginBottom: '10px',
        },
        button: {
            backgroundColor: '#3498db',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            fontSize: '1rem',
            cursor: 'pointer',
            borderRadius: '5px',
            transition: 'background-color 0.3s ease',
            margin: '5px 0',
            width: '100%',
        },
        buttonHover: {
            backgroundColor: '#2980b9',
        },
        noDepartmentsMessage: {
            textAlign: 'center',
            fontSize: '1.2rem',
            color: '#e74c3c',
            fontWeight: 'bold',
        },
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.heading}>Departments</h2>
            {departments.length > 0 ? (
                departments.map((department) => (
                    <div key={department.id} style={styles.departmentContainer}>
                        <h4 style={styles.departmentName}>{department.name}</h4>
                        <button
                            style={styles.button}
                            onClick={() => navigate(`${department.id}/lecturers`)}
                            onMouseOver={(e) => e.target.style.backgroundColor = styles.buttonHover.backgroundColor}
                            onMouseOut={(e) => e.target.style.backgroundColor = styles.button.backgroundColor}
                        >
                            Show Lecturers
                        </button>
                        <button
                            style={styles.button}
                            onClick={() => navigate(`${department.id}/studentGroups`)}
                            onMouseOver={(e) => e.target.style.backgroundColor = styles.buttonHover.backgroundColor}
                            onMouseOut={(e) => e.target.style.backgroundColor = styles.button.backgroundColor}
                        >
                            Show Student Groups
                        </button>
                        <button
                            style={styles.button}
                            onClick={() => navigate(`${department.id}/studentGroups/analyze`)}
                            onMouseOver={(e) => e.target.style.backgroundColor = styles.buttonHover.backgroundColor}
                            onMouseOut={(e) => e.target.style.backgroundColor = styles.button.backgroundColor}
                        >
                            Show Student Groups Analyze Data
                        </button>
                    </div>
                ))
            ) : (
                <p style={styles.noDepartmentsMessage}>No departments found.</p>
            )}
        </div>
    );
};

export default Faculties;
