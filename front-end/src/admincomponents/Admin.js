import React, { useState, useEffect } from 'react';
import adminService from '../services/adminService';

const Admin = ({ adminId }) => {
    const [admin, setAdmin] = useState(null);
    const [faculties, setFaculties] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [lecturers, setLecturers] = useState([]);
    const [studentGroups, setStudentGroups] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchAdmin = async () => {
            try {
                const data = await adminService.getAdmin(adminId);
                setAdmin(data); } catch (error) {
                setMessage(error.response.data.message);
            }
        };
        fetchAdmin();
    }, [adminId]);

    const fetchFaculties = async () => {
        try {
            const data = await adminService.getFaculties(adminId);
            setFaculties(data);
        } catch (error) {
            setMessage(error.response.data.message);
        }
    };

    const fetchDepartments = async (facultyId) => {
        try {
            const data = await adminService.getDepartments(adminId, facultyId);  setDepartments(data);
        } catch (error) {
            setMessage(error.response.data.message);
        }
    };

    const fetchLecturers = async (facultyId, departmentId) => {
        try {
            const data = await adminService.getLecturers(adminId, facultyId, departmentId);
            setLecturers(data);
        } catch (error) {
            setMessage(error.response.data.message);
        }
    };

    const fetchStudentGroups = async (facultyId, departmentId) => {
        try {
            const data = await adminService.getStudentGroups(adminId, facultyId, departmentId);
            setStudentGroups(data);} catch (error) {
            setMessage(error.response.data.message);
        }
    };

    return (
        <div>
            <h2>Admin Information</h2>
            {admin && <div>{admin.name}</div>}
            <button onClick={fetchFaculties}>Get Faculties</button>
            {faculties.map(faculty => (
                <div key={faculty.id}>
                    <h3>{faculty.name}</h3>
                    <button onClick={() => fetchDepartments(faculty.id)}>Get Departments</button>
                </div>
            ))}
            {departments.map(department => (
                <div key={department.id}>
                    <h4>{department.name}</h4>
                    <button onClick={() => fetchLecturers(department.facultyId, department.id)}>Get Lecturers</button>
                    <button onClick={() => fetchStudentGroups(department.facultyId, department.id)}>Get Student Groups</button>
                </div>
            ))}
            {lecturers.map(lecturer => (
                <div key={lecturer.id}>
                    <p>{lecturer.name}</p>
                </div>
            ))}
            {studentGroups.map(group => (
                <div key={group.id}>
                    <p>{group.name}</p>
                </div>
            ))}
            {message && <p>{message}</p>}
        </div>
    );
};

export default Admin;