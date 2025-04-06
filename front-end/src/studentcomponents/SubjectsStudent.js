import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import studentService from '../services/studentService';

const SubjectsStudent = () => {
    const { userId, studentId } = useParams();
    const [subjects, setSubjects] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSubjects = async () => {
            try {
                const data = await studentService.getSubjects(userId, studentId);
                setSubjects(data);
            } catch (error) {
                console.error('Failed to load subjects', error);
            }
        };

        fetchSubjects();
    }, [userId, studentId]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 p-6">
            <div className="max-w-3xl mx-auto bg-white shadow-2xl rounded-2xl p-6">
                <h2 className="text-4xl font-extrabold text-center text-purple-700 mb-8">📚 Subjects</h2>

                {subjects.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {subjects.map((subject) => (
                            <div
                                key={subject.id}
                                className="bg-white border border-purple-200 shadow-md rounded-lg p-4 hover:shadow-xl transition duration-300"
                            >
                                <h4 className="text-xl font-semibold text-pink-600 mb-3">{subject.name}</h4>
                                <button
                                    onClick={() => navigate(`${subject.id}/lessons`)}
                                    className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-lg hover:from-purple-600 hover:to-pink-600 transition"
                                >
                                    🎓 Show Lessons
                                </button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-gray-600 mt-8">No subjects found.</p>
                )}

                <div className="mt-10 flex justify-center">
                    <button
                        onClick={() => navigate(-1)}
                        className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-6 py-2 rounded-full shadow-md transition"
                    >
                        ⬅️ Back
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SubjectsStudent;
