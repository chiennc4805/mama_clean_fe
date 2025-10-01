import { Avatar, Button, Col, DatePicker, Input, message, notification, Row, Select, Space, Typography } from 'antd';
import dayjs from 'dayjs';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../components/context/auth.context';
import { fetchCleanerByUserIdAPI, updateCleanerAPI, updateUserAPI } from '../../services/api.service';

const { Title, Text } = Typography;
const { Option } = Select;

const CleanerProfile = () => {

    const { user, setUser } = useContext(AuthContext)
    const [loading, setLoading] = useState(false)

    const [formData, setFormData] = useState({
        id: "",
        name: "",
        phone: "",
        gender: "",
        email: "",
        idCleaner: "",
        dob: "",
        idNumber: "",
        idDate: "",
        idPlace: "",
        bank: "",
        bankNo: ""
    });

    const handleChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    useEffect(() => {
        const loadCleaner = async () => {
            const res = await fetchCleanerByUserIdAPI(user?.id)
            if (res.data) {
                setFormData({
                    id: res.data.user.id,
                    name: res.data.user.name,
                    phone: res.data.user.phone,
                    gender: res.data.user.gender ? "1" : "0",
                    email: res.data.user.email,
                    idCleaner: res.data.id,
                    dob: dayjs(res.data.dob),
                    idNumber: res.data.idNumber,
                    idDate: dayjs(res.data.idDate),
                    idPlace: res.data.idPlace,
                    bank: res.data.bank,
                    bankNo: res.data.bankNo

                })
            }
        }
        console.log(formData)
        loadCleaner()
    }, [])

    const handleSubmit = async () => {
        console.log('Form values:', formData);

        setLoading(true)
        const gender = formData.gender === "1" ? true : false
        const resUser = await updateUserAPI(formData.id, formData.name, formData.email, formData.phone, gender, user.role?.id)
        const resCleaner = await updateCleanerAPI(formData.idCleaner, formData.dob, formData.idNumber, formData.idDate, formData.idPlace, formData.bank, formData.bankNo, formData.id)
        // const resCleaner = await

        setTimeout(() => {
            if (resUser.data && resCleaner.data) {
                setUser({
                    id: user.id,
                    name: formData.name,
                    email: user.email,
                    balance: user.balance,
                    role: user.role
                })
                message.success("Cập nhật thành công")
            }
            else {
                notification.error({
                    message: "Cập nhật thất bại",
                    description: JSON.stringify(resUser.message + "\n" + resCleaner.message)
                })
            }
            setLoading(false)
        }, 3000)
    };

    return (
        <div style={{ backgroundColor: '#fff', minHeight: '100vh', padding: "20px" }}>
            <div style={{ margin: '0 auto' }}>
                <Title level={1} style={{ marginBottom: '24px' }}>
                    Hồ sơ cá nhân
                </Title>

                <div
                    style={{
                        border: "1px solid #ccc",
                        borderRadius: "8px",
                        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)", // đổ bóng nhẹ
                        padding: "25px",
                    }}
                >
                    <div style={{ marginBottom: '32px' }}>
                        <Title level={4} style={{ marginBottom: '4px' }}>
                            Thông tin cá nhân
                        </Title>
                        <Text type="secondary" style={{ fontSize: '12px' }}>
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

                    <Row gutter={20}>
                        <Col span={12} style={{ marginBottom: 20 }}>
                            <div style={{ marginBottom: '8px' }}>
                                <Text>Tên</Text>
                            </div>
                            <Input
                                size="large"
                                placeholder="Nguyễn Thị Thảo"
                                value={formData.name}
                                onChange={(e) => handleChange('name', e.target.value)}
                            />
                        </Col>

                        <Col span={12} style={{ marginBottom: 20 }}>
                            <div style={{ marginBottom: '8px' }}>
                                <Text>Số điện thoại</Text>
                            </div>
                            <Input
                                size="large"
                                placeholder="0912 345 678"
                                value={formData.phone}
                                onChange={(e) => handleChange('phone', e.target.value)}
                            />
                        </Col>

                        <Col span={6} style={{ marginBottom: 20 }}>
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
                        </Col>

                        <Col span={6} style={{ marginBottom: 20 }}>
                            <div style={{ marginBottom: '8px' }}>
                                <Text>Ngày sinh</Text>
                            </div>
                            <DatePicker
                                size="large"
                                style={{ width: '100%' }}
                                value={formData.dob}
                                onChange={(value) => handleChange('dob', value)}
                            />
                        </Col>

                        <Col span={12}>
                            <div style={{ marginBottom: '8px' }}>
                                <Text>Email</Text>
                            </div>
                            <Input
                                size="large"
                                placeholder="thaonguyen@example.com"
                                value={formData.email}
                                disabled
                            />
                        </Col>

                        <Col span={24} style={{ marginBottom: '20px' }}>
                            <Title level={4} style={{ marginBottom: '4px' }}>
                                Thông tin CCCD
                            </Title>
                        </Col>

                        <Col span={12} style={{ marginBottom: 20 }}>
                            <div style={{ marginBottom: '8px' }}>
                                <Text>Số CCCD</Text>
                            </div>
                            <Input
                                size="large"
                                placeholder="thaonguyen@example.com"
                                value={formData.idNumber}
                                onChange={(e) => handleChange('idNumber', e.target.value)}
                            />
                        </Col>

                        <Col span={12}>
                            <div style={{ marginBottom: '8px' }}>
                                <Text>Ngày cấp</Text>
                            </div>
                            <DatePicker
                                size="large"
                                onChange={(value) => handleChange('idDate', value)}
                                value={formData.idDate}
                            />
                        </Col>

                        <Col span={24} style={{ marginBottom: 20 }}>
                            <div style={{ marginBottom: '8px' }}>
                                <Text>Nơi cấp</Text>
                            </div>
                            <Input
                                size="large"
                                placeholder="thaonguyen@example.com"
                                value={formData.idPlace}
                                onChange={(e) => handleChange('idPlace', e.target.value)}
                            />
                        </Col>

                        <Col span={24} style={{ marginBottom: '20px' }}>
                            <Title level={4} style={{ marginBottom: '4px' }}>
                                Thông tin ngân hàng
                            </Title>
                        </Col>

                        <Col span={12} style={{ marginBottom: 20 }}>
                            <div style={{ marginBottom: '8px' }}>
                                <Text>Ngân hàng</Text>
                            </div>
                            <Input
                                size="large"
                                placeholder="thaonguyen@example.com"
                                value={formData.bank}
                                onChange={(e) => handleChange('bank', e.target.value)}
                            />
                        </Col>

                        <Col span={12}>
                            <div style={{ marginBottom: '8px' }}>
                                <Text>Số tài khoản</Text>
                            </div>
                            <Input
                                size="large"
                                placeholder="thaonguyen@example.com"
                                value={formData.bankNo}
                                onChange={(e) => handleChange('bankNo', e.target.value)}
                            />
                        </Col>

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
                    </Row>
                </div>
            </div>
        </div>
    );
}

export default CleanerProfile;