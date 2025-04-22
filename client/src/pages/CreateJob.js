import React,{useState} from 'react';
import axios from 'axios';
import {useNavigate} from "react-router-dom";
import InputForm from './../components/shared/InputForm';

const CreateJob = () => {
    const [company,setCompany]=useState("");
    const [position,setPosition]=useState("");
    const [status,setStatus]=useState("");
    const [workType,setWorkType]=useState("");
    
    

    const [loading,setLoading]=useState("");
    const navigate=useNavigate("");
    const handleSubmit=async(e)=>{
        e.preventDefault();
        setLoading(true);
        try{
            const response=await axios.post('/api/create-job',{
                company,
                position,
                status,
                workType
            });
            setLoading(false);
            navigate('/jobs');
        }catch(error){
            setLoading(false);
            alert('Error creating job');
        }
    };
  return (
    <div>
      <h2>Create Job</h2>
      <form onSubmit={handleSubmit}>
        <div>
            <label>Company:</label>
            <input 
            type="text"
            value={company}
            onChange={(e)=>setCompany(e.target.value)}
            required
        />

    </div>
    <div>
        <label>Position:</label>
        <input type="text"
        value={position}
        onChange={(e)=>setPosition(e.target.value)}
        required
        />
        </div>
        <div>
        <label>Status:</label>
        <select 
        value={status}
        onChange={(e)=>setStatus(e.target.value)}
        >
        <option value="pending">Pending</option>
        <option value="interview">Interview</option>
        <option value="reject">Reject</option>
        </select>
        </div>
        <div>
        <label>Work Type:</label>
        <select 
        value={workType}
        onChange={(e)=>setWorkType(e.target.value)}
        >
        <option value="full-time">Full-Time</option>
        <option value="part-time">Part-Time</option>
        <option value="contract">Contract</option>
        </select>
        </div>
        <button type='submit' disable={loading}>Create Job</button>
        </form>
        </div>
  );
};

export default CreateJob;
