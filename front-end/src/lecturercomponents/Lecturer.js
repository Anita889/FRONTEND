import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import lecturerService from '../services/lecturerService';

const Lecturer = () => {
    const {userId, lecturerId } = useParams();
    const [lecturer, setLecturer] = useState(null);
    const [loading, setLoading] = useState(true); // State to track loading status
    const [error, setError] = useState(null); // State to track errors
    const navigate = useNavigate();

    useEffect(() => {
        if (!lecturerId) return;

        const fetchLecturer = async () => {
            try {
                setLoading(true); // Start loading
                setError(null); // Reset error before fetch
                const data = await lecturerService.getLecturer(userId, lecturerId);
                setLecturer(data); // Update student data
            } catch (error) {
                console.error('Failed to load lecturer data', error);
                setError('Failed to load lecturer data. Please try again later.'); // Set error message
            } finally {
                setLoading(false); // Stop loading when done
            }
        };

        fetchLecturer();
    }, [userId, lecturerId]);

    return (
        <div>
            <h2>Lecturer Information</h2>

            {loading ? (
                <p>Loading lecturer data...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                lecturer && (
                    <div>
                        <p><strong>Name:</strong> {lecturer.name} {lecturer.surName}</p>
                        <p><strong>Email:</strong> {lecturer.email}</p>
                    </div>
                )
            )}

            {/* Button to navigate to Subjects Page */}
            <button onClick={() => navigate(`subjects`)}>Show Subjects</button>
        </div>
    );
};

export default Lecturer;
