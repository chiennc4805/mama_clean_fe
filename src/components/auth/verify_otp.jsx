import { ArrowLeftOutlined } from "@ant-design/icons";
import { Button, Form, Input, message, notification } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { resendOtp, verifyOtp } from "../../services/api.service";


const VerifyOtp = (props) => {

    const { email, setStep, type } = props
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [coolDown, setCoolDown] = useState(60);

    // Countdown timer cho nút resend
    useEffect(() => {
        let timer;
        if (coolDown > 0) {
            timer = setTimeout(() => setCoolDown(coolDown - 1), 1000);
        }
        return () => clearTimeout(timer);
    }, [coolDown]);

    const onFinish = async (values) => {
        setLoading(true);
        const res = await verifyOtp(email, values.otp, type)
        setTimeout(() => {
            if (res.data) {
                message.success("Đăng ký thành công")
                navigate("/login"); // Chuyển hướng sau khi đăng ký thành công
            }
            else {
                setLoading(false);
                notification.error({
                    message: "Đăng ký thất bại",
                    description: JSON.stringify(res.message)
                })
            }
        }, 2000);
    };

    const handleResendOtp = async () => {
        try {
            await resendOtp(email, type); // gọi API gửi lại OTP
            message.success("OTP mới đã được gửi đến email của bạn");
            setCoolDown(60); // reset lại 60 giây
        } catch (error) {
            notification.error({
                message: "Không gửi được OTP",
                description: "Vui lòng thử lại sau"
            });
        }
    };

    const handleBack = () => {
        setStep("main")
    };

    return (
        <div style={{
            minHeight: "100vh",
            background: "#F6F6F6",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative"
        }}>
            <div style={{
                background: "#fff",
                borderRadius: 18,
                boxShadow: "0 2px 16px #e6e6e6",
                padding: "48px 36px 36px 36px",
                width: 600,
                maxWidth: "95vw",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                position: "relative"
            }}>
                {/* Nút Back ở góc trái */}
                <Button
                    type="text"
                    icon={<ArrowLeftOutlined />}
                    onClick={handleBack}
                    style={{
                        position: "absolute",
                        top: 16,
                        left: 16,
                        fontSize: 18,
                    }}
                >
                    Quay lại
                </Button>

                <h2 style={{
                    fontWeight: 700,
                    fontSize: 35,
                    marginBottom: 8,
                    textAlign: "center"
                }}>
                    Xác thực OTP
                </h2>
                <div style={{
                    color: "#444",
                    fontSize: 18,
                    marginBottom: 28,
                    textAlign: "center"
                }}>
                    Vui lòng xác thực mã OTP được gửi tới email <br /> {email}
                </div>
                {/* Form */}
                <Form
                    form={form}
                    name="basic"
                    layout="vertical"
                    style={{ width: "100%" }}
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    <div style={{ width: "100%", marginBottom: 8, fontWeight: 500, fontSize: 17 }}>OTP</div>
                    <Form.Item
                        name="otp"
                        rules={[
                            { required: true, message: 'Vui lòng nhập mã OTP!' },
                            { pattern: /^[0-9]{6}$/, message: "OTP có định dạng 6 chữ số!" }
                        ]}
                        style={{ marginBottom: 30 }}
                    >
                        <Input
                            size="large"
                            placeholder="XXXXXX"
                            style={{ borderRadius: 8 }}
                        />
                    </Form.Item>

                    <Form.Item style={{ marginBottom: 0 }}>
                        <Button
                            type="primary"
                            size="large"
                            block
                            style={{
                                background: "#41894b",
                                borderColor: "#41894b",
                                borderRadius: 8,
                                fontWeight: 600,
                                fontSize: 20,
                                marginBottom: 18
                            }}
                            htmlType="submit"
                            loading={loading}
                        >
                            Xác thực
                        </Button>
                    </Form.Item>
                </Form>

                {/* Nút resend OTP */}
                <Button
                    type="link"
                    onClick={handleResendOtp}
                    disabled={coolDown > 0}
                    style={{ marginTop: 10, fontSize: 16 }}
                >
                    {coolDown > 0
                        ? `Gửi lại OTP sau ${coolDown}s`
                        : "Gửi lại OTP"}
                </Button>
            </div>
        </div>
    );
};

export default VerifyOtp;