import mongoose from 'mongoose';


const authorSchema = new mongoose.Schema({
    name : String,
    email: String
}, {timestamps:true})

export default mongoose.model("author", authorSchema);