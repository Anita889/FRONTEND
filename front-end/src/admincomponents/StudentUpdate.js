import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import adminService from '../services/adminService';

const StudentUpdate = () => {
    const { userId, adminId, facultyId, departmentId, studentGroupId, studentId } = useParams();
    const [student, setStudent] = useState({
        id: null,
        studentName: '',
        studentSurname: '',
        studentBirthDate: '',
        mog: null,
        studentCity: '',
        email: '',
        studentGroupDTO: null
    });
    const [studentGroups, setStudentGroups] = useState([]);
    const [error, setError] = useState(null); // Fixed state initialization
    const [success, setSuccess] = useState(null); // Fixed state initialization
    const navigate = useNavigate();

    useEffect(() => {
        const fetchStudent = async () => {
            try {
                const data = await adminService.getStudent(userId, adminId, facultyId, departmentId, studentGroupId, studentId);
                const data2 = await adminService.getStudentGroups(userId, adminId, facultyId, departmentId);
                setStudentGroups(data2);
                setStudent({
                    id: data.id || null,
                    studentName: data.studentName || '',
                    studentSurname: data.studentSurname || '',
                    studentBirthDate: data.studentBirthDate || '',
                    mog: data.mog || null,
                    studentCity: data.studentCity || '',
                    academyGroup: data.academyGroup || null,
                    email: data.email || '',
                    studentGroupDTO: data.studentGroupDTO || null
                });
            } catch (error) {
                console.error('Failed to load student data', error);
            }
        };
        fetchStudent();
    }, [userId, adminId, facultyId, departmentId, studentGroupId, studentId]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        if (name === 'studentGroupDTO') {
            const selectedGroup = studentGroups.find(group => group.id === parseInt(value, 10));
            setStudent(prev => ({
                ...prev,
                studentGroupDTO: selectedGroup || null
            }));
        } else {
            setStudent(prev => ({
                ...prev,
                [name]: name === 'mog' || name === 'academyGroup' ? parseFloat(value) || null : value
            }));
        }
    };

    const handleUpdateStudent = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        try {
            const updatedStudent = { ...student };
            if (updatedStudent.studentBirthDate) {
                updatedStudent.studentBirthDate = new Date(updatedStudent.studentBirthDate).toISOString().split('T')[0];
            }
            await adminService.updateStudent(userId, adminId, facultyId, departmentId, studentGroupId, updatedStudent);
            setSuccess('Student updated successfully!');
            navigate(-1);
        } catch (error) {
            console.error('Update failed', error);
            setError('Failed to update student. Please try again later.'); // Handle error
        }
    };

    return (
        <form onSubmit={handleUpdateStudent}>
            <input type="text" name="studentName" value={student.studentName} onChange={handleInputChange} placeholder="First Name" required />
            <input type="text" name="studentSurname" value={student.studentSurname} onChange={handleInputChange} placeholder="Surname" required />
            <input type="date" name="studentBirthDate" value={student.studentBirthDate} onChange={handleInputChange} required />
            <input type="number" name="mog" value={student.mog || ''} onChange={handleInputChange} placeholder="MOG" step="0.01" required />
            <input type="text" name="studentCity" value={student.studentCity} onChange={handleInputChange} placeholder="City" required />
            <input type="email" name="email" value={student.email} onChange={handleInputChange} placeholder="Email" required />

            <select name="studentGroupDTO" value={student.studentGroupDTO?.id || ''} onChange={handleInputChange} required>
                <option value="">Select a Student Group</option>
                {studentGroups.map((group) => (
                    <option key={group.id} value={group.id}>
                        {group.name}
                    </option>
                ))}
            </select>

            {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message */}
            {success && <p style={{ color: 'green' }}>{success}</p>} {/* Display success message */}

            <button type="submit">Update Student</button>
        </form>
    );
};

export default StudentUpdate;
