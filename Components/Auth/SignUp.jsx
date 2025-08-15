"use client";
import React from "react";
import Link from "next/link";
import { Label } from "@/Components/ui/label";
import { Input } from "@/Components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/Components/ui/button";
import { FaGoogle } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { showSuccess, showError, showInfo } from '@/helpers/ToastManager'
import { SignUpSchema } from "@/helpers/SignUpSchema"
import Loader from "../Workers/Loader";

const SignUp = () => {
  const router = useRouter();
  const [firstname, setFirstname] = React.useState("");
  const [lastname, setLastname] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [pageLoading, setPageLoading] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setPageLoading(true)
    const result = await SignUpSchema.safeParse({
      firstname,
      email,
      password,
      confirmPassword,
    });

    if (!result.success) {
      const issues = result.error.issues;
      const errorMessages = issues.map((issue, i) => (issue.message))
      errorMessages.map((message, idx) => (
        showError(message)
      ))
      setPageLoading(false)
      return;
    }

    try {
      const user = {
        firstname,
        email,
        password,
        confirmPassword,
        lastname
      }
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
      })
      if (!response.ok) {
        const { error } = await response.json();
        showError(error || 'Signup failed');
        setPageLoading(false)
        return;

      } else {
        showSuccess('Your account has been registered please verify email to activate it.')
        sessionStorage.setItem("signupData", JSON.stringify({
          email: email,
          firstname: firstname,
          password: password
        }));
        setPageLoading(false)
        router.push(`/verification`)
      }
    }
    catch (error) {
      setPageLoading(false)
      showError('Something went wrong, please try again.')
    }
  };

if(pageLoading){
  return <Loader/>
}

  return (
    <div className="min-h-fit flex items-center justify-center bg-gray-50 dark:bg-zinc-950 px-4 py-8">
      <div className="w-full max-w-sm md:max-w-md lg:max-w-lg mx-auto p-6 bg-white dark:bg-zinc-900 rounded-lg shadow-lg">
        <div>
          <h2 className="text-2xl md:text-3xl my-4 text-center">
            <span className="font-medium text-zinc-600 dark:text-zinc-300">
              Welcome to
            </span>{" "}
            <span className="font-bold text-orange-600">JUNCTION</span>
          </h2>
          <p className="text-sm md:text-base text-zinc-500 dark:text-zinc-400 text-center mb-6">
            Join us to explore a world of opportunities. Complete the sign-up
            process and create your new profile.
          </p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 flex flex-col gap-2">
              <Label htmlFor="firstname">First Name:</Label>
              <Input
                id="firstname"
                type="text" // Changed to "text" as firstname is not a specific type
                placeholder="John"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
                required
              />
            </div>
            <div className="flex-1 flex flex-col gap-2">
              <Label htmlFor="lastname">Last Name :<span className="text-zinc-700 dark:text-zinc-400">(optional)</span> </Label>
              <Input
                id="lastname"
                type="text" // Changed to "text" as lastname is not a specific type
                placeholder="Doe"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}

              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="email">Email:</Label>
            <Input
              id="email"
              type="email"
              placeholder="example@mail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col gap-2 relative">
            <Label htmlFor="password">Password:</Label>
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span
              className="absolute right-3 top-10 -translate-y-1/2 cursor-pointer text-zinc-500 hover:text-orange-600 transition-colors"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </span>
          </div>

          <div className="flex flex-col gap-2 relative">
            <Label htmlFor="confirmpassword">Confirm Password:</Label>
            <Input
              id="confirmpassword" // Corrected id to match htmlFor
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <span
              className="absolute right-3 top-10 -translate-y-1/2 cursor-pointer text-zinc-500 hover:text-orange-600 transition-colors"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </span>
          </div>

          <Button
            type="submit"
            className="w-full bg-orange-600 text-white py-2 cursor-pointer rounded-md hover:bg-orange-700 transition-colors duration-300"
          >
            Sign Up
          </Button>
        </form>



        <div className="mt-6 text-center text-sm text-zinc-500 dark:text-zinc-400">
          Already have an account?{" "}
          <Link href="/login" className="text-orange-600 hover:underline cursor-pointer font-medium">
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;