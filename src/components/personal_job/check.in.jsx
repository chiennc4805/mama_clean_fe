import {
    ArrowLeftOutlined,
    CheckCircleOutlined,
    ClockCircleOutlined,
    EnvironmentOutlined,
    IdcardOutlined
} from '@ant-design/icons';
import { Button, Card, message, Space, Tag } from 'antd';
import { useState } from 'react';
import { checkInAPI, createBookingCheckInAPI, updateBookingAPI } from '../../services/api.service';

const CheckInJob = (props) => {

    const { dataDetail, setStep } = props
    const [loading, setLoading] = useState(false)

    const getCurrentCoords = () => {
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    resolve({
                        lat: pos.coords.latitude,
                        lon: pos.coords.longitude
                    });
                },
                (err) => {
                    reject(err);
                }
            );
        });
    };

    const handleCheckIn = async () => {
        setLoading(true)
        try {
            const { lat, lon } = await getCurrentCoords();

            const res = await checkInAPI(
                parseFloat(dataDetail.addressLat),
                parseFloat(dataDetail.addressLon),
                lat,
                lon
            );
            if (res.data.trim() === "Thành công") {
                const updateBooking = await updateBookingAPI(dataDetail.id, dataDetail.address, dataDetail.addressLat, dataDetail.addressLon, dataDetail.date, dataDetail.startTime, dataDetail.totalPrice, dataDetail.note, "Chờ Check-out", dataDetail.customer.id, dataDetail.cleaner.id, dataDetail.service.id)

                const createBookingCheckIn = await createBookingCheckInAPI(lat, lon, dataDetail.id)

                if (updateBooking.data && createBookingCheckIn) {
                    message.success("Check-In thành công");
                    setStep("list")
                } else {
                    message.error(updateBooking.message.trim())
                    message.error(createBookingCheckIn.message.trim())
                }
            } else {
                message.error(res.data.trim());
            }
        } catch (err) {
            console.error("Lỗi khi lấy tọa độ:", err);
            message.error("Không lấy được vị trí hiện tại");
        }
        setLoading(false)
    };

    return (
        <div style={{
            minHeight: '100vh',
            backgroundColor: '#fff',
            padding: '24px'
        }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                <h1 style={{
                    fontSize: '24px',
                    fontWeight: '600',
                    marginBottom: '24px',
                    color: '#333'
                }}>
                    Check-in công việc
                </h1>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '24px',
                    '@media (max-width: 768px)': {
                        gridTemplateColumns: '1fr'
                    }
                }}>
                    {/* Thông tin Công việc */}
                    <Card
                        title="Thông tin Công việc"
                        bordered={false}
                        style={{ borderRadius: '8px' }}
                    >
                        <Space direction="vertical" size="large" style={{ width: '100%' }}>
                            <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                                <IdcardOutlined style={{ fontSize: '20px', color: '#666', marginRight: '12px', marginTop: '4px' }} />
                                <div>
                                    <div style={{ color: '#999', fontSize: '14px', marginBottom: '4px' }}>Mã công việc</div>
                                    <div style={{ color: '#333', fontSize: '16px', fontWeight: '500' }}>{dataDetail.id}</div>
                                </div>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                                <ClockCircleOutlined style={{ fontSize: '20px', color: '#666', marginRight: '12px', marginTop: '4px' }} />
                                <div>
                                    <div style={{ color: '#999', fontSize: '14px', marginBottom: '4px' }}>Dịch vụ</div>
                                    <div style={{ color: '#333', fontSize: '16px', fontWeight: '500' }}>
                                        {dataDetail.service.name}
                                    </div>
                                </div>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                                <EnvironmentOutlined style={{ fontSize: '20px', color: '#666', marginRight: '12px', marginTop: '4px' }} />
                                <div>
                                    <div style={{ color: '#999', fontSize: '14px', marginBottom: '4px' }}>Địa điểm</div>
                                    <div style={{ color: '#333', fontSize: '16px', fontWeight: '500' }}>
                                        {dataDetail.address}
                                    </div>
                                </div>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                                <CheckCircleOutlined style={{ fontSize: '20px', color: '#666', marginRight: '12px', marginTop: '4px' }} />
                                <div>
                                    <div style={{ color: '#999', fontSize: '14px', marginBottom: '4px' }}>Trạng thái</div>
                                    <Tag color="magenta" style={{ fontSize: '14px' }}>{dataDetail.status}</Tag>
                                </div>
                            </div>
                        </Space>
                    </Card>

                    {/* Vị trí & Hành động */}
                    <Card
                        title="Vị trí & Hành động"
                        bordered={false}
                        style={{ borderRadius: '8px' }}
                    >
                        {/* Map Image */}
                        <div style={{
                            position: 'relative',
                            width: '100%',
                            height: '200px',
                            backgroundColor: '#e8f4f8',
                            borderRadius: '8px',
                            marginBottom: '16px',
                            overflow: 'hidden',
                            backgroundImage: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            opacity: '0.1'
                        }}>
                            <div style={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                fontSize: '48px',
                                color: '#ff4d4f'
                            }}>
                                📍
                            </div>
                        </div>

                        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                            <div style={{ color: '#666', fontSize: '14px', marginBottom: '4px' }}>
                                Đã xác định vị trí của bạn qua GPS.
                            </div>

                        </div>

                        <Button
                            type="primary"
                            size="large"
                            block
                            icon={<CheckCircleOutlined />}
                            style={{
                                backgroundColor: '#41894b',
                                borderColor: '#41894b',
                                height: '48px',
                                fontSize: '16px',
                                fontWeight: '500',
                                marginBottom: '12px'
                            }}
                            onClick={() => handleCheckIn()}
                            loading={loading}
                        >
                            Check-in
                        </Button>

                        <Button
                            size="large"
                            block
                            icon={<ArrowLeftOutlined />}
                            style={{
                                height: '48px',
                                fontSize: '16px'
                            }}
                            onClick={() => setStep("list")}
                        >
                            Quay lại danh sách công việc
                        </Button>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default CheckInJob;