import React,{useState} from 'react';
import {Link,useNavigate} from "react-router-dom";
import InputForm from '../components/shared/InputForm';
import {useDispatch} from 'react-redux';
import {showLoading,hideLoading} from "../redux/features/alertSlice";

import axios from "axios";

const Register = () => {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  //hooks
  const dispatch=useDispatch();
  const navigate=useNavigate();
  // const [values,setValues]=useState({
  //   name:"",
  //   lastName:"",
  //   email:"",
  //   password:""
  // })
  // //handle inputs
  // const handleChange=(e)=>{
  // const value=e.target.value
  // setValues({
  //   ...values,
  //   [e.target.name]:value
  // });
  // };
  //form function
  const handleSubmit= async(e) => {
    e.preventDefault()
    try{
      if(!name||!lastName||!email ||!password){
        return alert('Please provide all Fields')
      }
      //console.log(name,email,password,lastName);
      dispatch(showLoading())
      const {data}=await axios.post('/api/v1/auth/register',{name,lastName,email,password})
      dispatch(hideLoading())
      if(data.success){
        alert('Register Successfully');
        navigate('/dashboard');
      }
    } catch(error){
      dispatch(hideLoading());
      alert('Invalid Form Details Please Try Again!');
      console.log(error);
    }
  }
  return (
    <>
     <div className="form-container">
     <form className="card p-2" onSubmit={handleSubmit}>
      <img 
      src="/assets/images/logo/logo.png" 
      alt="logo" 
      height={150} 
      width={400}
      />
      <InputForm 
      htmlFor="name" 
      labelText={"Name"}
      type={"text"} 
      value={name} 
      handleChange={(e)=>setName(e.target.value)}
      name="name"
      />
      <InputForm 
      htmlFor="lastName" 
      labelText={"Last Name"}
      type={"text"} 
      value={lastName} 
      handleChange={(e)=>setLastName(e.target.value)}
      name="lastName"
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
        {/* <div className="mb-1 ">
          <label htmlFor="name" className="form-label">
           Name
          </label>
          <input 
          type="text" 
          className="form-control"
          name="name"
          value={values.name}
          onChange={handleChange}
          />
          
        </div>
        <div className="mb-1 ">
          <label htmlFor="name" className="form-label">
           Last Name
          </label>
          <input 
          type="text" 
          className="form-control"
          name="lastName"
          value={values.lastName}
          onChange={handleChange}
          
          />
          
        </div>
        <div className="mb-1 ">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input 
          type="email" 
          className="form-control"
          name="email"
          value={values.email}
          onChange={handleChange}
         
          />
          
        </div>
        
        <div className="mb-1">
           <label htmlFor="password" className="form-label">
            Password
            </label>
           <input 
             type="password" 
             className="form-control" 
             name="password"
             value={values.password}
             onChange={handleChange}
             
           />
       </div> */} 
      
      <div className="d-flex justify-content-between">
        <p>
          Already Registered <Link to="/login">Login</Link>
        </p>
        <button type="submit" className="btn btn-primary">
        Register
       </button>
      </div>
       
      </form>
        </div>
       </>
  );
};

export default Register;
