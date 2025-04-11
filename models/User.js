import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        required: true,
        unique: true,
    },
    adharNo: {
        type: String,
        required: true,
    },

    role: {
        type: String,
        enum:["departmenthead", "commissioner","localPeople","admin"],
    },
    password:{
        type: String,
        required: true,
    },
    confirmPassword:{
        type: String,
        required: true,
    },
    departmentName:{
        type: String,
    },
    profilePicture:{
        type: String,
    },
    location:{
        // dropdown - frontend
        type: String,
    }
}, {
    timestamps: true
})

const User = mongoose.model("User", userSchema)
export default User