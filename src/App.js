import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import UserCreate from './components/UserCreate';
import CourseCreate from './components/CourseCreate';
import AddStudentToCourse from './components/AddStudentToCourse';
import TeacherCourses from './components/TeacherCourses';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="" element={<Login />} />
        <Route path="/ana-sayfa" element={<Home />} />
        <Route path="/kullanici-ekle" element={<UserCreate />} />
        <Route path="/kurs-ekle" element={<CourseCreate/>} />
        <Route path="/kursa-ogrenci-ekle" element={<AddStudentToCourse/>} />
        <Route path="/kurslarim-ogretmen" element={<TeacherCourses/>} />
      </Routes>
    </Router>
  );
}

export default App;
