const Job = require('../models/jobModel');

exports.createJob = async (req, res, next) => {
    try {
        const job = await Job.create({
            title: req.body.title,
            description: req.body.description,
            salary: req.body.salary,
            location: req.body.location,
            jobType: req.body.jobType,
            user: req.user.id
        })
        res.status(201).json({
            success: true,
            job
        })
    } catch (error) {
        next(error)
    }
}
exports.allJob = async (req, res, next) => {
    const pageSize = 10;
    const page = Number(req.query.pageNumber) || 1;
    const count = await Job.find({}).estimatedDocumentCount()
    try {
        const job = await Job.find().sort({ createdAt: -1 }).select("-password")
            .skip(pageSize * (page - 1))
            .limit(pageSize)
        res.status(200).json({
            success: true,
            job,
            page,
            pages: Math.ceil(count / pageSize),
            count
        })
    } catch (error) {
        next(error)
    }
}
exports.deleteJob = async (req, res, next) => {
    try {
        const job = await Job.findByIdAndRemove(req.params.id);
        res.status(200).json({
            success: true,
            message: "Job Deleted SuccessFully."
        })
        next()
    } catch (error) {
        return next(error)
    }
}
exports.updateJob = async (req, res, next) => {
    try {
        const job = await Job.findByIdAndUpdate(req.params.id);
        res.status(200).json({
            success: true,
            message: "Job Updated SuccessFully."
        })
        next()
    } catch (error) {
        return next(error)
    }
}