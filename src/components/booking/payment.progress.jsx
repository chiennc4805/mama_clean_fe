import { Breadcrumb, Button, Card, Col, Divider, message, Modal, notification, Row, Typography } from 'antd';
import dayjs from 'dayjs';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createBookingAPI } from '../../services/api.service';
import { getCoordsFromAddress } from '../../services/common.function';
import { AuthContext } from '../context/auth.context';

const { Title, Text } = Typography;

const PaymentProgress = (props) => {

    const { user } = useContext(AuthContext)
    const { bookingInfo, setStep } = props
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()


    const formatterNumber = (val) => {
        if (!val) return "0";
        return Number(val).toLocaleString("en-US");
    };

    const bookingDetails = [
        { label: 'Công việc:', value: bookingInfo.name },
        { label: 'Loại dịch vụ:', value: bookingInfo.serviceName },
        { label: 'Diện tích:', value: bookingInfo.area },
        { label: 'Ngày:', value: dayjs(bookingInfo.date).format('DD/MM/YYYY') },
        { label: 'Thời gian:', value: dayjs(bookingInfo.time).format('HH:mm:ss') || "" },
        { label: 'Địa chỉ:', value: bookingInfo.address },
        { label: 'Phí dịch vụ:', value: formatterNumber(bookingInfo.price) + " VNĐ" },
    ];

    const handlePayBooking = async () => {
        // setBookingInfo({
        //     serviceId: values.area.value,
        //     serviceName: values.service.label,
        //     area: values.area.label,
        //     date: values.date,
        //     time: values.time,
        //     address: values.address,
        //     note: values.note,
        //     price: res?.data?.price | 0
        // })
        setLoading(true)

        if (user.balance < bookingInfo.price) {
            Modal.error({
                title: 'Đặt lịch thất bại',
                content: 'Số dư tài khoản của bạn không đủ!',
                centered: true,
                onOk: () => navigate("/top-up"),
                okText: "Nạp tiền",
                maskClosable: true, // cho phép click ngoài
            });
            setLoading(false)
            return;
        }

        const coords = await getCoordsFromAddress(bookingInfo.address)
        if (coords) {
            const res = await createBookingAPI(bookingInfo.name, bookingInfo.address, coords.lat, coords.lon, bookingInfo.date.format("DD/MM/YYYY"), bookingInfo.time.format("HH:mm:ss"), bookingInfo.price, bookingInfo.note, user.id, bookingInfo.serviceId)

            setTimeout(() => {
                if (res.data) {
                    message.success("Đặt lịch thành công")
                    setTimeout(() => { navigate(0); setLoading(false); }, 1500)
                }
                else {
                    notification.error({
                        message: "Đặt lịch thất bại",
                        description: JSON.stringify(res.message)
                    })
                    setLoading(false)
                }
            }, 1000)
        } else {
            message.error("Lấy địa chỉ thất bại")
            setLoading(false)
        }
    }



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
                            <Text strong style={{ fontSize: '18px' }}>{formatterNumber(user.balance)} VNĐ</Text>
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
                        onClick={() => { handlePayBooking() }}
                        loading={loading}
                    >
                        Xác nhận thanh toán
                    </Button>
                </Card>
            </div>
        </div>
    );
}

export default PaymentProgress;