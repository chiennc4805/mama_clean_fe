import { DownOutlined, EditOutlined, ShoppingCartOutlined, MenuOutlined } from "@ant-design/icons";
import { Avatar, Button, Dropdown, message, Space, Typography, Drawer } from "antd";
import { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { logoutAPI } from "../../services/api.service";
import { AuthContext } from "../context/auth.context";
import { formatterNumber } from "../../services/common.function";

const { Text } = Typography

function HeaderLayOut() {

    const { user, setUser, setIsAppLogout } = useContext(AuthContext)
    const [openDropdown, setOpenDropDown] = useState(false)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const navigate = useNavigate()

    const navLinkStyle = ({ isActive }) => ({
        color: isActive ? "#21823b" : "#222",
        transition: "color 0.2s",
    });

    const handleLogout = async () => {
        const res = await logoutAPI()
        if (res.data) {
            //clear data
            localStorage.removeItem("access_token")
            setUser(null)
            message.success("Đăng xuất thành công.")
            setOpenDropDown(false)
            setIsAppLogout(true)
            setMobileMenuOpen(false)
        }
    }

    const dropdownContent = (
        <div style={{
            position: 'relative',
            backgroundColor: 'white',
            borderRadius: '8px',
            padding: '16px',
            width: '100%',
            maxWidth: '400px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
        }}>
            {/* Icon giỏ hàng góc trên phải */}
            <ShoppingCartOutlined
                style={{
                    position: 'absolute',
                    top: 16,
                    right: 16,
                    fontSize: 24,
                    color: '#21823b',
                    cursor: 'pointer'
                }}
                onClick={() => navigate("/order")}
            />

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px', flexWrap: 'wrap' }}>
                <Avatar
                    size={75}
                    src={`https://mamasclean.com/upload/avatar/${user?.avatar}` || ""}
                />
                <div style={{ flex: 1, minWidth: '200px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                        <Text strong style={{ fontSize: '20px', color: '#41864D', fontWeight: 700 }}>
                            {user?.name}
                        </Text>
                        <EditOutlined style={{ fontSize: '18px', color: '#8c8c8c', cursor: 'pointer' }} onClick={() => { setOpenDropDown(false); navigate("/profile") }} />

                    </div>
                    <Text style={{ fontSize: '17px', color: '#8c8c8c', display: 'block', wordBreak: 'break-word' }}>
                        {user?.email || "abc"}
                    </Text>
                    <Text style={{ fontSize: '17px', color: '#8c8c8c', display: 'block' }}>
                        Số dư tài khoản: {formatterNumber(user?.balance || "")} VNĐ
                    </Text>
                </div>
            </div>

            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                <Button
                    style={{
                        flex: 1,
                        minWidth: '120px',
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
                        minWidth: '120px',
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
        <>
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    height: "100%",
                    padding: "0 20px",
                    width: "100%",
                }}
            >
                {/* Logo và tên */}
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        flexWrap: "wrap", // Cho phép chữ xuống dòng nếu quá hẹp
                        justifyContent: "center", // Căn giữa khi màn hình nhỏ
                        gap: "clamp(4px, 1.5vw, 12px)", // Khoảng cách linh hoạt giữa logo và chữ
                        textAlign: "center",
                    }}
                >
                    <img
                        src="/logo.png"
                        alt="Logo"
                        className="logo-img"
                        style={{
                            width: "auto",
                            objectFit: "contain",
                        }}
                    />
                    <a
                        href="/"
                        className="logo-text"
                        style={{
                            fontWeight: "700",
                            color: "#21823b",
                            letterSpacing: "0.5px",
                            lineHeight: "1.2",
                            wordBreak: "keep-all",
                        }}
                    >
                        MAMA'S CLEAN
                    </a>
                </div>

                {/* Desktop Menu */}
                <div style={{
                    display: "flex",
                    alignItems: "center",
                    fontSize: 20,
                    gap: 40,
                }}
                    className="desktop-menu"
                >
                    <NavLink to="/" style={navLinkStyle} end>Trang chủ</NavLink>
                    <NavLink to="/booking" style={navLinkStyle}>Đặt lịch</NavLink>
                    <NavLink to="/services" style={navLinkStyle}>Dịch vụ</NavLink>
                    <NavLink to="/feedbacks" style={navLinkStyle}>Phản hồi</NavLink>
                </div>

                {/* Desktop User Section */}
                <div className="desktop-user">
                    {user && user.id != "" ? (
                        <Dropdown
                            dropdownRender={() => dropdownContent}
                            trigger={['click']}
                            open={openDropdown}
                            onOpenChange={(flag) => setOpenDropDown(flag)}
                        >
                            <a onClick={e => e.preventDefault()}>
                                <Space>
                                    <div style={{ fontWeight: "bold", fontSize: 'clamp(16px, 2vw, 23px)', color: "#21823b" }}>
                                        Xin chào, {user?.name}
                                    </div>
                                    <DownOutlined />
                                </Space>
                            </a>
                        </Dropdown>
                    ) : (
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
                </div>

                {/* Mobile Menu Button */}
                <Button
                    className="mobile-menu-btn"
                    type="text"
                    icon={<MenuOutlined style={{ fontSize: 24, color: "#21823b" }} />}
                    onClick={() => setMobileMenuOpen(true)}
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: 0,
                        height: "40px",
                        width: "40px",
                        paddingBottom: 55
                    }} />
            </div>

            {/* Mobile Drawer */}
            <Drawer
                title="Menu"
                placement="right"
                onClose={() => setMobileMenuOpen(false)}
                open={mobileMenuOpen}
                width={280}
            >
                <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                    {/* User Info on Mobile */}
                    {user && user.id != "" && (
                        <div style={{
                            padding: '16px',
                            backgroundColor: '#f5f5f5',
                            borderRadius: '8px',
                            marginBottom: '16px'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                                <Avatar
                                    size={50}
                                    src={`https://mamasclean.com/upload/avatar/${user?.avatar}` || ""}
                                />
                                <div>
                                    <Text strong style={{ display: 'block', color: '#41864D' }}>
                                        {user?.name}
                                    </Text>
                                    <Text style={{ fontSize: '14px', color: '#8c8c8c' }}>
                                        {formatterNumber(user?.balance || "")} VNĐ
                                    </Text>
                                </div>
                            </div>
                            <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
                                <Button
                                    size="small"
                                    style={{ flex: 1 }}
                                    onClick={() => {
                                        setMobileMenuOpen(false);
                                        navigate("/profile");
                                    }}
                                >
                                    Tài khoản
                                </Button>
                                <Button
                                    size="small"
                                    type="primary"
                                    style={{ flex: 1, backgroundColor: '#41864D' }}
                                    onClick={() => {
                                        setMobileMenuOpen(false);
                                        navigate("/order");
                                    }}
                                >
                                    Đơn hàng
                                </Button>
                            </div>
                        </div>
                    )}

                    {/* Navigation Links */}
                    <NavLink
                        to="/"
                        style={navLinkStyle}
                        end
                        onClick={() => setMobileMenuOpen(false)}
                    >
                        Trang chủ
                    </NavLink>
                    <NavLink
                        to="/booking"
                        style={navLinkStyle}
                        onClick={() => setMobileMenuOpen(false)}
                    >
                        Đặt lịch
                    </NavLink>
                    <NavLink
                        to="/services"
                        style={navLinkStyle}
                        onClick={() => setMobileMenuOpen(false)}
                    >
                        Dịch vụ
                    </NavLink>
                    <NavLink
                        to="/feedbacks"
                        style={navLinkStyle}
                        onClick={() => setMobileMenuOpen(false)}
                    >
                        Phản hồi
                    </NavLink>

                    {/* Login/Logout Buttons for Mobile */}
                    <div style={{ marginTop: 'auto', paddingTop: '20px', borderTop: '1px solid #f0f0f0' }}>
                        {user && user.id != "" ? (
                            <>
                                <Button
                                    type="primary"
                                    block
                                    style={{
                                        backgroundColor: '#41864D',
                                        borderColor: '#41864D',
                                        marginBottom: '8px'
                                    }}
                                    onClick={() => {
                                        setMobileMenuOpen(false);
                                        navigate("/top-up");
                                    }}
                                >
                                    Nạp tiền
                                </Button>
                                <Button
                                    block
                                    onClick={() => handleLogout()}
                                >
                                    Đăng xuất
                                </Button>
                            </>
                        ) : (
                            <>
                                <Button
                                    type="default"
                                    block
                                    style={{
                                        borderColor: "#21823b",
                                        color: "#21823b",
                                        marginBottom: '8px'
                                    }}
                                    onClick={() => {
                                        setMobileMenuOpen(false);
                                        navigate("/login");
                                    }}
                                >
                                    Đăng nhập
                                </Button>
                                <Button
                                    type="primary"
                                    block
                                    style={{
                                        background: "#21823b",
                                        borderColor: "#21823b"
                                    }}
                                    onClick={() => {
                                        setMobileMenuOpen(false);
                                        navigate("/register");
                                    }}
                                >
                                    Đăng ký
                                </Button>
                            </>
                        )}
                    </div>
                </div>
            </Drawer>

            <style jsx>{`
                /* --- Desktop --- */
                @media (min-width: 1201px) {
                    .desktop-menu {
                    gap: 40px;
                    font-size: 20px;
                    }
                    .desktop-user button {
                    font-size: 16px;
                    padding: 25px 20px;
                    }
                    .logo-text {
                    font-size: clamp(22px, 3vw, 32px);
                    }
                    .logo-img {
                    height: clamp(40px, 6vw, 65px);
                    }
                }

                /* --- Laptop / Tablet lớn --- */
                @media (max-width: 1200px) and (min-width: 992px) {
                    .desktop-menu {
                    gap: 28px;
                    font-size: 20px;
                    }
                    .desktop-user button {
                    font-size: 15px;
                    padding: 20px 16px;
                    }
                    .logo-text {
                    font-size: clamp(20px, 2.8vw, 28px);
                    }
                    .logo-img {
                    height: clamp(36px, 5.5vw, 55px);
                    }
                }

                /* --- Tablet --- */
                @media (max-width: 991px) and (min-width: 769px) {
                    .desktop-menu {
                    gap: 18px;
                    font-size: 12px;
                    }
                    .desktop-user button {
                    font-size: 14px;
                    padding: 16px 12px;
                    }
                    .logo-text {
                    font-size: clamp(18px, 3vw, 24px);
                    }
                    .logo-img {
                    height: clamp(30px, 5vw, 50px);
                    }
                }

                /* --- Mobile --- */
                @media (max-width: 768px) {
                    .desktop-menu,
                    .desktop-user {
                    display: none !important;
                    }

                    .mobile-menu-btn {
                    display: block !important;
                    }

                    .logo-text {
                    font-size: clamp(16px, 5vw, 20px);
                    }

                    .logo-img {
                    height: clamp(28px, 8vw, 40px);
                    }
                }

                /* --- Giữ nút menu ẩn trên desktop --- */
                @media (min-width: 769px) {
                    .mobile-menu-btn {
                    display: none !important;
                    }
                }
                `}</style>
        </>
    );
}

export default HeaderLayOut;