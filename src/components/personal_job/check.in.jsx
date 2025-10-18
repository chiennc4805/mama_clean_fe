import { useState, useEffect, useContext } from 'react';
import { Card, Button, Space, Tag, Image, message } from 'antd';
import {
    ArrowLeftOutlined,
    CheckCircleOutlined,
    ClockCircleOutlined,
    EnvironmentOutlined,
    IdcardOutlined
} from '@ant-design/icons';
import {
    checkInAPI,
    createBookingActionAPI,
    createBookingCheckInAPI,
    deleteBookingCheckInAPI,
    updateBookingAPI
} from '../../services/api.service';
import { AuthContext } from '../context/auth.context';

const CheckInJob = ({ dataDetail, setStep, loadJobs }) => {

    const { user } = useContext(AuthContext)
    const [loading, setLoading] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    // Theo dõi thay đổi kích thước màn hình
    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const getCurrentCoords = () => {
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(
                (pos) => resolve({ lat: pos.coords.latitude, lon: pos.coords.longitude }),
                (err) => reject(err)
            );
        });
    };

    const handleCheckIn = async () => {
        setLoading(true);
        try {
            const { lat, lon } = await getCurrentCoords();
            if (lat && lon) {
                const res = await checkInAPI(
                    parseFloat(dataDetail.addressLat),
                    parseFloat(dataDetail.addressLon),
                    lat,
                    lon
                );
                if (res?.data.trim() === 'Thành công') {
                    const createBookingCheckIn = await createBookingCheckInAPI(lat, lon, dataDetail.id);
                    if (createBookingCheckIn.data) {
                        const statusParam = 'Chờ Check-out'
                        const updateBooking = await updateBookingAPI(
                            dataDetail.id,
                            dataDetail.name,
                            dataDetail.address,
                            dataDetail.addressLat,
                            dataDetail.addressLon,
                            dataDetail.date,
                            dataDetail.startTime,
                            dataDetail.totalPrice,
                            dataDetail.note,
                            statusParam,
                            dataDetail.customer.id,
                            dataDetail.cleaner.id,
                            dataDetail.service.id
                        );
                        if (updateBooking.data) {
                            const resCreate = await createBookingActionAPI("CHECK_IN", statusParam, dataDetail.id, user.id)
                            if (resCreate.data) {
                                loadJobs()
                                message.success('Check-in công việc thành công!');
                                setTimeout(() => {
                                    setStep("list")
                                    setLoading(false);
                                }, 2000);
                            } else {
                                message.error(resCreate.message.trim());
                                setLoading(false);
                            }
                        } else {
                            await deleteBookingCheckInAPI(createBookingCheckIn.data.id);
                            message.error(updateBooking.message.trim());
                            setLoading(false);
                        }
                    } else {
                        message.error(createBookingCheckIn.message.trim());
                        setLoading(false);
                    }
                } else {
                    message.error(res.data.trim());
                    setLoading(false);
                };
            } else {
                message.error('Lấy địa chỉ thất bại');
                setLoading(false);
            };
        } catch (err) {
            console.error('Lỗi khi lấy tọa độ:', err);
            message.error('Không lấy được vị trí hiện tại');
            setLoading(false);
        }
    };

    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#fff', padding: 24 }}>
            <div style={{ maxWidth: 1200, margin: '0 auto' }}>
                <h1 style={{ fontSize: 24, fontWeight: 600, marginBottom: 24, color: '#333' }}>
                    Check-in công việc
                </h1>

                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
                        gap: 24,
                    }}
                >
                    {/* Thông tin Công việc */}
                    <Card title="Thông tin Công việc" bordered={false} style={{ borderRadius: 8 }}>
                        <Space direction="vertical" size="large" style={{ width: '100%' }}>
                            <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                                <IdcardOutlined style={{ fontSize: 20, color: '#666', marginRight: 12 }} />
                                <div>
                                    <div style={{ color: '#999', fontSize: 14 }}>Mã công việc</div>
                                    <div style={{ color: '#333', fontSize: 16, fontWeight: 500 }}>{dataDetail.id}</div>
                                </div>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                                <ClockCircleOutlined style={{ fontSize: 20, color: '#666', marginRight: 12 }} />
                                <div>
                                    <div style={{ color: '#999', fontSize: 14 }}>Dịch vụ</div>
                                    <div style={{ color: '#333', fontSize: 16, fontWeight: 500 }}>
                                        {dataDetail.service.name}
                                    </div>
                                </div>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                                <EnvironmentOutlined style={{ fontSize: 20, color: '#666', marginRight: 12 }} />
                                <div>
                                    <div style={{ color: '#999', fontSize: 14 }}>Địa điểm</div>
                                    <div style={{ color: '#333', fontSize: 16, fontWeight: 500 }}>
                                        {dataDetail.address}
                                    </div>
                                </div>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                                <CheckCircleOutlined style={{ fontSize: 20, color: '#666', marginRight: 12 }} />
                                <div>
                                    <div style={{ color: '#999', fontSize: 14 }}>Trạng thái</div>
                                    <Tag color="magenta" style={{ fontSize: 14 }}>
                                        {dataDetail.status}
                                    </Tag>
                                </div>
                            </div>
                        </Space>
                    </Card>

                    {/* Vị trí & Hành động */}
                    <Card title="Vị trí & Hành động" bordered={false} style={{ borderRadius: 8 }}>
                        <div
                            style={{
                                width: '100%',
                                height: 250,
                                borderRadius: 8,
                                overflow: 'hidden',
                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                marginBottom: 16,
                            }}
                        >
                            <Image
                                width="100%"
                                height="100%"
                                src="/check-in_page/static_map.png"
                                style={{ objectFit: 'cover' }}
                                preview={false}
                            />
                        </div>

                        <div style={{ textAlign: 'center', marginBottom: 20 }}>
                            <div style={{ color: '#666', fontSize: 14 }}>Đã xác định vị trí của bạn qua GPS.</div>
                        </div>

                        <Button
                            type="primary"
                            size="large"
                            block
                            icon={<CheckCircleOutlined />}
                            style={{
                                backgroundColor: '#41894b',
                                borderColor: '#41894b',
                                height: 48,
                                fontSize: isMobile ? 14 : 16,
                                fontWeight: 500,
                                marginBottom: 12,
                            }}
                            onClick={handleCheckIn}
                            loading={loading}
                        >
                            Check-in
                        </Button>

                        <Button
                            size="large"
                            block
                            icon={<ArrowLeftOutlined />}
                            style={{
                                height: 48,
                                fontSize: isMobile ? 14 : 16,
                            }}
                            onClick={() => setStep('list')}
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
