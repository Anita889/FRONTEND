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
import SubjectsStudent from "./studentcomponents/SubjectsStudent";
import LessonsPage from "./studentcomponents/LessonsPage";
import QuestionsPage from "./studentcomponents/QuestionPage";
import Admin from "./admincomponents/Admin";
import Faculties from "./admincomponents/Faculties";
import Departments from "./admincomponents/Departments";
import Lecturers from "./admincomponents/Lecturers";
import LecturersAdd from "./admincomponents/LecturersAdd";
import LecturersRemove from "./admincomponents/LecturersRemove";
import LecturersUpdate from "./admincomponents/LecturersUpdate";
import Student from "./studentcomponents/Student";


const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />

                <Route path="user/:userId/student/:studentId" element={<Student />} />
                <Route path="user/:userId/student/:studentId/subjects" element={<SubjectsStudent />} />
                <Route path="user/:userId/student/:studentId/subjects/:subjectId/lessons" element={<LessonsPage />} />
                <Route path="user/:userId/student/:studentId/subjects/:subjectId/lessons/:lessonId/questions" element={<QuestionsPage />} />

                <Route path="user/:userId/lecturers/:lecturerId" element={<Lecturer />} />
                <Route path="user/:userId/lecturers/:lecturerId/subjects" element={<SubjectsLecturer />} />
                <Route path="user/:userId/lecturers/:lecturerId/subjects/:subjectId" element={<LessonsLecturer />} />
                <Route path="user/:userId/lecturers/:lecturerId/subjects/:subjectId/lesson/:lessonId" element={<QuestionsLecturer />} />
                <Route path="user/:userId/lecturers/:lecturerId/subjects/:subjectId/lesson/:lessonId/questions/:questionId/remove" element={<QuestionDelete />} />
                <Route path="user/:userId/lecturers/:lecturerId/subjects/:subjectId/lesson/:lessonId/questions/:questionId/update" element={<QuestionUpdate />} />
                <Route path="user/:userId/lecturers/:lecturerId/subjects/:subjectId/lesson/:lessonId/questions/add" element={<QuestionAdd />} />

                <Route path="user/:userId/admins/:adminId" element={<Admin />} />
                <Route path="user/:userId/admins/:adminId/faculties" element={<Faculties />} />
                <Route path="user/:userId/admins/:adminId/faculties/:facultyId/departments" element={<Departments />} />
                <Route path="user/:userId/admins/:adminId/faculties/:facultyId/departments/:departmentId/lecturers" element={<Lecturers />} />
                <Route path="user/:userId/admins/:adminId/faculties/:facultyId/departments/:departmentId/lecturers/:lecturerId" element={<Lecturers />} />
                <Route path="user/:userId/admins/:adminId/faculties/:facultyId/departments/:departmentId/lecturers/add" element={<LecturersAdd />} />
                <Route path="user/:userId/admins/:adminId/faculties/:facultyId/departments/:departmentId/lecturers/:lecturerId/remove" element={<LecturersRemove />} />
                <Route path="user/:userId/admins/:adminId/faculties/:facultyId/departments/:departmentId/lecturers/:lecturerId/update" element={<LecturersUpdate />} />
            </Routes>
        </Router>
    );
};

export default App;
