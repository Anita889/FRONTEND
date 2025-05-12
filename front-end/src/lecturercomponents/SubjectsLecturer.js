import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import lecturerService from '../services/lecturerService';

const SubjectsLecturer = () => {
    const { userId, lecturerId } = useParams();
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

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            color: 'white'
        }}>
            <h2 style={{
                fontSize: '2.5rem',
                fontWeight: 'bold',
                textShadow: '2px 2px 5px rgba(0, 0, 0, 0.3)',
                marginBottom: '20px'
            }}>
                📚 Subjects
            </h2>

            {loading ? (
                <p style={{ fontSize: '1.2rem', color: '#ffeb3b' }}>Loading subjects...</p>
            ) : error ? (
                <p style={{ fontSize: '1.2rem', color: '#ff5722' }}>{error}</p>
            ) : subjects.length > 0 ? (
                <div style={{
                    width: '90%',
                    maxWidth: '800px',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                    gap: '20px'
                }}>
                    {subjects.map((subject) => (
                        <div key={subject.id} style={{
                            background: 'rgba(255, 255, 255, 0.2)',
                            padding: '20px',
                            borderRadius: '12px',
                            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
                            backdropFilter: 'blur(10px)',
                            textAlign: 'center',
                            transition: 'transform 0.3s ease-in-out'
                        }}>
                            <h4 style={{
                                fontSize: '1.5rem',
                                fontWeight: 'bold',
                                color: '#ffffff'
                            }}>
                                {subject.name}
                            </h4>
                            <button
                                style={{
                                    marginTop: '10px',
                                    padding: '12px 20px',
                                    fontSize: '1rem',
                                    fontWeight: 'bold',
                                    color: 'white',
                                    background: '#4CAF50',
                                    border: 'none',
                                    borderRadius: '8px',
                                    cursor: 'pointer',
                                    transition: 'background 0.3s ease-in-out, transform 0.2s'
                                }}
                                onClick={() => navigate(`${subject.id}`)}
                                onMouseOver={(e) => e.target.style.background = '#45a049'}
                                onMouseOut={(e) => e.target.style.background = '#4CAF50'}
                            >
                                Show Lessons
                            </button>
                            <button
                                style={{
                                    marginTop: '10px',
                                    padding: '12px 20px',
                                    fontSize: '1rem',
                                    fontWeight: 'bold',
                                    color: 'white',
                                    background: '#4CAF50',
                                    border: 'none',
                                    borderRadius: '8px',
                                    cursor: 'pointer',
                                    transition: 'background 0.3s ease-in-out, transform 0.2s'
                                }}
                                onClick={() => navigate(`/user/${userId}/lecturer/${lecturerId}/subjects/${subject.id}/studentGroups`)}
                                onMouseOver={(e) => e.target.style.background = '#45a049'}
                                onMouseOut={(e) => e.target.style.background = '#4CAF50'}
                            >
                                Set Exam Points
                            </button>
                            <button
                                style={{
                                    marginTop: '10px',
                                    padding: '12px 20px',
                                    fontSize: '1rem',
                                    fontWeight: 'bold',
                                    color: 'white',
                                    background: '#4c59af',
                                    border: 'none',
                                    borderRadius: '8px',
                                    cursor: 'pointer',
                                    transition: 'background 0.3s ease-in-out, transform 0.2s'
                                }}
                                onClick={() => navigate(`/user/${userId}/lecturer/${lecturerId}/subjects/${subject.id}/affection`)}
                                onMouseOver={(e) => e.target.style.background = '#45a049'}
                                onMouseOut={(e) => e.target.style.background = '#4CAF50'}
                            >
                                View Analyze
                            </button>

                        </div>
                    ))}
                </div>
            ) : (
                <p style={{ fontSize: '1.2rem', color: 'white', textAlign: 'center', marginTop: '20px' }}>
                    No subjects found.
                </p>
            )}
        </div>
    );
};

export default SubjectsLecturer;
