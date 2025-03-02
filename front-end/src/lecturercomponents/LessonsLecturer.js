import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import lecturerService from '../services/lecturerService';

const LessonsLecturer = () => {
    const {userId, lecturerId, subjectId } = useParams();
    const [lessons, setLessons] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchLessons = async () => {
            try {
                const data = await lecturerService.getLessonsOfSubject(userId,lecturerId, subjectId);
                setLessons(data);
            } catch (error) {
                console.error('Failed to load lessons', error);
            }
        };

        fetchLessons();
    }, [userId, lecturerId, subjectId]);

    return (
        <div>
            <h2>Lessons</h2>
            {lessons.length > 0 ? (
                lessons.map((lesson) => (
                    <div key={lesson.id}>
                        <h3>{lesson.name}</h3>
                        <button onClick={() => navigate(`lesson/${lesson.id}`)}>
                            View Questions
                        </button>
                    </div>
                ))
            ) : (
                <p>No lessons found.</p>
            )}
        </div>
    );
};

export default LessonsLecturer;
