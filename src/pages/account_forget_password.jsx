import { useEffect, useState } from "react";
import ForgetPassword from "../components/auth/forget";
import VerifyOtp from "../components/auth/verify_otp";


const AccountForgetPasswordPage = () => {

    const [step, setStep] = useState("forget");
    const type = "Reset Password"
    const [email, setEmail] = useState("")

    useEffect(() => {
        setStep("main")
    }, [])

    return (
        <>
            {step === "main" ?
                <ForgetPassword
                    email={email}
                    setEmail={setEmail}
                    setStep={setStep}
                />
                :

                <VerifyOtp
                    email={email}
                    setStep={setStep}
                    type={type}
                />
            }
        </>
    )
}

export default AccountForgetPasswordPage;