import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import { error } from "console";
import { NextResponse } from "next/server";

export async function POST(req) {
  
  const { otp, verifyingName, verifyingEmail } = await req.json();
  

  await dbConnect();

  try {
    const user = await User.findOne({ email: verifyingEmail });
    if (!user) {
      return NextResponse.json(
        {
          error:
            "User not found, make sure you have already completed the sign up process.",
        },
        { status: 404 }
      );
    }

    if (user.verificationTries > 5) {
      return NextResponse.json(
        { error: "Too many verification tries, please contact support" },
        { status: 454 }
      );
    }
    if(user.otpExpires < Date.now()){
        return NextResponse.json({error:"Your OTP has expired"},{status: 454})
    }
    if (user.otp !== otp) {
      user.verificationTries += 1;
      await user.save();
      return NextResponse.json({ error: "Invalid OTP" }, { status: 400 });
    }

    user.verified = true;
    user.verificationTries = 0;
    user.otp = undefined;
    await user.save();

    return NextResponse.json(
      {
        user: user,
        message: "Verification successful",
      },
      { status: 200 }
    );

    



  } catch (error) {
    return NextResponse.json(
      { error: "Error while finding the user." },
      { status: 400 }
    );
  }
}
