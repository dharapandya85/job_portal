import React,{useEffect,useState} from 'react'
import axios from 'axios';
import {Link} from "react-router-dom";
import '../styles/Jobs.css';
const JobsList = () => {
    const [jobs,setJobs]=useState([]);
    const [loading,setLoading]=useState(true);
    const fetchJobs=async()=>{
        try{
            const response =await axios.get('/api/v1/job/get-job');
            
            setJobs(response.data.jobs);
            setLoading(false);
        }catch(error){
            setLoading(false);
            alert('Error fetching jobs');
        }
    };
    useEffect(()=>{
        fetchJobs();
    },[]);
    const handleDelete=async(id)=>{
        const confirmDelete= window.confirm('Are you sure you want to delete this job?');
        if(confirmDelete){
            try{
                await axios.delete(`/api/v1/job/delete-job/${id}`);
                fetchJobs();
            } catch(error){
                alert('Error detecting job');
            }
        }
    };
  return (
    <div>
      <h2>Your Jobs</h2>
      {loading ?(
        <p>Loading...</p>
      ):(
        <table className="jobs-list-table">
            <thead>
                <tr>
                    <th>Company</th>
                    <th>Positions</th>
                    <th>Status</th>
                    <th>Work Type</th>
                </tr>
            </thead>
            <tbody>
                {jobs.map((job)=>(
                    <tr key={job._id}>
                        <td>{job.company}</td>
                        <td>{job.position}</td>
                        <td>{job.status}</td>
                        <td>{job.workType}</td>
                        <td>
                            <Link to={`/jobs/edit/${job._id}`}>Edit</Link>
                            <button onClick={()=>handleDelete(job._id)}>Delete</button>
                        </td>
                    </tr>

                ))}
                </tbody>
                </table>
      )}
    </div>
  );
};

export default JobsList;
