import React from 'react';
import { Card, Button, Row, Col } from 'antd';
import { useNavigate } from 'react-router-dom';

const CleaningService = () => {
    const navigate = useNavigate()
    const services = [
        {
            id: 1,
            title: 'Dọn dẹp cơ bản theo gói, dành cho các phòng trọ',
            price: 'Chỉ từ 180,000 VNĐ',
            description: 'Quét, lau nhà, sắp xếp giường chiếu (có thể thay ga chăn gối nếu được yêu cầu), cọ rửa lavabo, toilet, gương, đổ rác (nếu được yêu cầu). Rửa chén bát đĩa, lau bếp, cọ lau bồn rửa bát, lau đơn tủ lạnh (nếu được yêu cầu), lau sàn. Lau bàn ghế học (nếu được yêu cầu).',
            imageUrl: 'service_page/image.png'
        },
        {
            id: 2,
            title: 'Dọn dẹp cơ bản theo giờ, dành cho nhà ở, văn phòng',
            price: 'Chỉ từ 7,500 VNĐ/mét vuông',
            description: 'Quét, lau nhà, sắp xếp giường chiếu (có thể thay ga chăn gối nếu được yêu cầu), cọ rửa lavabo, toilet, gương, đổ rác ( nếu được yêu cầu). Rửa chén bát đĩa, lau bếp, cọ lau bồn rửa bát, lau đơn tủ lạnh (nếu được yêu cầu), lau bàn ghế học (nếu được yêu cầu).',
            imageUrl: 'service_page/image.png'
        },
        {
            id: 3,
            title: 'Dọn dẹp trung bình theo giờ, dành cho nhà ở, văn phòng',
            price: 'Chỉ từ 8,000 VNĐ/mét vuông',
            description: 'Quét lau nhà Sắp xếp giường chiếu (có thể thay ga chăn gối nếu được yêu cầu), cọ rửa lavabo, toilet, gương, đổ rác (nếu được yêu cầu). Rửa chén bát đĩa, lau bếp, cọ lau bồn rửa bát, lau đơn tủ lạnh (nếu được yêu cầu), lau tivi, bàn ghế (nếu được yêu cầu), lau cửa sổ, cửa ra vào.',
            imageUrl: 'service_page/image.png'
        },
        {
            id: 4,
            title: 'Dọn dẹp chuyên sâu theo giờ, dành cho nhà ở, văn phòng',
            price: 'Chỉ từ 10,000 VNĐ/mét vuông',
            description: 'Quét lau nhà Sắp xếp giường chiếu (có thể thay ga chăn gối nếu được yêu cầu), cọ rửa lavabo, toilet, gương, dó rác (nếu được yêu cầu). Rửa chén bát đĩa, lau bếp, cọ lau bồn rửa bát, lau đơn tủ lạnh (nếu được yêu cầu), lau tivi, bàn ghế (nếu được yêu cầu), lau cửa sổ, cửa ra vào.',
            imageUrl: 'service_page/image.png'
        }
    ];

    return (
        <div style={{ padding: '100px 100px', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
            <Row gutter={[24, 24]} justify="center">
                {services.map((service) => (
                    <Col xs={24} sm={24} md={6} lg={6} key={service.id}>
                        <Card
                            hoverable
                            style={{
                                borderRadius: '12px',
                                overflow: 'hidden',
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column'
                            }}
                            cover={
                                <img
                                    alt={service.title}
                                    src={service.imageUrl}
                                    style={{
                                        height: '200px',
                                        objectFit: 'cover'
                                    }}
                                />
                            }
                        >
                            <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                                <h3 style={{
                                    fontSize: '18px',
                                    fontWeight: '600',
                                    marginBottom: '8px',
                                    color: '#000'
                                }}>
                                    {service.title}
                                </h3>

                                <p style={{
                                    fontSize: '16px',
                                    color: '#41864D',
                                    fontWeight: '600',
                                    marginBottom: '12px'
                                }}>
                                    {service.price}
                                </p>

                                <p style={{
                                    fontSize: '14px',
                                    color: '#666',
                                    lineHeight: '1.6',
                                    marginBottom: '20px',
                                    flex: 1
                                }}>
                                    {service.description}
                                </p>

                                <Button
                                    type="primary"
                                    size="large"
                                    block
                                    style={{
                                        backgroundColor: '#41864D',
                                        borderColor: '#41864D',
                                        height: '45px',
                                        fontSize: '16px',
                                        fontWeight: '500',
                                        borderRadius: '8px'
                                    }}
                                    onClick={() => navigate("/booking")}
                                >
                                    Đặt lịch ngay
                                </Button>
                            </div>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default CleaningService;