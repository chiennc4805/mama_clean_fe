import { Button, Form, Input, message, notification } from "antd";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../components/context/auth.context";
import { loginAPI } from "../services/api.service";

const LoginPage = () => {

    const [form] = Form.useForm()
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const { setUser } = useContext(AuthContext)
    const [tab, setTab] = useState("login");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = () => {
        if (onLogin) onLogin(email, password);
    };


    const onFinish = async (values) => {
        setLoading(true)
        const res = await loginAPI(values.username, values.password)
        if (res.data) {
            message.success("Đăng nhập thành công")
            localStorage.setItem("access_token", res.data.access_token)
            setUser(res.data.user)
            navigate("/")
        }
        else {
            notification.error({
                message: "Error login",
                description: JSON.stringify(res.message)
            })
        }
        setLoading(false)
    }

    return (
        <div style={{
            minHeight: "100vh",
            background: "#f7f7f7",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
        }}>
            <div style={{
                background: "#fff",
                borderRadius: 18,
                boxShadow: "0 2px 16px #e6e6e6",
                padding: "48px 36px 36px 36px",
                width: 410,
                maxWidth: "95vw",
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
            }}>
                <h2 style={{
                    fontWeight: 700,
                    fontSize: 32,
                    marginBottom: 8,
                    textAlign: "center"
                }}>
                    Chào mừng bạn!
                </h2>
                <div style={{
                    color: "#444",
                    fontSize: 16,
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
                        onClick={() => setTab("login")}
                        style={{
                            flex: 1,
                            padding: "12px 0",
                            fontWeight: 600,
                            fontSize: 16,
                            background: tab === "login" ? "#fff" : "#f5f6f7",
                            border: "none",
                            outline: "none",
                            cursor: "pointer",
                            color: tab === "login" ? "#222" : "#888",
                            borderRight: "1px solid #eee",
                            transition: "background 0.2s"
                        }}
                    >
                        Đăng nhập
                    </button>

                    <button
                        onClick={() => setTab("register")}
                        style={{
                            flex: 1,
                            padding: "12px 0",
                            fontWeight: 600,
                            fontSize: 16,
                            background: tab === "register" ? "#fff" : "#f5f6f7",
                            border: "none",
                            outline: "none",
                            cursor: "pointer",
                            color: tab === "register" ? "#222" : "#888",
                            transition: "background 0.2s"
                        }}
                    >
                        Đăng ký
                    </button>
                </div>
                {/* Form */}
                {tab === "login" && (
                    <>
                        <div style={{ width: "100%", marginBottom: 8, fontWeight: 500 }}>Email</div>
                        <Input
                            size="large"
                            placeholder="email@example.com"
                            style={{ marginBottom: 18, borderRadius: 8 }}
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                        <div style={{ width: "100%", marginBottom: 8, fontWeight: 500 }}>Mật khẩu</div>
                        <Input.Password
                            size="large"
                            placeholder="Mật khẩu của bạn"
                            style={{ marginBottom: 24, borderRadius: 8 }}
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                        <Button
                            type="primary"
                            size="large"
                            block
                            style={{
                                background: "#41894b",
                                borderColor: "#41894b",
                                borderRadius: 8,
                                fontWeight: 600,
                                fontSize: 17,
                                marginBottom: 18
                            }}
                            onClick={handleLogin}
                        >
                            Đăng nhập
                        </Button>
                        <div style={{ textAlign: "center", marginTop: 8 }}>
                            <a href="#" style={{ color: "#41894b", fontWeight: 500 }}>Quên mật khẩu?</a>
                        </div>
                    </>
                )}
                {tab === "register" && (
                    <div style={{ width: "100%", textAlign: "center", color: "#888", marginTop: 30 }}>
                        Chức năng đăng ký sẽ sớm ra mắt!
                    </div>
                )}
            </div>
        </div>
    );
}

export default LoginPage;