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
            setResult(response);
        } catch (err) {
            setError('Failed to calculate student group. Please try again.');
        }
    };

    return (
        <div>
            <h2>Calculate Student Group</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {result && <p style={{ color: 'green' }}>Calculation Result: {result}</p>}

            <button onClick={handleCalculate}>Calculate</button>
            <button onClick={() => navigate(-1)}>Back</button>
        </div>
    );
};

export default StudentGroupCalculate;