import { Button, Form, Input, notification, Select } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerAPI } from "../../services/api.service";

const RegisterPage = (props) => {
    const { registerData, setRegisterData, setStep } = props
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        form.setFieldsValue({
            fullname: registerData.name,
            email: registerData.email,
            phone: registerData.phone,
            gender: registerData.gender,
            password: registerData.password,
            confirm: registerData.password
        })
    }, [])

    const onFinish = async (values) => {
        setLoading(true);
        // Xử lý đăng ký ở đây, ví dụ gọi API
        const res = await registerAPI(values.password, values.fullname, values.email, values.phone, values.gender)
        setTimeout(() => {
            if (res.data) {
                setRegisterData({
                    name: values.fullname,
                    email: values.email,
                    phone: values.phone,
                    gender: values.gender,
                    password: values.password
                })
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
            paddingTop: 50,
            paddingBottom: 100
        }}>
            <h2 style={{
                textAlign: "center",
                fontWeight: 700,
                fontSize: 35,
                marginBottom: 8,
                marginTop: 24
            }}>
                Tạo tài khoản Mama's Clean
            </h2>
            <div style={{
                textAlign: "center",
                color: "#666",
                fontSize: 20,
                marginBottom: 40
            }}>
                Tham gia cùng chúng tôi để trải nghiệm dịch vụ dọn dẹp chuyên nghiệp!
            </div>
            <div style={{
                maxWidth: 600,
                margin: "0 auto",
                background: "#fff",
                borderRadius: 18,
                boxShadow: "0 2px 16px #e6e6e6",
                padding: "36px 32px 28px 32px"
            }}>
                <div style={{
                    fontWeight: 700,
                    fontSize: 25,
                    textAlign: "center",
                    marginBottom: 8
                }}>
                    Đăng ký tài khoản
                </div>
                <div style={{
                    color: "#888",
                    textAlign: "center",
                    marginBottom: 28,
                    fontSize: 18
                }}>
                    Vui lòng điền thông tin của bạn để tạo tài khoản mới.
                </div>
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    <Form.Item
                        label={<span style={{ fontWeight: 500, fontSize: 17 }}>Họ và tên</span>}
                        name="fullname"
                        rules={[{ required: true, message: "Vui lòng nhập họ tên!" }]}
                        style={{ marginBottom: 25 }}
                    >
                        <Input size="large" placeholder="Nguyễn Văn A" style={{ borderRadius: 8 }} />
                    </Form.Item>

                    <Form.Item
                        label={<span style={{ fontWeight: 500, fontSize: 17 }}>Email</span>}
                        name="email"
                        rules={[
                            { required: true, message: "Vui lòng nhập email!" },
                            { type: "email", message: "Email không đúng định dạng!" }
                        ]}
                        style={{ marginBottom: 25 }}
                    >
                        <Input size="large" placeholder="nguyenvana@example.com" style={{ borderRadius: 8 }} />
                    </Form.Item>
                    <div style={{ display: "flex", gap: 12, marginBottom: 25 }}>
                        <Form.Item
                            label={<span style={{ fontWeight: 500, fontSize: 17 }}>Số điện thoại</span>}
                            name="phone"
                            rules={[
                                { required: true, message: "Vui lòng nhập số điện thoại!" },
                                { pattern: /^0[0-9]{9}$/, message: "Số điện thoại không hợp lệ!" }
                            ]}
                            style={{ flex: 2, marginBottom: 0 }}
                        >
                            <Input size="large" placeholder="0912345678" style={{ borderRadius: 8 }} />
                        </Form.Item>
                        <Form.Item
                            label={<span style={{ fontWeight: 500, fontSize: 17 }}>Giới tính</span>}
                            name="gender"
                            rules={[{ required: true, message: "Chọn giới tính!" }]}
                            style={{ flex: 1, minWidth: 100, marginBottom: 0 }}
                        >
                            <Select
                                size="large"
                                placeholder="Chọn"
                                style={{ borderRadius: 8 }}
                                options={[
                                    { value: true, label: "Nam" },
                                    { value: false, label: "Nữ" }
                                ]}
                            />
                        </Form.Item>
                    </div>
                    <Form.Item
                        label={<span style={{ fontWeight: 500, fontSize: 17 }}>Mật khẩu</span>}
                        name="password"
                        rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
                        style={{ marginBottom: 25 }}
                    >
                        <Input.Password size="large" placeholder="******" style={{ borderRadius: 8 }} />
                    </Form.Item>
                    <Form.Item
                        label={<span style={{ fontWeight: 500, fontSize: 17 }}>Xác nhận mật khẩu</span>}
                        name="confirm"
                        dependencies={['password']}
                        rules={[
                            { required: true, message: "Vui lòng xác nhận mật khẩu!" },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject("Mật khẩu xác nhận không khớp!");
                                }
                            })
                        ]}
                        style={{ marginBottom: 40 }}
                    >
                        <Input.Password size="large" placeholder="******" style={{ borderRadius: 8 }} />
                    </Form.Item>
                    <Form.Item style={{ marginBottom: 0 }}>
                        <Button
                            type="primary"
                            htmlType="submit"
                            size="large"
                            block
                            loading={loading}
                            style={{
                                background: "#41894b",
                                borderColor: "#41894b",
                                borderRadius: 8,
                                fontWeight: 600,
                                fontSize: 17
                            }}
                        >
                            Đăng ký ngay
                        </Button>
                    </Form.Item>
                </Form>
                <div style={{
                    textAlign: "center",
                    marginTop: 18,
                    color: "#222",
                    fontSize: 15
                }}>
                    Đã có tài khoản?{" "}
                    <a
                        href="#"
                        style={{ color: "#21823b", fontWeight: 500 }}
                        onClick={e => {
                            e.preventDefault();
                            navigate("/login");
                        }}
                    >
                        Đăng nhập
                    </a>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;