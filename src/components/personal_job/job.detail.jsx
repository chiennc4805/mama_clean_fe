import { Button, Card, Checkbox, Col, Empty, Image, message, notification, Popconfirm, Row, Spin, Tag, Typography } from 'antd';
import { useContext, useState } from 'react';
import { fetchBookingCheckInByBookingIdAPI, fetchBookingCheckOutByBookingIdAPI, getAvailableJobAPI, updateBookingAPI } from '../../services/api.service';
import { formatterNumber } from '../../services/common.function';
import dayjs from 'dayjs';
import "dayjs/locale/vi"; // để hiển thị thứ tiếng Việt
import { AuthContext } from '../context/auth.context';
dayjs.locale("vi");

const { Title, Text } = Typography;

const JobDetail = (props) => {

    const { user } = useContext(AuthContext)
    const [isChecked, setIsChecked] = useState(false);
    const { dataDetail, setStep } = props
    const [loadingCancel, setLoadingCancel] = useState(false)
    const [loadingGet, setLoadingGet] = useState(false)
    const [showDetail, setShowDetail] = useState(false);
    const [loading, setLoading] = useState(false);
    const [bookingCheckIn, setBookingCheckIn] = useState(null)
    const [bookingCheckOut, setBookingCheckOut] = useState(null)

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
    }, [dataDetail])

    const handleCancelJob = async () => {
        setLoadingCancel(true)

        const res = await updateBookingAPI(dataDetail.id, dataDetail.name, dataDetail.address, dataDetail.addressLat, dataDetail.addressLon, dataDetail.date, dataDetail.startTime, dataDetail.totalPrice, dataDetail.note, "Mới", dataDetail.customer.id, null, dataDetail.service.id)

        setTimeout(() => {
            if (res.data) {
                message.success("Huỷ bỏ thành công")
                setTimeout(() => {
                    window.location.reload()
                }, 2000)
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

    useState()

    const handleGetJob = async () => {
        setLoadingGet(true)

        const res = await getAvailableJobAPI(dataDetail.id, dataDetail.name, dataDetail.address, dataDetail.addressLat, dataDetail.addressLon, dataDetail.date, dataDetail.startTime, dataDetail.totalPrice, dataDetail.note, "Chờ Check-in", dataDetail.customer.id, user.id, dataDetail.service.id)

        setTimeout(() => {
            if (res.data) {
                message.success("Nhận việc thành công")
                setTimeout(() => {
                    window.location.reload()
                }, 2000)
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
        <Row gutter={[24, 24]}>
            {/* Left Column - Main Content */}
            <Col xs={24} lg={18}>
                <Card style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
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
                            alt={""}
                            src="/src/assets/job_detail/demo_pic.jpg"
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
                                {formatterNumber(Math.round(dataDetail.totalPrice * (1 - import.meta.env.VITE_INCOME_DEDUCTION)))} VNĐ
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
                                            width={400}
                                            height={300}
                                            src={`http://localhost:8080/upload/booking_check_out/${bookingCheckOut.checkOutImageName}`}
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
                    {!["Mới", "Chờ xác nhận"].includes(dataDetail.status) ?
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

                        :
                        ""
                    }
                </Card>
            </Col>

            {/* Right Column - Sidebar */}
            <Col xs={24} lg={6}>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        height: '100%',
                    }}
                >
                    <Card
                        style={{
                            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                            display: 'flex',
                            flexDirection: 'column',
                            height: '100%',
                        }}
                        bodyStyle={{
                            display: 'flex',
                            flexDirection: 'column',
                            flex: 1,
                        }}
                    >
                        <div>
                            <h2
                                style={{
                                    fontSize: '18px',
                                    fontWeight: 'bold',
                                    margin: '0 0 16px 0',
                                }}
                            >
                                Xác nhận & Hành động
                            </h2>

                            <div style={{ marginBottom: '16px' }}>
                                <Checkbox
                                    checked={isChecked | (!["Chờ xác nhận", "Mới"].includes(dataDetail.status))}
                                    onChange={(e) => setIsChecked(e.target.checked)}
                                    style={{ fontSize: 14, marginBottom: 20 }}
                                >
                                    Đã đọc kỹ chi tiết công việc
                                </Checkbox>
                            </div>
                        </div>


                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '12px',
                                marginTop: 'auto',
                            }}
                        >
                            {["Chờ xác nhận", "Mới"].includes(dataDetail.status) ?
                                <>
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

                                    {dataDetail.status !== "Mới" ?
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
                                        :
                                        ""
                                    }
                                </>
                                :
                                <Button
                                    block
                                    type="primary"
                                    size="large"
                                    style={{
                                        height: 48,
                                        borderRadius: 6,
                                        backgroundColor: '#41864D',
                                        borderColor: '#41864D',
                                        fontSize: 14,
                                        color: '#fff',
                                        fontWeight: 500
                                    }}
                                    disabled={!isChecked}
                                    onClick={() => handleGetJob()}
                                    loading={loadingGet}
                                >
                                    Công việc đã được xác nhận
                                </Button>
                            }
                        </div>

                    </Card>
                </div>
            </Col>
        </Row>
    );
}

export default JobDetail