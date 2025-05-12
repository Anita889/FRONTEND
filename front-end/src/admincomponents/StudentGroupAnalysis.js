import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import adminService from '../services/adminService';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell, LineChart, Line, ResponsiveContainer } from 'recharts';

const StudentGroupsAnalyze = () => {
    const { userId, adminId, facultyId, departmentId } = useParams();
    const [analysis, setAnalysis] = useState([]);

    useEffect(() => {
        const fetchAnalysis = async () => {
            try {
                const data = await adminService.analyzeStudentGroups(userId, adminId, facultyId, departmentId);
                setAnalysis(data);
            } catch (error) {
                console.error('Failed to fetch analysis:', error);
            }
        };

        fetchAnalysis();
    }, [userId, adminId, facultyId, departmentId]);

    const getBarChartData = () => {
        return [
            { name: 'Group 1', students: 12, lessons: 10, attendance: 8 },
            { name: 'Group 2', students: 19, lessons: 14, attendance: 15 },
            { name: 'Group 3', students: 8, lessons: 7, attendance: 6 }
        ];
    };

    const getPieChartData = () => {
        return [
            { name: 'Excellent Answers', value: 15 },
            { name: 'Good Answers', value: 20 },
            { name: 'Bad Answers', value: 10 }
        ];
    };

    const getLineChartData = () => {
        return [
            { name: 'Week 1', value: 30 },
            { name: 'Week 2', value: 40 },
            { name: 'Week 3', value: 50 },
            { name: 'Week 4', value: 60 }
        ];
    };

    return (
        <div style={{ padding: '20px', backgroundColor: '#f7f7f7', minHeight: '100vh' }}>
            <h1 style={{ textAlign: 'center', color: '#333', fontSize: '36px', marginBottom: '20px' }}>Student Groups Analysis</h1>
            {analysis.length > 0 ? (
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: '20px' }}>
                    {/* Left Section - Textual Information */}
                    <div style={{ flex: 1, padding: '20px', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                        {analysis.map((group, index) => (
                            <div key={index} style={{ marginBottom: '20px', padding: '15px', backgroundColor: '#e3f2fd', borderRadius: '8px' }}>
                                <h3 style={{ color: '#1e3d58', fontSize: '24px' }}>{group.name}</h3>
                                <ul style={{ listStyle: 'none', padding: 0, color: '#555', fontSize: '16px' }}>
                                    <li><strong>Number of Students:</strong> {group.countStudents}</li>
                                    <li><strong>Subjects (Lessons):</strong> {group.countLessons}</li>
                                    <li><strong>Attendance Count:</strong> {group.countAttendance}</li>
                                    <li><strong>Excellent Answers:</strong> {group.countExcelentAnswearGrade}</li>
                                    <li><strong>Good Answers:</strong> {group.countGoodAnswearGrade}</li>
                                    <li><strong>Bad Answers:</strong> {group.countBadAnswearGrade}</li>
                                    <li><strong>Satisfied Students:</strong> {group.countSatisfiedTestPickers}</li>
                                    <li><strong>Unsatisfied Students:</strong> {group.countUnsatisfiedTestPickers}</li>
                                    <li><strong>Excellent Exam Points:</strong> {group.countExcelentExamPoints}</li>
                                    <li><strong>Good Exam Points:</strong> {group.countGoodExamPoints}</li>
                                    <li><strong>Bad Exam Points:</strong> {group.countBadExamPoints}</li>
                                </ul>
                            </div>
                        ))}
                    </div>

                    {/* Right Section - Charts */}
                    <div style={{ flex: 1, padding: '20px', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                        <h3 style={{ textAlign: 'center', color: '#1e3d58', fontSize: '24px', marginBottom: '20px' }}>Visual Analysis</h3>

                        {/* BarChart for Students, Lessons, and Attendance */}
                        <div style={{ marginBottom: '20px' }}>
                            <h4 style={{ color: '#1e3d58', fontSize: '20px', marginBottom: '10px' }}>Student, Lessons, and Attendance</h4>
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={getBarChartData()}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="students" fill="#8884d8" />
                                    <Bar dataKey="lessons" fill="#82ca9d" />
                                    <Bar dataKey="attendance" fill="#ffc658" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>

                        {/* PieChart for Answer Distribution */}
                        <div style={{ marginBottom: '20px' }}>
                            <h4 style={{ color: '#1e3d58', fontSize: '20px', marginBottom: '10px' }}>Answer Distribution</h4>
                            <ResponsiveContainer width="100%" height={300}>
                                <PieChart>
                                    <Pie data={getPieChartData()} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill="#8884d8" label>
                                        <Cell fill="#ff9800" />
                                        <Cell fill="#4caf50" />
                                        <Cell fill="#f44336" />
                                    </Pie>
                                </PieChart>
                            </ResponsiveContainer>
                        </div>

                        {/* LineChart for Weekly Performance */}
                        <div>
                            <h4 style={{ color: '#1e3d58', fontSize: '20px', marginBottom: '10px' }}>Weekly Performance</h4>
                            <ResponsiveContainer width="100%" height={300}>
                                <LineChart data={getLineChartData()}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Line type="monotone" dataKey="value" stroke="#8884d8" />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            ) : (
                <p style={{ textAlign: 'center', fontSize: '18px', color: '#f44336' }}>No analysis data available.</p>
            )}
        </div>
    );
};

export default StudentGroupsAnalyze;
