import { useState } from 'react';
import BookingProgress from '../components/booking/booking.progress';
import PaymentProgress from '../components/booking/payment.progress';


const BookingPage = () => {

    const [bookingInfo, setBookingInfo] = useState({
        serviceId: "",
        serviceName: "",
        area: "",
        date: "",
        time: "",
        address: "",
        note: "",
        price: ""
    })
    const [step, setStep] = useState("booking")

    return (
        <>
            {step === "booking" ?
                <BookingProgress
                    bookingInfo={bookingInfo}
                    setBookingInfo={setBookingInfo}
                    setStep={setStep}
                />
                :
                <PaymentProgress
                    bookingInfo={bookingInfo}
                    setStep={setStep}
                />
            }
        </>
    );
};

export default BookingPage;
