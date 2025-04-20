import React,{useEffect} from 'react';
import {useDispatch,useSelector} from 'react-redux';
import {toast} from "react-toastify";
import {showLoading,hideLoading} from "../../redux/features/alertSlice";
import axios from "axios";
import {Navigate,useNavigate} from "react-router-dom";
import {setUser} from "../../redux/features/auth/authSlice";

const PrivateRoute = ({children}) => {
    const {user}=useSelector((state)=>state.auth);
    const dispatch=useDispatch();
    const navigate=useNavigate();

    const getUser=async()=>{
        try{
            dispatch(showLoading());
        const {data}=await axios.post("/api/v1/user/getUser",{
            // token:localStorage.getItem('token')
            },{
                headers:{
                    Authorization:`Bearer ${localStorage.getItem('token')}`,
                },
            }
        );
            dispatch(hideLoading());
            if(data.success){
                dispatch(setUser(data.data));
            }else{
                
                toast.error('Session expired. Please log in again');
                navigate("/login");
            }

        } catch(error){
            localStorage.clear();
            dispatch(hideLoading());
            console.log(error);

        }
    };
    useEffect(()=>{
        if(!user && localStorage.getItem("token")){
            getUser();
        }
        //console.log("Token:",localStorage.getItem("token"));
    },[user]);

    if (localStorage.getItem("token")){
        return children; 
        
    }else {
        
        return <Navigate to="/login" />;
    }
};
 

export default PrivateRoute;
