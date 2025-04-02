import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import adminService from '../services/adminService';

const Students = () => {
    const { userId, adminId, facultyId, departmentId , studentGroupId} = useParams();
    const [students, setStudents] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const data = await adminService.getStudents(userId, adminId, facultyId, departmentId, studentGroupId);
                // Ensure data is an array before setting state
                setStudents(Array.isArray(data) ? data : []);
            } catch (error) {
                console.error('Failed to load students', error);
                setStudents([]); // Ensure students state is an array even in case of error
            }
        };

        fetchStudents();
    }, [userId, adminId, facultyId, departmentId, studentGroupId]);

    return (
        <div>
            <h1>Students</h1>
            <button onClick={() => navigate(`add`)}>
                Add Student
            </button>
            {students.length > 0 ? (
                students.map((st) => (
                    <div key={st.id}>
                        <h2>{st.studentName} {st.studentSurname}</h2>
                        <button onClick={() => navigate(`${st.id}/remove`)}>
                            Delete Student
                        </button>
                        <button onClick={() => navigate(`${st.id}/update`)}>
                            Update Student
                        </button>
                    </div>
                ))
            ) : (
                <p>No Students found.</p>
            )}
        </div>
    );
};

export default Students;
