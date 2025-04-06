import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import studentService from '../services/studentService';

const Student = () => {
    const { userId, studentId } = useParams();
    const [student, setStudent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (!studentId) return;

        const fetchStudent = async () => {
            try {
                setLoading(true);
                setError(null);
                const data = await studentService.getStudent(userId, studentId);
                setStudent(data);
            } catch (error) {
                console.error('Failed to load student data', error);
                setError('Failed to load student data. Please try again later.');
            } finally {
                setLoading(false);
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
            setError('Failed to update student. Please try again later.');
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
        <div className="max-w-2xl mx-auto p-6 bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100 shadow-lg rounded-lg mt-8">
            <h2 className="text-3xl font-bold text-center text-purple-800 mb-6">🎓 Student Information 🎓</h2>

            {loading ? (
                <p className="text-center text-gray-700 animate-pulse">Loading student data...</p>
            ) : error ? (
                <p className="text-center text-red-600">{error}</p>
            ) : (
                student && (
                    <form onSubmit={handleUpdateStudent} className="space-y-4">
                        <input type="text" name="studentName" value={student.studentName} onChange={handleInputChange}
                               placeholder="First Name"
                               className="w-full px-4 py-2 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                               required />

                        <input type="text" name="studentSurname" value={student.studentSurname} onChange={handleInputChange}
                               placeholder="Surname"
                               className="w-full px-4 py-2 border border-pink-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                               required />

                        <input type="date" name="studentBirthDate" value={student.studentBirthDate} onChange={handleInputChange}
                               className="w-full px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                               required />

                        <input type="number" name="mog" value={student.mog} onChange={handleInputChange}
                               placeholder="MOG" step="0.01"
                               className="w-full px-4 py-2 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                               required />

                        <input type="text" name="studentCity" value={student.studentCity} onChange={handleInputChange}
                               placeholder="City"
                               className="w-full px-4 py-2 border border-yellow-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                               required />

                        <input type="email" name="email" value={student.email} onChange={handleInputChange}
                               placeholder="Email"
                               className="w-full px-4 py-2 border border-indigo-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                               required />

                        <p className="text-lg font-medium text-gray-800">
                            Student Group: <span className="text-purple-600">{student.studentGroupDTO?.name}</span>
                        </p>

                        {error && <p className="text-red-600">{error}</p>}

                    </form>
                )
            )}

            <button
                onClick={() => navigate(`subjects`)}
                className="mt-6 w-full bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white py-2 rounded-lg hover:from-pink-600 hover:to-yellow-600 transition">
                📚 Show Subjects
            </button>
        </div>
    );
};

export default Student;
