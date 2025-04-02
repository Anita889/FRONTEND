import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import adminService from '../services/adminService';

const StudentGroupUpdate = () => {
    const { userId, adminId, facultyId, departmentId, studentGroupId } = useParams();
    const [studentGroup, setStudentGroup] = useState({ name: '', speciality: null });
    const [specialities, setSpecialities] = useState([]);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchStudentGroup = async () => {
            try {
                const response = await adminService.getStudentGroup(userId, adminId, facultyId, departmentId, studentGroupId);
                setStudentGroup(response);
            } catch (err) {
                console.error("Failed to fetch student group:", err);
                setError("Failed to fetch student group.");
            }
        };

        const fetchSpecialities = async () => {
            try {
                const response = await adminService.getSpecialities(userId, adminId, departmentId);
                setSpecialities(response?.data || response);
            } catch (err) {
                console.error("Failed to fetch specialities:", err);
                setSpecialities([]);
            }
        };

        fetchStudentGroup();
        fetchSpecialities();
    }, [userId, adminId, facultyId, departmentId, studentGroupId]);

    const handleInputChange = (e) => {
        setStudentGroup({ ...studentGroup, [e.target.name]: e.target.value });
    };

    const handleSpecialityChange = (e) => {
        const selectedId = e.target.value;
        const selectedSpeciality = specialities.find(s => s.id.toString() === selectedId);
        setStudentGroup({ ...studentGroup, speciality: selectedSpeciality });
    };

    const handleUpdateStudentGroup = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        try {
            await adminService.updateStudentGroup(userId, adminId, facultyId, departmentId, studentGroupId, studentGroup);
            setSuccess('Student Group updated successfully!');
            navigate(-1);
        } catch (err) {
            setError('Failed to update student group. Please try again.');
        }
    };

    return (
        <div>
            <h2>Update Student Group</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}

            <form onSubmit={handleUpdateStudentGroup}>
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={studentGroup.name}
                    onChange={handleInputChange}
                    required
                />

                <select
                    name="speciality"
                    value={studentGroup.speciality?.id || ""}
                    onChange={handleSpecialityChange}
                    required
                >
                    <option value="" disabled>Select Speciality</option>
                    {specialities.length > 0 ? (
                        specialities.map((speciality) => (
                            <option key={speciality.id} value={speciality.id}>
                                {speciality.name}
                            </option>
                        ))
                    ) : (
                        <option disabled>Loading...</option>
                    )}
                </select>

                <button type="submit">Update Student Group</button>
            </form>
        </div>
    );
};

export default StudentGroupUpdate;