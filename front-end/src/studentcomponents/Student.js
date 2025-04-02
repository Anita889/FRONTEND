import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import studentService from '../services/studentService';

const Student = () => {
    const {userId, studentId } = useParams();
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
                const data = await studentService.getStudent(userId, studentId);
                setStudent(data); // Update student data
            } catch (error) {
                console.error('Failed to load student data', error);
                setError('Failed to load student data. Please try again later.'); // Set error message
            } finally {
                setLoading(false); // Stop loading when done
            }
        };

        fetchStudent();
    }, [userId, studentId]);
    const handleUpdateStudent = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const updatedStudent = { ...student };
            if (updatedStudent.studentBirthDate) {
                updatedStudent.studentBirthDate = new Date(updatedStudent.studentBirthDate).toISOString().split('T')[0];
            }
            await studentService.updateStudent(userId, studentId, updatedStudent);
            navigate(-1);
        } catch (error) {
            console.error('Update failed', error);
            setError('Failed to update student. Please try again later.'); // Handle error
        }
    };
    const handleInputChange = (e) => {
        const { name, value } = e.target;

            setStudent(prev => ({
                ...prev,
                [name]: name === 'mog' || name === 'academyGroup' ? parseFloat(value) || null : value
            }));

    };

    return (
        <div>
            <h2>Student Information</h2>

            {loading ? (
                <p>Loading student data...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                student && (
                    <form onSubmit={handleUpdateStudent}>
                        <input type="text" name="studentName" value={student.studentName} onChange={handleInputChange} placeholder="First Name" required />
                        <input type="text" name="studentSurname" value={student.studentSurname} onChange={handleInputChange} placeholder="Surname" required />
                        <input type="date" name="studentBirthDate" value={student.studentBirthDate} onChange={handleInputChange} required />
                        <input type="number" name="mog" value={student.mog || ''} onChange={handleInputChange} placeholder="MOG" step="0.01" required />
                        <input type="text" name="studentCity" value={student.studentCity} onChange={handleInputChange} placeholder="City" required />
                        <input type="email" name="email" value={student.email} onChange={handleInputChange} placeholder="Email" required />
                        <p>Student Group: {student.studentGroupDTO?.name}</p>

                        {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message */}

                        <button type="submit">Update Student</button>
                    </form>

                )
            )}

            {/* Button to navigate to Subjects Page */}
            <button onClick={() => navigate(`subjects`)}>Show Subjects</button>
        </div>
    );
};

export default Student;
