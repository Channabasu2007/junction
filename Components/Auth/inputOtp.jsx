import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from "@/components/ui/input-otp"
import React, { useState } from 'react'
import {OtpValidator} from '@/Helpers/OtpValidator'

const inputOtp = () => {

    const [otp, setOtp] = useState("")
    const handleOtp = (otp) => {
        OtpValidator(otp)
    }


    return (
        <InputOTP maxLength={6} value={otp} onChange={handleOtp(e)}>
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
    )
}

export default inputOtp