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
                console.error('Failed to load subjects', error);
            }
        };

        fetchFaculties();
    }, [userId, adminId]);

    return (
        <div>
            <h2>Faculties</h2>
            {faculties.length > 0 ? (
                faculties.map((faculty) => (
                    <div key={faculty.id}>
                        <h4>{faculty.name}</h4>
                        <button onClick={() => navigate(`${faculty.id}/departments`)}>
                            Show Departments
                        </button>
                    </div>
                ))
            ) : (
                <p>No subjects found.</p>
            )}
        </div>
    );
};

export default Faculties;
