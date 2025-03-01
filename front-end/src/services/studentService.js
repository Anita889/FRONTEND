import axios from 'axios';

const API_URL = 'http://localhost:8080/api/students/';  // Change the URL to match your backend endpoint

const studentService = {
    getStudent: (studentId) => {
        return axios.get(`${API_URL}${studentId}`).then((response) => response.data.user);
    },
    getSubjects: (studentId) => {
        return axios.get(`${API_URL}${studentId}/subjects`).then((response) => response.data);
    },
    getLessonsOfSubject: (studentId, subjectId) => {
        return axios.get(`${API_URL}${studentId}/subjects/${subjectId}`).then((response) => response.data);
    },
    getQuestionsAndVariants: (studentId, lessonId) => {
        return axios.get(`${API_URL}${studentId}/lesson/${lessonId}`).then((response) => response.data);
    },
    submitAnswers: (studentId, lessonId, answers) => {
        return axios.post(`${API_URL}${studentId}/lesson/${lessonId}`, answers).then((response) => response.data);
    }
};

export default studentService;
