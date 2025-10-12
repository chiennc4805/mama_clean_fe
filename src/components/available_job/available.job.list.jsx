import { CalendarOutlined, ClockCircleOutlined, EnvironmentOutlined, HourglassOutlined } from "@ant-design/icons";
import { Button, Card, Col, Empty, Pagination, Row, Tag } from "antd";
import { formatterNumber } from "../../services/common.function";
import dayjs from "dayjs";

const AvailableJobList = (props) => {

    const { bookings, total, current, setCurrent, pageSize, setPageSize, setStep, setDataDetail } = props

    const images = [
        "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=400&h=300&fit=crop"
    ];

    const onChangePagination = (page, pageSize) => {
        if (page !== current) {
            setCurrent(page);
        }
        if (pageSize !== pageSize) {
            setPageSize(pageSize);
        }
    };

    return (
        <>
            <div style={{
                padding: '10px 30px 50px 30px',
                backgroundColor: '#fff',
                minHeight: '100vh'
            }}>
                {bookings.length !== 0 ?
                    <div style={{ maxWidth: '1400px', margin: '0 auto' }}>

                        <Row gutter={[24, 24]}>
                            {bookings.map((booking, index) => (
                                <Col xs={24} sm={12} lg={8} key={booking.id}>
                                    <Card
                                        cover={
                                            <div style={{
                                                position: 'relative',
                                                height: '200px',
                                                overflow: 'hidden'
                                            }}>
                                                <img
                                                    alt={""}
                                                    src={images[index]}
                                                    style={{
                                                        width: '100%',
                                                        height: '100%',
                                                        objectFit: 'cover'
                                                    }}
                                                />
                                            </div>
                                        }
                                        style={{
                                            borderRadius: '12px',
                                            overflow: 'hidden',
                                            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                                        }}
                                        bodyStyle={{ padding: '20px' }}
                                    >
                                        <h3 style={{
                                            fontSize: '18px',
                                            fontWeight: '600',
                                            marginBottom: '12px',
                                            color: '#333',
                                            display: "flex",
                                            justifyContent: "center"
                                        }}>
                                            {booking.name}
                                        </h3>

                                        <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}>
                                            <Tag
                                                color="magenta"
                                                style={{
                                                    fontSize: '14px',
                                                    fontWeight: '600',
                                                    padding: '4px 12px',
                                                }}
                                            >
                                                {formatterNumber(booking.totalPrice * (1 - Number(import.meta.env.VITE_INCOME_DEDUCTION))) + " VNĐ"}
                                            </Tag>
                                        </div>

                                        <div style={{ marginBottom: '16px' }}>
                                            <div style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                marginBottom: '8px',
                                                color: '#666',
                                                fontSize: '14px'
                                            }}>
                                                <EnvironmentOutlined style={{ marginRight: '8px', color: '#4a8966' }} />
                                                {booking.address}
                                            </div>

                                            <div style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                marginBottom: '8px',
                                                color: '#666',
                                                fontSize: '14px'
                                            }}>
                                                <CalendarOutlined style={{ marginRight: '8px', color: '#4a8966' }} />
                                                {booking.date}
                                            </div>

                                            <div style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                marginBottom: '8px',
                                                color: '#666',
                                                fontSize: '14px'
                                            }}>
                                                <ClockCircleOutlined style={{ marginRight: '8px', color: '#4a8966' }} />
                                                {dayjs(booking.startTime, "HH:mm:ss").format("HH:mm")}
                                            </div>

                                            <div style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                color: '#666',
                                                fontSize: '14px'
                                            }}>
                                                <HourglassOutlined style={{ marginRight: '8px', color: '#4a8966' }} />
                                                {booking.service.duration} giờ
                                            </div>
                                        </div>

                                        <Row>
                                            <Col span={24}>
                                                <Button
                                                    block
                                                    style={{
                                                        borderColor: '#41864D',
                                                        backgroundColor: "#41864D",
                                                        color: 'white'
                                                    }}
                                                    onClick={() => { setStep("detail"); setDataDetail(booking) }}
                                                >
                                                    Xem chi tiết
                                                </Button>
                                            </Col>
                                        </Row>
                                    </Card>
                                </Col>
                            ))}
                        </Row>

                        <Pagination
                            total={total}
                            showTotal={(total, range) => `${range[0]}-${range[1]} của ${total} công việc`}
                            current={current}
                            pageSize={pageSize}
                            showSizeChanger
                            style={{ display: "flex", justifyContent: "flex-end", marginTop: 35 }}
                            onChange={onChangePagination}
                        />


                    </div>
                    :
                    <Empty
                        description="Không có sẵn công việc nào"
                        image={Empty.PRESENTED_IMAGE_SIMPLE}
                        style={{ marginTop: 50 }}
                    />
                }

            </div>
        </>
    )
}

export default AvailableJobList;