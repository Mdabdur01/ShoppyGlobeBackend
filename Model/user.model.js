import mongoose from "mongoose";
import bcrypt from "bcrypt";
const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true, // ------- Ensuer unique emails
        lowercase: true,
        trim: true
    }
    ,
    password: {
        type: String,
        required: true,
        minlength: 6 // -------  Enforce strong password rules
    }
}, { timestamps: true })

const User = mongoose.model("User", userSchema);
export default User;