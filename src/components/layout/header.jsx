import { DownOutlined, SmileOutlined } from "@ant-design/icons";
import { Button, Dropdown, message, Space } from "antd";
import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { logoutAPI } from "../../services/api.service";
import { AuthContext } from "../context/auth.context";

function HeaderLayOut() {

    const { user, setUser } = useContext(AuthContext)
    const navigate = useNavigate()

    const navLinkStyle = ({ isActive }) => ({
        color: isActive ? "#21823b" : "#222",
        transition: "color 0.2s",
    });

    const handleLogout = async (mess) => {
        const res = await logoutAPI()
        if (res.data) {
            //clear data
            localStorage.removeItem("access_token")
            setUser({
                id: "",
                name: "",
                role: ""
            })
            if (mess) {
                message.success("Đăng xuất thành công.")
            }

            //redirect to home
            navigate("/login")
        }
    }

    const dropdown_items = [
        {
            key: '1',
            label: (
                <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
                    1st menu item
                </a>
            ),
        },
        {
            key: '2',
            label: (
                <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
                    2nd menu item (disabled)
                </a>
            ),
            icon: <SmileOutlined />,
            disabled: true,
        },
        {
            key: '3',
            label: (
                <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
                    3rd menu item (disabled)
                </a>
            ),
            disabled: true,
        },
        {
            key: '4',
            danger: true,
            label: 'Đăng xuất',
            onClick: handleLogout
        },
    ];

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


            {user && user.id ? (
                // Đã đăng nhập: Hiển thị tên user hoặc avatar

                <Dropdown
                    menu={{ items: dropdown_items }}
                    dropdownRender={menu => (
                        <div style={{ width: 250 }}>
                            {menu}
                        </div>
                    )}
                >
                    <a onClick={e => e.preventDefault()}>
                        <Space>
                            <div style={{ fontWeight: "bold", fontSize: 23, color: "#21823b" }}>
                                Xin chào, {user.name}
                            </div>
                            <DownOutlined />
                        </Space>
                    </a>
                </Dropdown>
            ) : (
                // Chưa đăng nhập: Hiển thị nút đăng nhập/đăng ký
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
                        onClick={() => navigate("/register")}
                    >
                        Đăng ký
                    </Button>
                </div>
            )}

        </div >
    );
}

export default HeaderLayOut;