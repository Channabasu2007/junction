"use client"
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import AuthNav from '@/Components/Auth/AuthNav'
import { Button } from "@/Components/ui/button"
import { toast } from 'react-toastify'
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from "@/components/ui/input-otp"


const verification = () => {
    const params = useSearchParams()
    const router = useRouter()

    const verifyingName = params.get("firstname")
    const verifyingEmail = params.get("email")

    const [otp, setOtp] = useState("")

    useEffect(() => {
        if (!verifyingName || !verifyingEmail) {
            toast.error("Verification parameters are missing")
            setTimeout(() => {
                router.push('/signup')
            }, 2000)
        }
    }, [params, router])

    const handleOtpSubmit = () => {
        console.log(otp)
    }
    return (
        <>
            <AuthNav />
            <div className='min-h-[89vh] flex items-center justify-center bg-gray-50 dark:bg-zinc-950 px-4 py-8'>
                <div className=' m-auto p-10 rounded-lg bg-zinc-100 dark:bg-zinc-900 flex flex-col justify-centern items-center gap-3 '>
                    <h2 className='text-4xl font-bold text-orange-600 '>Verification</h2>
                    <p className='mb-4 text-zinc-700 dark:text-zinc-300 text-center'>Enter the verification code sent to your email  <br /> <span className='text-orange-600 mx-auto'>{verifyingEmail}</span></p>
                    <div>
                        <InputOTP maxLength={6} value={otp} onChange={(value) => setOtp(value)}
                        >
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
    )
}

export default verification