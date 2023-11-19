import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import UserCreate from './components/UserCreate';
import CourseCreate from './components/CourseCreate';
import AddStudentToCourse from './components/AddStudentToCourse';
import TeacherCourses from './components/TeacherCourses';
import StudentCourses from './components/StudentCourses';


const checkAuth = () => {
  const token = localStorage.getItem("Token");
  let isAuthenticated = (token !== undefined && token !== null) ? true : false;
  return isAuthenticated;
};

const PrivateRoute = ({ element: Element, path, ...rest }) => {
  let isAuthenticated = checkAuth();
  const roleList = localStorage.getItem("RoleList") || [];
  console.log(roleList);
  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }
  if (!roleList.includes(path)) {
    return <Navigate to="/Error" />;
  }
  console.log(isAuthenticated);

  return <Element {...rest} />;
};

function App() {
  const isAuthenticated = checkAuth();
  return (
    <Router>

      <div>
        <Routes>
        <Route
          path="/"
          element={isAuthenticated ? <Navigate to="/ana-sayfa" replace /> : <Login />}
        />
          <Route
            path="/ana-sayfa"
            element={<PrivateRoute element={Home} path="/ana-sayfa" />}
          />
          <Route
            path="/kullanici-ekle"
            element={<PrivateRoute element={UserCreate} path="/kullanici-ekle" />}
          />
          <Route
            path="/kurs-ekle"
            element={<PrivateRoute element={CourseCreate} path="/kurs-ekle" />}
          />
          <Route
            path="/kursa-ogrenci-ekle"
            element={<PrivateRoute element={AddStudentToCourse} path="/kursa-ogrenci-ekle" />}
          />
          <Route
            path="/kurslarim-ogretmen"
            element={<PrivateRoute element={TeacherCourses} path="/kurslarim-ogretmen" />}
          />
          <Route
            path="/kurslarim-ogrenci"
            element={<PrivateRoute element={StudentCourses} path="/kurslarim-ogrenci" />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
