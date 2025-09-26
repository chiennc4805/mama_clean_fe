import { Button } from "antd";
import { NavLink, useNavigate } from "react-router-dom";

function HeaderLayOut() {

    const navigate = useNavigate()

    const navLinkStyle = ({ isActive }) => ({
        color: isActive ? "#21823b" : "#222",
        transition: "color 0.2s",
    });

    const buttonStyle = {

    }

    return (
        <div
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                height: "100%",
                padding: "0 50px",
                width: "100%",
            }}
        >
            {/* Logo và tên */}
            <div style={{ display: "flex", alignItems: "center" }}>
                <img
                    src="src\assets\logo.png"
                    alt="Logo"
                    style={{ height: 65, marginRight: 8 }}
                />
                <span style={{ fontWeight: "bold", color: "#21823b", fontSize: 43, letterSpacing: 1 }}>
                    MAMA’S CLEAN
                </span>
            </div>

            {/* Menu */}
            <div style={{ display: "flex", alignItems: "center", fontSize: 22, gap: 40 }}>
                <NavLink to="/" style={navLinkStyle} end>Trang chủ</NavLink>
                <NavLink to="/booking" style={navLinkStyle}>Đặt lịch</NavLink>
                <NavLink to="/services" style={navLinkStyle}>Dịch vụ</NavLink>
                <NavLink to="/about" style={navLinkStyle}>Về chúng tôi</NavLink>
                <NavLink to="/contact" style={navLinkStyle}>Liên hệ</NavLink>
                <NavLink to="/feedback" style={navLinkStyle}>Phản hồi</NavLink>
            </div>

            {/* Nút đăng nhập/đăng ký */}

            <div style={{ display: "flex", gap: 12 }}>
                <Button
                    type="default"
                    size="large"
                    style={{ height: 55, fontSize: 20, padding: "0 24px", borderColor: "#21823b", color: "#21823b" }}
                    onClick={() => navigate("/login")}
                >
                    Đăng nhập
                </Button>
                <Button
                    type="primary"
                    size="large"
                    style={{ background: "#21823b", borderColor: "#21823b", height: 55, fontSize: 20, padding: "0 24px" }}
                >
                    Đăng ký
                </Button>
            </div>
        </div>
    );
}

export default HeaderLayOut;