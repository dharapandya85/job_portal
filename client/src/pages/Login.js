import React, { useState } from 'react';
import InputForm from '../components/shared/InputForm';
import { Link } from 'react-router-dom';

  
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit= (e) => {
    e.preventDefault()
    try{
      console.log(email,password);
    } catch(error){
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
    </>
  )
}

export default Login;
