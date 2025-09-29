import { Avatar, Button, Card, Input, message, notification, Select, Space, Typography } from 'antd';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../components/context/auth.context';
import { fetchUserByIdAPI, updateUserAPI } from '../services/api.service';

const { Title, Text } = Typography;
const { Option } = Select;

const UserProfile = () => {

    const { user, setUser } = useContext(AuthContext)
    const [loading, setLoading] = useState(false)

    const [formData, setFormData] = useState({
        id: "",
        name: "",
        phone: "",
        gender: "",
        email: ""
    });

    const handleChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    useEffect(() => {
        const loadUser = async () => {
            const res = await fetchUserByIdAPI(user?.id)
            if (res.data) {
                setFormData({
                    id: res.data.id,
                    name: res.data.name,
                    phone: res.data.phone,
                    gender: res.data.gender ? "1" : "0",
                    email: res.data.email,
                })
            }
        }
        loadUser()
    }, [])

    const handleSubmit = async () => {
        console.log('Form values:', formData);

        setLoading(true)
        const gender = formData.gender === "1" ? true : false
        const res = await updateUserAPI(formData.id, formData.name, formData.email, formData.phone, gender, user.role.id)

        setTimeout(() => {
            if (res.data) {
                setUser({
                    id: user.id,
                    name: formData.name,
                    role: user.role
                })
                message.success("Cập nhật thành công")
            }
            else {
                notification.error({
                    message: "Cập nhật thất bại",
                    description: JSON.stringify(res.message)
                })
            }
            setLoading(false)
        }, 2000)
    };

    return (
        <div style={{ padding: '40px', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                <Card>
                    <Title level={1} style={{ marginBottom: '24px' }}>
                        Hồ sơ cá nhân
                    </Title>

                    <div style={{ marginBottom: '32px' }}>
                        <Title level={3} style={{ marginBottom: '4px' }}>
                            Thông tin cá nhân
                        </Title>
                        <Text type="secondary" style={{ fontSize: '15px' }}>
                            Cập nhật thông tin cá nhân của bạn.
                        </Text>
                    </div>

                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '16px',
                        marginBottom: '32px',
                        paddingBottom: '24px',
                        borderBottom: '1px solid #f0f0f0'
                    }}>
                        <Avatar
                            size={80}
                            src="https://i.pravatar.cc/150?img=47"
                        />
                        <Button
                            type="link"
                            style={{ padding: 0, height: 'auto', color: '#595959' }}
                        >
                            Thay đổi ảnh đại diện
                        </Button>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <div>
                            <div style={{ marginBottom: '8px' }}>
                                <Text>Tên</Text>
                            </div>
                            <Input
                                size="large"
                                placeholder="Nguyễn Thị Thảo"
                                value={formData.name}
                                onChange={(e) => handleChange('name', e.target.value)}
                            />
                        </div>

                        <div>
                            <div style={{ marginBottom: '8px' }}>
                                <Text>Số điện thoại</Text>
                            </div>
                            <Input
                                size="large"
                                placeholder="0912 345 678"
                                value={formData.phone}
                                onChange={(e) => handleChange('phone', e.target.value)}
                            />
                        </div>

                        <div>
                            <div style={{ marginBottom: '8px' }}>
                                <Text>Giới tính</Text>
                            </div>
                            <Select
                                size="large"
                                style={{ width: '100%' }}
                                value={formData.gender}
                                onChange={(value) => handleChange('gender', value)}
                            >
                                <Option value="1" >Nam</Option>
                                <Option value="0">Nữ</Option>
                            </Select>
                        </div>

                        <div>
                            <div style={{ marginBottom: '8px' }}>
                                <Text>Email</Text>
                            </div>
                            <Input
                                size="large"
                                placeholder="thaonguyen@example.com"
                                value={formData.email}
                                disabled
                            />
                        </div>

                        {/* <div>
                            <div style={{ marginBottom: '8px' }}>
                                <Text>Đổi mật khẩu</Text>
                            </div>
                            <Input.Password
                                size="large"
                                placeholder="Nhập mật khẩu mới"
                                value={formData.password}
                                onChange={(e) => handleChange('password', e.target.value)}
                            />
                        </div>

                        <div>
                            <div style={{ marginBottom: '8px' }}>
                                <Text>Xác nhận mật khẩu</Text>
                            </div>
                            <Input.Password
                                size="large"
                                placeholder="Xác nhận mật khẩu"
                                value={formData.confirmPassword}
                                onChange={(e) => handleChange('confirmPassword', e.target.value)}
                            />
                        </div> */}

                        <div style={{ marginTop: '12px' }}>
                            <Space>
                                <Button size="large">
                                    Hủy
                                </Button>
                                <Button
                                    type="primary"
                                    size="large"
                                    onClick={handleSubmit}
                                    style={{
                                        backgroundColor: '#41864D',
                                        borderColor: '#41864D'
                                    }}
                                    loading={loading}
                                >
                                    Lưu thay đổi
                                </Button>
                            </Space>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
}

export default UserProfile;