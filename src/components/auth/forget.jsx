import { Button, Form, Input, notification } from "antd";
import { useEffect, useState } from "react";
import { forgetPasswordAPI } from "../../services/api.service";


const ForgetPassword = (props) => {

    const { email, setEmail, setStep } = props
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        form.setFieldsValue({
            email: email,
        })
    }, [])

    const onFinish = async (values) => {
        setLoading(true);
        const res = await forgetPasswordAPI(values.email)
        setTimeout(() => {
            if (res.data) {
                setEmail(values.email)
                setStep("verify")
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

    return (
        <div style={{
            minHeight: "100vh",
            background: "#F6F6F6",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
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
            }}>
                <h2 style={{
                    fontWeight: 700,
                    fontSize: 35,
                    marginBottom: 8,
                    textAlign: "center"
                }}>
                    Quên mật khẩu
                </h2>
                <div style={{
                    color: "#444",
                    fontSize: 18,
                    marginBottom: 28,
                    textAlign: "center"
                }}>
                    Vui lòng nhập email để nhận mã OTP
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
                    <div style={{ width: "100%", marginBottom: 8, fontWeight: 500, fontSize: 17 }}>Email</div>
                    <Form.Item
                        name="email"
                        rules={[
                            { required: true, message: 'Vui lòng nhập email!' },
                            { type: "email", message: "Email không đúng định dạng!" }
                        ]}
                        style={{ marginBottom: 30 }}
                    >
                        <Input
                            size="large"
                            placeholder="nguyenvana@gmail.com"
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
                            Gửi mã
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default ForgetPassword;