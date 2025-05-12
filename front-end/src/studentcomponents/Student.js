import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import studentService from '../services/studentService';

const Student = () => {
    const { userId, studentId } = useParams();
    const [student, setStudent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false); // 👈 NEW

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

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
            const updatedStudent = {
                email: student.email,
                password: student.password // assuming password is stored in state
            };
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
            [name]: value
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
                        <input type="text" name="studentName" value={student.studentName || ''}
                               placeholder="text"
                               className="w-full px-4 py-2 border border-purple-300 rounded-lg bg-gray-100" />

                        <input type="text" name="studentSurname" value={student.studentSurname || ''}
                               placeholder="text"
                               className="w-full px-4 py-2 border border-pink-300 rounded-lg bg-gray-100" />

                        <input type="date" name="studentBirthDate" value={student.studentBirthDate || ''}
                               placeholder="text"
                               className="w-full px-4 py-2 border border-blue-300 rounded-lg bg-gray-100" />

                        <input type="number" name="mog" value={student.mog || ''}
                               placeholder="text"
                               className="w-full px-4 py-2 border border-green-300 rounded-lg bg-gray-100" />

                        <input type="text" name="studentCity" value={student.studentCity || ''}
                               placeholder="city"
                               className="w-full px-4 py-2 border border-yellow-300 rounded-lg bg-gray-100" />

                        <input type="text" name="studentgroup" value={student.studentGroupDTO?.name || ''}
                               placeholder="text"
                               className="w-full px-4 py-2 border border-indigo-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                               required />

                        <input type="email" name="email" value={student.email || ''} onChange={handleInputChange}
                               placeholder="Email"
                               className="w-full px-4 py-2 border border-indigo-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                               required />
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            value={student.password || ''}
                            onChange={handleInputChange}
                            placeholder="Password"
                            className="w-full px-4 py-2 border border-red-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword((prev) => !prev)}
                            className="mt-2 text-sm text-blue-250 hover:underline"
                        >
                            {showPassword ? "Hide Password" : "Show Password"}
                        </button>

                        {error && <p className="text-red-600">{error}</p>}

                        <button type="submit"
                                className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition">
                            💾 Save Changes
                        </button>
                    </form>

                )
            )}
            <button
                onClick={() => navigate(`subjects`)}
                className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition">
                📚 Show Subjects
            </button>
        </div>
    );
};

export default Student;
