import React,{useEffect,useState} from 'react';
import {useDispatch,useSelector} from 'react-redux';
import {toast} from "react-toastify";
import {showLoading,hideLoading} from "../../redux/features/alertSlice";
import axios from "axios";
import {Navigate,useNavigate} from "react-router-dom";
import {setUser} from "../../redux/features/auth/authSlice";
import {API_BASE_URL} from "../../api";

const PrivateRoute = ({children}) => {
    const {user}=useSelector((state)=>state.auth);
    const dispatch=useDispatch();
    const [authChecked,setAuthChecked]=useState(false);
    const navigate=useNavigate();

    const getUser=async()=>{
        try{
            dispatch(showLoading());
        const {data}=await axios.post(
            `${API_BASE_URL}/api/v1/user/getUser`,{
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
                localStorage.clear();
                 
                 navigate("/login");
            }

        } catch(error){
            
            dispatch(hideLoading());
            // toast.error(error.response?.data?.message||'Invalid Credentials');
            // console.log("Login error:",error.response||error);
            localStorage.clear();
        }
            //console.log(error);

        // }
        finally{
            setAuthChecked(true);
        }
    };
    useEffect(()=>{
        if(!user && localStorage.getItem("token")){
            getUser();
         }
        
    },[user]);
    if(!authChecked) return null;
    // if (localStorage.getItem("token")){
    //     return children; 
        
    // }else {
        
    //     return <Navigate to="/login" />;
    // }
    return localStorage.getItem('token')?children:<Navigate to="/login" />;

};
 

export default PrivateRoute;
