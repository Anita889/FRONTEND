import axios from 'axios';

const API_URL = 'http://localhost:8080/api/user/';  // Change the URL to match your backend endpoint

const studentService = {
    getStudent: (userId, studentId) => {
        return axios.get(`${API_URL}${userId}/student/${studentId}`).then((response) => response.data);
    },
    getSubjects: (userId, studentId) => {
        return axios.get(`${API_URL}${userId}/student/${studentId}/subjects`).then((response) => response.data);
    },
    getLessonsOfSubject: (userId, studentId, subjectId) => {
        return axios.get(`${API_URL}${userId}/student/${studentId}/subjects/${subjectId}`).then((response) => response.data);
    },
    getQuestionsAndVariants: (userId, studentId, lessonId) => {
        return axios.get(`${API_URL}${userId}/student/${studentId}/lesson/${lessonId}`).then((response) => response.data);
    },
    submitAnswers: (userId, studentId, lessonId, answers) => {
        return axios.post(`${API_URL}${userId}/student/${studentId}/lesson/${lessonId}`, answers).then((response) => response.data);
    },
    updateStudent(userId, studentId, student) {
        return axios.put(`${API_URL}${userId}/student/${studentId}/update`, student).then((response) => response.data);
    }
};

export default studentService;
