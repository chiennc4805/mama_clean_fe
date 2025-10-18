import { Button, Card, Col, DatePicker, Form, Input, InputNumber, Modal, Row, TimePicker, Typography } from 'antd';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';

const { Title, Text } = Typography;
const { TextArea } = Input;

const BookingProgress = (props) => {

    const { bookingInfo, setBookingInfo, setStep, step } = props
    const [form] = Form.useForm()

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
        if (!values.area || !values.duration) {
            Modal.error({
                title: 'Đặt lịch thất bại',
                content: 'Vui lòng chọn gói dịch vụ',
            });
            return;
        }
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
        <>
            <Form
                form={form}
                onFinish={handleBooking}
            >
                <div className="booking-container">
                    <div className="booking-header">
                        Đặt lịch dọn phòng
                    </div>

                    {/* Chọn dịch vụ */}
                    <Card className="booking-card" style={{ marginBottom: 20 }}>
                        <div className="card-title">
                            Chọn loại dịch vụ
                        </div>
                        <div className="card-description">
                            Chọn loại dịch vụ dọn dẹp phù hợp với nhu cầu của bạn
                        </div>

                        <div className="service-buttons-container">
                            {serviceOptions.map((service, idx) => (
                                <Button
                                    key={idx}
                                    onClick={() => handleServiceSelect(idx)}
                                    type={selectedServiceIdx === idx ? 'primary' : 'default'}
                                    className="service-button"
                                    style={{
                                        backgroundColor: selectedServiceIdx === idx ? '#41894b' : undefined,
                                        borderColor: selectedServiceIdx === idx ? '#41894b' : undefined,
                                        color: selectedServiceIdx === idx ? 'white' : undefined,
                                    }}
                                >
                                    <div className="service-button-name">{service.name}</div>
                                    {service.note && <div className="service-button-note">{service.note}</div>}
                                </Button>
                            ))}
                        </div>
                    </Card>

                    {/* Chọn gói hoặc diện tích */}
                    {selectedService && (
                        <Card className="booking-card" style={{ marginBottom: 20 }}>
                            <div className="card-title">
                                {isPackageType ? "Chọn gói dịch vụ" : "Điền số liệu dọn dẹp"}
                            </div>

                            {isPackageType ? (
                                <Row gutter={[16, 16]}>
                                    {selectedService.package.map((pkg, idx) => (
                                        <Col xs={24} sm={12} md={8} key={idx}>
                                            <Button
                                                onClick={() => handlePackageSelect(idx)}
                                                type={selectedPackageIdx === idx ? 'primary' : 'default'}
                                                className="package-button"
                                                style={{
                                                    backgroundColor: selectedPackageIdx === idx ? '#41894b' : undefined,
                                                    borderColor: selectedPackageIdx === idx ? '#41894b' : undefined,
                                                    color: selectedPackageIdx === idx ? 'white' : undefined,
                                                }}
                                            >
                                                <div className="package-button-main">
                                                    {pkg.area}m² - {pkg.price.toLocaleString()}đ
                                                </div>
                                                <div className="package-button-sub">
                                                    Thời lượng: {pkg.duration} giờ
                                                </div>
                                            </Button>
                                        </Col>
                                    ))}
                                </Row>
                            ) : (
                                <Row gutter={[16, 24]}>
                                    <Col xs={24} sm={12}>
                                        <div className="input-label">
                                            Diện tích (m²) <span className="input-label-note">**Tối thiểu 10 m²</span>
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

                                    <Col xs={24} sm={12}>
                                        <div className="input-label">
                                            Thời lượng (theo giờ) <span className="input-label-note">**Tối thiểu 1 giờ</span>
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
                        <Card className="booking-card price-info-card" style={{ marginBottom: 20 }}>
                            <Row gutter={[16, 16]}>
                                <Col xs={24} sm={12}>
                                    <div className="price-info-label">Giá dịch vụ</div>
                                    <div className="price-info-value">
                                        {price.toLocaleString()}đ
                                    </div>
                                </Col>
                                <Col xs={24} sm={12}>
                                    <div className="price-info-label">Thời gian dự kiến</div>
                                    <div className="price-info-value">
                                        {duration} giờ
                                    </div>
                                </Col>
                            </Row>
                        </Card>
                    )}

                    {/* Thông tin tổng quát */}
                    {selectedService && (
                        <>
                            <Card className="booking-card" style={{ marginBottom: 20 }}>
                                <div className="card-title">
                                    Điền thông tin lịch đặt
                                </div>
                                <div className="card-description">
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

                                <Row gutter={[16, 24]}>
                                    <Col xs={24}>
                                        <Text strong className="form-field-label">
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
                                            />
                                        </Form.Item>
                                    </Col>

                                    <Col xs={24} sm={15}>
                                        <Text strong className="form-field-label">
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

                                    <Col xs={24} sm={9}>
                                        <Text strong className="form-field-label">
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
                                                style={{ width: '100%' }}
                                                onChange={(time) => setFormData({ ...formData, time })}
                                            />
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </Card>

                            {/* Địa chỉ */}
                            <Card className="booking-card" style={{ marginBottom: 20 }}>
                                <div className="card-title">
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

                                <div className="card-title">
                                    Chi tiết bổ sung
                                </div>
                                <div className="card-description">
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
                            <div className="submit-button-container">
                                <Button
                                    type="primary"
                                    htmlType='submit'
                                    size="large"
                                    className="submit-button"
                                >
                                    Tiến hành thanh toán
                                </Button>
                            </div>
                        </>
                    )}
                </div>
            </Form>

            <style jsx>{`
                /* Container */
                .booking-container {
                    max-width: 70%;
                    margin: 0 auto;
                    padding: 20px;
                    backgroundColor: #f5f5f5;
                    minHeight: 100vh;
                }

                /* Header */
                .booking-header {
                    text-align: center;
                    margin: clamp(30px, 8vw, 50px) 0;
                    font-weight: bold;
                    font-size: clamp(28px, 5vw, 40px);
                    color: #2c3e50;
                }

                /* Card Styles */
                .booking-card {
                    border-radius: 12px;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.08);
                }

                .card-title {
                    margin-bottom: 10px;
                    font-size: clamp(20px, 3vw, 25px);
                    font-weight: 500;
                    color: #2c3e50;
                }

                .card-description {
                    margin-bottom: 15px;
                    color: #666;
                    font-size: clamp(14px, 1.8vw, 16px);
                }

                /* Service Buttons */
                .service-buttons-container {
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                }

                .service-button {
                    padding: 12px 16px;
                    height: auto;
                    white-space: normal;
                    text-align: left;
                    display: flex;
                    flex-direction: column;
                    align-items: flex-start;
                    transition: all 0.3s ease;
                }

                .service-button:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
                }

                .service-button-name {
                    font-weight: 500;
                    font-size: clamp(14px, 1.8vw, 16px);
                    width: 100%;
                }

                .service-button-note {
                    font-size: clamp(11px, 1.5vw, 12px);
                    margin-top: 8px;
                    opacity: 0.8;
                    width: 100%;
                }

                /* Package Buttons */
                .package-button {
                    width: 100%;
                    height: auto;
                    padding: 16px;
                    transition: all 0.3s ease;
                }

                .package-button:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
                }

                .package-button-main {
                    font-weight: 500;
                    font-size: clamp(14px, 1.8vw, 16px);
                }

                .package-button-sub {
                    font-size: clamp(11px, 1.5vw, 12px);
                    margin-top: 4px;
                }

                /* Input Labels */
                .input-label {
                    margin-bottom: 10px;
                    font-weight: 500;
                    font-size: clamp(14px, 1.8vw, 16px);
                }

                .input-label-note {
                    font-size: clamp(11px, 1.5vw, 12px);
                    color: #999;
                    font-weight: 400;
                }

                /* Price Info Card */
                .price-info-card {
                    background-color: #f0f8f5 !important;
                }

                .price-info-label {
                    margin-bottom: 5px;
                    color: #666;
                    font-size: clamp(13px, 1.8vw, 15px);
                }

                .price-info-value {
                    font-size: clamp(20px, 3vw, 24px);
                    font-weight: bold;
                    color: #41894b;
                }

                /* Form Field Label */
                .form-field-label {
                    display: block;
                    margin-bottom: 10px;
                    font-size: clamp(14px, 1.8vw, 16px);
                }

                /* Submit Button */
                .submit-button-container {
                    text-align: center;
                    margin-bottom: clamp(40px, 8vw, 70px);
                    padding: 0 20px;
                }

                .submit-button {
                    background-color: #41894b;
                    border-color: #41894b;
                    padding: 0 clamp(30px, 5vw, 40px);
                    height: clamp(42px, 6vw, 45px);
                    font-size: clamp(14px, 2vw, 16px);
                    font-weight: 500;
                    border-radius: 8px;
                    transition: all 0.3s ease;
                    min-width: 200px;
                }

                .submit-button:hover {
                    background-color: #357a3d !important;
                    border-color: #357a3d !important;
                    transform: translateY(-2px);
                    box-shadow: 0 4px 12px rgba(65, 137, 75, 0.3);
                }

                /* Responsive Breakpoints */
                @media (max-width: 768px) {
                    .booking-container {
                        max-width: 95%;
                        padding: 15px;
                    }

                    .booking-card {
                        margin-bottom: 15px !important;
                    }

                    .service-button {
                        padding: 14px;
                    }

                    .package-button {
                        padding: 14px;
                    }
                }

                @media (max-width: 576px) {
                    .booking-container {
                        padding: 10px;
                    }

                    .booking-card .ant-card-body {
                        padding: 16px;
                    }

                    .submit-button-container {
                        padding: 0 10px;
                    }

                    .submit-button {
                        width: 100%;
                        max-width: 100%;
                    }
                }

                /* Animation */
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .booking-card {
                    animation: fadeIn 0.4s ease-out;
                }
            `}</style>
        </>
    );
};

export default BookingProgress;