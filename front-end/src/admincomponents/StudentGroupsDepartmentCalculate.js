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
            console.log(response);

            if (response ) {
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
                    <ul>
                        {Object.entries(result).map(([groupName, value]) => (
                            <li key={groupName}>
                                {groupName}: {value}
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            <button onClick={handleCalculate}>Calculate</button>
            <button onClick={() => navigate(-1)}>Back</button>
        </div>
    );
};

export default StudentGroupsDepartmentCalculate;
