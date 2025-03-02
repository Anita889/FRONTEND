import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import studentService from '../services/studentService';

const SubjectsStudent = () => {
    const {userId, studentId } = useParams();
    const [subjects, setSubjects] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSubjects = async () => {
            try {
                const data = await studentService.getSubjects(userId, studentId);
                setSubjects(data);
            } catch (error) {
                console.error('Failed to load subjects', error);
            }
        };

        fetchSubjects();
    }, [userId, studentId]);

    return (
        <div>
            <h2>Subjects</h2>
            {subjects.length > 0 ? (
                subjects.map((subject) => (
                    <div key={subject.id}>
                        <h4>{subject.name}</h4>
                        <button onClick={() => navigate(`${subject.id}/lessons`)}>
                            Show Lessons
                        </button>
                    </div>
                ))
            ) : (
                <p>No subjects found.</p>
            )}
            <button onClick={() => navigate(-1)}>
                Back
            </button>
        </div>
    );
};

export default SubjectsStudent;
