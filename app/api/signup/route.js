import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import { NextResponse } from "next/server";
import { EmailData } from "@/helpers/EmailDataForVerification";
import bcrypt from "bcryptjs";

export async function POST(req) {
  const { firstname, lastname, email, password, confirmPassword } =
    await req.json();

  await dbConnect();

  // ✅ 1. Check if user exists
  const existingUser = await User.findOne({ email });
  if (existingUser && existingUser.verified) {
    return NextResponse.json(
      { error: "The email already exists. Please try to login." },
      { status: 400 }
    );
  }


  // ✅ 2. Hash password and generate OTP
  const hashedPassword = await bcrypt.hash(password, await bcrypt.genSalt(10));
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const otpExpires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour
  const username = `${firstname} ${lastname}`;

  try {
    // Update the existingUser or just create new
    if(existingUser && !existingUser.verified) {
      existingUser.firstname = firstname;
      existingUser.lastname = lastname;
      existingUser.verified = false;
      existingUser.otp = otp;
      existingUser.otpExpires = otpExpires;
      existingUser.userName = "";
      existingUser.password = hashedPassword;
      existingUser.verificationTries = 0
      await existingUser.save();
    }else{
    // ✅ 3. Create new user
    const newUser = await User.create({
      firstname,
      lastname,
      email,
      password: hashedPassword,
      otp,
      otpExpires,
      verified: false,
      userName : "",
      createdAt: new Date(),
      verificationTries : 0
    });
  }

    // ✅ 4. Send email
    try {
      await EmailData({ otp, username, email });
      return NextResponse.json(
        { message: "Verification email sent successfully" },
        { status: 200 }
      );
    } catch (emailError) {
      console.error("Email sending error:", emailError);
      return NextResponse.json(
        { error: "Failed to send verification email." },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("User creation error:", error);
    return NextResponse.json(
      { error: "Failed to create user." },
      { status: 500 }
    );
  }
}
