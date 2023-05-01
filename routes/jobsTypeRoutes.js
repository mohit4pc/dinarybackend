const express = require("express");
const { isAuthenticated } = require("../middleware/auth");
const { createJobType, allJobsType } = require("../controllers/jobsTypeControllers");

const router = express.Router();

router.post('/type/create', isAuthenticated, createJobType)
router.get('/type/jobType', allJobsType)
module.exports = router; 
