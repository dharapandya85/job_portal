import React from 'react'
import {Navigate} from "react-router-dom";
const PublicRoute = ({children}) => {
    const token=localStorage.getItem('token');
    const user =JSON.parse(localStorage.getItem('user'));

    if(token && user?.role==='recruiter') {
        return <Navigate to="/recruiter/dashboard"/>;
    }else if(token && user?.role==='student'){
            return <Navigate to="/student/dashboard"/>;
        }else{
         return children;
    }
};


export default PublicRoute;
