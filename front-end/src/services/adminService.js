import axios from 'axios';

const API_URL = 'http://localhost:8080/api/admins/';

const adminService = {
    getAdmin: (adminId) => {
        return axios.get(`${API_URL}${adminId}`).then((response) => response.data);
    },
    getFaculties: (adminId) => {
        return axios.get(`${API_URL}${adminId}/faculties`).then((response) => response.data);
    },
    getDepartments: (adminId, facultyId) => {
        return axios.get(`${API_URL}${adminId}/faculties/${facultyId}/departments`).then((response) => response.data);
    },
    getLecturers: (adminId, facultyId, departmentId) => {
        return axios.get(`${API_URL}${adminId}/faculties/${facultyId}/departments/${departmentId}/lecturers`).then((response) => response.data);
    },
    addLecturer: (adminId, facultyId, departmentId, lecturerDTO) => {
        return axios.post(`${API_URL}${adminId}/faculties/${facultyId}/departments/${departmentId}/lecturers`, lecturerDTO).then((response) => response.data);
    },
    updateLecturer: (adminId, facultyId, departmentId, lecturerId, lecturerDTO) => {
        return axios.put(`${API_URL}${adminId}/faculties/${facultyId}/departments/${departmentId}/lecturers/${lecturerId}`, lecturerDTO).then((response) => response.data);
    },
    deleteLecturer: (adminId, facultyId, departmentId, lecturerId) => {
        return axios.delete(`${API_URL}${adminId}/faculties/${facultyId}/departments/${departmentId}/lecturers/${lecturerId}`).then((response) => response.data);
    },
    getStudentGroups: (adminId, facultyId, departmentId) => {
        return axios.get(`${API_URL}${adminId}/faculties/${facultyId}/departments/${departmentId}/studentGroups`).then((response) => response.data);
    },
    addStudentGroup: (adminId, facultyId, departmentId, studentGroupDTO) => {
        return axios.post(`${API_URL}${adminId}/faculties/${facultyId}/departments/${departmentId}/studentGroups`, studentGroupDTO).then((response) => response.data);
    },
    deleteStudentGroup: (adminId, facultyId, departmentId, studentGroupId) => {
        return axios.delete(`${API_URL}${adminId}/faculties/${facultyId}/departments/${departmentId}/studentGroups/${studentGroupId}`).then((response) => response.data);
    },
    calculateStudentGroup: (adminId, facultyId, departmentId, studentGroupId) => {
        return axios.put(`${API_URL}${adminId}/faculties/${facultyId}/departments/${departmentId}/studentGroups/${studentGroupId}/calculate`).then((response) => response.data);
    },
    calculateDepartmentLecturers: (adminId, facultyId, departmentId) => {
        return axios.put(`${API_URL}${adminId}/faculties/${facultyId}/departments/${departmentId}/calculate`).then((response) => response.data);
    }
};

export default adminService;
