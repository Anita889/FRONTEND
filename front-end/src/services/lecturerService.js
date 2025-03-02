import axios from 'axios';

const API_URL = 'http://localhost:8080/api/user/';

const lecturerService = {
    getLecturer: (userId, lecturerId) => {
        return axios.get(`${API_URL}${userId}/lecturers/${lecturerId}`).then((response) => response.data);
    },
    getSubjects: (userId, lecturerId) => {
        return axios.get(`${API_URL}${userId}/lecturers/${lecturerId}/subjects`).then((response) => response.data);
    },
    getLessonsOfSubject: (userId, lecturerId, subjectId) => {
        return axios.get(`${API_URL}${userId}/lecturers/${lecturerId}/subjects/${subjectId}`).then((response) => response.data);
    },
    getQuestion: (userId, lecturerId, questionId) => {
        return axios.get(`${API_URL}${userId}/lecturers/${lecturerId}/question/${questionId}`).then((response) => response.data);
    },
    getQuestions: (userId, lecturerId, lessonId) => {
        return axios.get(`${API_URL}${userId}/lecturers/${lecturerId}/lesson/${lessonId}`).then((response) => response.data);
    },
    addQuestions: (userId, lecturerId, lessonId, questions) => {
        return axios.post(`${API_URL}${userId}/lecturers/${lecturerId}/lesson/${lessonId}/questions/add`, questions).then((response) => response.data);
    },
    deleteQuestion: (userId, lecturerId, questionId) => {
        return axios.delete(`${API_URL}${userId}/lecturers/${lecturerId}/questions/${questionId}/remove`).then((response) => response);
    },
    updateQuestion: (userId, lecturerId, questionId, question) => {
        return axios.put(`${API_URL}${userId}/lecturers/${lecturerId}/questions/${questionId}/update`, question).then((response) => response);
    }
};

export default lecturerService;
