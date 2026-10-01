import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    content : String,
    title : String,
    author : {
        type: mongoose.Schema.Types.ObjectId,
        ref:author
    }
})

export default mongoose.model("post", postSchema);