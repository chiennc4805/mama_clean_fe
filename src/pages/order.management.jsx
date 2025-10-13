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
            const res = await fetchAllWalletTransactionsWithoutPagination("type~'BOOKING_PAYMENT'")
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
        console.log(e);
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
                <h3 style={{ margin: 0, fontSize: 16, fontWeight: 600 }}>{order.title}</h3>
            </div>

            <Space direction="vertical" size={8} style={{ width: '100%', marginBottom: 16 }}>
                <div style={{ display: 'flex', alignItems: 'center', color: '#666', fontSize: 14 }}>
                    <CalendarOutlined style={{ marginRight: 8 }} />
                    <span>{order.date}</span>
                    <ClockCircleOutlined style={{ marginLeft: 20, marginRight: 8 }} />
                    <span>{dayjs(order.time, "HH:mm:ss").format("HH:mm")}</span>
                    <DragOutlined style={{ marginLeft: 20, marginRight: 8 }} />
                    <span>{order.area} m²</span>
                    <HourglassOutlined style={{ marginLeft: 20, marginRight: 8 }} />
                    <span>{order.duration} giờ</span>
                    <DollarOutlined style={{ marginLeft: 20, marginRight: 8 }} />
                    <span>{formatterNumber(order.totalPrice)} VNĐ</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', color: '#666', fontSize: 14 }}>
                    <HomeOutlined style={{ marginRight: 8 }} />
                    <span>{order.service}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', color: '#666', fontSize: 14 }}>
                    <EnvironmentOutlined style={{ marginRight: 8 }} />
                    <span>{order.location}</span>
                </div>
            </Space>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
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

                <Space>
                    {order.actions.includes('edit') && (
                        <Button
                            size="small"
                            style={{
                                borderColor: '#41864D',
                                color: '#41864D'
                            }}
                            icon={<EditOutlined />}
                            onClick={() => { setBookingIdDetail(order.id); setOpenEdit(true) }}
                        >
                            Chỉnh sửa
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
                            <Button loading={loadingId === order.id} size="small" danger icon={<CloseOutlined />} onClick={() => handleCancelBooking(order.id)}>
                                Hủy
                            </Button>
                        </Popconfirm>
                    )}
                    {order.actions.includes('rate') && (
                        <Button
                            size="small"
                            style={{ borderColor: '#E98B20', color: '#E98B20' }}
                            icon={<CommentOutlined />}
                            onClick={() => { setBookingIdDetail(order.id); setCleanerUserId(order.cleanerUserId); setOpenCreateFeedback(true) }}
                        >
                            Đánh giá
                        </Button>
                    )}
                    {order.actions.includes('view-rate') && (
                        <Button
                            size="small"
                            style={{ borderColor: '#E98B20', color: '#E98B20' }}
                            icon={<EyeOutlined />}
                            onClick={() => { setBookingIdDetail(order.id); setOpenViewFeedback(true) }}
                        >
                            Xem đánh giá
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
                <div style={{ padding: '24px 0' }}>
                    <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
                        {/* Card Đặt chỗ sắp tới - Màu xanh */}
                        <div style={{
                            flex: '1 1 calc(50% - 12px)',
                            minWidth: '300px'
                        }}>
                            <Card
                                title="Đặt chỗ sắp tới"
                                style={{
                                    backgroundColor: '#F6FEF8',
                                    borderRadius: 12,
                                    border: 'none',
                                    height: '100%'
                                }}
                                headStyle={{
                                    fontSize: 18,
                                    fontWeight: 600,
                                    borderBottom: 'none',
                                    paddingBottom: 8
                                }}
                                bodyStyle={{
                                    maxHeight: '500px',
                                    overflowY: 'auto',
                                    padding: '16px'
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

                        {/* Card Lịch sử dịch vụ - Màu trắng */}
                        <div style={{
                            flex: '1 1 calc(50% - 12px)',
                            minWidth: '300px'
                        }}>
                            <Card
                                title="Lịch sử dịch vụ"
                                style={{
                                    backgroundColor: '#ffffff',
                                    borderRadius: 12,
                                    border: '1px solid #f0f0f0',
                                    height: '100%'
                                }}
                                headStyle={{
                                    fontSize: 18,
                                    fontWeight: 600,
                                    borderBottom: 'none',
                                    paddingBottom: 8
                                }}
                                bodyStyle={{
                                    maxHeight: '500px',
                                    overflowY: 'auto',
                                    padding: '16px'
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
                <div style={{
                    padding: '24px',
                    backgroundColor: '#f5f5f5',
                    minHeight: '100vh'
                }}>
                    <div style={{
                        maxHeight: '90vh',
                        overflowY: 'auto',
                        paddingRight: '8px'
                    }}>
                        <Row gutter={[16, 16]}>
                            {historyTransactions.map((order, index) => (
                                <Col xs={24} sm={24} md={12} lg={12} xl={12} key={index}>
                                    <Card
                                        hoverable
                                        style={{
                                            borderRadius: '8px',
                                            height: '100%'
                                        }}
                                    >
                                        <div style={{ marginBottom: '16px' }}>
                                            <h3 style={{
                                                margin: 0,
                                                fontSize: '16px',
                                                fontWeight: 600,
                                                color: '#262626'
                                            }}>
                                                {order.title}
                                            </h3>
                                        </div>

                                        <div style={{
                                            display: 'flex',
                                            gap: '16px',
                                            marginBottom: '16px',
                                            flexWrap: 'wrap'
                                        }}>
                                            <span style={{ color: '#8c8c8c', fontSize: '14px' }}>
                                                <CalendarOutlined style={{ marginRight: '6px' }} />
                                                {order.date}
                                            </span>
                                            <span style={{ color: '#8c8c8c', fontSize: '14px' }}>
                                                <ClockCircleOutlined style={{ marginRight: '6px' }} />
                                                {order.time}
                                            </span>
                                            <span style={{ color: '#8c8c8c', fontSize: '14px' }}>
                                                <CreditCardOutlined style={{ marginRight: '6px' }} />
                                                {order.card}
                                            </span>
                                        </div>

                                        <div style={{
                                            fontSize: '24px',
                                            fontWeight: 700,
                                            color: '#262626',
                                            marginBottom: '16px'
                                        }}>
                                            {order.amount}
                                        </div>

                                        <div style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            gap: '8px',
                                            flexWrap: 'wrap'
                                        }}>
                                            {order.status === 'completed' ? (
                                                <Tag color="success">Hoàn thành</Tag>
                                            ) : (
                                                <Tag color="warning">Đang chờ xử lý</Tag>
                                            )}

                                            {/* <Button
                                                type="text"
                                                icon={<FileTextOutlined />}
                                                style={{
                                                    color: '#262626',
                                                    fontWeight: 500
                                                }}
                                            >
                                                Xem hóa đơn
                                            </Button> */}
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
            <div style={{
                minHeight: '100vh',
                backgroundColor: '#F6F6F6',
                padding: '24px'
            }}>
                <div style={{
                    maxWidth: 1300,
                    margin: '0 auto',
                    backgroundColor: '#F6F6F6',
                    borderRadius: 12,
                    padding: '32px',
                }}>
                    <h1 style={{
                        textAlign: 'center',
                        fontSize: 40,
                        fontWeight: 700,
                        marginBottom: 32
                    }}>
                        Quản lý đơn hàng
                    </h1>

                    <Tabs
                        activeKey={activeTab}
                        onChange={setActiveTab}
                        items={items}
                        centered
                        size="large"
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
        </>
    );
};

export default OrderManagement;