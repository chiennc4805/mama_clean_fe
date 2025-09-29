import { useEffect, useState } from "react";
import RegisterPage from "../components/auth/register";
import VerifyOtp from "../components/auth/verify_otp";

const AccountRegistrationPage = () => {

    const [step, setStep] = useState("register");
    const type = "Registration"
    const [registerData, setRegisterData] = useState({
        name: "",
        email: "",
        phone: "",
        gender: "",
        password: ""
    });

    useEffect(() => {
        setStep("main")
    }, [])

    return (
        <>
            {step === "main" ?
                <RegisterPage
                    registerData={registerData}
                    setRegisterData={setRegisterData}
                    setStep={setStep}
                />
                :

                <VerifyOtp
                    email={registerData.email}
                    setStep={setStep}
                    type={type}
                />
            }
        </>
    );
};

export default AccountRegistrationPage;