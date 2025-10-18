import { Button, Card, Checkbox, Col, Empty, Image, message, notification, Popconfirm, Row, Spin, Tag, Timeline, Typography } from 'antd';
import { useContext, useState } from 'react';
import { fetchAllBookingActionsWithoutPaginationAPI, fetchBookingCheckInByBookingIdAPI, fetchBookingCheckOutByBookingIdAPI, getAvailableJobAPI, updateBookingAPI } from '../../services/api.service';
import { formatterNumber } from '../../services/common.function';
import dayjs from 'dayjs';
import "dayjs/locale/vi"; // để hiển thị thứ tiếng Việt
import { AuthContext } from '../context/auth.context';
import { CheckCircleOutlined, ClockCircleOutlined, CloseCircleOutlined, EditOutlined, FileAddOutlined, FileDoneOutlined, LoginOutlined, LogoutOutlined, MessageOutlined, StopOutlined, UserAddOutlined } from '@ant-design/icons';
dayjs.locale("vi");

const { Title, Text } = Typography;

const BookingDetail = (props) => {

    const { user } = useContext(AuthContext)
    const { dataDetail, setStep, loadBooking } = props
    const [showDetail, setShowDetail] = useState(false);
    const [bookingCheckIn, setBookingCheckIn] = useState(null)
    const [bookingCheckOut, setBookingCheckOut] = useState(null)
    const [bookingActions, setBookingActions] = useState(null)

    useState(() => {
        const loadBookingCheckIn = async () => {
            const res = await fetchBookingCheckInByBookingIdAPI(dataDetail.id)
            if (res.data) {
                setBookingCheckIn(res.data)
            }
        }
        loadBookingCheckIn()

        const loadBookingCheckOut = async () => {
            const res = await fetchBookingCheckOutByBookingIdAPI(dataDetail.id)
            if (res.data) {
                setBookingCheckOut(res.data)
            }
        }
        loadBookingCheckOut()

        const loadBookingAction = async () => {
            const res = await fetchAllBookingActionsWithoutPaginationAPI(`booking.id~'${dataDetail.id}'`)
            if (res.data) {
                setBookingActions(res.data.result)
            }
        }
        loadBookingAction()
    }, [dataDetail])

    // ⭐ THÊM FUNCTION NÀY NGOÀI return()
    const getActionConfig = (action, status) => {
        const configs = {
            CREATE: {
                icon: <FileAddOutlined />,
                color: 'blue',
                label: 'Tạo đơn hàng',
                tagColor: 'blue'
            },
            GET: {
                icon: <CheckCircleOutlined />,
                color: 'geekblue',
                label: 'Nhận công việc',
                tagColor: 'geekblue'
            },
            ASSIGN: {
                icon: <UserAddOutlined />,
                color: 'cyan',
                label: 'Phân công nhân viên',
                tagColor: 'cyan'
            },
            ACCEPT: {
                icon: <CheckCircleOutlined />,
                color: 'magenta',
                label: 'Nhân viên chấp nhận',
                tagColor: 'magenta'
            },
            DENY: {
                icon: <StopOutlined />,
                color: 'orange',
                label: 'Nhân viên từ chối',
                tagColor: 'orange'
            },
            CHECK_IN: {
                icon: <LoginOutlined />,
                color: 'purple',
                label: 'Check-in',
                tagColor: 'purple'
            },
            CHECK_OUT: {
                icon: <FileDoneOutlined />,
                color: 'green',
                label: 'Check-out',
                tagColor: 'green'
            },
            CANCEL: {
                icon: <CloseCircleOutlined />,
                color: 'red',
                label: 'Hủy đơn hàng',
                tagColor: 'red'
            },
            FEEDBACK: {
                icon: <MessageOutlined />,
                color: 'gold',
                label: 'Đánh giá',
                tagColor: 'gold'
            },
            UPDATE: {
                icon: <EditOutlined />,
                color: 'volcano',
                label: 'Cập nhật thông tin',
                tagColor: 'volcano'
            }
        };
        return configs[action] || {
            icon: <ClockCircleOutlined />,
            color: 'gray',
            label: action,
            tagColor: 'default'
        };
    };


    return (
        <Row gutter={[24, 24]} style={{ display: "flex" }}>
            {/* Left Column - Main Content */}
            <Col xs={24} lg={16}>
                <Card
                    style={{
                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                    }}
                >
                    {/* Header */}
                    <div style={{ marginBottom: '24px' }}>
                        <h1 style={{ fontSize: '24px', fontWeight: 'bold', margin: '0 0 16px 0' }}>
                            {dataDetail.name}
                        </h1>
                    </div>

                    {/* Banner Image */}
                    <div
                        style={{
                            width: '100%',
                            height: '280px',
                            backgroundColor: '#e8dcc8',
                            borderRadius: '8px',
                            marginBottom: '24px',
                            backgroundImage:
                                'linear-gradient(135deg, #e8dcc8 0%, #f0e6d2 100%)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#999',
                        }}
                    >
                        <img
                            src="/job_detail/demo_pic.jpg"
                            alt=""
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover'
                            }}
                        />
                    </div>

                    {/* Details Section */}
                    <div style={{ marginBottom: '24px' }}>
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                paddingBottom: '16px',
                                borderBottom: '1px solid #e8e8e8',
                                marginBottom: '16px',
                            }}
                        >
                            <p style={{ color: '#999', fontSize: '14px', margin: 0 }}>
                                Thời gian bắt đầu
                            </p>
                            <p style={{ fontSize: '14px', fontWeight: '500', margin: 0 }}>
                                {dayjs(`${dataDetail.date} ${dataDetail.startTime}`, "DD/MM/YYYY HH:mm:ss")
                                    .format("dddd, D [tháng] M, YYYY [lúc] HH:mm A").replace("AM", "SA")
                                    .replace("PM", "CH")}
                            </p>
                        </div>

                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                paddingBottom: '16px',
                                borderBottom: '1px solid #e8e8e8',
                                marginBottom: '16px',
                            }}
                        >
                            <p style={{ color: '#999', fontSize: '14px', margin: 0 }}>
                                Diện tích
                            </p>
                            <p style={{ fontSize: '14px', fontWeight: '500', margin: 0 }}>
                                {dataDetail.service.area} m2
                            </p>
                        </div>

                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                paddingBottom: '16px',
                                borderBottom: '1px solid #e8e8e8',
                                marginBottom: '16px',
                            }}
                        >
                            <p style={{ color: '#999', fontSize: '14px', margin: 0 }}>
                                Giá tiền
                            </p>
                            <p
                                style={{
                                    fontSize: '16px',
                                    fontWeight: 'bold',
                                    margin: 0,
                                    color: '#41864D',
                                }}
                            >
                                {formatterNumber(dataDetail.totalPrice)} VNĐ
                            </p>
                        </div>

                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                paddingBottom: '16px',
                                borderBottom: '1px solid #e8e8e8',
                                marginBottom: '16px',
                            }}
                        >
                            <p style={{ color: '#999', fontSize: '14px', margin: 0 }}>
                                Địa chỉ
                            </p>
                            <p
                                style={{
                                    fontSize: '16px',
                                    margin: 0,
                                    fontWeight: '500'
                                }}
                            >
                                {dataDetail.address}
                            </p>
                        </div>

                        <div style={{ marginBottom: '24px' }}>
                            <p
                                style={{
                                    color: '#999',
                                    fontSize: '14px',
                                    margin: '0 0 8px 0',
                                }}
                            >
                                Ghi chú của khách hàng
                            </p>
                            <div
                                style={{
                                    backgroundColor: '#f5f5f5',
                                    padding: '12px',
                                    borderRadius: '4px',
                                    fontSize: '14px',
                                    lineHeight: '1.6',
                                }}
                            >
                                {dataDetail.note}
                            </div>
                        </div>
                    </div>

                    {showDetail && (
                        <>
                            {/* check-in */}
                            <div style={{
                                marginTop: 50,
                                marginBottom: '24px',
                                paddingTop: 10,
                                borderTop: '1px solid #e8e8e8',
                            }}>
                                <h1 style={{ fontSize: '24px', fontWeight: 'bold', margin: '0 0 16px 0' }}>
                                    Thông tin Check-in
                                </h1>
                            </div>
                            {bookingCheckIn ?
                                <>

                                    <div
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            paddingBottom: '16px',
                                            borderBottom: '1px solid #e8e8e8',
                                            marginBottom: '16px',
                                        }}
                                    >
                                        <p style={{ color: '#999', fontSize: '14px', margin: 0 }}>
                                            Vị trí
                                        </p>
                                        <p style={{ fontSize: '14px', fontWeight: '500', margin: 0 }}>

                                        </p>
                                    </div>

                                    <div
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            paddingBottom: '16px',
                                            borderBottom: '1px solid #e8e8e8',
                                            marginBottom: '16px',
                                        }}
                                    >
                                        <p style={{ color: '#999', fontSize: '14px', margin: 0 }}>
                                            Thời gian
                                        </p>
                                        <p
                                            style={{
                                                fontSize: '14px',
                                                fontWeight: '500',
                                                margin: 0,
                                            }}
                                        >
                                            {dayjs(`${bookingCheckIn.createdAt}`)
                                                .format("dddd, D [tháng] M, YYYY [lúc] HH:mm A").replace("AM", "SA")
                                                .replace("PM", "CH")}                                </p>
                                    </div>
                                    <div
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            paddingBottom: '16px',
                                            borderBottom: '1px solid #e8e8e8',
                                            marginBottom: '16px',
                                        }}
                                    >
                                        <p style={{ color: '#999', fontSize: '14px', margin: 0 }}>
                                            Trạng thái
                                        </p>
                                        <p
                                            style={{
                                                fontSize: '14px',
                                                fontWeight: '500',
                                                margin: 0,
                                            }}
                                        >
                                            {
                                                new Date(bookingCheckIn.createdAt) <= new Date(dayjs(bookingCheckIn.booking.date, "DD/MM/YYYY").format("YYYY-MM-DD") + "T" + bookingCheckIn.booking.startTime) ?
                                                    <Tag color='#87d068'>Đúng giờ</Tag>
                                                    :
                                                    <Tag color='#f50'>Muộn</Tag>
                                            }
                                        </p>
                                    </div>
                                </>
                                :
                                <Empty
                                    description="Không có thông tin Check-in"
                                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                                    style={{ marginTop: 50 }}
                                />
                            }

                            {/* check-out */}
                            <div style={{
                                marginTop: 50,
                                marginBottom: '24px',
                                paddingTop: 10,
                            }}>
                                <h1 style={{ fontSize: '24px', fontWeight: 'bold', margin: '0 0 16px 0' }}>
                                    Thông tin Check-out
                                </h1>
                            </div>
                            {bookingCheckOut ?
                                <>
                                    <div
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            paddingBottom: '16px',
                                            borderBottom: '1px solid #e8e8e8',
                                            marginBottom: '16px',
                                        }}
                                    >
                                        <p style={{ color: '#999', fontSize: '14px', margin: 0 }}>
                                            Thời gian
                                        </p>
                                        <p
                                            style={{
                                                fontSize: '14px',
                                                fontWeight: '500',
                                                margin: 0,
                                            }}
                                        >
                                            {dayjs(`${bookingCheckOut.createdAt}`)
                                                .format("dddd, D [tháng] M, YYYY [lúc] HH:mm A").replace("AM", "SA")
                                                .replace("PM", "CH")}                                </p>
                                    </div>

                                    <div
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            paddingBottom: '16px',
                                            borderBottom: '1px solid #e8e8e8',
                                            marginBottom: '16px',
                                        }}
                                    >
                                        <p style={{ color: '#999', fontSize: '14px', margin: 0 }}>
                                            Ảnh sau khi hoàn thành
                                        </p>
                                        <Image
                                            width="50%"
                                            height={300}
                                            src={`https://mamasclean.com/upload/booking_check_out/${bookingCheckOut.checkOutImageName}`}
                                            style={{ objectFit: 'cover', borderRadius: 8 }}
                                        />
                                    </div>

                                    <div
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            paddingBottom: '16px',
                                            borderBottom: '1px solid #e8e8e8',
                                            marginBottom: '16px',
                                        }}
                                    >
                                        <p style={{ color: '#999', fontSize: '14px', margin: 0 }}>
                                            Ghi chú
                                        </p>
                                        <p
                                            style={{
                                                fontSize: '14px',
                                                fontWeight: '500',
                                                margin: 0,
                                            }}
                                        >
                                            {bookingCheckOut.note}
                                        </p>
                                    </div>
                                </>
                                :
                                <Empty
                                    description="Không có thông tin Check-out"
                                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                                    style={{ marginTop: 50 }}
                                />
                            }
                        </>
                    )}

                    {/* Action Button */}
                    <Button
                        block
                        style={{
                            color: '#41864D',
                            borderColor: '#41864D',
                            height: '44px',
                            fontSize: '14px',
                            fontWeight: '500',
                        }}
                        onClick={() => setShowDetail(!showDetail)}
                    >
                        📋 {showDetail ? "Ẩn mô tả chi tiết công việc" : "Xem mô tả chi tiết công việc"}
                    </Button>

                </Card>
            </Col>

            {/* Right Column - Sidebar */}
            <Col xs={24} lg={8}>
                <div style={{
                    position: 'sticky',
                    top: '20px',
                    maxHeight: 'calc(100vh - 40px)',
                }}>
                    <Card
                        style={{
                            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                            maxHeight: 'calc(100vh - 180px)',
                            display: 'flex',
                            flexDirection: 'column',
                        }}
                        bodyStyle={{
                            flex: 1,
                            overflow: 'auto',
                        }}
                    >
                        <h2
                            style={{
                                fontSize: '18px',
                                fontWeight: 'bold',
                                margin: '0 0 24px 0',
                            }}
                        >
                            Theo dõi hoạt động
                        </h2>

                        {!bookingActions || bookingActions.length === 0 ? (
                            <Empty
                                description="Chưa có hoạt động nào"
                                image={Empty.PRESENTED_IMAGE_SIMPLE}
                            />
                        ) : (
                            <>
                                <Timeline
                                    items={[...bookingActions]
                                        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                                        .map((action, index) => {
                                            const config = getActionConfig(action.action, action.status);
                                            const isLatest = index === 0;

                                            return {
                                                dot: config.icon,
                                                color: config.color,
                                                children: (
                                                    <div style={{ marginBottom: isLatest ? 0 : 16 }}>
                                                        <div style={{
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            gap: 8,
                                                            marginBottom: 4
                                                        }}>
                                                            <Tag
                                                                color={config.tagColor}
                                                                style={{ margin: 0, fontWeight: 500 }}
                                                            >
                                                                {config.label}
                                                            </Tag>
                                                            {isLatest && (
                                                                <span style={{ margin: 0, fontStyle: "italic", fontSize: 10, color: "red" }}>
                                                                    Mới nhất
                                                                </span>
                                                            )}
                                                        </div>

                                                        {action.user && (
                                                            <Text
                                                                type="secondary"
                                                                style={{
                                                                    fontSize: 13,
                                                                    display: 'block',
                                                                    marginBottom: 2
                                                                }}
                                                            >
                                                                👤 {action.user.name} ({action.user.role.name})
                                                            </Text>
                                                        )}

                                                        <Text
                                                            type="secondary"
                                                            style={{ fontSize: 12, display: 'block' }}
                                                        >
                                                            🕐 {dayjs(action.createdAt)
                                                                .format('DD/MM/YYYY [lúc] HH:mm')
                                                            }
                                                        </Text>

                                                        {action.status && (
                                                            <Text
                                                                style={{
                                                                    fontSize: 12,
                                                                    display: 'block',
                                                                    marginTop: 4,
                                                                    fontStyle: 'italic',
                                                                    color: '#666'
                                                                }}
                                                            >
                                                                Trạng thái: {action.status}
                                                            </Text>
                                                        )}
                                                    </div>
                                                ),
                                            };
                                        })}
                                />

                                <div style={{
                                    marginTop: 24,
                                    paddingTop: 16,
                                    borderTop: '1px solid #f0f0f0',
                                }}>
                                    <div style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                    }}>
                                        <Text type="secondary" style={{ fontSize: 13 }}>
                                            Tổng hoạt động
                                        </Text>
                                        <Text strong style={{ fontSize: 16, color: '#41864D' }}>
                                            {bookingActions.length}
                                        </Text>
                                    </div>
                                </div>
                            </>
                        )}
                    </Card>
                </div>
            </Col>
        </Row>
    );
}

export default BookingDetail