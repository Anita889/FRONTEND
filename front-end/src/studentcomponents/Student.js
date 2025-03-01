import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import studentService from '../services/studentService';

const Student = () => {
    const { studentId } = useParams();
    const [student, setStudent] = useState(null);
    const [loading, setLoading] = useState(true); // State to track loading status
    const [error, setError] = useState(null); // State to track errors
    const navigate = useNavigate();

    useEffect(() => {
        if (!studentId) return;

        const fetchStudent = async () => {
            try {
                setLoading(true); // Start loading
                setError(null); // Reset error before fetch
                const data = await studentService.getStudent(studentId);
                setStudent(data); // Update student data
            } catch (error) {
                console.error('Failed to load student data', error);
                setError('Failed to load student data. Please try again later.'); // Set error message
            } finally {
                setLoading(false); // Stop loading when done
            }
        };

        fetchStudent();
    }, [studentId]);

    return (
        <div>
            <h2>Student Information</h2>

            {loading ? (
                <p>Loading student data...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                student && (
                    <div>
                        <p><strong>Name:</strong> {student.studentName} {student.studentSurname}</p>
                        <p><strong>Email:</strong> {student.email}</p>
                        <p><strong>City:</strong> {student.studentCity}</p>
                        <p><strong>Academy Group ID:</strong> {student.academyGroupId}</p>
                        <p><strong>Date of Birth:</strong> {student.studentBirthDate}</p>
                        <p><strong>MOG:</strong> {student.mog}</p>
                    </div>
                )
            )}

            {/* Button to navigate to Subjects Page */}
            <button onClick={() => navigate(`/student/${studentId}/subjects`)}>Show Subjects</button>
        </div>
    );
};

export default Student;
