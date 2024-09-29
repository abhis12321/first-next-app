import mongoose from "mongoose";
import dbConnect from "./dbConnect";

dbConnect();
const blogLikesSchema = new mongoose.Schema({
    blogId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
    },
    likedAt:{
        type:Date,
        default:Date.now,
    }
})


blogLikesSchema.index({ blogId: 1, userId: 1 }, { unique: true });

export const BlogLikes = mongoose.models.BlogLikes || mongoose.model("BlogLikes" , blogLikesSchema);