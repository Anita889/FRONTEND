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

    return (
        <div>
            <h2>Admin Information</h2>

            {loading ? (
                <p>Loading lecturer data...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                admin && (
                    <div>
                        <p><strong>Name:</strong> {admin.name} {admin.surName}</p>
                        <p><strong>Email:</strong> {admin.email}</p>
                    </div>
                )
            )}

            {/* Button to navigate to Subjects Page */}
            <button onClick={() => navigate(`faculties`)}>Show Faculties</button>
        </div>
    );
};

export default Admin;
