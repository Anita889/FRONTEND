import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import adminService from '../services/adminService';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';

const StudentGroupsDepartmentCalculate = () => {
    const { userId, adminId, facultyId, departmentId } = useParams();
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);
    const [selectedGroup, setSelectedGroup] = useState(null);
    const navigate = useNavigate();

    const handleCalculate = async () => {
        setError(null);
        setResult(null);
        setSelectedGroup(null);

        try {
            const response = await adminService.calculateDepartment(userId, adminId, facultyId, departmentId);
            setResult(response);
        } catch (err) {
            setError('Failed to calculate student groups. Please try again.');
            console.error(err);
        }
    };

    return (
        <div style={{ padding: '30px', fontFamily: 'Arial', backgroundColor: '#121212', color: '#e0e0e0', minHeight: '100vh' }}>
            <h2>📊 Department Group Analytics</h2>

            <div style={{ marginBottom: '20px' }}>
                <button onClick={handleCalculate} style={btnStyle}>Analyze</button>
                <button onClick={() => navigate(-1)} style={{ ...btnStyle, backgroundColor: '#555' }}>Back</button>
            </div>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            {result && !selectedGroup && (
                <div>
                    <h3>👥 Select a Student Group</h3>
                    {Object.keys(result).map(groupName => (
                        <button
                            key={groupName}
                            onClick={() => setSelectedGroup(groupName)}
                            style={btnStyle}
                        >
                            {groupName}
                        </button>
                    ))}
                </div>
            )}

            {selectedGroup && result[selectedGroup] && (
                <div>
                    <h3>📘 Group: {selectedGroup}</h3>
                    <button onClick={() => setSelectedGroup(null)} style={{ ...btnStyle, backgroundColor: '#444' }}>
                        ← Back to Groups
                    </button>

                    {Object.entries(result[selectedGroup]).map(([lessonName, students]) => (
                        <div key={lessonName} style={{ margin: '40px 0', backgroundColor: '#1e1e1e', padding: '20px', borderRadius: '10px' }}>
                            <h4>{lessonName}</h4>
                            <ResponsiveContainer width="100%" height={300}>
                                <LineChart data={students}>
                                    <CartesianGrid stroke="#444" strokeDasharray="3 3" />
                                    <XAxis type="number" dataKey="mog" name="Middle Grade" stroke="#e0e0e0" />
                                    <YAxis type="number" dataKey="score" name="Score" stroke="#e0e0e0" />
                                    <Tooltip contentStyle={{ backgroundColor: '#333', borderColor: '#666', color: '#fff' }} />
                                    <Legend wrapperStyle={{ color: '#e0e0e0' }} />
                                    <Line type="monotone" dataKey="score" stroke="#82ca9d" />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

const btnStyle = {
    margin: '5px',
    padding: '10px 20px',
    borderRadius: '6px',
    border: 'none',
    backgroundColor: '#3f51b5',
    color: 'white',
    cursor: 'pointer',
    fontWeight: 'bold'
};

export default StudentGroupsDepartmentCalculate;
