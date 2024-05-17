const mongoose = require("mongoose");
const ProblemSchema = new mongoose.Schema({
        id: {
            type: Number,
            required: true,
            unique: true,
        },
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
        visible: {
            type: Boolean,
            required: true,
        },
        tags: {
            type: String,
            trim: true,
            required: true,
        },
        statement: {
            type: String,
            trim: true,
            required: true,
        },
        tcs: {
            type: [{
                input: String,
                output: String
            }],
            required: true
        }
    },
    { timestamps: true }
);
module.exports = mongoose.model("Problem", ProblemSchema);