import express from 'express'
import userAuth from '../middlewares/authMiddleware.js';
import { createJobController,deleteJobController,getAllJobsController, jobStatsController, updateJobController } from '../controllers/jobsController.js';
import { getSingleJobController,latestJobsController } from './../controllers/jobsController.js';
import tryUserAuth from "../middlewares/authMiddleware.js";
const router= express.Router()

//routes
// CREATE JOB||POST
router.post('/create-job',userAuth,createJobController)


// GET JOBS||GET
router.get('/get-job',userAuth,getAllJobsController);

// GET SINGLE JOB||GET
router.get('/get-job/:id',userAuth,getSingleJobController);

//UPDATE JOBS || PATCH
router.patch('/update-job/:id',userAuth,updateJobController)

//DELETE JOBS || DELETE
router.delete('/delete-job/:id',userAuth,deleteJobController)

//JOB STATS FILTER || GET
router.get('/job-stats',userAuth,jobStatsController)

//LATEST JOBS  || GET
router.get('/latest-jobs',latestJobsController)
    

export default router;