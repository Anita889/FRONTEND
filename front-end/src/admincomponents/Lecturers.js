import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import adminService from '../services/adminService';

const Lecturers = () => {
    const { userId, adminId, facultyId, departmentId } = useParams();
    const [lecturers, setLecturers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchFaculties = async () => {
            try {
                const data = await adminService.getLecturers(userId, adminId, facultyId, departmentId);
                setLecturers(data);
            } catch (error) {
                console.error('Failed to load subjects', error);
            }
        };

        fetchFaculties();
    }, [userId, adminId, facultyId, departmentId]);

    return (
        <div>
            <h1>Lecturers</h1>
            <button  onClick={() => navigate(`add`)}>
             Add Lecturer
            </button>
            <button  onClick={() => navigate(`addLesson`)}>
                Add Lesson
            </button>
                {lecturers.length > 0 ? (
                lecturers.map((lecturer) => (
                    <div key={lecturer.id}>
                        <h2>{lecturer.name} {lecturer.surName}</h2>
                        <button  onClick={() => navigate(`${lecturer.id}/remove`)}>
                            Delete Lecturer
                        </button>
                        <button  onClick={() => navigate(`${lecturer.id}/update`)}>
                            Update Lecturer
                        </button>
                    </div>
                ))
            ) : (
                <p>No Lecturers found.</p>
            )}
        </div>
    );
};

export default Lecturers;
