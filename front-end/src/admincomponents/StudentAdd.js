import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import adminService from '../services/adminService';

const StudentAdd = () => {
    const { userId, adminId, facultyId, departmentId, studentGroupId } = useParams();
    const [student, setStudent] = useState({
        studentName: '',
        studentSurname: '',
        studentBirthDate: '',
        mog: null,
        studentCity: '',
        email: '',
        studentGroupDTO: { id: studentGroupId },
    });
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setStudent(prev => ({
            ...prev,
            [name]: name === 'mog' ? parseFloat(value) || null : value
        }));
    };

    const handleAddStudent = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        try {
            await adminService.addStudent(userId, adminId, facultyId, departmentId, studentGroupId, student);
            setSuccess('Student added successfully!');
            navigate(-1);
        } catch (error) {
            console.error('Failed to add student', error);
            setError('Failed to add student. Please try again later.');
        }
    };

    return (
        <form onSubmit={handleAddStudent}>
            <input type="text" name="studentName" value={student.studentName} onChange={handleInputChange} placeholder="First Name" required />
            <input type="text" name="studentSurname" value={student.studentSurname} onChange={handleInputChange} placeholder="Surname" required />
            <input type="date" name="studentBirthDate" value={student.studentBirthDate} onChange={handleInputChange} required />
            <input type="number" name="mog" value={student.mog || ''} onChange={handleInputChange} placeholder="MOG" step="0.01" required />
            <input type="text" name="studentCity" value={student.studentCity} onChange={handleInputChange} placeholder="City" required />
            <input type="email" name="email" value={student.email} onChange={handleInputChange} placeholder="Email" required />
            <input type="password" name="password" value={student.password} onChange={handleInputChange} placeholder="Password" required />

            <button type="submit">Add Student</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
        </form>
    );
};

export default StudentAdd;