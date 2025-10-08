import React, { useEffect, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Card, Col, DatePicker, Drawer, Form, Input, message, Rate, Row, Select, Space, TimePicker } from 'antd';
import dayjs from 'dayjs';
import { Typography } from "antd";
import TextArea from 'antd/es/input/TextArea';
import { createFeedBackAPI, deleteFeedbackAPI, updateCleanerRatingAPI } from '../../services/api.service';
import { useNavigate } from 'react-router-dom';


const { Text } = Typography;
const { Option } = Select;


const CreateFeedbackComponent = (props) => {

    const { open, setOpen, bookingId, setRefreshHistory, cleanerUserId } = props
    const [form] = Form.useForm()
    const [loading, setLoading] = useState(false)

    const handleCreate = async (values) => {
        console.log(values)
        setLoading(true)
        const res = await createFeedBackAPI(values.content, values.rating, bookingId)
        if (res.data) {
            const resUpdateRating = await updateCleanerRatingAPI(cleanerUserId, values.rating)
            if (resUpdateRating.data) {
                setTimeout(() => {
                    message.success("Đánh giá thành công!")
                    setTimeout(() => {
                        setRefreshHistory(prev => !prev)
                        setOpen(false)
                        setLoading(false)
                    }, 1000)
                }, 2000)
            }
            else {
                await deleteFeedbackAPI(res.data.id)
                message.error(resUpdateRating.message.trim())
                setOpen(false)
            }
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
                title="Đánh giá đặt lịch"
                width={720}
                onClose={onClose}
                open={open}
                styles={{
                    body: {
                        paddingBottom: 80,
                    },
                }}
                placement={"right"}
                extra={
                    <Space>
                        <Button loading={loading} onClick={() => form.submit()} type="primary" style={{ backgroundColor: "#41864D" }}>
                            Đánh giá
                        </Button>
                    </Space>
                }
            >
                <Form
                    layout="vertical"
                    hideRequiredMark
                    form={form}
                    onFinish={handleCreate}
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
                            style={{ fontSize: '32px' }}
                        />
                    </Form.Item>
                </Form>
            </Drawer>
        </>
    );
}

export default CreateFeedbackComponent;