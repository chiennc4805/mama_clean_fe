import React, { act, useContext, useEffect, useState } from 'react';
import { Tabs, Card, Button, Tag, Space, Empty, Popconfirm, message, Col, Row } from 'antd';
import { CalendarOutlined, ClockCircleOutlined, CloseOutlined, CommentOutlined, CreditCardOutlined, DollarOutlined, DragOutlined, EditOutlined, EnvironmentOutlined, EyeOutlined, FileTextOutlined, HomeOutlined, HourglassOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { fetchAllBookingsWithoutPaginationAPI, fetchAllWalletTransactionsWithoutPagination, fetchBookingByIdAPI, updateBookingAPI } from '../services/api.service';
import { AuthContext } from '../components/context/auth.context';
import { formatterNumber } from '../services/common.function';
import EditBooking from '../components/order_management/edit.booking';
import EditBookingComponent from '../components/order_management/edit.booking';
import CreateFeedbackComponent from '../components/order_management/creat.feedback';
import ViewFeedbackComponent from '../components/order_management/view.feedback';
import dayjs from 'dayjs';

const OrderManagement = () => {

    const navigate = useNavigate()
    const { user, setUser } = useContext(AuthContext)
    const [activeTab, setActiveTab] = useState('1');
    const [upcomingOrders, setUpcomingOrders] = useState([])
    const [historyOrders, setHistoryOrders] = useState([])
    const [historyTransactions, setHistoryTransactions] = useState([])
    const [openEdit, setOpenEdit] = useState(false);
    const [openCreateFeedback, setOpenCreateFeedback] = useState(false);
    const [openViewFeedback, setOpenViewFeedback] = useState(false);
    const [bookingIdDetail, setBookingIdDetail] = useState("")
    const [cleanerUserId, setCleanerUserId] = useState("")
    const [bookings, setBookings] = useState([])
    const [loadingId, setLoadingId] = useState(null);
    const [refreshUpcoming, setRefreshUpcoming] = useState(true)
    const [refreshHistory, setRefreshHistory] = useState(true)

    useEffect(() => {
        const loadUpcomingOrders = async () => {
            const filterParam = `customer.id~'${user.id}' and status not in ['Đã hoàn thành', 'Đã huỷ']`
            const res = await fetchAllBookingsWithoutPaginationAPI(encodeURIComponent(filterParam))
            if (res.data) {
                setBookings(prev => [...prev, ...res.data.result])
                setUpcomingOrders(res.data.result.map(item => {
                    let actions = [];
                    if (["Mới", "Chờ xác nhận", "Chờ Check-in"].includes(item.status)) actions = ["edit", "cancel"];
                    else actions = [];

                    return {
                        id: item.id,
                        title: item.name,
                        service: item.service.name,
                        totalPrice: item.totalPrice,
                        duration: item.service.duration,
                        area: item.service.area,
                        date: item.date,
                        time: item.startTime,
                        location: item.address,
                        status: item.status,
                        actions
                    }
                }))
            }
        }
        loadUpcomingOrders()
    }, [refreshUpcoming])

    useEffect(() => {
        const loadHistoryOrders = async () => {
            const filterParam = `customer.id~'${user.id}' and status in ['Đã hoàn thành', 'Đã huỷ']`
            const res = await fetchAllBookingsWithoutPaginationAPI(encodeURIComponent(filterParam))
            if (res.data) {
                setBookings(prev => [...prev, ...res.data.result])
                setHistoryOrders(res.data.result.map(item => {
                    let actions = [];
                    if (["Đã hoàn thành"].includes(item.status)) {
                        if (item.feedback && item.feedback.id) {
                            actions = ["view-rate"]
                        } else {
                            actions = ["rate"];
                        }
                    }
                    return {
                        id: item.id,
                        cleanerUserId: item?.cleaner?.id || "",
                        title: item.name,
                        service: item.service.name,
                        totalPrice: item.totalPrice,
                        area: item.service.area,
                        duration: item.service.duration,
                        date: item.date,
                        time: item.startTime,
                        location: item.address,
                        status: item.status,
                        actions
                    }
                }))
            }
        }
        loadHistoryOrders()
    }, [refreshHistory])

    useEffect(() => {
        const loadWalletTransaction = async () => {
            const res = await fetchAllWalletTransactionsWithoutPagination(`user.id~'${user.id}' and type~'BOOKING_PAYMENT'`)
            if (res.data) {
                const bookingList = await fetchAllBookingsWithoutPaginationAPI(encodeURIComponent(`id in [${res.data.result.map(item => '\'' + item.ref_id + '\'')}]`));

                const transactions = await Promise.all(
                    res.data.result.map(async (item) => {
                        return {
                            title: bookingList.data.result.find(b => b.id === item.ref_id)?.name || "",
                            date: dayjs(item.createdAt).format("DD/MM/YYYY"),
                            time: dayjs(item.createdAt).format("HH:mm"),
                            card: "Sử dụng tiền trong tài khoản",
                            amount: formatterNumber(item.amount) + " VND",
                            status: "completed"
                        };
                    })
                );
                setHistoryTransactions(transactions);

            }
        }
        loadWalletTransaction()
    }, [])

    const confirm = e => {
        message.success('Click on Yes');
    };

    const handleCancelBooking = async (bookingId) => {
        setLoadingId(bookingId);
        const cancelBooking = bookings.find(item => item.id === bookingId)

        const res = await updateBookingAPI(cancelBooking.id, cancelBooking.name, cancelBooking.address, cancelBooking.addressLat, cancelBooking.addressLon, cancelBooking.date, cancelBooking.startTime, cancelBooking.totalPrice, cancelBooking.note, "Đã huỷ", cancelBooking.customer.id, cancelBooking?.cleaner?.id || "", cancelBooking.service.id)

        if (res.data) {
            setTimeout(() => {
                message.success("Huỷ đặt lịch thành công!")
                setTimeout(() => {
                    setUser
                    setRefreshHistory(prev => !prev);
                    setRefreshUpcoming(prev => !prev);
                    setUser(prev => ({
                        ...prev,
                        balance: prev.balance + cancelBooking.totalPrice
                    }))
                }, 1000)
            }, 2000)
        } else {
            message.error(res.message.trim())
            setLoadingId(null)
        }
    }

    const OrderCard = ({ order }) => (
        <Card
            className="order-card"
            style={{
                marginBottom: 16,
                borderRadius: 8,
                border: 'none',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
            }}
        >
            <div style={{ marginBottom: 12 }}>
                <h3 className="order-card-title">{order.title}</h3>
            </div>

            <Space direction="vertical" size={8} style={{ width: '100%', marginBottom: 16 }}>
                <div className="order-info-row">
                    <div className="order-info-item">
                        <CalendarOutlined className="order-info-icon" />
                        <span>{order.date}</span>
                    </div>
                    <div className="order-info-item">
                        <ClockCircleOutlined className="order-info-icon" />
                        <span>{dayjs(order.time, "HH:mm:ss").format("HH:mm")}</span>
                    </div>
                </div>
                <div className="order-info-row">
                    <div className="order-info-item">
                        <DragOutlined className="order-info-icon" />
                        <span>{order.area} m²</span>
                    </div>
                    <div className="order-info-item">
                        <HourglassOutlined className="order-info-icon" />
                        <span>{order.duration} giờ</span>
                    </div>
                </div>
                <div className="order-info-row">
                    <div className="order-info-item">
                        <DollarOutlined className="order-info-icon" />
                        <span>{formatterNumber(order.totalPrice)} VNĐ</span>
                    </div>
                </div>
                <div className="order-info-row">
                    <div className="order-info-item full-width">
                        <HomeOutlined className="order-info-icon" />
                        <span>{order.service}</span>
                    </div>
                </div>
                <div className="order-info-row">
                    <div className="order-info-item full-width">
                        <EnvironmentOutlined className="order-info-icon" />
                        <span>{order.location}</span>
                    </div>
                </div>
            </Space>

            <div className="order-card-footer">
                <div>
                    {order.status === 'Chờ xác nhận' && (
                        <Tag color="magenta" style={{ margin: 0 }}>Chờ xác nhận</Tag>
                    )}
                    {order.status === 'Mới' && (
                        <Tag color="green" style={{ margin: 0 }}>Mới</Tag>
                    )}
                    {order.status === 'Chờ Check-in' && (
                        <Tag color="processing" style={{ margin: 0 }}>Chờ Check-in</Tag>
                    )}
                    {order.status === 'Chờ Check-out' && (
                        <Tag color="processing" style={{ margin: 0 }}>Chờ Check-out</Tag>
                    )}
                    {order.status === 'Đã hoàn thành' && (
                        <Tag color="#87d068" style={{ margin: 0 }}>Đã hoàn thành</Tag>
                    )}
                    {order.status === 'Đã huỷ' && (
                        <Tag color="red" style={{ margin: 0 }}>Đã hủy</Tag>
                    )}
                </div>

                <Space className="order-actions" wrap>
                    {order.actions.includes('edit') && (
                        <Button
                            size="small"
                            className="order-btn"
                            style={{
                                borderColor: '#41864D',
                                color: '#41864D'
                            }}
                            icon={<EditOutlined />}
                            onClick={() => { setBookingIdDetail(order.id); setOpenEdit(true) }}
                        >
                            <span className="btn-text">Chỉnh sửa</span>
                        </Button>
                    )}
                    {order.actions.includes('cancel') && (
                        <Popconfirm
                            title="Huỷ đặt lịch"
                            description="Bạn có chắc chắn muốn huỷ đặt lịch không?"
                            onConfirm={confirm}
                            okText="Chắc chắn"
                            cancelText="Không"
                        >
                            <Button
                                loading={loadingId === order.id}
                                size="small"
                                danger
                                icon={<CloseOutlined />}
                                onClick={() => handleCancelBooking(order.id)}
                                className="order-btn"
                            >
                                <span className="btn-text">Hủy</span>
                            </Button>
                        </Popconfirm>
                    )}
                    {order.actions.includes('rate') && (
                        <Button
                            size="small"
                            className="order-btn"
                            style={{ borderColor: '#E98B20', color: '#E98B20' }}
                            icon={<CommentOutlined />}
                            onClick={() => { setBookingIdDetail(order.id); setCleanerUserId(order.cleanerUserId); setOpenCreateFeedback(true) }}
                        >
                            <span className="btn-text">Đánh giá</span>
                        </Button>
                    )}
                    {order.actions.includes('view-rate') && (
                        <Button
                            size="small"
                            className="order-btn"
                            style={{ borderColor: '#E98B20', color: '#E98B20' }}
                            icon={<EyeOutlined />}
                            onClick={() => { setBookingIdDetail(order.id); setOpenViewFeedback(true) }}
                        >
                            <span className="btn-text">Xem đánh giá</span>
                        </Button>
                    )}
                </Space>
            </div>
        </Card>
    );

    const items = [
        {
            key: '1',
            label: 'Đặt chỗ của tôi',
            children: (
                <div className="booking-tab-content">
                    <div className="booking-cards-container">
                        {/* Card Đặt chỗ sắp tới */}
                        <div className="booking-card-wrapper">
                            <Card
                                title="Đặt chỗ sắp tới"
                                className="upcoming-card"
                                headStyle={{
                                    fontSize: 'clamp(16px, 2vw, 18px)',
                                    fontWeight: 600,
                                    borderBottom: 'none',
                                    paddingBottom: 8
                                }}
                                bodyStyle={{
                                    maxHeight: '500px',
                                    overflowY: 'auto',
                                    padding: 'clamp(12px, 2vw, 16px)'
                                }}
                            >
                                {upcomingOrders && upcomingOrders.length > 0 ?
                                    upcomingOrders.map(order => (
                                        <OrderCard key={order.id} order={order} />
                                    ))
                                    :
                                    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                                }
                            </Card>
                        </div>

                        {/* Card Lịch sử dịch vụ */}
                        <div className="booking-card-wrapper">
                            <Card
                                title="Lịch sử dịch vụ"
                                className="history-card"
                                headStyle={{
                                    fontSize: 'clamp(16px, 2vw, 18px)',
                                    fontWeight: 600,
                                    borderBottom: 'none',
                                    paddingBottom: 8
                                }}
                                bodyStyle={{
                                    maxHeight: '500px',
                                    overflowY: 'auto',
                                    padding: 'clamp(12px, 2vw, 16px)'
                                }}
                            >
                                {historyOrders && historyOrders.length > 0 ?
                                    historyOrders.map(order => (
                                        <OrderCard key={order.id} order={order} />
                                    ))
                                    :
                                    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                                }
                            </Card>
                        </div>
                    </div>
                </div>
            ),
        },
        {
            key: '2',
            label: 'Lịch sử thanh toán',
            children: (
                <div className="payment-history-content">
                    <div className="payment-history-scroll">
                        <Row gutter={[16, 16]}>
                            {historyTransactions.map((order, index) => (
                                <Col xs={24} sm={24} md={12} lg={12} xl={12} key={index}>
                                    <Card
                                        hoverable
                                        className="payment-card"
                                    >
                                        <div style={{ marginBottom: '16px' }}>
                                            <h3 className="payment-card-title">
                                                {order.title}
                                            </h3>
                                        </div>

                                        <div className="payment-info-container">
                                            <span className="payment-info-item">
                                                <CalendarOutlined style={{ marginRight: '6px' }} />
                                                {order.date}
                                            </span>
                                            <span className="payment-info-item">
                                                <ClockCircleOutlined style={{ marginRight: '6px' }} />
                                                {order.time}
                                            </span>
                                            <span className="payment-info-item">
                                                <CreditCardOutlined style={{ marginRight: '6px' }} />
                                                {order.card}
                                            </span>
                                        </div>

                                        <div className="payment-amount">
                                            {order.amount}
                                        </div>

                                        <div className="payment-footer">
                                            {order.status === 'completed' ? (
                                                <Tag color="success">Hoàn thành</Tag>
                                            ) : (
                                                <Tag color="warning">Đang chờ xử lý</Tag>
                                            )}
                                        </div>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    </div>
                </div>
            ),
        },
    ];

    return (
        <>
            <div className="order-management-container">
                <div className="order-management-inner">
                    <h1 className="order-management-title">
                        Quản lý đơn hàng
                    </h1>

                    <Tabs
                        activeKey={activeTab}
                        onChange={setActiveTab}
                        items={items}
                        centered
                        size="large"
                        className="order-tabs"
                    />
                </div>
            </div>

            <EditBookingComponent
                open={openEdit}
                setOpen={setOpenEdit}
                bookingId={bookingIdDetail}
                setRefreshUpcoming={setRefreshUpcoming}
            />

            <CreateFeedbackComponent
                open={openCreateFeedback}
                setOpen={setOpenCreateFeedback}
                bookingId={bookingIdDetail}
                cleanerUserId={cleanerUserId}
                setRefreshHistory={setRefreshHistory}
            />

            <ViewFeedbackComponent
                open={openViewFeedback}
                setOpen={setOpenViewFeedback}
                bookingId={bookingIdDetail}
            />

            <style jsx>{`
                /* Container */
                .order-management-container {
                    min-height: 100vh;
                    background-color: #F6F6F6;
                    padding: clamp(16px, 3vw, 24px);
                }

                .order-management-inner {
                    max-width: 1300px;
                    margin: 0 auto;
                    background-color: #F6F6F6;
                    border-radius: 12px;
                    padding: clamp(16px, 4vw, 32px);
                }

                .order-management-title {
                    text-align: center;
                    font-size: clamp(28px, 5vw, 40px);
                    font-weight: 700;
                    margin-bottom: clamp(20px, 4vw, 32px);
                }

                /* Booking Tab */
                .booking-tab-content {
                    padding: clamp(16px, 3vw, 24px) 0;
                }

                .booking-cards-container {
                    display: flex;
                    gap: 24px;
                    flex-wrap: wrap;
                }

                .booking-card-wrapper {
                    flex: 1 1 calc(50% - 12px);
                    min-width: 300px;
                }

                .upcoming-card {
                    background-color: #F6FEF8;
                    border-radius: 12px;
                    border: none;
                    height: 100%;
                }

                .history-card {
                    background-color: #ffffff;
                    border-radius: 12px;
                    border: 1px solid #f0f0f0;
                    height: 100%;
                }

                /* Order Card */
                .order-card-title {
                    margin: 0;
                    font-size: clamp(14px, 2vw, 16px);
                    font-weight: 600;
                }

                .order-info-row {
                    display: flex;
                    gap: clamp(12px, 2vw, 20px);
                    flex-wrap: wrap;
                    color: #666;
                    font-size: clamp(12px, 1.5vw, 14px);
                }

                .order-info-item {
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    flex: 0 0 auto;
                }

                .order-info-item.full-width {
                    flex: 1 1 100%;
                }

                .order-info-icon {
                    font-size: clamp(12px, 1.5vw, 14px);
                    flex-shrink: 0;
                }

                .order-card-footer {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    gap: 12px;
                    flex-wrap: wrap;
                }

                .order-actions {
                    flex-wrap: wrap;
                    gap: 8px;
                }

                .order-btn {
                    font-size: clamp(12px, 1.5vw, 14px);
                }

                .btn-text {
                    display: inline;
                }

                /* Payment History */
                .payment-history-content {
                    padding: clamp(16px, 3vw, 24px);
                    background-color: #f5f5f5;
                    min-height: 100vh;
                }

                .payment-history-scroll {
                    max-height: 90vh;
                    overflow-y: auto;
                    padding-right: 8px;
                }

                .payment-card {
                    border-radius: 8px;
                    height: 100%;
                }

                .payment-card-title {
                    margin: 0;
                    font-size: clamp(14px, 2vw, 16px);
                    font-weight: 600;
                    color: #262626;
                }

                .payment-info-container {
                    display: flex;
                    gap: clamp(8px, 2vw, 16px);
                    margin-bottom: 16px;
                    flex-wrap: wrap;
                }

                .payment-info-item {
                    color: #8c8c8c;
                    font-size: clamp(12px, 1.5vw, 14px);
                    white-space: nowrap;
                }

                .payment-amount {
                    font-size: clamp(20px, 3vw, 24px);
                    font-weight: 700;
                    color: #262626;
                    margin-bottom: 16px;
                }

                .payment-footer {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    gap: 8px;
                    flex-wrap: wrap;
                }

                /* Tabs */
                .order-tabs .ant-tabs-tab {
                    font-size: clamp(14px, 2vw, 16px);
                }

                /* Responsive Breakpoints */
                @media (max-width: 992px) {
                    .booking-card-wrapper {
                        flex: 1 1 100%;
                        min-width: unset;
                    }

                    .booking-cards-container {
                        gap: 16px;
                    }
                }

                @media (max-width: 768px) {
                    .order-management-container {
                        padding: 12px;
                    }

                    .order-management-inner {
                        padding: 16px;
                    }

                    .booking-tab-content {
                        padding: 16px 0;
                    }

                    .payment-history-content {
                        padding: 16px;
                    }

                    .order-info-row {
                        gap: 12px;
                    }
                }

                @media (max-width: 576px) {
                    .order-management-container {
                        padding: 8px;
                    }

                    .order-management-inner {
                        padding: 12px;
                        border-radius: 8px;
                    }

                    .booking-tab-content {
                        padding: 12px 0;
                    }

                    .payment-history-content {
                        padding: 12px;
                    }

                    .order-card-footer {
                        flex-direction: column;
                        align-items: flex-start;
                    }

                    .order-actions {
                        width: 100%;
                        justify-content: flex-start;
                    }

                    .btn-text {
                        display: none;
                    }

                    .order-btn {
                        min-width: 36px;
                    }

                    .payment-info-container {
                        flex-direction: column;
                        gap: 8px;
                    }

                    .payment-info-item {
                        white-space: normal;
                        word-break: break-word;
                    }
                }

                /* Scrollbar */
                .payment-history-scroll::-webkit-scrollbar {
                    width: 6px;
                }

                .payment-history-scroll::-webkit-scrollbar-track {
                    background: #f1f1f1;
                }

                .payment-history-scroll::-webkit-scrollbar-thumb {
                    background: #888;
                    border-radius: 3px;
                }

                .payment-history-scroll::-webkit-scrollbar-thumb:hover {
                    background: #555;
                }
            `}</style>
        </>
    );
};

export default OrderManagement;