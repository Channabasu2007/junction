import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import { NextResponse } from "next/server";
// import { EmailData } from "@/helpers/EmailDataForVerification";
import bcrypt from "bcryptjs";

export async function POST(req) {
  const { firstname, lastname, email, password, confirmPassword } = await req.json();

  await dbConnect();

  // ✅ 1. Check if user exists
  const existingUser = await User.findOne({ email });
  if (existingUser && existingUser.verified) {
    return NextResponse.json(
      { error: "The email already exists. Please try to login." },
      { status: 400 }
    );
  }


  // ✅ 2. Validate and hash password (verification emails disabled; skip OTP creation)
  if (password !== confirmPassword) {
    return NextResponse.json(
      { error: "Passwords do not match" },
      { status: 400 }
    );
  }
  const hashedPassword = await bcrypt.hash(password, await bcrypt.genSalt(10));
  // const otp = Math.floor(100000 + Math.random() * 900000).toString();
  // const otpExpires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

  try {
    // Update the existingUser or just create new
    if (existingUser && !existingUser.verified) {
      existingUser.firstname = firstname;
      existingUser.lastname = lastname;
      // Since email verification is disabled, mark as verified and clear OTP
      existingUser.verified = true;
      existingUser.otp = undefined;
      existingUser.otpExpires = undefined;
      existingUser.userName = "";
      existingUser.password = hashedPassword;
      existingUser.verificationTries = 0;
      await existingUser.save();
      return NextResponse.json(
        { message: "Signup successful" },
        { status: 200 }
      );
    } else {
    // ✅ 3. Create new user
    const newUser = await User.create({
      firstname,
      lastname,
      email,
      password: hashedPassword,
      userName: "",
      verified: true,
      createdAt: new Date(),
      verificationTries: 0,
    });
    return NextResponse.json(
      { message: "Signup successful" },
      { status: 200 }
    );
  }

    // // ✅ 4. Send email (disabled)
    // try {
    //   await EmailData({ otp, username, email });
    //   return NextResponse.json(
    //     { message: "Verification email sent successfully" },
    //     { status: 200 }
    //   );
    // } catch (emailError) {
    //   console.error("Email sending error:", emailError);
    //   return NextResponse.json(
    //     { error: "Failed to send verification email." },
    //     { status: 500 }
    //   );
    // }

    // ✅ 5. Respond success since we are not sending verification email
    return NextResponse.json(
      { message: "Signup successful" },
      { status: 200 }
    );
  } catch (error) {
    console.error("User creation error:", error);
    return NextResponse.json(
      { error: "Failed to create user.", details: error?.message || "" },
      { status: 500 }
    );
  }
}
