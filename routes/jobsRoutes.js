const express = require("express");
const { isAuthenticated } = require("../middleware/auth");
const { createJob, allJob, deleteJob } = require("../controllers/jobController");
const router = express.Router();

router.post('/job/create', isAuthenticated, createJob)
router.get('/job/all', allJob)
router.delete('/deleteJob/:id', deleteJob)

module.exports = router; 
