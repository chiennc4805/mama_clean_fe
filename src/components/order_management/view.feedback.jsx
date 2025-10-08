import React, { useEffect, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Card, Col, DatePicker, Drawer, Form, Input, message, Rate, Row, Select, Space, TimePicker } from 'antd';
import dayjs from 'dayjs';
import { Typography } from "antd";
import TextArea from 'antd/es/input/TextArea';
import { createFeedBackAPI, fetchBookingByIdAPI, updateBookingAPI } from '../../services/api.service';
import { useNavigate } from 'react-router-dom';


const ViewFeedbackComponent = (props) => {

    const { open, setOpen, bookingId } = props
    const [form] = Form.useForm()

    useEffect(() => {
        const loadBookingDetail = async () => {
            const res = await fetchBookingByIdAPI(bookingId)
            if (res.data) {
                form.setFieldsValue({
                    content: res.data?.feedback?.content || "",
                    rating: res.data?.feedback?.rating || 0,
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

    const onClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Drawer
                title="Xem đánh giá của bạn"
                width={720}
                onClose={onClose}
                open={open}
                styles={{
                    body: {
                        paddingBottom: 80,
                    },
                }}
                placement={"right"}
            >
                <Form
                    layout="vertical"
                    hideRequiredMark
                    form={form}
                >
                    <div style={{ marginBottom: 10, fontSize: 15 }}>
                        Nội dung phản hồi
                    </div>
                    <Form.Item
                        name={"content"}
                        rules={[
                            { required: true, message: 'Vui lòng chọn dịch vụ!' },
                        ]}
                    >
                        <TextArea
                            readOnly
                            style={{ width: '100%' }}
                            size="large"
                            rows={6}
                            placeholder="Chia sẻ suy nghĩ của bạn về dịch vụ của chúng tôi"
                        >
                        </TextArea>
                    </Form.Item>

                    <div style={{ marginBottom: 10, fontSize: 15 }}>
                        Đánh giá của bạn
                    </div>
                    <Form.Item
                        name={"rating"}
                        rules={[
                            { required: true, message: 'Vui lòng chọn dịch vụ!' },
                        ]}
                    >
                        <Rate
                            disabled
                            onChange={(value) => handleChange('rating', value)}
                            style={{ fontSize: '32px' }}
                            allowHalf
                        />
                    </Form.Item>
                </Form>
            </Drawer>
        </>
    );
}

export default ViewFeedbackComponent;