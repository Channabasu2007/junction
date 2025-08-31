import { NextResponse } from "next/server";
import User from "@/models/User";
import dbConnect from "@/lib/dbConnect";

export async function POST(req) {
  const body = await req.json();
  const { profile } = body;
  if(!profile){
    return  NextResponse.json({error : "Bad request : Url is not exists"}, {status : 400})
  }
  try {
    await dbConnect();
  } catch (error) {
    return NextResponse.json({error : "Database Connection Error"}, {status : 502})
  }
  try {
    const user = await User.findOne({userName: profile})
    if(!user){return NextResponse.json({Error : "User Not Found"}, {status : 404})}
    user.pageViews.push({clickedDate : new Date()})
    await user.save()
    return NextResponse.json({message: "Successefully Counted"}, {status: 200})
  } catch (error) {
    return NextResponse.json({error : "Failed To Query to the Database"}, {status : 500})
  }
}
