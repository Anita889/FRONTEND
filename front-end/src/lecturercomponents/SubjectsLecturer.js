import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import lecturerService from '../services/lecturerService';

const SubjectsLecturer = () => {
    const {userId, lecturerId } = useParams();
    const [subjects, setSubjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSubjects = async () => {
            try {
                const data = await lecturerService.getSubjects(userId, lecturerId);
                setSubjects(data);
            } catch (error) {
                setError('Failed to load subjects');
                console.error('Failed to load subjects', error);
            } finally {
                setLoading(false);
            }
        };

        fetchSubjects();
    }, [userId, lecturerId]);

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <h2>Subjects</h2>
            {error && <p>{error}</p>}
            {subjects.length > 0 ? (
                subjects.map((subject) => (
                    <div key={subject.id}>
                        <h4>{subject.name}</h4>
                        <button onClick={() => navigate(`${subject.id}`)}>
                            Show Lessons
                        </button>
                    </div>
                ))
            ) : (
                <p>No subjects found.</p>
            )}
        </div>
    );
};

export default SubjectsLecturer;
