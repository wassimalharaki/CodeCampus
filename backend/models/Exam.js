const mongoose = require("mongoose");
const ExamSchema = new mongoose.Schema({
        user_id: {
            type: String,
            trim: true,
            required: true,
        },
        name: {
            type: String,
            trim: true,
            required: true,
        },
        start_time: {
            type: Date,
            required: true
        },
        end_time: {
            type: Date,
            required: true
        },
        problems: {
            type: [Number],
            required: true
        },
        users: {
            type: [String],
            required: true
        }
    },
    { timestamps: true }
);
module.exports = mongoose.model("Exam", ExamSchema);