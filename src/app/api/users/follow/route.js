import { NextResponse } from "next/server";
import Users from "/mongo/UserModel";
import Followers from "/mongo/Followers";


export async function POST(req , res) {
    try {
        let data = await req.json();
        console.log(data);
        if(data.followedById === data.followedToId) {
            return NextResponse.json({success:false , message:"you can not follow yourself."});
        } 
        let isAny = await Followers.find(data);
        if(isAny.length > 0) {
            return NextResponse.json({success:false , message:"you have already followed this user."});
        } else {
            let User = await Users.findOne({_id:data.followedToId});
            User.followers = User.followers + 1;
            await User.save();
            const follow = new Followers(data);
            await follow.save();
        }
        return NextResponse.json({success:true , message:"you have followed successfully."});
    } catch(error) {
        return NextResponse.json({success:false , message:error.message});
    }
}