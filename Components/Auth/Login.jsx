"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Label } from "@/Components/ui/label";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/Components/ui/button";
import { FaGoogle } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { showSuccess, showError, showInfo } from '@/helpers/ToastManager'
import { signIn } from "next-auth/react";
import Loader from "../Workers/Loader";


const Login = () => {
    const router = useRouter();
    const [pageLoading, setPageLoading] = useState(false);
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)

    const handleLoginSubmit = async (e) => {
        e.preventDefault()
        setPageLoading(true)

        const res = await signIn("credentials", {
            redirect: false,
            email: email,
            password: password,
        });
        if (res.error) {
            setPageLoading(false)
            showError(res.error);
        } else {
            setPageLoading(false)
            showSuccess("Login successful");
            router.push("/Dashboard");
        }
    }
    if (pageLoading) {
        return <Loader />
    }
    return (
        <>
            <div className="min-h-fit flex items-center justify-center bg-gray-50 dark:bg-zinc-950 px-4 py-8 " >
                <div className="w-full max-w-sm md:max-w-md lg:max-w-lg mx-auto p-6 bg-white dark:bg-zinc-900 rounded-lg shadow-lg">
                    <div>
                        <h2 className="text-2xl md:text-3xl my-4 text-center">
                            <span className="font-medium text-zinc-600 dark:text-zinc-300">
                                Welcome again to
                            </span>{" "}
                            <span className="font-bold text-orange-600">JUNCTION</span>
                        </h2>
                    </div>

                    <form className="space-y-4" onSubmit={handleLoginSubmit}>
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

                        <Button
                            type="submit"
                            className="w-full bg-orange-600 cursor-pointer text-white py-2 rounded-md hover:bg-orange-700 transition-colors duration-300"
                        >
                            Login
                        </Button>
                    </form>

                    <div className="relative flex items-center justify-center my-6">
                        <div className="absolute inset-x-0 h-px bg-zinc-300 dark:bg-zinc-600" />
                        <span className="relative z-10 bg-white dark:bg-zinc-800 px-3 text-sm text-zinc-500 dark:text-zinc-400">
                            OR
                        </span>
                    </div>

                    <Button
                    onClick={() => signIn("google")}
                        variant="outline" // Corrected prop to 'variant'
                        className="w-full bg-white dark:bg-zinc-800 cursor-pointer text-orange-600 border border-orange-600 py-2 rounded-md hover:bg-orange-50 dark:hover:bg-zinc-700 transition-colors duration-300 flex items-center justify-center gap-2"
                    >
                        <FaGoogle className="text-lg" /> Login with Google
                    </Button>

                    <div className="mt-6 text-center text-sm text-zinc-500 dark:text-zinc-400">
                        Don't have an account?{" "}
                        <Link href="/signup" className="text-orange-600 cursor-pointer hover:underline font-medium">
                            Sign Up
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login