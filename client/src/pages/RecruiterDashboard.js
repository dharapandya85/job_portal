import React from 'react';
import {Link} from "react-router-dom";

const RecruiterDashboard = () => {
  return (
    <div>
        <h2>Recruiter Dashboard</h2>
        <Link to="/jobs/create">Create New Job</Link>
        <br/>
        <Link to="/jobs">View Jobs</Link>
      
    </div>
  );
};

export default RecruiterDashboard;
