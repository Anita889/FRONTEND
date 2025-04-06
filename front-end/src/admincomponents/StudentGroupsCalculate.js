import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import adminService from '../services/adminService';

const StudentGroupCalculate = () => {
    const { userId, adminId, facultyId, departmentId, studentGroupId } = useParams();
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleCalculate = async () => {
        setError(null);
        setResult(null);

        try {
            const response = await adminService.calculateStudentGroup(userId, adminId, facultyId, departmentId, studentGroupId);
            console.log("Response from backend:", response); // Debug log
            setResult(response);
        } catch (err) {
            setError('Failed to calculate student group. Please try again.');
        }
    };

    return (
        <div>
            <h2>Calculate Student Group</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {result && (
                <div>
                    <h3>Calculation Results:</h3>
                    {Object.keys(result).length === 0 ? (
                        <p>No data available for the selected student group.</p>
                    ) : (
                        Object.entries(result).map(([lessonName, students]) => (
                            <div key={lessonName} style={{ marginBottom: '30px' }}>
                                <h4>{lessonName}</h4>
                                <table
                                    border="1"
                                    style={{
                                        width: '100%',
                                        borderCollapse: 'collapse',
                                        marginBottom: '20px',
                                    }}
                                >
                                    <thead>
                                    <tr style={{ backgroundColor: '#f2f2f2' }}>
                                        <th>Student Name</th>
                                        <th>MOG</th>
                                        <th>Score</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {students.map((student) => (
                                        <tr key={student.id}>
                                            <td>{student.studentName} {student.studentSurname}</td>
                                            <td>{student.mog}</td>
                                            <td>{student.score !== undefined && student.score !== null ? student.score.toFixed(2) : 'N/A'}</td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        ))
                    )}
                </div>
            )}

            <button onClick={handleCalculate}>Analyze</button>
            <button onClick={() => navigate(-1)}>Back</button>
        </div>
    );
};

export default StudentGroupCalculate;
