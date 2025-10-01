import { EnvironmentOutlined } from '@ant-design/icons';
import { Breadcrumb, Button, Checkbox, Col, message, notification, Popconfirm, Row, Typography } from 'antd';
import { useState } from 'react';
import { updateBookingAPI } from '../../services/api.service';
import { formatterNumber } from '../../services/common.function';

const { Title, Text } = Typography;

const JobDetail = (props) => {
    const [isChecked, setIsChecked] = useState(false);
    const { dataDetail, setStep } = props
    const [loadingCancel, setLoadingCancel] = useState(false)
    const [loadingGet, setLoadingGet] = useState(false)


    const handleCancelJob = async () => {
        setLoadingCancel(true)

        const res = await updateBookingAPI(dataDetail.id, dataDetail.address, dataDetail.addressLat, dataDetail.addressLon, dataDetail.date, dataDetail.startTime, dataDetail.totalPrice, dataDetail.note, "Từ chối", dataDetail.customer.id, dataDetail.cleaner.id, dataDetail.service.id)

        setTimeout(() => {
            if (res.data) {
                message.success("Huỷ bỏ thành công")
                window.location.reload()
            }
            else {
                setLoadingCancel(false);
                notification.error({
                    message: "Huỷ bỏ thất bại",
                    description: JSON.stringify(res.message)
                })
            }
        }, 2000)
    }

    const handleGetJob = async () => {
        setLoadingGet(true)

        const res = await updateBookingAPI(dataDetail.id, dataDetail.address, dataDetail.addressLat, dataDetail.addressLon, dataDetail.date, dataDetail.startTime, dataDetail.totalPrice, dataDetail.note, "Chờ Check-in", dataDetail.customer.id, dataDetail.cleaner.id, dataDetail.service.id)

        setTimeout(() => {
            if (res.data) {
                message.success("Nhận việc thành công")
                window.location.reload()
            }
            else {
                setLoadingGet(false);
                notification.error({
                    message: "Nhận việc thất bại",
                    description: JSON.stringify(res.message)
                })
            }
        }, 2000)
    }

    return (
        <div style={{ maxWidth: 900, margin: '0 auto', padding: '0', backgroundColor: '#fff' }}>
            <Breadcrumb
                style={{ marginBottom: 30, marginLeft: -100 }}
                separator=">"
                items={[
                    {
                        title: 'Danh sách công việc',
                        href: '',
                        onClick: (e) => { e.preventDefault(); setStep("list") }
                    },
                    {
                        title: 'Chi tiết công việc',
                    }
                ]}
            />

            {/* Header Section */}
            <div style={{
                background: 'linear-gradient(to bottom, #f5f0e8, #ede6d9)',
                padding: '32px 24px',
                position: 'relative'
            }}>
                <Row justify="space-between" align="start">
                    <Col span={24}>
                        <Title level={3} style={{ margin: 0, color: '#262626', fontSize: 22, fontWeight: 600 }}>
                            {dataDetail.service.name}
                        </Title>
                    </Col>
                </Row>

            </div>

            {/* Booking Details Section */}
            <div style={{ padding: '24px' }}>
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
                <div style={{ marginBottom: 20, paddingBottom: 20, borderBottom: '1px solid #f0f0f0' }}>
                    <Text style={{ color: '#8c8c8c', display: 'block', marginBottom: 12, fontSize: 14 }}>
                        Địa chỉ khách hàng
                    </Text>
                    <Row justify="space-between" align="start">
                        <Col span={22}>
                            <Text style={{ color: '#262626', fontSize: 14, lineHeight: '22px' }}>
                                {dataDetail.address}
                            </Text>
                        </Col>
                        <Col span={2} style={{ textAlign: 'right' }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 4 }}>
                                <EnvironmentOutlined style={{ color: '#52c41a', fontSize: 14 }} />
                                <Text style={{ fontSize: 13, color: '#52c41a' }}>Bản đồ</Text>
                            </div>
                        </Col>
                    </Row>
                </div>

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

                {/* Action Buttons */}
                {dataDetail.status === "Chờ xác nhận" ?

                    <Row gutter={16}>
                        <Col span={24}>
                            <Text style={{ color: '#262626', fontSize: 14, fontWeight: 600, display: 'block', marginBottom: 10 }}>
                                Xác nhận và Hành động
                            </Text>
                            <Checkbox
                                checked={isChecked}
                                onChange={(e) => setIsChecked(e.target.checked)}
                                style={{ fontSize: 14, marginBottom: 20 }}
                            >
                                Đã đọc kỹ chi tiết công việc
                            </Checkbox>
                        </Col>
                        <Col span={12}>
                            <Row gutter={8}>
                                <Col span={12}>

                                    <Popconfirm
                                        title="Bỏ qua công việc"
                                        description="Bạn có chắc chắn bỏ qua công việc này?"
                                        onConfirm={handleCancelJob}
                                        okText="Yes"
                                        cancelText="No"
                                    >
                                        <Button
                                            block
                                            size="large"
                                            style={{
                                                height: 48,
                                                borderRadius: 6,
                                                borderColor: isChecked ? '#ff4d4f' : '#d9d9d9',
                                                color: isChecked ? '#ff4d4f' : '#d9d9d9',
                                                fontSize: 14
                                            }}
                                            loading={loadingCancel}
                                            disabled={!isChecked}
                                        >
                                            Bỏ qua
                                        </Button>
                                    </Popconfirm>
                                </Col>
                                <Col span={12}>
                                    <Button
                                        block
                                        type="primary"
                                        size="large"
                                        style={{
                                            height: 48,
                                            borderRadius: 6,
                                            backgroundColor: isChecked ? '#41864D' : '#d9d9d9',
                                            borderColor: isChecked ? '#41864D' : '#d9d9d9',
                                            fontSize: 14,
                                            color: '#fff',
                                            fontWeight: 500
                                        }}
                                        disabled={!isChecked}
                                        onClick={() => handleGetJob()}
                                        loading={loadingGet}
                                    >
                                        Nhận việc
                                    </Button>
                                </Col>
                            </Row>
                        </Col>


                    </Row>
                    :
                    <span></span>
                }
            </div>
        </div>
    );
}

export default JobDetail