const mongoose = require("mongoose");
const SubmissionSchema = new mongoose.Schema({
        user_email: {
            type: String,
            trim: true,
            required: true,
        },
        problem_name: {
            type: String,
            required: true
        },
        problem_id: {
            type: Number,
            required: true
        },
        passed: {
            type: Number,
            required: true,
        },
        total: {
            type: Number,
            required: true
        },
        source: {
            type: String,
            trim: true,
            required: true
        }
    },
    { timestamps: true }
);
module.exports = mongoose.model("Submission", SubmissionSchema);