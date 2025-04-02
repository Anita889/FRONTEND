import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import adminService from '../services/adminService';

const StudentGroups = () => {
    const { userId, adminId, facultyId, departmentId } = useParams();
    const [studentGroups, setStudentGroups] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchFaculties = async () => {
            try {
                const data = await adminService.getStudentGroups(userId, adminId, facultyId, departmentId);
                setStudentGroups(data);
            } catch (error) {
                console.error('Failed to load subjects', error);
            }
        };

        fetchFaculties();
    }, [userId, adminId, facultyId, departmentId]);

    return (
        <div>
            <h1>Student Groups</h1>
            <button  onClick={() => navigate(`add`)}>
                Add Student Group
            </button>
            <button  onClick={() => navigate(``)}>
                Calculate Student Groups for Department
            </button>
            {studentGroups.length > 0 ? (
                studentGroups.map((studentGroup) => (
                    <div key={studentGroup.id}>
                        <button onClick={() => navigate(`${studentGroup.id}/getStudents`)}>
                            {studentGroup.name}</button>
                        <button  onClick={() => navigate(`${studentGroup.id}/remove`)}>
                            Delete Student Groups
                        </button>
                        <button  onClick={() => navigate(`${studentGroup.id}/update`)}>
                            Update Student Groups
                        </button>
                        <button  onClick={() => navigate(`${studentGroup.id}/calculate`)}>
                            Calculate StudentGroup Lessons Quantity
                        </button>
                    </div>
                ))
            ) : (
                <p>No Student Groups found.</p>
            )}
        </div>
    );
};

export default StudentGroups;
