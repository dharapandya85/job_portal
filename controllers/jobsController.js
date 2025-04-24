import jobsModel from "../models/jobsModel.js";
import mongoose from "mongoose";
import moment from "moment";

// CREATE JOB
 export const createJobController = async(req, res,next)=>{
    try{

    
    const {company,position}= req.body
    if(!company||!position){
       return next('Please provide All Fields')
    }
    req.body.createdBy= req.user.userId
    const job = await jobsModel.create(req.body);
    res.status(201).json({job});
} catch(error){
    console.log("Create Job Error:",error);
    next(error);
}
 };
//GET JOB
 export const getAllJobsController = async (req,res,next)=>{
    const {status,workType,search,sort}=req.query
    //conditions for searching filters
    const queryObject={
        createdBy:req.user.userId,
    };
    // if(!showAll||(req.user && req.user.userId)){
    //     queryObject.createdBy=req.user.userId;
    // }
    //logic filters
    if(status && status!=='all'){
        queryObject.status=status;
    }
    if(workType && workType!=='all'){
        queryObject.workType=workType;
    }
    if(search){
        queryObject.position={$regex:search,$options:'i'};
    }
    let queryResult= jobsModel.find(queryObject)
    //sorting
    if(sort==='latest'){
       queryResult=queryResult.sort('-createdAt')
    }
    if(sort==='oldest'){
        queryResult=queryResult.sort('createdAt')
    }
    if(sort==='a-z'){
        queryResult=queryResult.sort('position')
    }
    if(sort==='z-a'){
        queryResult=queryResult.sort('-position')
    }
    //pagination
    const page= Number(req.query.page)|| 1
    const limit= Number(req.query.limit)||10
    const skip=(page-1)*limit
    queryResult=queryResult.skip(skip).limit(limit)
    //jobs count
    const totalJobs= await jobsModel.countDocuments(queryObject)
    const numOfPage= Math.ceil(totalJobs/limit)

    const jobs= await queryResult;

    //const jobs= await jobsModel.find({createdBy:req.user.userId})
    res.status(200).json({
        totalJobs,
        jobs,
        numOfPage
    });
 };
 //GET SINGLE JOBS
 export const getSingleJobController = async (req,res,next)=>{
    try{

        req.body.createdBy= req.user.userId
        const job = await jobsModel.findOne({
            _id:req.params.id,
            createdBy:req.user.userId
        });
        if(!job){
            return res.status(404).json({message:"Job not found"});
        }
        res.status(200).json({job});
    } catch(error){
        
        next(error);
    }
 };
//UPDATE JOB
export const updateJobController = async (req,res,next)=>{
    const {id}= req.params
    const {company,position}= req.body
    //validation
    if(!company||!position){
       return next('Please provide All Fields')
    }
    //find job
    const job= await jobsModel.findOne({_id:id})
    //validation
    if(!job){
        next(`No Jobs found with this id: ${id}`)
    }
    if(req.user.userId!==job.createdBy.toString()){
        next('You are not authorized to update this job')
        return;
    }
    const updateJob = await jobsModel.findOneAndUpdate({_id:id},req.body,{
        new:true,
        runValidators:true
    })
    //res
    res.status(200).json({updateJob});
    
};
//LATEST JOBS
export const latestJobsController = async (req, res, next) => {
    try {
      const jobs = await jobsModel.find({})
        .sort('-createdAt')
        .limit(10); // or more, depending on how many you want to show
      res.status(200).json({ jobs });
    } catch (error) {
      console.error('Latest Jobs Error:', error);
      res.status(500).json({ message: 'Error fetching latest jobs' });
    }
  };
// DELETE JOBS
export const deleteJobController=async(req,res,next)=>{
    const {id}=req.params
    //find jobs
    const job= await jobsModel.findOne({_id:id})
    //validation
    if(!job){
        next(`No job found with this id ${id}`)
    }
    if(!req.user.userId===job.createdBy.toString()){
        next(`You are not authorized to delete this job`)
        return
    }
    await job.deleteOne()
    res.status(200).json({message:`Success, Job deleted! `})
};

//JOBS STATS AND FILTER
export const jobStatsController=async(req,res)=>{
    const stats= await jobsModel.aggregate([
        //search by user jobs
        {
            $match:{
                createdBy:new mongoose.Types.ObjectId(req.user.userId)
            },  
        },
        {
            $group:{
                _id:'$status',
                count:{$sum:1},
            },
        }
    ]);
    //default stats
    const defaultStats={
        pending:stats.pending||0,
        reject :stats.reject||0,
        interview:stats.interview||0
    };

    //monthly yearly stats
    let monthlyApplication= await jobsModel.aggregate([
        {
            $match:{
                createdBy:new mongoose.Types.ObjectId(req.user.userId)
            }
        },
        {
            $group:{
                _id:{
                    year:{$year:'$createdAt'},
                    month:{$month:'$createdAt'}
                },
                count:{
                    $sum:1
                }
            },
        },
    ]);
    monthlyApplication=monthlyApplication.map(item=>{
        const {
            _id:{year,month},
            count,
        } = item;
        const date=moment().set({
            year:year,
            month:month-1,
            date:1,
        }).format("MMM YYYY");
        return {date,count};
    })
    .reverse();
    res.status(200).json({totalJob:stats.length,stats,defaultStats,monthlyApplication});
};