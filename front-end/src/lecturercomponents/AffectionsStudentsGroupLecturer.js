import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import lecturerService from "../services/lecturerService"; // Import your service to fetch the data
import { PieChart, Pie, Tooltip, ResponsiveContainer, Cell } from 'recharts';

// More vibrant color palette
const COLORS = ['#4caf50', '#ffeb3b', '#f44336', '#29b6f6', '#ab47bc'];

const AffectionsStudentsGroupLecturer = () => {
    const { userId, lecturerId, subjectId, lessonId } = useParams();
    const [groupAnalysis, setGroupAnalysis] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await lecturerService.getAffectionsOfLesson(userId, lecturerId, subjectId, lessonId);
                setGroupAnalysis(data);
            } catch (err) {
                console.error("Failed to load data", err);
                setError("Failed to load data");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [userId, lecturerId, subjectId, lessonId]);

    if (loading) return <p style={{ padding: '20px', color: '#ffffff' }}>🔄 Loading group analysis...</p>;
    if (error) return <p style={{ color: 'red' }}>{error}</p>;

    return (
        <div style={{
            minHeight: '100vh',
            background: 'linear-gradient(to right, #0f2027, #203a43, #2c5364)',
            padding: '30px',
            fontFamily: 'Segoe UI, sans-serif',
            color: '#f1f1f1'
        }}>
            <h2 style={{ color: '#f1f1f1', marginBottom: '30px', fontSize:"40 px" }}>🎓 Student Group Analysis by Lesson :DB types, structure, using</h2>

            {groupAnalysis.length === 0 ? (
                <p>No data available.</p>
            ) : (
                groupAnalysis.map((group, groupIndex) => (
                    <div key={group.name} style={{
                        backgroundColor: '#1e1e1e',
                        borderRadius: '35px',
                        padding: '24px',
                        marginBottom: '40px',
                        border: `2px solid ${COLORS[groupIndex % COLORS.length]}`,
                        boxShadow: `0 0 12px ${COLORS[groupIndex % COLORS.length]}88`
                    }}>
                        <h3 style={{ color: COLORS[groupIndex % COLORS.length], fontSize: '40px' }}>
                            🧑‍🏫 {group.name}
                        </h3>
                        <ul style={{ listStyle: 'none', paddingLeft: 0, lineHeight: '1.6em' , fontSize: '34px'}}>
                            <li>👥 <strong>Students:</strong> {group.countLessons} </li>
                            <li>📅 <strong>Attendance:</strong> {group.countAttendance}%</li>
                            <li>😊 <strong>Satisfied:</strong> {group.countSatisfiedTestPickers}%</li>
                            <li>😕 <strong>Unsatisfied:</strong> {group.countUnsatisfiedTestPickers}%</li>
                            <li>📝 <strong>Excellent Answers:</strong> {group.countExcelentAnswearGrade}%</li>
                            <li>👍 <strong>Good Answers:</strong> {group.countGoodAnswearGrade}%</li>
                            <li>👎 <strong>Bad Answers:</strong> {group.countBadAnswearGrade}%</li>
                        </ul>

                        <h4 style={{ color: '#ffd54f', marginTop: '20px' }}>📈 Grade Distribution</h4>
                        <ResponsiveContainer width="100%" height={250}>
                            <PieChart>
                                <Pie
                                    data={[
                                        { name: 'Excellent', value: group.countExcelentAnswearGrade },
                                        { name: 'Good', value: group.countGoodAnswearGrade },
                                        { name: 'Bad', value: group.countBadAnswearGrade },
                                    ]}
                                    dataKey="value"
                                    nameKey="name"
                                    cx="50%" cy="50%" outerRadius="60%" fill="#8884d8"
                                >
                                    {['#4caf50', '#ffeb3b', '#f44336'].map((color, index) => (
                                        <Cell key={`cell-${index}`} fill={color} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                ))
            )}
        </div>
    );
};

export default AffectionsStudentsGroupLecturer;
