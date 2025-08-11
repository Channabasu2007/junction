import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import { error } from "console";
import { NextResponse } from "next/server";

export async function POST(req) {
  await dbConnect();
  const body = await req.json();

  const { allowFeedbacks, recieveEmails, longMessages, enhancedFeedbacks } =
    body.data;
  const email = body.email;

  if(!email){
    return NextResponse.json({error: "User's email not found"},{status: 404})
  }
  try {
    const user = await User.findOneAndUpdate(
      { email },
      {
        FeedbacksCredentials: {
          allowFeedbacks,
          recieveEmails,
          longMessages,
          enhancedFeedbacks,
        },
      },
      {new : true}
    );
    if(!user){
      return NextResponse.json({error: "User not found"},{status: 404})
    }
    return NextResponse.json({message: "Update completed", user}, {status: 200})
    
  } catch (error) {
     return NextResponse.json({error: "Database error"},{status: 500})
  }

}
