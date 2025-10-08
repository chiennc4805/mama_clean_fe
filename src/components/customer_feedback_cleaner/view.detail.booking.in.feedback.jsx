
import React, { useEffect, useState } from 'react';
import { Button, Col, Modal, Row, Typography } from 'antd';
import { fetchBookingByIdAPI } from '../../services/api.service';
import { formatterNumber } from '../../services/common.function';
import { EnvironmentOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

const { Text } = Typography

const ViewDetailBookingInFeedback = (props) => {

    const { isModalOpen, setIsModalOpen, bookingId } = props
    const [dataDetail, setDataDetail] = useState({})

    useEffect(() => {
        const loadBookingDetail = async () => {
            const res = await fetchBookingByIdAPI(bookingId)
            if (res.data) {
                setDataDetail({
                    id: res.data.id,
                    name: res.data.name,
                    address: res.data.address,
                    date: res.data.date,
                    startTime: res.data.startTime,
                    status: res.data.status,
                    totalPrice: res.data.totalPrice,
                    note: res.data.note,
                    customer: res.data.customer,
                    cleaner: res.data.cleaner,
                    service: res.data.service
                })
            }
        }
        loadBookingDetail()
    }, [bookingId])

    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    return (
        <>
            <Modal
                title="Chi tiết công việc"
                closable={{ 'aria-label': 'Custom Close Button' }}
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                width={720}
                footer={null}
            >
                <div style={{ padding: '24px' }}>
                    {/* Job Section */}
                    <Row justify="space-between" align="middle" style={{ marginBottom: 20, paddingBottom: 20, borderBottom: '1px solid #f0f0f0' }}>
                        <Col>
                            <Text style={{ color: '#8c8c8c', fontSize: 14 }}>Tên công việc</Text>
                        </Col>
                        <Col>
                            <Text style={{ color: '#262626', fontSize: 14 }}>{dataDetail.name}</Text>
                        </Col>
                    </Row>

                    {/* Service Section */}
                    <Row justify="space-between" align="middle" style={{ marginBottom: 20, paddingBottom: 20, borderBottom: '1px solid #f0f0f0' }}>
                        <Col>
                            <Text style={{ color: '#8c8c8c', fontSize: 14 }}>Loại dịch vụ</Text>
                        </Col>
                        <Col>
                            <Text style={{ color: '#262626', fontSize: 14 }}>{dataDetail?.service?.name}</Text>
                        </Col>
                    </Row>

                    {/* Time Section */}
                    <Row justify="space-between" align="middle" style={{ marginBottom: 20, paddingBottom: 20, borderBottom: '1px solid #f0f0f0' }}>
                        <Col>
                            <Text style={{ color: '#8c8c8c', fontSize: 14 }}>Thời gian bắt đầu</Text>
                        </Col>
                        <Col>
                            <Text style={{ color: '#262626', fontSize: 14 }}>{dataDetail.date + " " + dataDetail.startTime}</Text>
                        </Col>
                    </Row>

                    {/* Price Section */}
                    <Row justify="space-between" align="middle" style={{ marginBottom: 20, paddingBottom: 20, borderBottom: '1px solid #f0f0f0' }}>
                        <Col>
                            <Text style={{ color: '#8c8c8c', fontSize: 14 }}>Giá tiền</Text>
                        </Col>
                        <Col>
                            <Text style={{ fontSize: 14, color: '#52c41a', fontWeight: 600 }}>{formatterNumber(dataDetail.totalPrice)} VNĐ</Text>
                        </Col>
                    </Row>

                    {/* Address Section */}
                    <Row justify="space-between" align="middle" style={{ marginBottom: 20, paddingBottom: 20, borderBottom: '1px solid #f0f0f0' }}>
                        <Col>
                            <Text style={{ color: '#8c8c8c', fontSize: 14 }}>Địa chỉ khách hàng</Text>
                        </Col>
                        <Col>
                            <Text style={{ fontSize: 14 }}>{dataDetail.address}</Text>
                        </Col>
                    </Row>

                    {/* Customer Notes Section */}
                    <div style={{ marginBottom: 24 }}>
                        <Text style={{ color: '#8c8c8c', display: 'block', marginBottom: 12, fontSize: 14 }}>
                            Ghi chú của khách hàng
                        </Text>
                        <div style={{
                            backgroundColor: '#fafafa',
                            padding: 16,
                            borderRadius: 4,
                            border: '1px solid #f0f0f0'
                        }}>
                            <Text style={{ color: '#595959', fontSize: 14, lineHeight: '22px' }}>
                                {dataDetail.note}
                            </Text>
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    );
};
export default ViewDetailBookingInFeedback;