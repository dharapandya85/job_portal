import React,{useState,useEffect} from 'react'
import axios from "axios";
import {useParams,useNavigate} from "react-router-dom";
import '../styles/Jobs.css';
import { API_BASE_URL } from "../api";

const EditJob = () => {
    const [company,setCompany]=useState("");
    const [position,setPosition]=useState("");
    const [status,setStatus]=useState("");
    const [workType,setWorkType]=useState("");
    const [loading,setLoading]=useState(false);
    const {id} = useParams();
    const navigate=useNavigate("");
    useEffect(()=>{
        const fetchJob=async()=>{
            try{
                const response=await axios.get(`${API_BASE_URL}/api/v1/job/get-job/${id}`,{
                    headers: {
                        Authorization:`Bearer ${localStorage.getItem('token')}`
                    }
                });
                const {company,position,status,workType}=response.data.job;
                setCompany(company);
                setPosition(position);
                setStatus(status);
                setWorkType(workType);
                //setJob(res.data.job);
            } catch(error){
                alert('Error fetching job');
            }

        };
        fetchJob();
    },[id]);
    const handleSubmit=async(e)=>{
        e.preventDefault();
        setLoading(true);
        try{
            const response=await axios.patch(`/api/v1/job/update-job/${id}`,{
                company,
                position,
                status,
                workType
            },
            {
                headers: {
                    Authorization:`Bearer ${localStorage.getItem('token')}`
                }
            }
        );
            setLoading(false);
            navigate('/jobs');
        }catch(error){
            setLoading(false);
            alert('Error creating job');
        }
    };
  return (
    <div className="job-form-container">
      <h2>Edit Job</h2>
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
        <option value="" disabled>Select status</option>
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
        <option value="" disabled>Select Work Type</option>
        <option value="full-time">Full-Time</option>
        <option value="part-time">Part-Time</option>
        <option value="contract">Contract</option>
        </select>
        </div>
        <button type='submit' disabled={loading}>{loading?'Updating...':'Update Job'}</button>
        </form>
        </div>
  );
};

export default EditJob
