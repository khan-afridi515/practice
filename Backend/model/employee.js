import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
    name : String,
    salary : Number,
    departmentId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'dep',
        required : true
    }
}, {timestamps : true})

export default mongoose.model('employee', employeeSchema)