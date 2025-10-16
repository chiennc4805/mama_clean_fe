import React, { useEffect, useState } from 'react';
import { Button, Card, Col, DatePicker, Drawer, Form, Input, message, Row, Space, TimePicker } from 'antd';
import dayjs from 'dayjs';
import { Typography } from "antd";
import TextArea from 'antd/es/input/TextArea';
import { fetchBookingByIdAPI, updateBookingAPI } from '../../services/api.service';

const { Text } = Typography;

const EditBookingComponent = (props) => {
    const { open, setOpen, bookingId, setRefreshUpcoming } = props;
    const [dataDetail, setDataDetail] = useState({});
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const loadBookingDetail = async () => {
            const res = await fetchBookingByIdAPI(bookingId);
            if (res.data) {
                setDataDetail(res.data);
                form.setFieldsValue({
                    service: res.data.service.name,
                    name: res.data.name,
                    duration: res.data.service.duration,
                    area: res.data.service.area,
                    date: dayjs(res.data.date, "DD/MM/YYYY"),
                    time: dayjs(res.data.startTime, "HH:mm"),
                    address: res.data.address,
                    note: res.data.note
                });
            } else {
                message.error("Lấy thông tin booking thất bại");
                setOpen(false);
            }
        };
        if (bookingId) loadBookingDetail();
    }, [bookingId]);

    const handleUpdate = async (values) => {
        setLoading(true);
        const res = await updateBookingAPI(
            dataDetail.id,
            values.name,
            dataDetail.address,
            dataDetail.addressLat,
            dataDetail.addressLon,
            values.date.format("DD/MM/YYYY"),
            values.time.format("HH:mm:ss"),
            dataDetail.totalPrice,
            values.note,
            dataDetail.status,
            dataDetail.customer.id,
            dataDetail?.cleaner?.id || "",
            dataDetail.service.id
        );

        if (res.data) {
            message.success("Chỉnh sửa đặt lịch thành công!");
            setTimeout(() => {
                setRefreshUpcoming(prev => !prev);
                setOpen(false);
                setLoading(false);
            }, 1500);
        } else {
            message.error(res.message.trim());
            setLoading(false);
        }
    };

    return (
        <Drawer
            title="Chỉnh sửa đặt lịch"
            width={window.innerWidth < 768 ? "100vw" : 720}
            onClose={() => setOpen(false)}
            open={open}
            styles={{
                body: {
                    paddingBottom: 80,
                    padding: window.innerWidth < 600 ? "10px" : "24px"
                },
                header: {
                    fontSize: window.innerWidth < 600 ? "18px" : "22px",
                    padding: "12px 20px"
                }
            }}
            placement={"left"}
            extra={
                <Space>
                    <Button
                        loading={loading}
                        onClick={() => form.submit()}
                        type="primary"
                        style={{
                            backgroundColor: "#41864D",
                            borderRadius: 8,
                            fontSize: window.innerWidth < 600 ? 13 : 15,
                            height: window.innerWidth < 600 ? 38 : 45,
                            padding: "0 16px"
                        }}
                    >
                        Lưu thay đổi
                    </Button>
                </Space>
            }
        >
            <Form
                layout="vertical"
                hideRequiredMark
                form={form}
                onFinish={handleUpdate}
                style={{
                    fontSize: window.innerWidth < 600 ? 13 : 15
                }}
            >
                <Card
                    style={{
                        marginBottom: 20,
                        borderRadius: 12,
                        boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
                    }}
                >
                    <div style={{
                        marginBottom: 10,
                        fontSize: window.innerWidth < 600 ? 18 : 22,
                        fontWeight: 600
                    }}>
                        Loại dịch vụ
                    </div>
                    <Form.Item
                        name="service"
                        rules={[{ required: true, message: 'Vui lòng chọn dịch vụ!' }]}
                    >
                        <Input disabled size="large" style={{ borderRadius: 8 }} />
                    </Form.Item>
                </Card>

                <Card
                    style={{
                        marginBottom: 20,
                        borderRadius: 12,
                        boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
                    }}
                >
                    <div style={{
                        marginBottom: 10,
                        fontSize: window.innerWidth < 600 ? 18 : 22,
                        fontWeight: 600
                    }}>
                        Thông tin lịch đặt
                    </div>

                    <Row gutter={[16, 16]}>
                        <Col xs={24}>
                            <Text strong style={{ display: 'block', marginBottom: 10 }}>Tên công việc</Text>
                            <Form.Item
                                name="name"
                                rules={[
                                    { required: true, message: 'Vui lòng điền mô tả!' },
                                    { max: 50, message: 'Tối đa 50 ký tự!' }
                                ]}
                            >
                                <Input placeholder="Dọn dẹp nhà bếp" showCount maxLength={50} size="large" style={{ borderRadius: 8 }} />
                            </Form.Item>
                        </Col>

                        <Col xs={12} sm={6}>
                            <Text strong style={{ display: 'block', marginBottom: 10 }}>Diện tích (m²)</Text>
                            <Form.Item name="area">
                                <Input disabled size="large" style={{ borderRadius: 8 }} />
                            </Form.Item>
                        </Col>

                        <Col xs={12} sm={6}>
                            <Text strong style={{ display: 'block', marginBottom: 10 }}>Thời lượng (giờ)</Text>
                            <Form.Item name="duration">
                                <Input disabled size="large" style={{ borderRadius: 8 }} />
                            </Form.Item>
                        </Col>

                        <Col xs={12} sm={6}>
                            <Text strong style={{ display: 'block', marginBottom: 10 }}>Ngày</Text>
                            <Form.Item
                                name="date"
                                rules={[{ required: true, message: 'Vui lòng chọn ngày!' }]}
                            >
                                <DatePicker
                                    format="DD/MM/YYYY"
                                    size="large"
                                    style={{ width: "100%", borderRadius: 8 }}
                                />
                            </Form.Item>
                        </Col>

                        <Col xs={12} sm={6}>
                            <Text strong style={{ display: 'block', marginBottom: 10 }}>Giờ</Text>
                            <Form.Item
                                name="time"
                                rules={[{ required: true, message: 'Vui lòng chọn giờ!' }]}
                            >
                                <TimePicker
                                    format="HH:mm"
                                    size="large"
                                    style={{ width: "100%", borderRadius: 8 }}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                </Card>

                <Card
                    style={{
                        borderRadius: 12,
                        boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
                    }}
                >
                    <div style={{
                        marginBottom: 10,
                        fontSize: window.innerWidth < 600 ? 18 : 22,
                        fontWeight: 600
                    }}>
                        Địa chỉ dọn dẹp
                    </div>
                    <Form.Item name="address" rules={[{ required: true, message: 'Vui lòng điền địa chỉ!' }]}>
                        <TextArea rows={4} disabled style={{ borderRadius: 8, padding: 10 }} />
                    </Form.Item>

                    <div style={{
                        marginBottom: 10,
                        fontSize: window.innerWidth < 600 ? 18 : 22,
                        fontWeight: 600
                    }}>
                        Chi tiết bổ sung
                    </div>
                    <Form.Item name="note">
                        <TextArea
                            rows={4}
                            placeholder="Ghi chú thêm..."
                            style={{ borderRadius: 8, padding: 10 }}
                        />
                    </Form.Item>
                </Card>
            </Form>
        </Drawer>
    );
};

export default EditBookingComponent;
