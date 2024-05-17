const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
        email: {
            type: String,
            trim: true,
            lowercase: true,
            required: true,
            unique: true,
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Invalid email address']
        },
        password: {
            type: String,
            trim: true,
            required: true,
        },
        role: {
            type: String,
            enum: ["Student", "Instructor", "Admin"],
            required: true
        }
    },
    { timestamps: true }
);
module.exports = mongoose.model("User", UserSchema);