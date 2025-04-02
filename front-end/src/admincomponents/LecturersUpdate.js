import { useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import adminService from "../services/adminService";

const LecturerUpdate = ({ onLecturerUpdated }) => {
    const { userId, adminId, facultyId, departmentId, lecturerId } = useParams();
    const [lecturer, setLecturer] = useState({
        name: '', email: '', surName: '', password: '', rating: '', lessons: []
    });
    const [allLessons, setAllLessons] = useState([]);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const lecturerData = await adminService.getLecturer(userId, adminId, facultyId, departmentId, lecturerId);
                setLecturer(lecturerData);
                setAllLessons(lecturerData.lessons || []);
            } catch (err) {
                setError('Failed to fetch lecturer or lessons.');
            }
        };
        fetchData();
    }, [userId, adminId, facultyId, departmentId, lecturerId]);

    const handleInputChange = (e) => {
        setLecturer({ ...lecturer, [e.target.name]: e.target.value });
    };

    const handleUpdateLecturer = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        try {
            await adminService.updateLecturer(userId, adminId, facultyId, departmentId, lecturerId, {
                ...lecturer,
                lessons: lecturer.lessons.map(lesson => ({ id: lesson.id }))
            });

            setSuccess('Lecturer updated successfully!');
            navigate(-1);
            if (onLecturerUpdated) onLecturerUpdated();
        } catch (err) {
            setError('Failed to update lecturer. Please try again.');
        }
    };

    return (
        <div style={{ maxWidth: '600px', margin: '2rem auto', padding: '2rem', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', backgroundColor: '#ffffff' }}>
            <h2 style={{ textAlign: 'center', color: '#333' }}>Update Lecturer</h2>
            {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
            {success && <p style={{ color: 'green', textAlign: 'center' }}>{success}</p>}

            <form onSubmit={handleUpdateLecturer}>
                <input style={{ width: '100%', padding: '10px', margin: '8px 0', border: '1px solid #ccc', borderRadius: '4px', fontSize: '16px' }} type="text" name="name" placeholder="Name" value={lecturer.name} onChange={handleInputChange} required />
                <input style={{ width: '100%', padding: '10px', margin: '8px 0', border: '1px solid #ccc', borderRadius: '4px', fontSize: '16px' }} type="text" name="surName" placeholder="Surname" value={lecturer.surName} onChange={handleInputChange} required />
                <input style={{ width: '100%', padding: '10px', margin: '8px 0', border: '1px solid #ccc', borderRadius: '4px', fontSize: '16px' }} type="email" name="email" placeholder="Email" value={lecturer.email} onChange={handleInputChange} required />
                <input style={{ width: '100%', padding: '10px', margin: '8px 0', border: '1px solid #ccc', borderRadius: '4px', fontSize: '16px' }} type="password" name="password" placeholder="Password" value={lecturer.password} onChange={handleInputChange} required />
                <input style={{ width: '100%', padding: '10px', margin: '8px 0', border: '1px solid #ccc', borderRadius: '4px', fontSize: '16px' }} type="number" name="rating" placeholder="Rating" value={lecturer.rating} onChange={handleInputChange} required />

                <h3>Assigned Lessons:</h3>
                {allLessons.length > 0 ? (
                    <ul>
                        {allLessons.map((lesson) => (
                            <li key={lesson.id}>{lesson.type}</li>
                        ))}
                    </ul>
                ) : (
                    <p>No lessons assigned.</p>
                )}

                <button style={{ width: '100%', padding: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '16px', marginTop: '10px' }} type="submit">Update Lecturer</button>
                <button style={{ width: '100%', padding: '10px', backgroundColor: 'gray', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '16px', marginTop: '10px' }} onClick={() => navigate(-1)}>Back</button>
            </form>
        </div>
    );
};

export default LecturerUpdate;
