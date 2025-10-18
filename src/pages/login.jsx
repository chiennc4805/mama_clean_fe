import { Button, Form, Input, message, notification, Spin } from "antd";
import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../components/context/auth.context";
import { loginAPI, loginByGoogleAPI } from "../services/api.service";
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleOutlined } from '@ant-design/icons';

const LoginPage = () => {

    const { user, setUser } = useContext(AuthContext)
    const [form] = Form.useForm()
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loadingGg, setLoadingGg] = useState(false)

    const location = useLocation();

    const onFinish = async (values) => {
        const from = location.state?.from || "";

        setLoading(true)
        const res = await loginAPI(values.username, values.password)
        setTimeout(() => {
            if (res.data) {
                message.success("Đăng nhập thành công")
                localStorage.setItem("access_token", res.data.access_token)
                setUser(res.data.user)
                Promise.resolve().then(() => {
                    navigate(from || (res.data.user.role.name === "CUSTOMER" ? "/" : "/management"), { replace: true });
                });

            }
            else {
                setLoading(false)
                message.error(res.message.trim())
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
                                borderRadius: 4,
                                fontWeight: 600,
                                fontSize: 20,
                            }}
                            htmlType="submit"
                            loading={loading}
                        >
                            Đăng nhập
                        </Button>
                    </Form.Item>

                    {/* Đăng nhập bằng Google */}
                    <div style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "100%",
                        margin: "12px 0 8px 0"
                    }}>
                        <div style={{ width: "50%", borderTop: "1px solid #ddd" }}></div>
                        <div style={{ margin: "0 12px", color: "#888" }}>hoặc</div>
                        <div style={{ width: "50%", borderTop: "1px solid #ddd" }}></div>
                    </div>

                    <div style={{ marginBottom: 18, position: 'relative', display: 'inline-block', width: "100%" }}>
                        <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
                            <GoogleLogin
                                onSuccess={async credentialResponse => {
                                    try {
                                        setLoadingGg(true)
                                        const token = credentialResponse.credential;
                                        const from = location.state?.from || "";
                                        const res = await loginByGoogleAPI(token)
                                        setTimeout(() => {
                                            if (res.data) {
                                                message.success("Đăng nhập thành công")
                                                localStorage.setItem("access_token", res.data.access_token)
                                                setUser(res.data.user)
                                                Promise.resolve().then(() => {
                                                    navigate(from || (res.data.user.role.name === "CUSTOMER" ? "/" : "/management"), { replace: true });
                                                });
                                                setLoadingGg(false)
                                            }
                                            else {
                                                message.error(res.message.trim())
                                                setLoadingGg(false)
                                            }
                                        }, 2000)
                                    } catch (err) {
                                        message.error("Lỗi kết nối máy chủ");
                                        setLoadingGg(false)
                                    }
                                }}
                                onError={() => message.error("Đăng nhập Google thất bại!")}
                            />
                        </GoogleOAuthProvider>
                        {loadingGg && (
                            <div
                                style={{
                                    position: 'absolute',
                                    inset: 0,
                                    background: 'rgba(255,255,255,0.6)',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    borderRadius: 8,
                                }}
                            >
                                <Spin />
                            </div>
                        )}
                    </div>

                    <div style={{ textAlign: "center", marginTop: 30 }}>
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