import { Button, Card, Col, DatePicker, Form, Input, Row, Select, TimePicker, Typography } from 'antd';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { fetchAllServicesWithoutPagination } from '../../services/api.service';

const { Title, Text } = Typography;
const { Option } = Select;
const { TextArea } = Input;

const BookingProgress = (props) => {

    const { bookingInfo, setBookingInfo, setStep } = props
    const [form] = Form.useForm()
    const [servicesOption, setServicesOption] = useState([]);


    useEffect(() => {
        form.setFieldsValue({
            service: bookingInfo.service || "",
            area: bookingInfo.area,
            date: bookingInfo.date,
            time: bookingInfo.time,
            address: bookingInfo.address,
            note: bookingInfo.note
        })

        const loadService = async () => {
            const res = await fetchAllServicesWithoutPagination()
            if (res.data) {
                setServicesOption(res.data.result.map(x => ({ label: x.name, value: x.id })))
            }
        }
        loadService()
    }, [])

    const handleBooking = (values) => {
        //calculate price
        let price
        const serviceName = values.service.label

        if (serviceName === "Dọn dẹp cơ bản") {
            price = 100000
        } else if (serviceName === "Dọn dẹp tiêu chuẩn") {
            price = 200000
        } else {
            price = 300000
        }

        setBookingInfo({
            serviceId: values.service.value,
            serviceName: values.service.label,
            area: values.area,
            date: values.date,
            time: values.time,
            address: values.address,
            note: values.note,
            price: price
        })
        setStep("payment")
    }


    return (
        <div style={{
            maxWidth: "90%",
            margin: '0 auto',
            padding: '20px',
            backgroundColor: '#f5f5f5',
            minHeight: '100vh'
        }}>
            <Form
                form={form}
                onFinish={handleBooking}
            >
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
                    <Form.Item
                        name={"service"}
                    >
                        <Select
                            style={{ width: '100%' }}
                            size="large"
                            options={servicesOption}
                            labelInValue
                        >
                        </Select>
                    </Form.Item>

                </Card>

                <Card style={{ marginBottom: 20 }}>
                    <div style={{ marginBottom: 10, fontSize: 30, fontWeight: 500 }}>
                        Điền thông tin lịch đặt
                    </div>
                    <Text type="secondary" style={{ marginBottom: 15, display: 'block' }}>
                        Chọn ngày và khung giờ bạn muốn dịch vụ được đặt:
                    </Text>

                    <Row gutter={24}>
                        <Col span={8}>
                            <Text strong style={{ display: 'block', marginBottom: 10 }}>
                                Diện tích (m2)
                            </Text>
                            <Form.Item
                                name={"area"}
                            >
                                <Input
                                    placeholder='Diện tích phòng'
                                    style={{ width: '100%' }}
                                    size="large"
                                />
                            </Form.Item>

                        </Col>
                        <Col span={8}>
                            <Text strong style={{ display: 'block', marginBottom: 10 }}>
                                Ngày
                            </Text>

                            <Form.Item
                                name={"date"}
                            >
                                <DatePicker
                                    placeholder='Chọn ngày'
                                    style={{ width: '100%' }}
                                    size="large"
                                    format="DD/MM/YYYY"
                                />
                            </Form.Item>

                        </Col>
                        <Col span={8}>
                            <Text strong style={{ display: 'block', marginBottom: 10 }}>
                                Giờ
                            </Text>

                            <Form.Item
                                name={"time"}
                            >
                                <TimePicker
                                    defaultOpenValue={dayjs('00:00:00', 'HH:mm:ss')}
                                    size='large'
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                </Card>

                <Card style={{ marginBottom: 50 }}>
                    <div style={{ marginBottom: 10, fontSize: 30, fontWeight: 500 }}>
                        Địa chỉ dọn dẹp
                    </div>
                    <Form.Item
                        name={"address"}
                    >
                        <TextArea
                            rows={4}
                            placeholder="Số nhà, Xóm, Xã,..."
                            style={{ width: '100%', marginBottom: 20 }}
                        />
                    </Form.Item>

                    <div style={{ marginBottom: 10, fontSize: 30, fontWeight: 500 }}>
                        Chi tiết bổ sung
                    </div>
                    <Text type="secondary" style={{ marginBottom: 15, display: 'block' }}>
                        Hãy cho chúng tôi biết bất kỳ yêu cầu hoặc hướng dẫn đặc biệt nào.
                    </Text>

                    <Form.Item
                        name={"note"}
                    >
                        <TextArea
                            rows={4}
                            placeholder="Ví dụ: Căn phòng năm ở tầng 3, vui lòng tránh làm phiền ban công phòng sau 5 giờ chiều."
                            style={{ width: '100%', marginBottom: 20 }}
                        />
                    </Form.Item>
                </Card>

                <div style={{ textAlign: 'center', marginBottom: 70 }}>
                    <Button
                        type="primary"
                        htmlType='submit'
                        size="large"
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
            </Form>
        </div>
    );
};

export default BookingProgress;
