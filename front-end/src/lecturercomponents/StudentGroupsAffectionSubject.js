import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import lecturerService from '../services/lecturerService';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const StudentGroupsAffectionSubject = () => {
    const { userId, lecturerId, subjectId } = useParams();
    const [analysisData, setAnalysisData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAnalysis = async () => {
            try {
                const response = await lecturerService.viewAffectionOnSubject(userId, lecturerId, subjectId);
                setAnalysisData(response);
            } catch (err) {
                console.error("Error fetching analysis data", err);
                setError("Failed to load analysis");
            } finally {
                setLoading(false);
            }
        };

        fetchAnalysis();
    }, [userId, lecturerId, subjectId]);

    const handleNameChange = (index, newName) => {
        const updatedData = [...analysisData];
        updatedData[index].name = newName;  // Update the name of the group at the given index
        setAnalysisData(updatedData);  // Update the state with the new names
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    const data = analysisData.map(entry => ({
        name: entry.name,  // Use the current name of the group
        ExcellentAnswers: entry.countExcelentAnswearGrade,
        GoodAnswers: entry.countGoodAnswearGrade,
        BadAnswers: entry.countBadAnswearGrade,
        SatisfiedPickers: entry.countSatisfiedTestPickers,
        UnsatisfiedPickers: entry.countUnsatisfiedTestPickers,
        ExcellentExamPoints: entry.countExcelentExamPoints,
        GoodExamPoints: entry.countGoodExamPoints,
        BadExamPoints: entry.countBadExamPoints,
    }));

    const colors = ['#82ca9d', '#8884d8', '#ff6666', '#4caf50', '#f44336', '#2196f3', '#03a9f4', '#e91e63'];

    return (
        <div style={{ padding: 40 }}>
            <h2>📊 Student Group Performance Analysis Subject:DB</h2>
            {data.map((entry, index) => (
                <div key={index} style={{ marginBottom: 20 }}>
                    <input
                        type="text"
                        value={entry.name}
                        onChange={(e) => handleNameChange(index, e.target.value)}  // Update group name when input changes
                        style={{
                            marginBottom: 10,
                            padding: 8,
                            borderRadius: 4,
                            border: '1px solid #ccc',
                            width: '100%',
                            fontSize: '16px',
                        }}
                    />
                    <ResponsiveContainer width="100%" height={400}>
                        <PieChart>
                            <Pie
                                data={[
                                    { name: 'Excellent Answers', value: entry.ExcellentAnswers },
                                    { name: 'Good Answers', value: entry.GoodAnswers },
                                    { name: 'Bad Answers', value: entry.BadAnswers },
                                    { name: 'Satisfied Pickers', value: entry.SatisfiedPickers },
                                    { name: 'Unsatisfied Pickers', value: entry.UnsatisfiedPickers },
                                    { name: 'Excellent Exam Points', value: entry.ExcellentExamPoints },
                                    { name: 'Good Exam Points', value: entry.GoodExamPoints },
                                    { name: 'Bad Exam Points', value: entry.BadExamPoints },
                                ]}
                                dataKey="value"
                                cx="50%"
                                cy="50%"
                                innerRadius={80}
                                outerRadius={120}
                                fill="#8884d8"
                                label
                            >
                                {[
                                    'Excellent Answers',
                                    'Good Answers',
                                    'Bad Answers',
                                    'Satisfied Pickers',
                                    'Unsatisfied Pickers',
                                    'Excellent Exam Points',
                                    'Good Exam Points',
                                    'Bad Exam Points',
                                ].map((_, i) => (
                                    <Cell key={`cell-${i}`} fill={colors[i % colors.length]} />
                                ))}
                            </Pie>

                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            ))}
        </div>
    );
};

export default StudentGroupsAffectionSubject;
