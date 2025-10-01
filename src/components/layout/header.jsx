import { DownOutlined, EditOutlined } from "@ant-design/icons";
import { Avatar, Button, Dropdown, message, Space, Typography } from "antd";
import { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { logoutAPI } from "../../services/api.service";
import { AuthContext } from "../context/auth.context";

const { Text } = Typography

function HeaderLayOut() {

    const { user, setUser } = useContext(AuthContext)
    const [openDropdown, setOpenDropDown] = useState(false)
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
                email: "",
                balance: 0,
                role: {
                    name: ""
                }
            })
            if (mess) {
                message.success("Đăng xuất thành công.")
            }

            setOpenDropDown(false)
            //redirect to home
            navigate("/login")
        }
    }

    const dropdownContent = (
        <div style={{
            backgroundColor: 'white',
            borderRadius: '8px',
            padding: '16px',
            width: '400px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                <Avatar
                    size={75}
                    src="https://i.pravatar.cc/150?img=47"
                />
                <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Text strong style={{ fontSize: '20px', color: '#41864D', fontWeight: 700 }}>
                            {user?.name}
                        </Text>
                        <EditOutlined style={{ fontSize: '18px', color: '#8c8c8c', cursor: 'pointer' }} onClick={() => { setOpenDropDown(false); navigate("/profile") }} />
                    </div>
                    <Text style={{ fontSize: '17px', color: '#8c8c8c', display: 'block' }}>
                        {user?.email || "abc"}
                    </Text>
                    <Text style={{ fontSize: '17px', color: '#8c8c8c', display: 'block' }}>
                        Số dư tài khoản: {user?.balance} VNĐ
                    </Text>
                </div>
            </div>

            <div style={{ display: 'flex', gap: '8px' }}>
                <Button
                    style={{
                        flex: 1,
                        borderColor: 'black',
                    }}
                    onClick={() => handleLogout()}
                >
                    Đăng xuất
                </Button>
                <Button
                    type="primary"
                    style={{
                        flex: 1,
                        backgroundColor: '#41864D',
                        borderColor: '#41864D'
                    }}
                    onClick={() => navigate("/top-up")}
                >
                    Nạp tiền
                </Button>
            </div>
        </div>
    );

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
                <span style={{ fontWeight: "bold", color: "#21823b", fontSize: 35, letterSpacing: 1 }}>
                    MAMA’S CLEAN
                </span>
            </div>

            {/* Menu */}
            <div style={{ display: "flex", alignItems: "center", fontSize: 20, gap: 40 }}>
                <NavLink to="/" style={navLinkStyle} end>Trang chủ</NavLink>
                <NavLink to="/booking" style={navLinkStyle}>Đặt lịch</NavLink>
                <NavLink to="/services" style={navLinkStyle}>Dịch vụ</NavLink>
                <NavLink to="/contact" style={navLinkStyle}>Liên hệ</NavLink>
                <NavLink to="/feedback" style={navLinkStyle}>Phản hồi</NavLink>
            </div>


            {user && user.id != "" ? (
                // Đã đăng nhập: Hiển thị tên user hoặc avatar

                <Dropdown
                    dropdownRender={() => dropdownContent}
                    trigger={['click']}
                    open={openDropdown}
                    onOpenChange={(flag) => setOpenDropDown(flag)}
                >
                    <a onClick={e => e.preventDefault()}>
                        <Space>
                            <div style={{ fontWeight: "bold", fontSize: 23, color: "#21823b" }}>
                                Xin chào, {user?.name}
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
                        style={{ fontSize: 16, padding: "25px 20px", borderColor: "#21823b", color: "#21823b" }}
                        onClick={() => navigate("/login")}
                    >
                        Đăng nhập
                    </Button>
                    <Button
                        type="primary"
                        size="large"
                        style={{ background: "#21823b", borderColor: "#21823b", fontSize: 16, padding: "25px 20px" }}
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