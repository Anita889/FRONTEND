import React, { useState, useEffect } from "react";
import adminService from "../services/adminService";
import { useNavigate, useParams } from "react-router-dom";

const LessonAdd = ({ onLessonAdded }) => {
    const { userId, adminId, facultyId, departmentId } = useParams();
    const [lesson, setLesson] = useState({
        lessonName: '',
        subject: '',
        lecturer: '',
        availabilityDate: '',
        studentGroup: '' // Store selected student group as a single value
    });
    const [subjects, setSubjects] = useState([]);
    const [studentGroups, setStudentGroups] = useState([]);
    const [lecturers, setLecturers] = useState([]);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const subjectsData = await adminService.getSubjects(userId, adminId, facultyId, departmentId);
                setSubjects(subjectsData);

                const studentGroupData = await adminService.getStudentGroups(userId, adminId, facultyId, departmentId);
                setStudentGroups(studentGroupData);

                const lecturersData = await adminService.getLecturers(userId, adminId, facultyId, departmentId);
                setLecturers(lecturersData);
            } catch (err) {
                setError("Failed to fetch data.");
            }
        };
        fetchData();
    }, [userId, adminId, facultyId, departmentId]);

    const handleInputChange = (e) => {
        setLesson({ ...lesson, [e.target.name]: e.target.value });
    };

    const handleAddLesson = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        try {
            const lessonData = {
                lessonName: lesson.lessonName,
                availabilityDate: lesson.availabilityDate,
                lecturerId: lesson.lecturer,
                subjectDTO: { id: lesson.subject },
                studentGroupId: lesson.studentGroup // Send single student group
            };

            const newLesson = await adminService.addLesson(userId, adminId, facultyId, departmentId, lessonData);
            setSuccess("Lesson added successfully!");
            if (onLessonAdded) onLessonAdded(newLesson);
            setLesson({ lessonName: '', subject: '', lecturer: '', availabilityDate: '', studentGroup: '' });
            navigate(-1);
        } catch (err) {
            setError("Failed to add lesson. Please try again.");
        }
    };

    return (
        <div style={{ padding: "20px", backgroundColor: "#f3f4f6", borderRadius: "8px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
            <h2 style={{ color: "#4caf50", textAlign: "center" }}>Add New Lesson</h2>
            {error && <p style={{ color: "red", fontWeight: "bold" }}>{error}</p>}
            {success && <p style={{ color: "green", fontWeight: "bold" }}>{success}</p>}

            <form onSubmit={handleAddLesson} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                <input
                    type="text"
                    name="lessonName"
                    placeholder="Lesson Name"
                    value={lesson.lessonName}
                    onChange={handleInputChange}
                    required
                    style={{
                        padding: "12px",
                        borderRadius: "6px",
                        border: "2px solid #ccc",
                        fontSize: "16px",
                        backgroundColor: "#fff",
                        color: "#333",
                        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)"
                    }}
                />

                <label style={{ fontSize: "16px", color: "#333" }}>Select Subject:</label>
                <select
                    name="subject"
                    value={lesson.subject}
                    onChange={handleInputChange}
                    required
                    style={{
                        padding: "12px",
                        borderRadius: "6px",
                        border: "2px solid #ccc",
                        backgroundColor: "#e3f2fd",
                        fontSize: "16px",
                        color: "#333",
                        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)"
                    }}
                >
                    <option value="">Select Subject</option>
                    {subjects.map((subject) => (
                        <option key={subject.id} value={subject.id}>
                            {subject.name}
                        </option>
                    ))}
                </select>

                <label style={{ fontSize: "16px", color: "#333" }}>Select Lecturer:</label>
                <select
                    name="lecturer"
                    value={lesson.lecturer}
                    onChange={handleInputChange}
                    required
                    style={{
                        padding: "12px",
                        borderRadius: "6px",
                        border: "2px solid #ccc",
                        backgroundColor: "#e3f2fd",
                        fontSize: "16px",
                        color: "#333",
                        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)"
                    }}
                >
                    <option value="">Select Lecturer</option>
                    {lecturers.map((lecturer) => (
                        <option key={lecturer.id} value={lecturer.id}>
                            {lecturer.name}
                        </option>
                    ))}
                </select>

                <label style={{ fontSize: "16px", color: "#333" }}>Select Student Group:</label>
                <select
                    name="studentGroup"
                    value={lesson.studentGroup}
                    onChange={handleInputChange}
                    required
                    style={{
                        padding: "12px",
                        borderRadius: "6px",
                        border: "2px solid #ccc",
                        backgroundColor: "#e3f2fd",
                        fontSize: "16px",
                        color: "#333",
                        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)"
                    }}
                >
                    <option value="">Select Student Group</option>
                    {studentGroups.map((group) => (
                        <option key={group.id} value={group.id}>
                            {group.name}
                        </option>
                    ))}
                </select>

                <input
                    type="date"
                    name="availabilityDate"
                    value={lesson.availabilityDate}
                    onChange={handleInputChange}
                    required
                    style={{
                        padding: "12px",
                        borderRadius: "6px",
                        border: "2px solid #ccc",
                        fontSize: "16px",
                        backgroundColor: "#fff",
                        color: "#333",
                        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)"
                    }}
                />

                <button
                    type="submit"
                    style={{
                        padding: "12px 20px",
                        backgroundColor: "#4caf50",
                        color: "#fff",
                        border: "none",
                        borderRadius: "6px",
                        fontSize: "16px",
                        cursor: "pointer",
                        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)"
                    }}
                >
                    Add Lesson
                </button>
            </form>
        </div>
    );
};

export default LessonAdd;
