import React, { useState } from 'react';
import InputForm from '../components/shared/InputForm';
import { Link,useNavigate } from 'react-router-dom';
import {useDispatch,useSelector} from "react-redux";
import {showLoading,hideLoading} from "../redux/features/alertSlice";
import axios from "axios";
import {toast} from "react-toastify";

import Spinner from './../components/shared/Spinner';
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //hooks
  const navigate= useNavigate()
  const dispatch=useDispatch()
  //redux state
  const {loading} =useSelector(state=>state.alerts)
  const handleSubmit= async(e) => {
    e.preventDefault()
    try{
      //console.log(email,password);
      dispatch(showLoading())
      const {data}=await axios.post('/api/v1/auth/login',{email,password})
      if(data.success){
        dispatch(hideLoading())
        localStorage.setItem('token',data.token)
        toast.success('Login Successfully')
        navigate('/dashboard')
      }
    } catch(error){
      dispatch(hideLoading())
      toast.error('Invalid Credentials please try again!');
      console.log(error);
    }
  }
  return (
    <>
    {loading?(<Spinner/>):(
      <div className="form-container">
      <form className="card p-2" onSubmit={handleSubmit}>
       <img 
       src="/assets/images/logo/logo.png" 
       alt="logo" 
       height={150} 
       width={400}
       />
      
       <InputForm 
       htmlFor="email" 
       labelText={"Email"}
       type={"email"} 
       value={email} 
       handleChange={(e)=>setEmail(e.target.value)}
       name="email"
       />
       <InputForm htmlFor="password" 
       labelText={"Password"}
       type={"password"} 
       value={password} 
       handleChange={(e)=>setPassword(e.target.value)}
       name="password"
       />
       <div className="d-flex justify-content-between">
         <p>
           Not a user <Link to="/register">Register Here</Link>
         </p>
         <button type="submit" className="btn btn-primary">
        Login
        </button>
       </div>
        
       </form>
         </div>
    )}
      
    </>
  )
}

export default Login;
