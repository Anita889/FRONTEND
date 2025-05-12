import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import adminService from '../services/adminService';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

const StudentGroupCalculate = () => {
    const { userId, adminId, facultyId, departmentId, studentGroupId } = useParams();
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);
    const [selectedLesson, setSelectedLesson] = useState(null);
    const navigate = useNavigate();

    const handleCalculate = async () => {
        setError(null);
        setResult(null);
        setSelectedLesson(null);

        try {
            const response = await adminService.calculateStudentGroup(userId, adminId, facultyId, departmentId, studentGroupId);
            console.log("Response from backend:", response);
            setResult(response);
        } catch (err) {
            setError('Failed to calculate student group. Please try again.');
        }
    };

    return (
        <div style={{
            minHeight: '100vh',
            backgroundColor: '#121212',
            color: '#f1f1f1',
            padding: '30px',
            fontFamily: 'Arial'
        }}>
            <h2 style={{ color: '#90caf9' }}>📊 Analyze Student Group</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}

            <button onClick={handleCalculate} style={{
                marginRight: '10px',
                padding: '10px 20px',
                backgroundColor: '#4fc3f7',
                color: '#000',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer'
            }}>Analyze</button>

            <button onClick={() => navigate(-1)} style={{
                padding: '10px 20px',
                backgroundColor: '#757575',
                color: '#fff',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer'
            }}>Back</button>

            {result && (
                <div style={{ marginTop: '30px' }}>
                    <h3 style={{ color: '#81d4fa' }}>Lessons:</h3>
                    {Object.keys(result).length === 0 ? (
                        <p>No data available for the selected student group.</p>
                    ) : (
                        <ul>
                            {Object.keys(result).map((lessonName) => (
                                <li key={lessonName}>
                                    <button
                                        onClick={() => setSelectedLesson(lessonName)}
                                        style={{
                                            margin: '10px',
                                            padding: '12px 18px',
                                            cursor: 'pointer',
                                            backgroundColor: '#673ab7',
                                            color: '#fff',
                                            border: 'none',
                                            borderRadius: '5px'
                                        }}
                                    >
                                        {lessonName}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}

                    {selectedLesson && result[selectedLesson] && (
                        <div style={{
                            marginTop: '30px',
                            backgroundColor: '#1e1e1e',
                            padding: '20px',
                            borderRadius: '10px',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.6)'
                        }}>
                            <h4 style={{ color: '#bbdefb' }}>{selectedLesson}</h4>
                            <table style={{
                                width: '100%',
                                borderCollapse: 'collapse',
                                marginBottom: '20px',
                                color: '#ddd'
                            }}>
                                <thead>
                                <tr style={{ backgroundColor: '#2c2c2c' }}>
                                    <th style={{ padding: '10px', border: '1px solid #444' }}>Student Name</th>
                                    <th style={{ padding: '10px', border: '1px solid #444' }}>Middle Grade</th>
                                    <th style={{ padding: '10px', border: '1px solid #444' }}>Score</th>
                                </tr>
                                </thead>
                                <tbody>
                                {result[selectedLesson].map((student) => (
                                    <tr key={student.id}>
                                        <td style={{ padding: '10px', border: '1px solid #444' }}>{student.studentName} {student.studentSurname}</td>
                                        <td style={{ padding: '10px', border: '1px solid #444' }}>{student.mog}</td>
                                        <td style={{ padding: '10px', border: '1px solid #444' }}>{student.score !== undefined && student.score !== null ? student.score.toFixed(2) : 'N/A'}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>

                            <h5 style={{ color: '#81d4fa' }}>📈 Middle Grade vs Score Chart</h5>
                            <ResponsiveContainer width="100%" height={300}>
                                <LineChart data={result[selectedLesson]}>
                                    <CartesianGrid stroke="#444" />
                                    <XAxis type="number" dataKey="mog" stroke="#ddd" />
                                    <YAxis type="number" dataKey="score" stroke="#ddd" />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: '#333', color: '#fff', border: 'none' }}
                                        labelStyle={{ color: '#ccc' }}
                                    />
                                    <Legend wrapperStyle={{ color: '#fff' }} />
                                    <Line type="monotone" dataKey="score" stroke="#4fc3f7" />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default StudentGroupCalculate;
