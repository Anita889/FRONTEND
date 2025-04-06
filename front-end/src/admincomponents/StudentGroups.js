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
        <div style={{ padding: '20px', backgroundColor: '#f4f7f6', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
            <h1 style={{ color: '#3c6e71', textAlign: 'center' }}>Student Groups</h1>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                <button
                    onClick={() => navigate('add')}
                    style={{
                        padding: '10px 20px',
                        backgroundColor: '#4caf50',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                        fontSize: '16px',
                    }}
                >
                    Add Student Group
                </button>
                <button
                    onClick={() => navigate('calculate')}
                    style={{
                        padding: '10px 20px',
                        backgroundColor: '#2196f3',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                        fontSize: '16px',
                    }}
                >
                    Analyze StudentGroups for Department
                </button>
            </div>
            {studentGroups.length > 0 ? (
                studentGroups.map((studentGroup) => (
                    <div key={studentGroup.id} style={{ marginBottom: '15px', padding: '15px', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
                        <h3 style={{ color: '#3c6e71' }}>{studentGroup.name}</h3>
                        <div style={{ display: 'flex', gap: '10px' }}>
                            <button
                                onClick={() => navigate(`${studentGroup.id}/getStudents`)}
                                style={{
                                    padding: '10px 15px',
                                    backgroundColor: '#ff9800',
                                    color: '#fff',
                                    border: 'none',
                                    borderRadius: '6px',
                                    cursor: 'pointer',
                                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                                    fontSize: '14px',
                                }}
                            >
                                View Students
                            </button>
                            <button
                                onClick={() => navigate(`${studentGroup.id}/remove`)}
                                style={{
                                    padding: '10px 15px',
                                    backgroundColor: '#f44336',
                                    color: '#fff',
                                    border: 'none',
                                    borderRadius: '6px',
                                    cursor: 'pointer',
                                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                                    fontSize: '14px',
                                }}
                            >
                                Delete Group
                            </button>
                            <button
                                onClick={() => navigate(`${studentGroup.id}/update`)}
                                style={{
                                    padding: '10px 15px',
                                    backgroundColor: '#8bc34a',
                                    color: '#fff',
                                    border: 'none',
                                    borderRadius: '6px',
                                    cursor: 'pointer',
                                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                                    fontSize: '14px',
                                }}
                            >
                                Update Group
                            </button>
                            <button
                                onClick={() => navigate(`${studentGroup.id}/calculate`)}
                                style={{
                                    padding: '10px 15px',
                                    backgroundColor: '#9c27b0',
                                    color: '#fff',
                                    border: 'none',
                                    borderRadius: '6px',
                                    cursor: 'pointer',
                                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                                    fontSize: '14px',
                                }}
                            >
                                Analyze StudentGroup
                            </button>
                        </div>
                    </div>
                ))
            ) : (
                <p style={{ textAlign: 'center', fontSize: '18px', color: '#ff5722' }}>No Student Groups found.</p>
            )}
        </div>
    );
};

export default StudentGroups;
