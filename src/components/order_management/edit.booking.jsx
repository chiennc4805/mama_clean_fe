import React, { useEffect, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Card, Col, DatePicker, Drawer, Form, Input, message, Row, Select, Space, TimePicker } from 'antd';
import dayjs from 'dayjs';
import { Typography } from "antd";
import TextArea from 'antd/es/input/TextArea';
import { fetchBookingByIdAPI, updateBookingAPI } from '../../services/api.service';
import { useNavigate } from 'react-router-dom';


const { Text } = Typography;
const { Option } = Select;


const EditBookingComponent = (props) => {

    const { open, setOpen, bookingId, setRefreshUpcoming } = props
    const [dataDetail, setDataDetail] = useState({})
    const [form] = Form.useForm()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const loadBookingDetail = async () => {
            const res = await fetchBookingByIdAPI(bookingId)
            if (res.data) {
                setDataDetail({
                    id: res.data.id,
                    name: res.data.name,
                    address: res.data.address,
                    addressLat: res.data.addressLat,
                    addressLon: res.data.addressLon,
                    status: res.data.status,
                    totalPrice: res.data.totalPrice,
                    note: res.data.note,
                    customer: res.data.customer,
                    cleaner: res.data.cleaner,
                    service: res.data.service
                })
                form.setFieldsValue({
                    service: res.data.service.name,
                    name: res.data.name,
                    duration: res.data.service.duration,
                    area: res.data.service.area,
                    date: dayjs(res.data.date, "DD/MM/YYYY"),
                    time: dayjs(res.data.startTime, "HH:mm"),
                    address: res.data.address,
                    note: res.data.note
                })
            } else {
                message.error("Lấy thông tin booking thất bại")
                setOpen(false)
            }
        }
        if (bookingId) {
            loadBookingDetail()
        }
    }, [bookingId])

    const handleUpdate = async (values) => {
        console.log(values)
        setLoading(true)
        const res = await updateBookingAPI(dataDetail.id, values.name, dataDetail.address, dataDetail.addressLat, dataDetail.addressLon, values.date.format("DD/MM/YYYY"), values.time.format("HH:mm:ss"), dataDetail.totalPrice, values.note, dataDetail.status, dataDetail.customer.id, dataDetail?.cleaner?.id || "", dataDetail.service.id)
        if (res.data) {
            setTimeout(() => {
                message.success("Chỉnh sửa đặt lịch thành công!")
                setTimeout(() => {
                    setRefreshUpcoming(prev => !prev)
                    setOpen(false)
                    setLoading(false)
                }, 1000)
            }, 2000)
        } else {
            message.error(res.message.trim())
            setLoading(false)
        }
    }

    const onClose = () => {
        setOpen(false);
    };
    return (
        <>
            <Drawer
                title="Chỉnh sửa đặt lịch"
                width={720}
                onClose={onClose}
                open={open}
                styles={{
                    body: {
                        paddingBottom: 80,
                    },
                }}
                placement={"left"}
                extra={
                    <Space>
                        <Button loading={loading} onClick={() => form.submit()} type="primary" style={{ backgroundColor: "#41864D" }}>
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
                >
                    <Card style={{ marginBottom: 20 }}>
                        <div style={{ marginBottom: 10, fontSize: 25, fontWeight: 500 }}>
                            Loại dịch vụ
                        </div>
                        <Form.Item
                            name={"service"}
                            rules={[
                                { required: true, message: 'Vui lòng chọn dịch vụ!' },
                            ]}
                        >
                            <Input
                                disabled
                                style={{ width: '100%' }}
                                size="large"
                            >
                            </Input>
                        </Form.Item>

                    </Card>

                    <Card style={{ marginBottom: 20 }}>
                        <div style={{ marginBottom: 10, fontSize: 25, fontWeight: 500 }}>
                            Thông tin lịch đặt
                        </div>

                        <Row gutter={24}>
                            <Col span={24}>
                                <Text strong style={{ display: 'block', marginBottom: 10 }}>
                                    Tên công việc (Mô tả ngắn gọn công việc)
                                </Text>
                                <Form.Item
                                    name={"name"}
                                    rules={[
                                        { required: true, message: 'Vui lòng điền mô tả!' },
                                        { max: 50, message: 'Tối đa 30 ký tự!' },
                                    ]}
                                >
                                    <Input
                                        style={{ width: '100%' }}
                                        size="large"
                                        placeholder='Dọn dẹp nhà bếp'
                                        showCount
                                        maxLength={50}
                                    >
                                    </Input>
                                </Form.Item>

                            </Col>

                            <Col span={6}>
                                <Text strong style={{ display: 'block', marginBottom: 10 }}>
                                    Diện tích (m²)
                                </Text>
                                <Form.Item
                                    name={"area"}
                                >
                                    <Input
                                        disabled
                                        style={{ width: '100%' }}
                                        size="large"
                                    >
                                    </Input>
                                </Form.Item>

                            </Col>
                            <Col span={6}>
                                <Text strong style={{ display: 'block', marginBottom: 10 }}>
                                    Thời lượng (giờ)
                                </Text>
                                <Form.Item
                                    name={"duration"}
                                >
                                    <Input
                                        disabled
                                        style={{ width: '100%' }}
                                        size="large"
                                    >
                                    </Input>
                                </Form.Item>

                            </Col>
                            <Col span={7}>
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
                                    />
                                </Form.Item>

                            </Col>
                            <Col span={5}>
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
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Card>

                    <Card >
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
                                disabled
                            />
                        </Form.Item>

                        <div style={{ marginBottom: 10, fontSize: 25, fontWeight: 500 }}>
                            Chi tiết bổ sung
                        </div>

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
                </Form>
            </Drawer>
        </>
    );
}

export default EditBookingComponent;