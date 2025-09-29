import { Breadcrumb, Button, Card, Col, Divider, Row, Typography } from 'antd';

const { Title, Text } = Typography;

const PaymentProgress = (props) => {

    const { bookingInfo, setStep } = props

    const formatterNumber = (val) => {
        if (!val) return "0";
        return Number(val).toLocaleString("en-US");
    };

    const bookingDetails = [
        { label: 'Loại dịch vụ:', value: bookingInfo.serviceName },
        { label: 'Diện tích:', value: bookingInfo.area },
        { label: 'Ngày:', value: bookingInfo.date.format('DD/MM/YYYY') },
        { label: 'Thời gian:', value: bookingInfo.time.format('HH:mm:ss') },
        { label: 'Địa chỉ:', value: bookingInfo.address },
        { label: 'Phí dịch vụ:', value: formatterNumber(bookingInfo.price) + " VNĐ" },
    ];



    return (
        <div style={{ padding: '24px', backgroundColor: '#F6F6F6', minHeight: '100vh' }}>
            <Breadcrumb
                style={{ marginBottom: 50, fontSize: "20px", paddingLeft: "50px" }}
                separator=">"
                items={[
                    {
                        title: 'Đặt lịch',
                        href: "",
                        onClick: (e) => { e.preventDefault(); setStep("booking") }
                    },
                    {
                        title: 'Thanh toán',
                    },
                ]}
            />

            <div style={{ maxWidth: '700px', margin: '0 auto' }}>
                <Title style={{ fontSize: "50px", textAlign: 'center', marginBottom: '32px' }}>
                    Hoàn tất thanh toán
                </Title>

                <Card>
                    <Title level={2} style={{ marginBottom: '24px' }}>
                        Tóm tắt đặt phòng
                    </Title>

                    {bookingDetails.map((item, index) => (
                        <Row key={index} style={{ marginBottom: '16px' }}>
                            <Col span={12}>
                                <Text style={{ fontSize: "18px" }}>{item.label}</Text>
                            </Col>
                            <Col span={12} style={{ textAlign: 'right' }}>
                                <Text style={{ fontSize: "18px" }} strong>{item.value}</Text>
                            </Col>
                        </Row>
                    ))}

                    <Divider />

                    <Row style={{ marginBottom: '24px' }}>
                        <Col span={12}>
                            <Text style={{ fontSize: "18px" }} strong>Số dư:</Text>
                        </Col>
                        <Col span={12} style={{ textAlign: 'right' }}>
                            <Text strong style={{ fontSize: '18px' }}>350.000 VNĐ</Text>
                        </Col>
                    </Row>

                    <Button
                        type="primary"
                        size="large"
                        block
                        style={{
                            backgroundColor: '#41864D',
                            borderColor: '#41864D',
                            height: '48px',
                            fontSize: '16px'
                        }}
                    >
                        Xác nhận thanh toán
                    </Button>
                </Card>
            </div>
        </div>
    );
}

export default PaymentProgress;