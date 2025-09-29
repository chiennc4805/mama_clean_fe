import { Button, Card, Col, DatePicker, Input, Row, Select, Typography } from 'antd';
import dayjs from 'dayjs';
import { useState } from 'react';

const { Title, Text } = Typography;
const { Option } = Select;
const { TextArea } = Input;

const BookingPage = () => {

    const [selectedDate, setSelectedDate] = useState(dayjs('2025-09-10'));
    const [selectedTimeSlot, setSelectedTimeSlot] = useState('10:00 - 12:00');
    const [serviceType, setServiceType] = useState('Dọn dẹp liều chuẩn');
    const [note, setNote] = useState("")

    const timeSlots = [
        { value: '08:00 - 10:00', label: '08:00 - 10:00', available: true },
        { value: '10:00 - 12:00', label: '10:00 - 12:00', available: true, selected: true },
        { value: '13:00 - 15:00', label: '13:00 - 15:00', available: true },
        { value: '15:00 - 17:00', label: '15:00 - 17:00', available: true }
    ];

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const handleTimeSlotClick = (timeSlot) => {
        setSelectedTimeSlot(timeSlot);
    };

    const handleServiceChange = (value) => {
        setServiceType(value);
    };

    const handleSubmit = () => {
        console.log('Booking submitted:', {
            serviceType,
            date: selectedDate?.format('DD/MM/YYYY'),
            timeSlot: selectedTimeSlot
        });
    };

    return (
        <div style={{
            maxWidth: "90%",
            margin: '0 auto',
            padding: '20px',
            backgroundColor: '#f5f5f5',
            minHeight: '100vh'
        }}>
            <div style={{ textAlign: 'center', margin: "50px 0", fontWeight: "bold", fontSize: 50 }}>
                Đặt lịch dọn phòng
            </div>

            <Card style={{ marginBottom: 20 }}>
                <div style={{ marginBottom: 10, fontSize: 30, fontWeight: 500 }}>
                    Chọn loại dịch vụ
                </div>
                <Text type="secondary" style={{ marginBottom: 15, display: 'block' }}>
                    Chọn loại dịch vụ đơn dẹp phù hợp với nhu cầu của bạn
                </Text>

                <Select
                    value={serviceType}
                    onChange={handleServiceChange}
                    style={{ width: '100%' }}
                    size="large"
                >
                    <Option value="Dọn dẹp liều chuẩn">Dọn dẹp liều chuẩn</Option>
                    <Option value="Dọn dẹp cơ bản">Dọn dẹp cơ bản</Option>
                    <Option value="Dọn dẹp sâu">Dọn dẹp sâu</Option>
                </Select>
            </Card>

            <Card style={{ marginBottom: 20 }}>
                <div style={{ marginBottom: 10, fontSize: 30, fontWeight: 500 }}>
                    Chọn ngày và giờ
                </div>
                <Text type="secondary" style={{ marginBottom: 15, display: 'block' }}>
                    Chọn ngày và khung giờ bạn muốn dịch vụ được đặt:
                </Text>

                <Row gutter={24}>
                    <Col span={12}>
                        <Text strong style={{ display: 'block', marginBottom: 10 }}>
                            Ngày
                        </Text>
                        <DatePicker
                            placeholder='Chọn ngày'
                            style={{ width: '100%' }}
                            size="large"
                            format="DD/MM/YYYY"
                        />
                    </Col>
                    <Col span={12}>
                        <Text strong style={{ display: 'block', marginBottom: 10 }}>
                            Khung giờ
                        </Text>
                        <Row gutter={[8, 8]}>
                            {timeSlots.map((slot) => (
                                <Col span={12} key={slot.value}>
                                    <Button
                                        type={selectedTimeSlot === slot.value ? 'primary' : 'default'}
                                        style={{
                                            width: '100%',
                                            backgroundColor: selectedTimeSlot === slot.value ? '#41894b' : undefined,
                                            borderColor: selectedTimeSlot === slot.value ? '#41894b' : undefined
                                        }}
                                        onClick={() => handleTimeSlotClick(slot.value)}
                                    >
                                        {slot.label}
                                    </Button>
                                </Col>
                            ))}
                        </Row>
                    </Col>
                </Row>
            </Card>

            <Card style={{ marginBottom: 50 }}>
                <div style={{ marginBottom: 10, fontSize: 30, fontWeight: 500 }}>
                    Chi tiết bổ sung
                </div>
                <Text type="secondary" style={{ marginBottom: 15, display: 'block' }}>
                    Hãy cho chúng tôi biết bất kỳ yêu cầu hoặc hướng dẫn đặc biệt nào.
                </Text>

                <TextArea
                    rows={4}
                    placeholder="Ví dụ: Căn phòng năm ở tầng 3, vui lòng tránh làm phiền ban công phòng sau 5 giờ chiều."
                    style={{ width: '100%', marginBottom: 20 }}
                    onChange={e => setNote(e.target.value)}
                />
            </Card>

            <div style={{ textAlign: 'center', marginBottom: 70 }}>
                <Button
                    type="primary"
                    size="large"
                    onClick={handleSubmit}
                    style={{
                        backgroundColor: '#41894b',
                        borderColor: '#41894b',
                        paddingLeft: 40,
                        paddingRight: 40,
                        height: 45
                    }}
                >
                    Tiến hành thanh toán
                </Button>
            </div>
        </div>
    );
};

export default BookingPage;
