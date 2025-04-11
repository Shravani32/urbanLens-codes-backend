import mongoose from 'mongoose';

const deparmentSchema=new mongoose.Schema({
    departmentName:{
        type:String,
        required:true,
    },
    departmentHead:{
        type:String,
        required:true,
    },
    departmentHeadId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
    },
},{
    timestamps:true
})


const Department = mongoose.model('Department', deparmentSchema);
export default Department;