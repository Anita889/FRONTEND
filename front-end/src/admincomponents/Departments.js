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

    return (
        <div>
            <h2>Departments</h2>
            {departments.length > 0 ? (
                departments.map((department) => (
                    <div key={department.id}>
                        <h4>{department.name}</h4>
                        <button onClick={() => navigate(`${department.id}/lecturers`)}>
                            Show Lecturers
                        </button>
                        <button onClick={() => navigate(`${department.id}/studentGroups`)}>
                            Show StudentGroups
                        </button>
                    </div>
                ))
            ) : (
                <p>No Lecturers found.</p>
            )}
        </div>
    );
};

export default Faculties;
