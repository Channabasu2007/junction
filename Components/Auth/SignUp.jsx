"use client";
import React from "react";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FaGoogle } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { showSuccess, showError, showInfo } from '@/helpers/ToastManager'
import { SignUpSchema } from "@/helpers/SignUpSchema"
import Loader from "../Workers/Loader";
import { useSession, signIn } from "next-auth/react";

const SignUp = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [firstname, setFirstname] = React.useState("");
  const [lastname, setLastname] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [pageLoading, setPageLoading] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  // If user authenticated via OAuth, prefill details and lock the email field
  React.useEffect(() => {
    if (session?.user?.email) {
      setEmail(session.user.email);
    }
    if (session?.user?.name) {
      const parts = session.user.name.split(" ");
      if (!firstname) setFirstname(parts[0] || "");
      if (!lastname) setLastname(parts.slice(1).join(" ") || "");
    }
  }, [session]);


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
              disabled={!!session?.user?.email}
              required
            />
            {session?.user?.email && (
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Email fetched from your OAuth account. To use a different email, sign out and sign up manually.
              </p>
            )}
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

        {/* OAuth signup/login
        <div className="my-4">
          <div className="relative flex py-2 items-center">
            <div className="flex-grow border-t border-zinc-200 dark:border-zinc-800" />
            <span className="flex-shrink mx-4 text-zinc-500 text-sm">or</span>
            <div className="flex-grow border-t border-zinc-200 dark:border-zinc-800" />
          </div>
          <Button
            type="button"
            variant="outline"
            className="w-full flex items-center justify-center gap-2"
            onClick={() => signIn('github')}
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true" className="mr-1"><path d="M12 .5A11.5 11.5 0 0 0 .5 12.2c0 5.2 3.4 9.6 8.2 11.2.6.1.8-.3.8-.6v-2.2c-3.3.7-4-1.4-4-1.4-.6-1.5-1.4-1.9-1.4-1.9-1.1-.8.1-.8.1-.8 1.2.1 1.8 1.2 1.8 1.2 1.1 1.8 2.9 1.3 3.6 1 .1-.8.4-1.3.7-1.6-2.6-.3-5.3-1.3-5.3-5.9 0-1.3.5-2.4 1.2-3.3-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.4 1.2a11.4 11.4 0 0 1 6.2 0c2.4-1.5 3.4-1.2 3.4-1.2.6 1.6.2 2.8.1 3.1.8.9 1.2 2 1.2 3.3 0 4.6-2.7 5.6-5.3 5.9.4.3.8 1 .8 2.1v3.1c0 .3.2.7.8.6a11.7 11.7 0 0 0 8.2-11.2A11.5 11.5 0 0 0 12 .5z"/></svg>
            Continue with GitHub
          </Button>
        </div> */}
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