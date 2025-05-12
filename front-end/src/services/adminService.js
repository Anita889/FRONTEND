import axios from 'axios';

const API_URL = `http://localhost:8080/api/user/`;

const adminService = {
    getAdmin: (userId, adminId) => {
        return axios.get(`${API_URL}${userId}/admins/${adminId}`).then((response) => response.data);
    },
    getFaculties: (userId, adminId) => {
        return axios.get(`${API_URL}${userId}/admins/${adminId}/faculties`).then((response) => response.data);
    },
    getDepartments: (userId, adminId, facultyId) => {
        return axios.get(`${API_URL}${userId}/admins/${adminId}/faculties/${facultyId}/departments`).then((response) => response.data);
    },
    getLecturers: (userId, adminId, facultyId, departmentId) => {
        return axios.get(`${API_URL}${userId}/admins/${adminId}/faculties/${facultyId}/departments/${departmentId}/lecturers`).then((response) => response.data);
    },
    getLecturer(userId, adminId, facultyId, departmentId, lecturerId) {
        return axios.get(`${API_URL}${userId}/admins/${adminId}/faculties/${facultyId}/departments/${departmentId}/lecturers/${lecturerId}`).then((response) => response.data);
    },
    addLecturer: (userId, adminId, facultyId, departmentId, lecturerDTO) => {
        return axios.post(`${API_URL}${userId}/admins/${adminId}/faculties/${facultyId}/departments/${departmentId}/lecturers/add`, lecturerDTO).then((response) => response.data);
    },
    updateLecturer: (userId, adminId, facultyId, departmentId, lecturerId, lecturerDTO) => {
        return axios.put(`${API_URL}${userId}/admins/${adminId}/faculties/${facultyId}/departments/${departmentId}/lecturers/${lecturerId}/update`, lecturerDTO).then((response) => response.data);
    },
    deleteLecturer: (userId, adminId, facultyId, departmentId, lecturerId) => {
        return axios.delete(`${API_URL}${userId}/admins/${adminId}/faculties/${facultyId}/departments/${departmentId}/lecturers/${lecturerId}/remove`).then((response) => response);
    },
    getStudentGroups: (userId, adminId, facultyId, departmentId) => {
        return axios.get(`${API_URL}${userId}/admins/${adminId}/faculties/${facultyId}/departments/${departmentId}/studentGroups`).then((response) => response.data);
    },
    addStudentGroup: (userId, adminId, facultyId, departmentId, studentGroupDTO) => {
        return axios.post(`${API_URL}${userId}/admins/${adminId}/faculties/${facultyId}/departments/${departmentId}/studentGroups`, studentGroupDTO).then((response) => response.data);
    },
    deleteStudentGroup: (userId, adminId, facultyId, departmentId, studentGroupId) => {
        return axios.delete(`${API_URL}${userId}/admins/${adminId}/faculties/${facultyId}/departments/${departmentId}/studentGroups/${studentGroupId}/remove`).then((response) => response.data);
    },
    calculateStudentGroup: (userId, adminId, facultyId, departmentId, studentGroupId) => {
        return axios.put(`${API_URL}${userId}/admins/${adminId}/faculties/${facultyId}/departments/${departmentId}/studentGroups/${studentGroupId}/calculate`).then((response) => response.data);
    },
    calculateDepartment: (userId, adminId, facultyId, departmentId) => {
        return axios.put(`${API_URL}${userId}/admins/${adminId}/faculties/${facultyId}/departments/${departmentId}/studentGroups/calculate`).then((response) => response.data);
    },
    getStudents(userId, adminId, facultyId, departmentId, studentGroupId) {
        return axios.get(`${API_URL}${userId}/admins/${adminId}/faculties/${facultyId}/departments/${departmentId}/studentGroups/${studentGroupId}/getStudents`).then((response) => response.data);
    },
    getSpecialities(userId, adminId,  departmentId) {
        return axios.get(`${API_URL}${userId}/admins/${adminId}/departments/${departmentId}/specialities`).then((response) => response.data);
    },
    getStudentGroup(userId, adminId, facultyId, departmentId, studentGroupId) {
        return axios.get(`${API_URL}${userId}/admins/${adminId}/faculties/${facultyId}/departments/${departmentId}/studentGroups/${studentGroupId}`).then((response) => response.data);
    },
    updateStudentGroup(userId, adminId, facultyId, departmentId, studentGroupId, studentGroup) {
        return axios.put(`${API_URL}${userId}/admins/${adminId}/faculties/${facultyId}/departments/${departmentId}/studentGroups/${studentGroupId}/update`, studentGroup).then((response) => response.data);
    },
    getStudent(userId, adminId, facultyId, departmentId, studentGroupId, studentId) {
        return axios.get(`${API_URL}${userId}/admins/${adminId}/faculties/${facultyId}/departments/${departmentId}/studentGroups/${studentGroupId}/getStudents/${studentId}`).then((response) => response.data);
    },
    updateStudent(userId, adminId, facultyId, departmentId, studentGroupId, student) {
        return axios.put(`${API_URL}${userId}/admins/${adminId}/faculties/${facultyId}/departments/${departmentId}/studentGroups/${studentGroupId}/getStudents/${student.id}/update`, student).then((response) => response.data);
    },
    removeStudent(userId, adminId, facultyId, departmentId, studentGroupId, studentId) {
        return axios.delete(`${API_URL}${userId}/admins/${adminId}/faculties/${facultyId}/departments/${departmentId}/studentGroups/${studentGroupId}/getStudents/${studentId}/remove`).then((response) => response.data);
    },
    addStudent(userId, adminId, facultyId, departmentId, studentGroupId, student) {
        return axios.post(`${API_URL}${userId}/admins/${adminId}/faculties/${facultyId}/departments/${departmentId}/studentGroups/${studentGroupId}/getStudents/add`, student).then((response) => response.data);
    },
    getSubjects(userId, adminId, facultyId, departmentId) {
        return axios.get(`${API_URL}${userId}/admins/${adminId}/faculties/${facultyId}/departments/${departmentId}/subjects`).then((response) => response.data);
    },
    addLesson(userId, adminId, facultyId, departmentId, lesson) {
        return axios.post(`${API_URL}${userId}/admins/${adminId}/faculties/${facultyId}/departments/${departmentId}/lecturers/addLesson`, lesson).then((response) => response.data);
    },
     analyzeStudentGroups (userId, adminId, facultyId, departmentId)  {
        return axios.get(`${API_URL}${userId}/admins/${adminId}/faculties/${facultyId}/departments/${departmentId}/studentGroups/analyze`).then(res => res.data);
    }
};

export default adminService;
