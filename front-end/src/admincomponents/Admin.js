import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import adminService from '../services/adminService';

const Admin = () => {
    const { userId, adminId } = useParams();
    const [admin, setAdmin] = useState(null);
    const [loading, setLoading] = useState(true); // State to track loading status
    const [error, setError] = useState(null); // State to track errors
    const navigate = useNavigate();

    useEffect(() => {
        if (!adminId) return;

        const fetchAdmin = async () => {
            try {
                setLoading(true); // Start loading
                setError(null); // Reset error before fetch
                const data = await adminService.getAdmin(userId, adminId);
                setAdmin(data); // Update student data
            } catch (error) {
                console.error('Failed to load admin data', error);
                setError('Failed to load admin data. Please try again later.'); // Set error message
            } finally {
                setLoading(false); // Stop loading when done
            }
        };

        fetchAdmin();
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
        adminDetails: {
            fontSize: '1.1rem',
            margin: '10px 0',
        },
        strong: {
            color: '#2980b9',
        },
        loadingError: {
            textAlign: 'center',
            fontSize: '1.2rem',
            color: '#e74c3c',
            fontWeight: 'bold',
        },
        loading: {
            color: '#f39c12',
        },
        button: {
            backgroundColor: '#3498db',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            fontSize: '1rem',
            cursor: 'pointer',
            width: '100%',
            marginTop: '20px',
            borderRadius: '5px',
            transition: 'background-color 0.3s ease',
        },
        buttonHover: {
            backgroundColor: '#2980b9',
        },
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.heading}>Admin Information</h2>

            {loading ? (
                <div style={{ ...styles.loadingError, ...styles.loading }}>Loading admin data...</div>
            ) : error ? (
                <div style={styles.loadingError}>{error}</div>
            ) : (
                admin && (
                    <div>
                        <p style={styles.adminDetails}><strong style={styles.strong}>Name:</strong> {admin.name} {admin.surName}</p>
                        <p style={styles.adminDetails}><strong style={styles.strong}>Email:</strong> {admin.email}</p>
                    </div>
                )
            )}

            <button
                style={styles.button}
                onClick={() => navigate(`faculties`)}
                onMouseOver={(e) => e.target.style.backgroundColor = styles.buttonHover.backgroundColor}
                onMouseOut={(e) => e.target.style.backgroundColor = styles.button.backgroundColor}
            >
                Show Institutions
            </button>
        </div>
    );
};

export default Admin;
