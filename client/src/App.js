import logo from './logo.svg';
import {Routes,Route} from 'react-router-dom';
import './App.css';
import  React from 'react';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import NotFound from './pages/NotFound';
import {ToastContainer,toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import PrivateRoute from './components/routes/PrivateRoute';
import PublicRoute from './components/routes/PublicRoute';
import LatestJobs from './pages/LatestJobs';
import UpdateProfile from './pages/UpdateProfile';
import RecruiterDashboard from './pages/RecruiterDashboard';
import StudentDashboard from './pages/StudentDashboard';
function App() {
  return (
    <>
    {" "}
       <ToastContainer/>
      <Routes>
       
        <Route path="/" element={
          <PublicRoute>
            <HomePage />
          </PublicRoute>
            } />
        <Route path="/login" element={
          <PublicRoute>
            <Login/>
          </PublicRoute>} />
        <Route path="/register" element={
          <PublicRoute>
            <Register/>
          </PublicRoute>
          } />
        <Route path="/student/dashboard" element={<PrivateRoute><StudentDashboard/></PrivateRoute>} />
        <Route path="/recruiter/dashboard" element={<PrivateRoute><RecruiterDashboard/></PrivateRoute>} />
        <Route path="/latest-jobs" element={<PrivateRoute><LatestJobs/></PrivateRoute>} />
        <Route path="/update-profile" element={<PrivateRoute><UpdateProfile/></PrivateRoute>} />
        <Route path="*" element={<NotFound/>} />
      </Routes>
    </>
  );
}

export default App;
