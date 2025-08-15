"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import AuthNav from "@/Components/Auth/AuthNav";
import { Button } from "@/Components/ui/button";
import { showSuccess, showError } from "@/helpers/ToastManager";
import { OtpCodeSchema } from "@/helpers/SignUpSchema";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/Components/ui/input-otp";
import { signIn } from "next-auth/react";
import Loader from "@/Components/Workers/Loader";

const Verification = () => {
  const [otp, setOtp] = useState("");
  const [verifyingData, setVerifyingData] = useState(null);
  const router = useRouter();
  const [pageLoading, setPageLoading] = useState(false);

  useEffect(() => {
    setPageLoading(true);
    const signupData = JSON.parse(sessionStorage.getItem("signupData"));
    if (!signupData || !signupData.firstname || !signupData.email) {
      showError("First complete the signup form before verification.");
      setPageLoading(false);
      setTimeout(() => {
        router.push("/signup");
      }, 2000);
    } else {
      setPageLoading(false);
      setVerifyingData(signupData);
    }
  }, [router]);

  const handleOtpSubmit = async () => {
    const result = await OtpCodeSchema.safeParse({ otp });
    if (!result.success) {
      showError(result.error.issues[0].message);
      return;
    }
    setPageLoading(true);
    try {
      const response = await fetch("/api/verifyOtp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          otp,
          verifyingName: verifyingData.firstname,
          verifyingEmail: verifyingData.email,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        showError(data.error || "Signup failed");
        setPageLoading(false);
        return;
      }

      showSuccess("Verification successful");
      const res = await signIn("credentials", {
        redirect: false,
        email: verifyingData.email,
        password: verifyingData.password,
      });

      if (res.error) {
        setPageLoading(false);
        showError(res.error);
      } else {
        sessionStorage.clear();
        setPageLoading(false);
        showSuccess("Login successful");
        if(!data.userName){
          router.push("/SetPageName");
        }else{
          router.push("/Dashboard");
        }
      }
    } catch (error) {
      setPageLoading(false);
      showError("Failed to verify your account. Please try again.");
    }
  };

  if (!verifyingData)
    return (
      <div className="m-auto text-4xl">
        Please complete the signup form before verification.
      </div>
    );
  if (pageLoading) {
    return <Loader />;
  }

  return (
    <>
      <AuthNav />
      <div className="min-h-[89vh] flex items-center justify-center bg-gray-50 dark:bg-zinc-950 px-4 py-8">
        <div className="m-auto p-10 rounded-lg bg-zinc-100 dark:bg-zinc-900 flex flex-col justify-center items-center gap-3">
          <h2 className="text-4xl font-bold text-orange-600">Verification</h2>
          <p className="mb-4 text-zinc-700 dark:text-zinc-300 text-center">
            Enter the verification code sent to your email <br />
            <span className="text-orange-600 mx-auto">
              {verifyingData.email}
            </span>
          </p>
          <div>
            <InputOTP maxLength={6} value={otp} onChange={setOtp}>
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
              </InputOTPGroup>
              <InputOTPSeparator />
              <InputOTPGroup>
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          </div>
          <Button
            onClick={handleOtpSubmit}
            className="cursor-pointer w-[250px] px-10 bg-orange-600 text-white py-2 rounded-md hover:bg-orange-700 transition-colors duration-300"
          >
            Verify
          </Button>
        </div>
      </div>
    </>
  );
};

export default Verification;
