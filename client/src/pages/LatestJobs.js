import React,{useEffect,useState} from 'react';
import axios from "axios";
import {toast} from "react-toastify";
import Layout from './../components/Layout/Layout';

import '../styles/Layout.css';
//import InputForm from './../components/shared/InputForm';

const LatestJobs = () => {
  const[jobs,setJobs]= useState([]);
  //const[search,setSearch]=useState("");
  const fetchJobs=async()=>{
    try{
      const res=await axios.get("/api/v1/job/get-job",{
        headers:{
          Authorization:`Bearer ${localStorage.getItem('token')}`
        }
      });
      if(res.data?.jobs){
        setJobs(res.data.jobs);
      }
    } catch(error){
      toast.error('Failed to fetch jobs');
    }
  };
  useEffect(()=>{
    fetchJobs();
  },[]);
  //simple search filter
  // const filteredJobs=jobs.filter((job)=>
  // job.position.toLowerCase().includes(search.toLowerCase())||
  // job.company.toLowerCase().includes(search.toLowerCase())

  return (
    <Layout>
    <div className="container mt-3">
      <h1 className="mb-4 text-center"> Latest Job Listings</h1>
      {/* <div className="form-container mb-4">
        <form className="card p-3">
        <InputForm 
       htmlFor="search" 
       labelText="Search Job"
       type="text" 
       value={search} 
       handleChange={(e)=>setSearch(e.target.value)}
       name="search"
       />
       </form>
       </div> */}
        <div className="job-listings">
          {jobs.length>0?(
        jobs.map((job,index)=>(
          <div className="card mb-3 job-card" key={index}>
            <div className="card-body">
            <h5 className="card-title job-title">
            {job.position} 

            </h5>
              
              <h6 className="card-subtitle mb-2 text-muted job-company">
                {job.company}
                </h6>
                <div className="job-detail">
                 <span> <strong>Location:</strong>{job.workLocation}</span>
                 <span>  <strong>Type:</strong>{job.workType}</span>
                 <span> <strong>Status:</strong>{job.status}</span>
                 <span> <strong>Posted:</strong>{new Date(job.createdAt).toLocaleDateString()}</span>
                </div>
           
            </div>
            </div>
            
        ))
      ):(
        <p className="text-center">No jobs found.</p>
      )}
      </div>
    </div>
    </Layout>
  );
};

export default LatestJobs;
