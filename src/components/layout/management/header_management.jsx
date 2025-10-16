import { BellOutlined, LogoutOutlined, SearchOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Button, Layout, message } from 'antd';
import { useContext } from 'react';
import { logoutAPI } from '../../../services/api.service';
import { AuthContext } from '../../context/auth.context';
import { useNavigate } from 'react-router-dom';

const { Header } = Layout;

const AdminHeader = () => {

    const { user, setUser, setIsAppLogout } = useContext(AuthContext)
    const navigate = useNavigate()

    const handleLogout = async () => {
        const res = await logoutAPI()
        if (res.data) {
            //clear data
            localStorage.removeItem("access_token")
            setUser(null)
            message.success("Đăng xuất thành công.")
            setIsAppLogout(true)
        }
    }

    return (
        <>
            <Header
                style={{
                    background: '#fff',
                    padding: '25px 24px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderBottom: '1px solid #f0f0f0',
                    height: '100%'
                }}
                className="admin-header-wrapper"
            >
                {/* Logo và title */}
                <div className="admin-logo-section">
                    <div className="admin-logo-text">
                        <span className="admin-logo-icon">✱</span>
                        <span className="admin-logo-title">AdminDashboard</span>
                    </div>
                </div>

                {/* Right side - Logout & Profile */}
                <div className="admin-actions-section">
                    {/* Exit/Logout Button */}
                    <Button
                        type="text"
                        className="admin-logout-btn"
                        onClick={() => handleLogout()}
                    >
                        <LogoutOutlined />
                    </Button>

                    {/* User Avatar */}
                    <Avatar
                        className="admin-avatar"
                        icon={<UserOutlined />}
                        src={`https://mamasclean.com/upload/avatar/${user.avatar}`}
                    />
                </div>
            </Header>

            <style jsx>{`
                /* Header Wrapper */
                .admin-header-wrapper {
                    padding: clamp(12px, 3vw, 25px) clamp(12px, 3vw, 24px) !important;
                }

                /* Logo Section */
                .admin-logo-section {
                    display: flex;
                    align-items: center;
                    overflow: hidden;
                }

                .admin-logo-text {
                    display: flex;
                    align-items: center;
                    font-size: clamp(20px, 4vw, 30px);
                    font-weight: 500;
                    font-style: italic;
                    color: #52c41a;
                    white-space: nowrap;
                }

                .admin-logo-icon {
                    margin-right: clamp(4px, 1vw, 8px);
                    font-size: clamp(18px, 3.5vw, 25px);
                }

                .admin-logo-title {
                    display: inline;
                }

                /* Actions Section */
                .admin-actions-section {
                    display: flex;
                    align-items: center;
                    gap: clamp(8px, 2vw, 16px);
                    flex-shrink: 0;
                }

                /* Logout Button */
                .admin-logout-btn {
                    background-color: #ff4d4f !important;
                    color: white !important;
                    border-radius: 20%;
                    width: clamp(38px, 6vw, 45px);
                    height: clamp(38px, 6vw, 45px);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: clamp(14px, 2vw, 15px);
                    font-weight: bold;
                    padding: 0;
                    transition: all 0.3s ease;
                }

                .admin-logout-btn:hover {
                    background-color: #ff7875 !important;
                    transform: scale(1.05);
                }

                /* Avatar */
                .admin-avatar {
                    background-color: #d9d9d9;
                    color: #666;
                    width: clamp(38px, 6vw, 45px) !important;
                    height: clamp(38px, 6vw, 45px) !important;
                    flex-shrink: 0;
                }

                /* Tablet Styles */
                @media (max-width: 768px) {
                    .admin-header-wrapper {
                        padding: 12px 16px !important;
                    }

                    .admin-logo-text {
                        font-size: 22px;
                    }

                    .admin-logo-icon {
                        font-size: 20px;
                        margin-right: 6px;
                    }

                    .admin-actions-section {
                        gap: 12px;
                    }

                    .admin-logout-btn {
                        width: 40px;
                        height: 40px;
                        font-size: 14px;
                    }

                    .admin-avatar {
                        width: 40px !important;
                        height: 40px !important;
                    }
                }

                /* Mobile Styles */
                @media (max-width: 576px) {
                    .admin-header-wrapper {
                        padding: 10px 12px !important;
                    }

                    .admin-logo-text {
                        font-size: 18px;
                    }

                    .admin-logo-icon {
                        font-size: 16px;
                        margin-right: 4px;
                    }

                    .admin-logo-title {
                        max-width: 150px;
                        overflow: hidden;
                        text-overflow: ellipsis;
                    }

                    .admin-actions-section {
                        gap: 8px;
                    }

                    .admin-logout-btn {
                        width: 36px;
                        height: 36px;
                        font-size: 13px;
                    }

                    .admin-avatar {
                        width: 36px !important;
                        height: 36px !important;
                    }
                }

                /* Extra Small Mobile */
                @media (max-width: 400px) {
                    .admin-logo-text {
                        font-size: 16px;
                    }

                    .admin-logo-title {
                        max-width: 120px;
                    }

                    .admin-logout-btn {
                        width: 34px;
                        height: 34px;
                        font-size: 12px;
                    }

                    .admin-avatar {
                        width: 34px !important;
                        height: 34px !important;
                    }
                }

                /* Prevent text selection on logo */
                .admin-logo-text {
                    user-select: none;
                    -webkit-user-select: none;
                    -moz-user-select: none;
                }

                /* Smooth transitions */
                .admin-logout-btn,
                .admin-avatar {
                    transition: all 0.3s ease;
                }

                .admin-avatar:hover {
                    transform: scale(1.05);
                    cursor: pointer;
                }
            `}</style>
        </>
    );
};

export default AdminHeader;