import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import lecturerService from '../services/lecturerService';

const Lecturer = () => {
    const { userId, lecturerId } = useParams();
    const [lecturer, setLecturer] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [updating, setUpdating] = useState(false);
    const [updateMessage, setUpdateMessage] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (!lecturerId) return;

        const fetchLecturer = async () => {
            try {
                setLoading(true);
                setError(null);
                const data = await lecturerService.getLecturer(userId, lecturerId);
                setLecturer(data);
                setEmail(data.email); // initialize email
            } catch (error) {
                console.error('Failed to load lecturer data', error);
                setError('Failed to load lecturer data. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchLecturer();
    }, [userId, lecturerId]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            setUpdating(true);
            setUpdateMessage(null);
            const updatedLecturer = {
                email: lecturer.email,
                password: lecturer.password // assuming password is stored in state
            };
            await lecturerService.updateLecturer(userId, lecturerId, lecturer);
            setUpdateMessage('Lecturer information updated successfully!');
        } catch (err) {
            console.error('Update failed', err);
            setUpdateMessage('Failed to update lecturer. Please try again.');
        } finally {
            setUpdating(false);
        }
    };

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white'
        }}>
            <h2 style={{
                fontSize: '2.5rem',
                fontWeight: 'bold',
                textShadow: '2px 2px 5px rgba(0, 0, 0, 0.3)',
                marginBottom: '20px'
            }}>
                Lecturer Information
            </h2>

            {loading ? (
                <p style={{ fontSize: '1.2rem', color: '#ffeb3b' }}>Loading lecturer data...</p>
            ) : error ? (
                <p style={{ fontSize: '1.2rem', color: '#ff5722' }}>{error}</p>
            ) : (
                lecturer && (
                    <>
                        <div style={{
                            background: 'rgba(255, 255, 255, 0.2)',
                            padding: '20px',
                            borderRadius: '12px',
                            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
                            backdropFilter: 'blur(10px)',
                            textAlign: 'center',
                            marginBottom: '20px'
                        }}>
                            <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
                                {lecturer.name} {lecturer.surName}
                            </p>
                            <p style={{ fontSize: '1.2rem' }}>
                                📧 <strong>Email:</strong> {lecturer.email}
                            </p>
                        </div>

                        <form onSubmit={handleUpdate} style={{ display: 'flex', flexDirection: 'column', width: '300px', gap: '10px' }}>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Update Email"
                                required
                                style={{ padding: '10px', borderRadius: '6px', border: 'none' }}
                            />
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Update Password"
                                style={{ padding: '10px', borderRadius: '6px', border: 'none' }}
                            />
                            <button
                                type="submit"
                                disabled={updating}
                                style={{
                                    padding: '10px',
                                    background: '#4caf50',
                                    color: 'white',
                                    fontWeight: 'bold',
                                    borderRadius: '6px',
                                    border: 'none',
                                    cursor: 'pointer'
                                }}
                            >
                                {updating ? 'Updating...' : 'Update Info'}
                            </button>
                            {updateMessage && (
                                <p style={{ color: updateMessage.includes('successfully') ? '#c8e6c9' : '#ffcdd2' }}>{updateMessage}</p>
                            )}
                        </form>
                    </>
                )
            )}

            <button
                onClick={() => navigate(`subjects`)}
                style={{
                    marginTop: '20px',
                    padding: '12px 20px',
                    fontSize: '1rem',
                    fontWeight: 'bold',
                    color: 'white',
                    background: '#ff9800',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    transition: 'background 0.3s ease-in-out, transform 0.2s'
                }}
                onMouseOver={(e) => e.target.style.background = '#e68900'}
                onMouseOut={(e) => e.target.style.background = '#ff9800'}
            >
                Show Subjects 📚
            </button>
        </div>
    );
};

export default Lecturer;
