import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import adminService from '../services/adminService';

const StudentGroupsAdd = () => {
    const { userId, adminId, facultyId, departmentId } = useParams();
    const [newStudentGroup, setNewStudentGroup] = useState({ name: '', speciality: null });
    const [specialities, setSpecialities] = useState([]);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const navigate = useNavigate();

    // Fetch specialities on component mount
    useEffect(() => {
        const fetchSpecialities = async () => {
            try {
                const response = await adminService.getSpecialities(userId, adminId, departmentId);
                setSpecialities(response?.data || response);
            } catch (err) {
                console.error("Failed to fetch specialities:", err);
                setSpecialities([]);
            }
        };

        fetchSpecialities();
    }, [userId, adminId, facultyId, departmentId]); // No warning now

    const handleInputChange = (e) => {
        setNewStudentGroup({ ...newStudentGroup, [e.target.name]: e.target.value });
    };

    const handleAddStoreGroup = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        try {
            await adminService.addStudentGroup(userId, adminId, facultyId, departmentId, newStudentGroup);
            setNewStudentGroup({ name: '', speciality: null });
            setSuccess('Student Group added successfully!');
            navigate(-1);
        } catch (err) {
            setError('Failed to add student group. Please try again.');
        }
    };
    const handleSpecialityChange = (e) => {
        const selectedId = e.target.value;
        const selectedSpeciality = specialities.find(s => s.id.toString() === selectedId);
        setNewStudentGroup({ ...newStudentGroup, speciality: selectedSpeciality });
    };

    return (
        <div>
            <h2>Add Student Group</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}

            <form onSubmit={handleAddStoreGroup}>
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={newStudentGroup.name}
                    onChange={handleInputChange}
                    required
                />

                <select
                    name="speciality"
                    value={newStudentGroup.speciality?.id || ""}
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



                <button type="submit">Add eStudent Group</button>
            </form>
        </div>
    );
};

export default StudentGroupsAdd;
