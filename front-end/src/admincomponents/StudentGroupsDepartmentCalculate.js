import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import adminService from '../services/adminService';

const StudentGroupsDepartmentCalculate = () => {
    const { userId, adminId, facultyId, departmentId } = useParams();
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleCalculate = async () => {
        setError(null);
        setResult(null);

        try {
            const response = await adminService.calculateDepartment(userId, adminId, facultyId, departmentId);
            console.log("Response:", response);

            if (response) {
                setResult(response);
            } else {
                setError('Unexpected response format');
            }
        } catch (err) {
            setError('Failed to calculate student groups department. Please try again.');
            console.error(err);
        }
    };

    return (
        <div>
            <h2>Calculate Student Groups for Department</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {result && (
                <div>
                    <h3>Calculation Results:</h3>
                    {/* Iterate through the student groups */}
                    {Object.entries(result).length === 0 ? (
                        <p>No data available for the selected department.</p>
                    ) : (
                        Object.entries(result).map(([groupName, lessons]) => (
                            <div key={groupName}>
                                <h4>{groupName}</h4>
                                {/* Iterate through the lessons for the group */}
                                {Object.entries(lessons).map(([lessonName, students]) => (
                                    <div key={lessonName} style={{ marginBottom: '20px' }}>
                                        <h5>{lessonName}</h5>
                                        <table border="1" style={{ width: '100%', borderCollapse: 'collapse' }}>
                                            <thead>
                                            <tr style={{ backgroundColor: '#f2f2f2' }}>
                                                <th>Student Name</th>
                                                <th>MOG</th>
                                                <th>Score</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {/* Map through students for the lesson */}
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
                                ))}
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

export default StudentGroupsDepartmentCalculate;
