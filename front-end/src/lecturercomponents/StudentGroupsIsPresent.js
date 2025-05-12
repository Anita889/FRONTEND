import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import lecturerService from '../services/lecturerService';

const StudentGroupsIsPresent = () => {
    const { userId, lecturerId, subjectId } = useParams();
    const [studentGroups, setStudentGroups] = useState([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        const fetchGroups = async () => {
            try {
                const data = await lecturerService.getStudentGroupsForExam(userId, lecturerId, subjectId);
                const formatted = data.map(group => ({
                    ...group,
                    students: group.students.map(student => ({
                        ...student,
                        isPresent: !!student.isPresent // Ensure boolean
                    }))
                }));
                setStudentGroups(formatted);
            } catch (error) {
                console.error("Failed to fetch student groups", error);
            } finally {
                setLoading(false);
            }
        };
        fetchGroups();
    }, [userId, lecturerId, subjectId]);

    const handlePresenceChange = (groupIdx, studentIdx) => {
        const updated = [...studentGroups];
        updated[groupIdx].students[studentIdx].isPresent = !updated[groupIdx].students[studentIdx].isPresent;
        setStudentGroups(updated);
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            await lecturerService.putPresence(userId, lecturerId, subjectId, studentGroups);
            alert("Presence updated successfully!");
        } catch (err) {
            alert("Failed to save presence.");
        } finally {
            setSaving(false);
        }
    };

    return (
        <div style={{ padding: 20, backgroundColor: '#f4f4f9' }}>
            <h2 style={{ color: '#4CAF50' }}>Student Groups</h2>
            {loading ? (
                <p style={{ color: '#FF9800' }}>Loading...</p>
            ) : (
                <div>
                    {studentGroups.map((group, groupIdx) => (
                        <div key={group.id} style={{ marginBottom: 40, backgroundColor: '#ffffff', borderRadius: '8px', padding: '10px' }}>
                            <h3 style={{ color: '#3F51B5' }}>{group.name}</h3>
                            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                <thead style={{ backgroundColor: '#2196F3', color: 'white' }}>
                                <tr>
                                    <th style={headerCellStyle}>#</th>
                                    <th style={headerCellStyle}>Name</th>
                                    <th style={headerCellStyle}>Surname</th>
                                    <th style={headerCellStyle}>Present</th>
                                </tr>
                                </thead>
                                <tbody>
                                {group.students.map((student, studentIdx) => (
                                    <tr key={student.id} style={{ backgroundColor: student.isPresent ? '#C8E6C9' : '#FFCDD2' }}>
                                        <td style={cellStyle}>{studentIdx + 1}</td>
                                        <td style={cellStyle}>{student.studentName}</td>
                                        <td style={cellStyle}>{student.studentSurname}</td>
                                        <td style={cellStyle}>
                                            <input
                                                type="checkbox"
                                                checked={student.isPresent}
                                                onChange={() => handlePresenceChange(groupIdx, studentIdx)}
                                                style={{ marginRight: 10 }}
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
                            cursor: 'pointer',
                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)'
                        }}
                    >
                        {saving ? "Saving..." : "Save All"}
                    </button>
                </div>
            )}
        </div>
    );
};

const headerCellStyle = {
    border: '1px solid #2196F3',
    padding: '8px',
    textAlign: 'left',
    fontWeight: 'bold'
};

const cellStyle = {
    border: '1px solid #ccc',
    padding: '8px',
    textAlign: 'left'
};

export default StudentGroupsIsPresent;
