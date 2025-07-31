import { resend } from "@/lib/resend";
import VerificationEmail from "@/EmailSending/VerificationEmail";
import { NextResponse } from "next/server";

export const EmailData = async ({ otp, username, email }) => {
try {
    await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "JUNCTION | SignUp Verification Code",
    react: <VerificationEmail otp={otp} username={username} email={email} />,
  });
  return NextResponse.json({ message: "Verification email sent successfully" }, {status:200})
} catch (error) {
  return NextResponse.json({ error: "Error sending email" }, { status: 500 });
}
};

