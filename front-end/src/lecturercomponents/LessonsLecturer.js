import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import lecturerService from '../services/lecturerService';

const LessonsLecturer = () => {
    const { userId, lecturerId, subjectId } = useParams();
    const [lessons, setLessons] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchLessons = async () => {
            try {
                const data = await lecturerService.getLessonsOfSubject(userId, lecturerId, subjectId);
                setLessons(data);
            } catch (error) {
                console.error('Failed to load lessons', error);
            }
        };

        fetchLessons();
    }, [userId, lecturerId, subjectId]);

    return (
        <div style={{
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #f6d365 0%, #fda085 100%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '20px',
            overflowY: 'auto' // Enables scrolling
        }}>
            <h2 style={{
                fontSize: '2.5rem',
                fontWeight: 'bold',
                color: '#ffffff',
                textShadow: '2px 2px 5px rgba(0, 0, 0, 0.3)',
                marginBottom: '20px'
            }}>Lessons</h2>

            <div style={{
                width: '90%',
                maxWidth: '800px',
                maxHeight: '80vh', // Limits height for scrolling
                overflowY: 'auto' // Enables scrolling
            }}>
                {lessons.length > 0 ? (
                    lessons.map((lesson) => (
                        <div key={lesson.id} style={{
                            background: '#ffffff',
                            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
                            borderRadius: '12px',
                            padding: '20px',
                            marginBottom: '15px',
                            textAlign: 'center',
                            transition: 'transform 0.3s ease-in-out'
                        }}>
                            <h3 style={{
                                fontSize: '1.5rem',
                                fontWeight: 'bold',
                                color: '#333'
                            }}>{lesson.type}</h3>

                            <div style={{
                                marginTop: '15px',
                                display: 'flex',
                                justifyContent: 'center',
                                gap: '10px',
                                flexWrap: 'wrap'
                            }}>
                                <button
                                    style={{
                                        fontSize: '1rem',
                                        fontWeight: 'bold',
                                        padding: '10px 15px',
                                        border: 'none',
                                        borderRadius: '8px',
                                        cursor: 'pointer',
                                        background: '#4CAF50',
                                        color: 'white',
                                        transition: 'background 0.3s ease-in-out, transform 0.2s'
                                    }}
                                    onClick={() => navigate(`lesson/${lesson.id}`)}
                                    onMouseOver={(e) => e.target.style.background = '#45a049'}
                                    onMouseOut={(e) => e.target.style.background = '#4CAF50'}
                                >
                                    View Questions
                                </button>

                                <button
                                    style={{
                                        fontSize: '1rem',
                                        fontWeight: 'bold',
                                        padding: '10px 15px',
                                        border: 'none',
                                        borderRadius: '8px',
                                        cursor: 'pointer',
                                        background: '#ff5722',
                                        color: 'white',
                                        transition: 'background 0.3s ease-in-out, transform 0.2s'
                                    }}
                                    onClick={() => navigate(`lesson/${lesson.id}/affection`)}
                                    onMouseOver={(e) => e.target.style.background = '#e64a19'}
                                    onMouseOut={(e) => e.target.style.background = '#ff5722'}
                                >
                                    View Questions Affection
                                </button>
                                <button
                                    style={{
                                        fontSize: '1rem',
                                        fontWeight: 'bold',
                                        padding: '10px 15px',
                                        border: 'none',
                                        borderRadius: '8px',
                                        cursor: 'pointer',
                                        background: '#2256ff',
                                        color: 'white',
                                        transition: 'background 0.3s ease-in-out, transform 0.2s'
                                    }}
                                    onClick={() => navigate(`lesson/${lesson.id}/isPresent`)}
                                    onMouseOver={(e) => e.target.style.background = '#e64a19'}
                                    onMouseOut={(e) => e.target.style.background = '#ff5722'}
                                >
                                    Put presence
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p style={{ fontSize: '1.2rem', color: 'white', textAlign: 'center', marginTop: '20px' }}>
                        No lessons found.
                    </p>
                )}
            </div>
        </div>
    );
};

export default LessonsLecturer;
