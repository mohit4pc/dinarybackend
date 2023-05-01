const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema
const jobSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            trim: true,
            required: [true, "Please Fill in the Title !"],
            maxlength: 70,
        },
        description: {
            type: String,
            trim: true,
            required: [true, "Please Fill in the Description !"],
        },
        salary: {
            type: String,
            trim: true,
            required: [true, "Please Fill in the Salary !"],
        },

        location: {
            type: String,
        },
        available: {
            type: Boolean,
            default: true
        },
        user: {
            type: ObjectId,
            ref: "User",
            required: true
        },
        jobType: {
            type: ObjectId,
            ref: "JobType",
            required: true
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Job", jobSchema);
