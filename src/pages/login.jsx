import { Button, Form, Input, message, notification } from "antd";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../components/context/auth.context";
import { loginAPI } from "../services/api.service";

const LoginPage = () => {

    const { user, setUser } = useContext(AuthContext)
    const [form] = Form.useForm()
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    useEffect(() => {
        if (user && user.id) {
            navigate("/")
        }
    })

    const onFinish = async (values) => {
        setLoading(true)
        const res = await loginAPI(values.username, values.password)
        setTimeout(() => {
            if (res.data) {
                message.success("Đăng nhập thành công")
                localStorage.setItem("access_token", res.data.access_token)
                setUser(res.data.user)
                if (res.data.user.role.name === "CUSTOMER") {
                    navigate("/");
                } else {
                    navigate("/management");
                }
            }
            else {
                setLoading(false)
                notification.error({
                    message: "Error login",
                    description: JSON.stringify(res.message)
                })
            }
        }, 2000)
    }

    return (
        <div style={{
            minHeight: "100vh",
            background: "#F6F6F6",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
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
                alignItems: "center"
            }}>
                <h2 style={{
                    fontWeight: 700,
                    fontSize: 35,
                    marginBottom: 8,
                    textAlign: "center"
                }}>
                    Chào mừng bạn!
                </h2>
                <div style={{
                    color: "#444",
                    fontSize: 18,
                    marginBottom: 28,
                    textAlign: "center"
                }}>
                    Đăng nhập hoặc đăng ký để quản lý<br />việc dọn phòng của bạn.
                </div>
                {/* Tabs */}
                <div style={{
                    display: "flex",
                    width: "100%",
                    marginBottom: 28,
                    borderRadius: 8,
                    overflow: "hidden",
                    background: "#f5f6f7",
                }}>
                    <button
                        style={{
                            flex: 1,
                            padding: "12px 0",
                            fontWeight: 600,
                            fontSize: 18,
                            background: "#fff",
                            cursor: "pointer",
                            color: "#222",
                            border: "3px solid #f5f6f7",
                            transition: "background 0.2s"
                        }}
                    >
                        Đăng nhập
                    </button>

                    <button
                        onClick={() => navigate("/register")}
                        style={{
                            flex: 1,
                            padding: "12px 0",
                            fontWeight: 600,
                            fontSize: 18,
                            background: "#f5f6f7",
                            border: "none",
                            outline: "none",
                            cursor: "pointer",
                            color: "#888",
                            transition: "background 0.2s"
                        }}
                    >
                        Đăng ký
                    </button>
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
                        name="username"
                        rules={[
                            { required: true, message: 'Vui lòng nhập email!' },
                            { type: "email", message: "Email không đúng định dạng!" }
                        ]}
                        style={{ marginBottom: 30 }}
                    >
                        <Input
                            size="large"
                            placeholder="email@example.com"
                            style={{ borderRadius: 8 }}
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </Form.Item>

                    <div style={{ width: "100%", marginBottom: 8, fontWeight: 500, fontSize: 17 }}>Mật khẩu</div>
                    <Form.Item
                        name="password"
                        rules={[
                            { required: true, message: 'Vui lòng nhập mật khẩu!' }
                        ]}
                        style={{ marginBottom: 40 }}
                    >
                        <Input.Password
                            size="large"
                            placeholder="Mật khẩu của bạn"
                            style={{ borderRadius: 8 }}
                            value={password}
                            onChange={e => setPassword(e.target.value)}
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
                            Đăng nhập
                        </Button>
                    </Form.Item>
                    <div style={{ textAlign: "center", marginTop: 8 }}>
                        <Button
                            style={{ color: "#41894b", fontWeight: 500, fontSize: 17 }}
                            onClick={() => navigate("/forget-password")}>
                            Quên mật khẩu?
                        </Button>
                    </div>
                </Form>

            </div>
        </div>
    );
}

export default LoginPage;