import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import studentService from '../services/studentService';

const LessonsPage = () => {
    const { userId, studentId, subjectId } = useParams();
    const [lessons, setLessons] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchLessons = async () => {
            try {
                const data = await studentService.getLessonsOfSubject(userId, studentId, subjectId);
                setLessons(data);
            } catch (error) {
                console.error('Failed to load lessons', error);
            }
        };

        fetchLessons();
    }, [userId, studentId, subjectId]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-pink-100 to-purple-100 p-6">
            <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-2xl p-8">
                <h2 className="text-4xl font-bold text-center text-purple-700 mb-10">📘 Lessons</h2>

                {lessons.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {lessons.map((lesson) => (
                            <div
                                key={lesson.id}
                                className="bg-white border border-pink-300 shadow-md rounded-xl p-5 hover:shadow-lg transition"
                            >
                                <h4 className="text-2xl font-semibold text-blue-700 mb-4">{lesson.type}</h4>
                                <button
                                    onClick={() => navigate(`${lesson.id}/questions`)}
                                    className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-5 py-2 rounded-full hover:from-pink-600 hover:to-purple-600 transition"
                                >
                                    🎯 Show Questions
                                </button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-gray-600 mt-8">No lessons found.</p>
                )}

                <div className="mt-12 flex justify-center">
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

export default LessonsPage;
