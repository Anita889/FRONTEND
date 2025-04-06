import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import adminService from '../services/adminService';

const Faculties = () => {
    const { adminId, userId } = useParams();
    const [faculties, setFaculties] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchFaculties = async () => {
            try {
                const data = await adminService.getFaculties(userId, adminId);
                setFaculties(data);
            } catch (error) {
                console.error('Failed to load faculties', error);
            }
        };

        fetchFaculties();
    }, [userId, adminId]);

    // Inline CSS for styling
    const styles = {
        container: {
            backgroundColor: '#f4f4f9',
            borderRadius: '8px',
            padding: '20px',
            maxWidth: '500px',
            margin: '20px auto',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        },
        heading: {
            textAlign: 'center',
            color: '#2c3e50',
            fontSize: '1.8rem',
            marginBottom: '20px',
        },
        facultyContainer: {
            padding: '10px',
            borderBottom: '1px solid #ddd',
            marginBottom: '15px',
        },
        facultyName: {
            fontSize: '1.3rem',
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
        },
        buttonHover: {
            backgroundColor: '#2980b9',
        },
        noFacultiesMessage: {
            textAlign: 'center',
            fontSize: '1.2rem',
            color: '#e74c3c',
            fontWeight: 'bold',
        },
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.heading}>NPUA Faculties</h2>
            {faculties.length > 0 ? (
                faculties.map((faculty) => (
                    <div key={faculty.id} style={styles.facultyContainer}>
                        <h4 style={styles.facultyName}>{faculty.name}</h4>
                        <button
                            style={styles.button}
                            onClick={() => navigate(`${faculty.id}/departments`)}
                            onMouseOver={(e) => e.target.style.backgroundColor = styles.buttonHover.backgroundColor}
                            onMouseOut={(e) => e.target.style.backgroundColor = styles.button.backgroundColor}
                        >
                            Show Departments
                        </button>
                    </div>
                ))
            ) : (
                <p style={styles.noFacultiesMessage}>No faculties found.</p>
            )}
        </div>
    );
};

export default Faculties;
