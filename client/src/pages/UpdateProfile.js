import React,{useState} from 'react';
import {useSelector} from "react-redux";

const UpdateProfile = () => {
    const {user}=useSelector((state)=>state.auth);
    const [formData,setFormData]=useState({
        name:user?.name ||"",
        email:user?.email||"",
        lastName:user?.lastName||"",
    });
    const handleChange=(e)=>{
        setFormData({...formData,[e.target.name]:e.target.value});
    };
    const handleSubmit=(e)=>{
        e.preventDefault();
        alert('Profile Updated!');
    };
  return (
    <div>
        <h1> Update Your Profile</h1>
        <form onSubmit={handleSubmit}>
            <input name="name" value={formData.name} onChange={handleChange} placeholderName="Name"/><br/>
            <input name="email" value={formData.email} onChange={handleChange} placeholderName="Email"/><br/>
            <input name="lastName" value={formData.lastName} onChange={handleChange} placeholderName="Last Name"/><br/>
            <button name="submit">Update</button>
            </form>
      
    </div>
  );
}

export default UpdateProfile;
