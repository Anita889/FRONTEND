import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import lecturerService from '../services/lecturerService';

const StudentGroupsForExam = () => {
    const { userId, lecturerId, subjectId } = useParams();
    const [studentGroups, setStudentGroups] = useState([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        const fetchGroups = async () => {
            try {
                const data = await lecturerService.getStudentGroupsForExam(userId, lecturerId, subjectId);
                setStudentGroups(data);
            } catch (error) {
                console.error("Failed to fetch student groups", error);
            } finally {
                setLoading(false);
            }
        };
        fetchGroups();
    }, [userId, lecturerId, subjectId]);

    const handlePointChange = (groupIdx, studentIdx, value) => {
        const updated = [...studentGroups];
        updated[groupIdx].students[studentIdx].point = parseInt(value);
        setStudentGroups(updated);
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            await lecturerService.updateExamPoints(userId, lecturerId, subjectId, studentGroups);
            alert("Points updated successfully!");
        } catch (err) {
            alert("Failed to save points.");
        } finally {
            setSaving(false);
        }
    };

    return (
        <div style={{ padding: 20 }}>
            <h2>Student Groups</h2>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div>
                    {studentGroups.map((group, groupIdx) => (
                        <div key={group.id} style={{ marginBottom: 40 }}>
                            <h3>{group.name}</h3>
                            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                <thead>
                                <tr>
                                    <th style={cellStyle}>#</th>
                                    <th style={cellStyle}>Name</th>
                                    <th style={cellStyle}>Surname</th>
                                    <th style={cellStyle}>Exam Point</th>
                                </tr>
                                </thead>
                                <tbody>
                                {group.students.map((student, studentIdx) => (
                                    <tr key={student.id}>
                                        <td style={cellStyle}>{studentIdx + 1}</td>
                                        <td style={cellStyle}>{student.studentName}</td>
                                        <td style={cellStyle}>{student.studentSurname}</td>
                                        <td style={cellStyle}>
                                            <input
                                                type="number"
                                                value={student.point || ''}
                                                onChange={e =>
                                                    handlePointChange(groupIdx, studentIdx, e.target.value)
                                                }
                                                style={{ width: 80 }}
                                            />
                                        </td>
                                    </tr>
                                ))}
                                </tbody>

                            </table>
                        </div>
                    ))}
                    <button
                        onClick={handleSave}
                        disabled={saving}
                        style={{
                            marginTop: 20,
                            padding: '10px 20px',
                            backgroundColor: '#2196F3',
                            color: 'white',
                            border: 'none',
                            borderRadius: 5,
                            cursor: 'pointer'
                        }}
                    >
                        {saving ? "Saving..." : "Save All"}
                    </button>
                </div>
            )}
        </div>
    );
};

const cellStyle = {
    border: '1px solid #ccc',
    padding: '8px',
    textAlign: 'left'
};

export default StudentGroupsForExam;
