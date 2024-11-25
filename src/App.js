import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBarComp from './components/NavBar';
import Home from './components/HomePage';
import Login from './components/Login';
import Signup from './components/SignUp';
import CoursePage from './components/CoursePage';
import AddCourse from './components/AddCourse';
import Enrollment from './components/Enrollement';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <NavBarComp />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/courses" element={<CoursePage />} />
        <Route path="/add-course" element={<AddCourse />} />
        <Route path="/enroll/:courseId" element={<Enrollment />} />
      </Routes>
    </Router>
  );
}

export default App;
