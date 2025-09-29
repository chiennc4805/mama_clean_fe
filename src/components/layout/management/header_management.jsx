import { BellOutlined, LogoutOutlined, SearchOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Button, Layout } from 'antd';
import { useContext } from 'react';
import { logoutAPI } from '../../../services/api.service';
import { AuthContext } from '../../context/auth.context';

const { Header } = Layout;

const AdminHeader = () => {

    const { user, setUser } = useContext(AuthContext)

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
            window.location.href = "/login";
        }
    }

    return (
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
        >
            {/* Logo và title */}
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    fontSize: '30px',
                    fontWeight: '500',
                    fontStyle: "italic",
                    color: '#52c41a'
                }}>
                    <span style={{ marginRight: '8px', fontSize: '25px' }}>✱</span>
                    AdminDashboard
                </div>
            </div>

            {/* Right side - Search, Notifications, Profile */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                {/* Search Icon */}
                <Button
                    type="text"
                    icon={<SearchOutlined />}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '40px',
                        height: '40px'
                    }}
                />

                {/* Bell Icon */}
                <Button
                    type="text"
                    icon={<BellOutlined />}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '40px',
                        height: '40px'
                    }}
                />

                {/* Exit/Logout Button */}
                <Button
                    type="text"
                    style={{
                        backgroundColor: '#ff4d4f',
                        color: 'white',
                        borderRadius: '20%',
                        width: '45px',
                        height: '45px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '15px',
                        fontWeight: 'bold',
                        padding: 0
                    }}
                    onClick={() => handleLogout()}
                >
                    <LogoutOutlined />
                </Button>

                {/* User Avatar */}
                <Avatar
                    size={45}
                    style={{
                        backgroundColor: '#d9d9d9',
                        color: '#666'
                    }}
                    icon={<UserOutlined />}
                />
            </div>
        </Header>
    );
};

export default AdminHeader;