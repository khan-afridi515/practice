import mongoose from "mongoose";

const department = new mongoose.Schema({
    name : String
}, {timestamps : true})


export default mongoose.model('dep', department);