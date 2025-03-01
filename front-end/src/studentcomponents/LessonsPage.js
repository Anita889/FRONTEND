import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import studentService from '../services/studentService';

const LessonsPage = () => {
    const { studentId, subjectId } = useParams();
    const [lessons, setLessons] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchLessons = async () => {
            try {
                const data = await studentService.getLessonsOfSubject(studentId, subjectId);
                setLessons(data);
            } catch (error) {
                console.error('Failed to load lessons', error);
            }
        };

        fetchLessons();
    }, [studentId, subjectId]);

    return (
        <div>
            <h2>Lessons</h2>
            {lessons.length > 0 ? (
                lessons.map((lesson) => (
                    <div key={lesson.id}>
                        <h4>{lesson.name}</h4>
                        <button onClick={() => navigate(`/student/${studentId}/lesson/${lesson.id}/questions`)}>
                            Show Questions
                        </button>
                    </div>
                ))
            ) : (
                <p>No lessons found.</p>
            )}
        </div>
    );
};

export default LessonsPage;
