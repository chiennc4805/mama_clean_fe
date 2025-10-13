import { Button, Card, Col, DatePicker, Form, Input, InputNumber, Modal, Row, Select, TimePicker, Typography } from 'antd';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { fetchAllServicesWithoutPagination, fetchServiceById } from '../../services/api.service';

const { Title, Text } = Typography;
const { Option } = Select;
const { TextArea } = Input;

const BookingProgress = (props) => {

    const { bookingInfo, setBookingInfo, setStep, step } = props
    const [form] = Form.useForm()

    //-----------------------------new------------------------------------
    const serviceOptions = [
        {
            name: "Dọn dẹp cơ bản theo gói, dành cho các phòng trọ",
            type: "package",
            package: [
                { area: 20, price: 180000, duration: 2 },
                { area: 30, price: 200000, duration: 2 },
                { area: 40, price: 220000, duration: 2 },
            ],
            note: ""
        },
        {
            name: "Dọn dẹp cơ bản theo giờ, dành cho nhà ở, văn phòng",
            type: "hourly",
            package: [
                { price: 7500 }
            ],
            note: "Nội thất bình thường, không quá bẩn"
        },
        {
            name: "Dọn dẹp trung bình theo giờ, dành cho nhà ở, văn phòng",
            type: "hourly",
            package: [
                { price: 8500 }
            ],
            note: "Nội thất phức tạp nhiều hoa văn, có nhiều vị trí khó lau, độ sâu vệ sinh cao hơn"
        },
        {
            name: "Dọn dẹp chuyên sâu theo giờ, dành cho nhà ở, văn phòng",
            type: "hourly",
            package: [
                { price: 10000 }
            ],
            note: "Sạch kỹ, tẩy vết bẩn, vệ sinh sau xây dựng hoặc sau dịp dài không dọn"
        },
    ];

    const [selectedServiceIdx, setSelectedServiceIdx] = useState(null);
    const [selectedPackageIdx, setSelectedPackageIdx] = useState(null);
    const [formData, setFormData] = useState({
        serviceName: "",
        jobName: '',
        area: null,
        date: null,
        time: null,
        duration: null,
        address: '',
        note: '',
        totalPrice: null
    });
    const [price, setPrice] = useState(null);
    const [duration, setDuration] = useState(null);
    const selectedService = selectedServiceIdx !== null ? serviceOptions[selectedServiceIdx] : null;
    const isPackageType = selectedService?.type === "package";

    const handleServiceSelect = (index) => {
        const service = serviceOptions[index];
        setSelectedServiceIdx(index);
        setSelectedPackageIdx(null);
        setPrice(null);
        setDuration(null);
        form.setFieldsValue({
            area: null,
            duration: null,
            areaFake: null,
            durationFake: null,
            serviceName: service.name,
            totalPrice: null
        });
    };

    const handlePackageSelect = (index) => {
        setSelectedPackageIdx(index);
        const pkg = selectedService.package[index];
        form.setFieldsValue({
            area: pkg.area,
            duration: pkg.duration,
            totalPrice: pkg.price
        });
        setPrice(pkg.price);
        setDuration(pkg.duration);
    };

    const handleAreaChange = (value) => {
        form.setFieldsValue({ area: value })
        const duration = form.getFieldValue("duration");
        const selectedService = serviceOptions[selectedServiceIdx];
        if (!isPackageType && selectedService && value && duration) {
            const basePrice = selectedService.package[0].price;
            const totalPrice = basePrice * value * duration;
            form.setFieldsValue({ totalPrice: totalPrice });
            setPrice(totalPrice);
        } else {
            form.setFieldsValue({ totalPrice: null });
            setPrice(null);
        }
    };

    const handleDurationChange = (value) => {
        form.setFieldsValue({ duration: value })
        setDuration(value)
        const area = form.getFieldValue("area");
        const selectedService = serviceOptions[selectedServiceIdx];
        if (!isPackageType && selectedService && area && value) {
            const basePrice = selectedService.package[0].price;
            const totalPrice = basePrice * area * value;
            form.setFieldsValue({ totalPrice: totalPrice });
            setPrice(totalPrice);
        } else {
            form.setFieldsValue({ totalPrice: null });
            setPrice(null);
        }
    };


    useEffect(() => {
        setSelectedServiceIdx(bookingInfo.selectedServiceIdx)
        setSelectedPackageIdx(bookingInfo.selectedPackageIdx)
        setPrice(bookingInfo.price)
        setDuration(bookingInfo.duration)
        form.setFieldsValue({
            jobName: bookingInfo.name,
            date: bookingInfo.date,
            time: bookingInfo.time,
            address: bookingInfo.address,
            note: bookingInfo.note,
            totalPrice: bookingInfo.price,
            area: bookingInfo.area,
            duration: bookingInfo.duration,
            serviceName: bookingInfo.serviceName,
            areaFake: bookingInfo.selectedPackageIdx ? "" : bookingInfo.area,
            durationFake: bookingInfo.selectedPackageIdx ? "" : bookingInfo.duration,
        })
    }, [step])

    const handleBooking = async (values) => {
        console.log(selectedServiceIdx)
        console.log(values)
        setBookingInfo({
            selectedServiceIdx: selectedServiceIdx,
            selectedPackageIdx: selectedPackageIdx,
            name: values.jobName,
            serviceName: values.serviceName,
            duration: values.duration,
            area: values.area,
            date: values.date,
            time: values.time,
            address: values.address,
            note: values.note,
            price: values.totalPrice
        })
        setStep("payment")
    }

    return (
        <Form
            form={form}
            onFinish={handleBooking}
        >
            <div style={{ maxWidth: "90%", margin: '0 auto', padding: '20px', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
                <div style={{ textAlign: 'center', margin: "50px 0", fontWeight: "bold", fontSize: 40 }}>
                    Đặt lịch dọn phòng
                </div>

                {/* Chọn dịch vụ */}
                <Card style={{ marginBottom: 20 }}>
                    <div style={{ marginBottom: 10, fontSize: 25, fontWeight: 500 }}>
                        Chọn loại dịch vụ
                    </div>
                    <div style={{ marginBottom: 15, color: '#666' }}>
                        Chọn loại dịch vụ dọn dẹp phù hợp với nhu cầu của bạn
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                        {serviceOptions.map((service, idx) => (
                            <Button
                                key={idx}
                                onClick={() => handleServiceSelect(idx)}
                                type={selectedServiceIdx === idx ? 'primary' : 'default'}
                                style={{
                                    padding: '12px 16px',
                                    height: 'auto',
                                    whiteSpace: 'normal',
                                    textAlign: 'left',
                                    backgroundColor: selectedServiceIdx === idx ? '#41894b' : undefined,
                                    borderColor: selectedServiceIdx === idx ? '#41894b' : undefined,
                                    color: selectedServiceIdx === idx ? 'white' : undefined,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                }}
                            >
                                <div style={{ fontWeight: 500 }}>{service.name}</div>
                                {service.note && <div style={{ fontSize: 12, marginTop: 8, opacity: 0.8 }}>{service.note}</div>}
                            </Button>
                        ))}
                    </div>
                </Card>

                {/* Chọn gói hoặc diện tích */}
                {selectedService && (
                    <Card style={{ marginBottom: 20 }}>
                        <div style={{ marginBottom: 10, fontSize: 25, fontWeight: 500 }}>
                            {isPackageType ? "Chọn gói dịch vụ" : "Điền số liệu dọn dẹp"}
                        </div>

                        {isPackageType ? (
                            <Row gutter={[16, 16]}>
                                {selectedService.package.map((pkg, idx) => (
                                    <Col span={8} key={idx}>
                                        <Button
                                            onClick={() => handlePackageSelect(idx)}
                                            type={selectedPackageIdx === idx ? 'primary' : 'default'}
                                            style={{
                                                width: '100%',
                                                height: 'auto',
                                                padding: '16px',
                                                backgroundColor: selectedPackageIdx === idx ? '#41894b' : undefined,
                                                borderColor: selectedPackageIdx === idx ? '#41894b' : undefined,
                                                color: selectedPackageIdx === idx ? 'white' : undefined,
                                            }}
                                        >
                                            <div style={{ fontWeight: 500 }}>
                                                {pkg.area}m² - {pkg.price.toLocaleString()}đ
                                            </div>
                                            <div style={{ fontSize: 12, marginTop: 4 }}>
                                                Thời lượng: {pkg.duration} giờ
                                            </div>
                                        </Button>
                                    </Col>
                                ))}
                            </Row>
                        ) : (
                            <Row gutter={24}>
                                <Col span="12">
                                    <div style={{ marginBottom: 10, fontWeight: 500 }}>
                                        Diện tích (m²) **Tối thiểu 10 m²
                                    </div>
                                    <Form.Item
                                        name={"areaFake"}
                                        rules={[
                                            { required: true, message: "Vui lòng nhập diện tích" },
                                        ]}
                                    >
                                        <InputNumber
                                            placeholder="Nhập diện tích (m²)"
                                            onChange={handleAreaChange}
                                            style={{ width: '100%' }}
                                            size="large"
                                            addonAfter="m²"
                                            min={10}
                                        />
                                    </Form.Item>
                                </Col>

                                <Col span="12">
                                    <div style={{ marginBottom: 10, fontWeight: 500 }}>
                                        Thời lượng (theo giờ) **Tối thiểu 1 giờ
                                    </div>
                                    <Form.Item
                                        name={"durationFake"}
                                        rules={[
                                            { required: true, message: "Vui lòng nhập thời lượng" },
                                        ]}
                                    >
                                        <InputNumber
                                            placeholder="Nhập thời lượng (giờ)"
                                            onChange={handleDurationChange}
                                            style={{ width: '100%' }}
                                            size="large"
                                            addonAfter="h"
                                            min={1}
                                        />
                                    </Form.Item>
                                </Col>
                            </Row>
                        )}
                    </Card>
                )}

                {/* Thông tin giá và thời gian */}
                {price && duration && (
                    <Card style={{ marginBottom: 20, backgroundColor: '#f0f8f5' }}>
                        <Row gutter={24}>
                            <Col span={12}>
                                <div style={{ marginBottom: 5, color: '#666' }}>Giá dịch vụ</div>
                                <div style={{ fontSize: 24, fontWeight: 'bold', color: '#41894b' }}>
                                    {price.toLocaleString()}đ
                                </div>
                            </Col>
                            <Col span={12}>
                                <div style={{ marginBottom: 5, color: '#666' }}>Thời gian dự kiến</div>
                                <div style={{ fontSize: 24, fontWeight: 'bold', color: '#41894b' }}>
                                    {duration} giờ
                                </div>
                            </Col>
                        </Row>
                    </Card>
                )}

                {/* Thông tin tổng quát */}
                {selectedService && (
                    <>
                        <Card style={{ marginBottom: 20 }}>
                            <div style={{ marginBottom: 10, fontSize: 25, fontWeight: 500 }}>
                                Điền thông tin lịch đặt
                            </div>
                            <div style={{ marginBottom: 20, color: '#666' }}>
                                Chọn ngày và khung giờ bạn muốn dịch vụ được đặt
                            </div>
                            <Form.Item name="area" hidden>
                                <Input type="hidden" />
                            </Form.Item>

                            <Form.Item name="duration" hidden>
                                <Input type="hidden" />
                            </Form.Item>

                            <Form.Item name="serviceName" hidden>
                                <Input type="hidden" />
                            </Form.Item>

                            <Form.Item name="totalPrice" hidden>
                                <Input type="hidden" />
                            </Form.Item>

                            <Row gutter={24}>
                                <Col span={24}>
                                    <Text strong style={{ display: 'block', marginBottom: 10 }}>
                                        Tên công việc (Mô tả ngắn gọn công việc)
                                    </Text>
                                    <Form.Item
                                        name={"jobName"}
                                        rules={[
                                            { required: true, message: 'Vui lòng điền tên công việc!' },
                                            { max: 50, message: 'Tối đa 50 ký tự!' },
                                        ]}
                                    >
                                        <Input
                                            style={{ width: '100%' }}
                                            size="large"
                                            placeholder='Dọn dẹp nhà bếp'
                                            showCount
                                            maxLength={50}
                                            onChange={(e) => setFormData({ ...formData, jobName: e.target.value })}
                                        >
                                        </Input>
                                    </Form.Item>

                                </Col>
                                <Col span={9}>
                                    <Text strong style={{ display: 'block', marginBottom: 10 }}>
                                        Ngày
                                    </Text>

                                    <Form.Item
                                        name={"date"}
                                        rules={[
                                            { required: true, message: 'Vui lòng chọn ngày!' },
                                        ]}
                                    >
                                        <DatePicker
                                            placeholder='Chọn ngày'
                                            style={{ width: '100%' }}
                                            size="large"
                                            format="DD/MM/YYYY"
                                            minDate={dayjs()}
                                            onChange={(date) => setFormData({ ...formData, date })}
                                        />
                                    </Form.Item>

                                </Col>
                                <Col span={6}>
                                    <Text strong style={{ display: 'block', marginBottom: 10 }}>
                                        Giờ
                                    </Text>

                                    <Form.Item
                                        name={"time"}
                                        rules={[
                                            { required: true, message: 'Vui lòng chọn giờ!' },
                                        ]}
                                    >
                                        <TimePicker
                                            size='large'
                                            format={"HH:mm"}
                                            onChange={(time) => setFormData({ ...formData, time })}
                                        // disabledHours={() => {
                                        //     const hours = [];
                                        //     for (let i = 0; i < 8; i++) hours.push(i); // disable trước 8h
                                        //     for (let i = 21; i < 24; i++) hours.push(i); // disable sau 20h
                                        //     return hours;
                                        // }}
                                        // disabledMinutes={(selectedHour) => {
                                        //     if (selectedHour === 8) return Array.from({ length: 60 }, (_, i) => i < 0 ? i : -1).filter(i => i < 0); // không disable phút nào lúc 8h
                                        //     if (selectedHour === 20) return Array.from({ length: 60 }, (_, i) => i > 0 ? i : -1).filter(i => i > 0); // không disable phút nào lúc 20h
                                        //     return [];
                                        // }}
                                        />
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Card>

                        {/* Địa chỉ */}
                        <Card style={{ marginBottom: 20 }}>
                            <div style={{ marginBottom: 10, fontSize: 25, fontWeight: 500 }}>
                                Địa chỉ dọn dẹp
                            </div>
                            <Form.Item
                                name={"address"}
                                rules={[
                                    { required: true, message: 'Vui lòng điền địa chỉ!' },
                                ]}
                            >
                                <TextArea
                                    rows={4}
                                    placeholder="Số nhà, Xóm, Xã,..."
                                    style={{ width: '100%', marginBottom: 20 }}
                                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                />
                            </Form.Item>

                            <div style={{ marginBottom: 10, fontSize: 25, fontWeight: 500 }}>
                                Chi tiết bổ sung
                            </div>
                            <div style={{ marginBottom: 15, color: '#666' }}>
                                Hãy cho chúng tôi biết bất kỳ yêu cầu hoặc hướng dẫn đặc biệt nào
                            </div>
                            <Form.Item
                                name={"note"}
                            >
                                <TextArea
                                    rows={4}
                                    placeholder="Ví dụ: Căn phòng năm ở tầng 3, vui lòng tránh làm phiền ban công phòng sau 5 giờ chiều."
                                    style={{ width: '100%', marginBottom: 20 }}
                                    onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                                />
                            </Form.Item>
                        </Card>

                        {/* Nút submit */}
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
                                    height: 45,
                                    fontSize: 16,
                                }}
                            >
                                Tiến hành thanh toán
                            </Button>
                        </div>
                    </>
                )}
            </div>
        </Form>

    );
};

export default BookingProgress;
