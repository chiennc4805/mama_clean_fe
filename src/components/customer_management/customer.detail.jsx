import { Avatar, Button, Col, Input, message, notification, Row, Select, Space, Typography } from 'antd';
import { useEffect, useState } from 'react';
import { updateUserAPI } from '../../services/api.service';
import { useNavigate } from 'react-router-dom';

const { Title, Text } = Typography;
const { Option } = Select;

const CustomerDetail = (props) => {

    const { loadUser, dataDetail, setActiveComponent } = props
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        id: "",
        name: "",
        phone: "",
        gender: "",
        email: "",
    });
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    // Theo dõi kích thước màn hình để responsive
    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    useEffect(() => {
        setFormData({
            id: dataDetail.id,
            name: dataDetail.name,
            phone: dataDetail.phone,
            gender: dataDetail.gender ? "1" : "0",
            email: dataDetail.email,
            avatar: dataDetail.avatar
        })
    }, [])

    const handleSubmit = async () => {
        setLoading(true)
        const gender = formData.gender === "1" ? true : false
        const res = await updateUserAPI(formData.id, formData.name, formData.email, formData.phone, gender, dataDetail.role?.id, dataDetail.avatar)

        setTimeout(() => {
            if (res.data) {
                loadUser()
                message.success("Cập nhật thành công")
                setTimeout(() => {
                    setActiveComponent("list")
                    setLoading(false)
                }, 1500)
            }
            else {
                message.error(res.message.trim())
                setLoading(false)
            }
        }, 1000)
    };

    return (

        <div style={{
            backgroundColor: '#fff',
            minHeight: '100vh',
            padding: isMobile ? "12px" : "20px"
        }}>
            <div style={{ margin: '0 auto', maxWidth: isMobile ? '100%' : '900px' }}>
                <Title level={2} style={{ marginBottom: '24px', textAlign: isMobile ? "center" : "left" }}>
                    Hồ sơ cá nhân
                </Title>

                <div style={{
                    border: "1px solid #ccc",
                    borderRadius: "8px",
                    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
                    padding: isMobile ? "16px" : "25px"
                }}>
                    <div style={{ marginBottom: '32px' }}>
                        <Title level={4} style={{ marginBottom: '4px' }}>Thông tin cá nhân</Title>
                        <Text type="secondary" style={{ fontSize: isMobile ? '11px' : '12px' }}>
                            Cập nhật thông tin cá nhân của bạn.
                        </Text>
                    </div>

                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '16px',
                        marginBottom: '32px',
                        paddingBottom: '24px',
                        borderBottom: '1px solid #f0f0f0',
                        flexDirection: "column",
                        textAlign: "center"
                    }}>
                        <Avatar
                            size={isMobile ? 60 : 80}
                            src={`https://mamasclean.com/upload/avatar/${formData.avatar}`}
                        />
                    </div>

                    <Row gutter={[16, 16]}>
                        <Col span={isMobile ? 24 : 12}>
                            <Text>Tên</Text>
                            <Input size="large" value={formData.name} onChange={e => handleChange('name', e.target.value)} />
                        </Col>

                        <Col span={isMobile ? 24 : 12}>
                            <Text>Số điện thoại</Text>
                            <Input size="large" value={formData.phone} onChange={e => handleChange('phone', e.target.value)} />
                        </Col>

                        <Col span={isMobile ? 12 : 8}>
                            <Text>Giới tính</Text>
                            <Select size="large" style={{ width: '100%' }} value={formData.gender}
                                onChange={(value) => handleChange('gender', value)}>
                                <Option value="1">Nam</Option>
                                <Option value="0">Nữ</Option>
                            </Select>
                        </Col>

                        <Col span={isMobile ? 12 : 16}>
                            <Text>Email</Text>
                            <Input size="large" value={formData.email} disabled />
                        </Col>

                        <Col span={24} style={{ textAlign: isMobile ? "center" : "right" }}>
                            <Space style={{ marginTop: '16px' }}>
                                <Button size="large" onClick={() => setActiveComponent("list")}>
                                    Quay lại
                                </Button>
                                <Button
                                    type="primary"
                                    size="large"
                                    style={{ backgroundColor: '#41864D', borderColor: '#41864D' }}
                                    loading={loading}
                                    onClick={handleSubmit}
                                >
                                    Lưu thay đổi
                                </Button>
                            </Space>
                        </Col>
                    </Row>
                </div>
            </div>
        </div>
    );
}

export default CustomerDetail;