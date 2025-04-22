import express from 'express'
import userAuth from '../middlewares/authMiddleware.js';
import { createJobController,deleteJobController,getAllJobsController, jobStatsController, updateJobController } from '../controllers/jobsController.js';

const router= express.Router()

//routes
// CREATE JOB||POST
router.post('/create-job',userAuth,createJobController)


// GET JOBS||GET
router.get('/get-job',userAuth,getAllJobsController);

//UPDATE JOBS || PATCH
router.patch('/update-job/:id',userAuth,updateJobController)

//DELETE JOBS || DELETE
router.delete('/delete-job/:id',userAuth,deleteJobController)

//JOB STATS FILTER || GET
router.get('/job-stats',userAuth,jobStatsController)

router.get('get-job/:id',userAuth,async(req,res)=>{
    const job= await jobsModel.findById(req.params.id);
    if(!job) return res.status(404).json({message:"Not Found"});
    res.status(200).json({job});
});
export default router;