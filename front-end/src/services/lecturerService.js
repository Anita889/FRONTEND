import axios from 'axios';

const API_URL = 'http://localhost:8080/api/lecturers/';

const lecturerService = {
    getLecturer: (lecturerId) => {
        return axios.get(`${API_URL}${lecturerId}`).then((response) => response.data);
    },
    getSubjects: (lecturerId) => {
        return axios.get(`${API_URL}${lecturerId}/subjects`).then((response) => response.data);
    },
    getLessonsOfSubject: (lecturerId, subjectId) => {
        return axios.get(`${API_URL}${lecturerId}/subjects/${subjectId}`).then((response) => response.data);
    },
    getQuestion: (lecturerId, questionId) => {
        return axios.get(`${API_URL}${lecturerId}/question/${questionId}`).then((response) => response.data);
    },
    getQuestions: (lecturerId, lessonId) => {
        return axios.get(`${API_URL}${lecturerId}/lesson/${lessonId}`).then((response) => response.data);
    },
    addQuestions: (lecturerId, lessonId, questions) => {
        return axios.post(`${API_URL}${lecturerId}/lesson/${lessonId}/questions/add`, questions).then((response) => response.data);
    },
    deleteQuestion: (lecturerId, questionId) => {
        return axios.delete(`${API_URL}${lecturerId}/questions/${questionId}/remove`).then((response) => response);
    },
    updateQuestion: (lecturerId, questionId, question) => {
        return axios.put(`${API_URL}${lecturerId}/questions/${questionId}/update`, question).then((response) => response);
    }
};

export default lecturerService;
