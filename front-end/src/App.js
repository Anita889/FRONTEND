import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import StudentDashboard from './pages/StudentDashboard';
import LecturerDashboard from './pages/LecturerDashboard';
import AdminDashboard from './pages/AdminDashboard';
import SimpleUserDashboard from './pages/SimpleUserDashboard';
import ProtectedRoute from './components/ProtectedRoute'
import Lessons from "./pages/Lessons";

const App = () => {
  return (
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/student" element={<ProtectedRoute role="student"><StudentDashboard /></ProtectedRoute>} />
        <Route path="/lecturer" element={<ProtectedRoute role="lecturer"><LecturerDashboard /></ProtectedRoute>} />
        <Route path="/admin" element={<ProtectedRoute role="admin"><AdminDashboard /></ProtectedRoute>} />
        <Route path="/simple-user" element={<ProtectedRoute role="simple_user"><SimpleUserDashboard /></ProtectedRoute>} />
          <Route path="/lessons" element={<ProtectedRoute role="simple_user"><Lessons /></ProtectedRoute>} />
      </Routes>
  );
};

export default App;
