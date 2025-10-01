
import { WarningOutlined } from '@ant-design/icons';
import { Alert, Card, Col, Image, Row, Table, Typography } from 'antd';
import { useContext } from 'react';
import { AuthContext } from '../components/context/auth.context';

const { Title, Text } = Typography;

const TopUpPage = () => {

    const { user } = useContext(AuthContext);

    const columns = [
        {
            title: 'Mã đơn',
            dataIndex: 'code',
            key: 'code',
        },
        {
            title: 'Số tiền',
            dataIndex: 'amount',
            key: 'amount',
            render: (text) => <Text style={{ color: '#52c41a', fontWeight: 500 }}>{text}</Text>
        },
        {
            title: 'Cách thanh toán',
            dataIndex: 'method',
            key: 'method',
        },
        {
            title: 'Ngày tạo',
            dataIndex: 'date',
            key: 'date',
        },
    ];

    const data = [
        {
            key: '1',
            code: 'D6B0807735918B',
            amount: '+100.010đ',
            method: 'Chuyển khoản ngân hàng',
            date: '27-09-2025 22:49',
        },
        {
            key: '2',
            code: 'D6B0807524F39E8',
            amount: '+100.010đ',
            method: 'Chuyển khoản ngân hàng',
            date: '27-09-2025 22:48',
        },
        {
            key: '3',
            code: 'A1B2C3D4E5F607',
            amount: '+50.000đ',
            method: 'Chuyển khoản ngân hàng',
            date: '26-09-2025 10:30',
        },
        {
            key: '4',
            code: 'X9Y8Z7A6B5C4D3',
            amount: '+200.000đ',
            method: 'Chuyển khoản ngân hàng',
            date: '25-09-2025 15:00',
        },
    ];

    return (
        <div style={{ backgroundColor: '#F6F6F6', minHeight: '100vh', padding: '24px' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                <Title style={{ textAlign: 'center', marginBottom: '40px', fontSize: "35px" }}>
                    Nạp tiền qua chuyển khoản ngân hàng
                </Title>

                <Row gutter={24} style={{ display: 'flex' }}>
                    <Col xs={24} lg={12} style={{ display: 'flex' }}>
                        <Card style={{ width: '100%' }}>
                            <div style={{ marginBottom: '24px' }}>
                                <Text type="secondary">Số dư tài khoản:</Text>
                                <div style={{
                                    backgroundColor: '#f0f0f0',
                                    padding: '12px',
                                    marginTop: '8px',
                                    borderRadius: '4px'
                                }}>
                                    <Text strong>{user.balance} VNĐ</Text>
                                </div>
                            </div>

                            <div>
                                <Text strong style={{ marginBottom: '12px', display: 'block' }}>
                                    Hướng dẫn nhanh
                                </Text>
                                <ol style={{ paddingLeft: '20px', lineHeight: '2' }}>
                                    <li>Mở ứng dụng banking trên điện thoại</li>
                                    <li>Chọn "Quét mã QR" hoặc "Chuyển/Liên QR"</li>
                                    <li>Quét mã QR và xác nhận giao dịch</li>
                                    <li>Chờ 5-10 phút để Mama's Clean được cộng vào tài khoản</li>
                                </ol>
                            </div>

                            <Alert
                                icon={<WarningOutlined />}
                                message="LƯU Ý QUAN TRỌNG"
                                description={
                                    <div>
                                        <p>• Vui lòng chuyển đúng nội dung để trạm trương hợp giao dịch bị chậm: hỗ trợ qua liên hệ trực tuyến</p>
                                        <p>• Sau khi chuyển tiền, vui lòng chờ 5-10 phút để hệ thống xử lý</p>
                                        <p style={{ marginBottom: 0 }}>• Liên hệ hỗ trợ: 0374098225</p>
                                    </div>
                                }
                                type="warning"
                                showIcon
                                style={{ marginTop: '24px' }}
                            />
                        </Card>
                    </Col>

                    <Col xs={24} lg={12} style={{ display: 'flex' }}>
                        <Card style={{ width: '100%' }}>
                            <Title level={5} style={{ textAlign: 'center', marginBottom: '24px' }}>
                                Quét mã QR để thanh toán
                            </Title>

                            <div style={{ textAlign: 'center' }}>
                                <div style={{
                                    display: 'inline-block',
                                    padding: '16px',
                                    backgroundColor: '#fff',
                                    border: '1px solid #d9d9d9',
                                    borderRadius: '8px'
                                }}>
                                    <Image
                                        src="https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=LE MINH HAI 2120938947 BIDV-CN TAY HO"
                                        alt="QR Code"
                                        width={250}
                                        preview={false}
                                    />
                                    <div style={{ marginTop: '16px' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '8px' }}>
                                            <img src="https://via.placeholder.com/60x20/FF0000/FFFFFF?text=Vietqr" alt="VietQR" style={{ height: '20px' }} />
                                            <img src="https://via.placeholder.com/60x20/0066CC/FFFFFF?text=napas" alt="Napas" style={{ height: '20px' }} />
                                        </div>
                                    </div>
                                </div>

                                <div style={{ marginTop: '24px' }}>
                                    <Text strong style={{ fontSize: '16px', display: 'block' }}>LÊ MINH HẢI</Text>
                                    <Text style={{ display: 'block', marginTop: '4px' }}>2120938947</Text>
                                    <Text type="secondary" style={{ display: 'block', marginTop: '4px' }}>
                                        BIDV-CN TÂY HỒ
                                    </Text>
                                </div>
                            </div>
                        </Card>
                    </Col>
                </Row>

                <Card style={{ marginTop: '24px', background: "#F2FDF4" }}>
                    <Title level={5} style={{ marginBottom: '16px' }}>Lịch sử nạp tiền</Title>
                    <Table
                        columns={columns}
                        dataSource={data}
                        pagination={false}
                        scroll={{ x: 800 }}
                    />
                </Card>
            </div>
        </div>
    );
}

export default TopUpPage;