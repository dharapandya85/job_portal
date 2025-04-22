import React from 'react';
import {Link} from "react-router-dom";
import '../styles/RecruiterDashboard.css'
import Layout from './../components/Layout/Layout';
import {Outlet} from "react-router-dom";
//import RecruiterDashboard from './RecruiterDashboard';
const RecruiterDashboard = () => {
  return (
    <Layout>
    <div className="recruiter-dashboard">
        <h2>Recruiter Dashboard</h2>
        <Outlet/>
      
    </div>
    </Layout>
  );
};

export default RecruiterDashboard;
