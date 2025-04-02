import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import lecturerService from "../services/lecturerService";

const AffectionsStudentsGroupLecturer = () => {
    const { userId, lecturerId, subjectId, lessonId } = useParams();
    const [affections, setAffections] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAffections = async () => {
            try {
                const data = await lecturerService.getAffectionsOfLesson(userId, lecturerId, subjectId, lessonId);
                setAffections(data);
            } catch (error) {
                console.error("Failed to load affections", error);
                setError("Failed to load affections");
            } finally {
                setLoading(false);
            }
        };

        fetchAffections();
    }, [userId, lecturerId, subjectId, lessonId]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h2>Student Groups and Students</h2>
            {Object.keys(affections).length === 0 ? (
                <p>No student groups found.</p>
            ) : (
                Object.entries(affections).map(([groupName, students]) => (
                    <div key={groupName} style={{ border: "1px solid #ccc", padding: "10px", marginBottom: "10px" }}>
                        <h3>{groupName}</h3>
                        <ul>
                            {students.map((student) => (
                                <li key={student.id}>
                                    <strong>{student.studentName} {student.studentSurname}</strong> <br />
                                    Email: {student.email} <br />
                                    MOG: {student.mog ?? "N/A"} <br />
                                    Score: {student.score ?? "N/A"}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))
            )}
        </div>
    );
};

export default AffectionsStudentsGroupLecturer;
