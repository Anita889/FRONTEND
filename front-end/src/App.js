import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './registercomponents/Login';
import SignUp from "./registercomponents/Signup";
import Lecturer from "./lecturercomponents/Lecturer";
import SubjectsLecturer from "./lecturercomponents/SubjectsLecturer";
import LessonsLecturer from "./lecturercomponents/LessonsLecturer";
import QuestionsLecturer from "./lecturercomponents/QuestionsLecturer";
import QuestionDelete from "./lecturercomponents/QuestionDelete";
import QuestionUpdate from "./lecturercomponents/QuestionUpdate";
import QuestionAdd from "./lecturercomponents/QuestionAdd";
import Student from "./models/Student";
import SubjectsStudent from "./studentcomponents/SubjectsStudent";
import LessonsPage from "./studentcomponents/LessonsPage";
import QuestionsPage from "./studentcomponents/QuestionPage";
import Admin from "./admincomponents/Admin";


const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/students/:studentId" element={<Student />} />
                <Route path="/student/:studentId/subjects" element={<SubjectsStudent />} />
                <Route path="/student/:studentId/subject/:subjectId/lessons" element={<LessonsPage />} />
                <Route path="/student/:studentId/lesson/:lessonId/questions" element={<QuestionsPage />} />
                <Route path="/lecturers/:lecturerId" element={<Lecturer />} />
                <Route path="/lecturers/:lecturerId/subjects" element={<SubjectsLecturer />} />
                <Route path="/lecturers/:lecturerId/subjects/:subjectId" element={<LessonsLecturer />} />
                <Route path="/lecturers/:lecturerId/lesson/:lessonId" element={<QuestionsLecturer />} />
                <Route path="/lecturers/:lecturerId/questions/:questionId/remove" element={<QuestionDelete />} />
                <Route path="/lecturers/:lecturerId/questions/:questionId/update" element={<QuestionUpdate />} />
                <Route path="/lecturers/:lecturerId/lesson/:lessonId/questions/add" element={<QuestionAdd />} />
                <Route path="/admins/:adminId" element={<Admin />} />
            </Routes>
        </Router>
    );
};

export default App;
