import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import studentService from '../services/studentService';

const LessonsPage = () => {
    const {userId, studentId, subjectId } = useParams();
    const [lessons, setLessons] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchLessons = async () => {
            try {
                const data = await studentService.getLessonsOfSubject(userId, studentId, subjectId);
                setLessons(data);
            } catch (error) {
                console.error('Failed to load lessons', error);
            }
        };

        fetchLessons();
    }, [userId, studentId, subjectId]);

    return (
        <div>
            <h2>Lessons</h2>
            {lessons.length > 0 ? (
                lessons.map((lesson) => (
                    <div key={lesson.id}>
                        <h4>{lesson.name}</h4>
                        <button onClick={() => navigate(`${lesson.id}/questions`)}>
                            Show Questions
                        </button>
                    </div>
                ))
            ) : (
                <p>No lessons found.</p>
            )}
            <button onClick={() => navigate(-1)}>
                Back
            </button>
        </div>
    );
};

export default LessonsPage;
