import React, { useContext, useEffect, useState } from 'react';
import { Card, Progress, Rate, Avatar, Button, Typography, Divider, Tooltip, Empty } from 'antd';
import { UserOutlined, MoreOutlined, StarFilled } from '@ant-design/icons';
import { AuthContext } from '../../components/context/auth.context'
import { fetchAllBookingsWithoutPaginationAPI, fetchCleanerByUserIdAPI } from '../../services/api.service';
import ViewDetailBookingInFeedback from '../../components/customer_feedback_cleaner/view.detail.booking.in.feedback';

const { Title, Text, Paragraph } = Typography;

const CustomerReviews = () => {

    const { user } = useContext(AuthContext)
    const [isModalDetailOpen, setIsModalDetailOpen] = useState(false);
    const [overallRating, setOverallRating] = useState(0);
    const [totalReviews, setTotalReviews] = useState(0);
    const [bookingId, setBookingId] = useState("")
    const [ratingDistribution, setRatingDistribution] = useState([
        { stars: 5, count: 0 },
        { stars: 4, count: 0 },
        { stars: 3, count: 0 },
        { stars: 2, count: 0 },
        { stars: 1, count: 0 }
    ])
    const [reviews, setReviews] = useState([])
    const [selectedStars, setSelectedStars] = useState(null)


    const SmoothAntdStarRating = ({ value = 0, size = 24, color = '#fadb14', backgroundColor = '#f0f0f0' }) => {
        const percentage = Math.min(100, Math.max(0, (value / 5) * 100));

        return (
            <Tooltip title={`${value.toFixed(2)} / 5`}>
                <div style={{ position: 'relative', display: 'inline-block', fontSize: size, lineHeight: 1 }}>
                    {/* lớp sao màu vàng */}
                    <div
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: `${percentage}%`,
                            overflow: 'hidden',
                            whiteSpace: 'nowrap',
                            color,
                            transition: 'width 0.4s ease',
                        }}
                    >
                        <StarFilled /><StarFilled /><StarFilled /><StarFilled /><StarFilled />
                    </div>

                    {/* lớp sao nền xám */}
                    <div style={{ color: backgroundColor }}>
                        <StarFilled /><StarFilled /><StarFilled /><StarFilled /><StarFilled />
                    </div>
                </div>
            </Tooltip>
        );
    };

    useEffect(() => {
        const loadBookingByCleaner = async () => {
            let filterParam = `cleaner.id~'${user.id}' and feedback is not null`
            if (selectedStars) {
                filterParam += ` and feedback.rating : ${selectedStars}`
            }

            const resFiltered = await fetchAllBookingsWithoutPaginationAPI(encodeURIComponent(filterParam))

            if (resFiltered.data) {
                const result = resFiltered.data.result || []
                result.sort((a, b) => new Date(b.feedback.createdAt) - new Date(a.feedback.createdAt))

                const customerReviews = result.map(el => {
                    const feedbackDate = new Date(el.feedback.createdAt)
                    const today = new Date()
                    const diffMs = today - feedbackDate
                    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

                    let timeText = ''
                    if (diffDays === 0) {
                        const timeStr = feedbackDate.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
                        timeText = 'Hôm nay lúc ' + timeStr
                    } else if (diffDays === 1) timeText = '1 ngày trước'
                    else timeText = `${diffDays} ngày trước`

                    return {
                        bookingId: el.id,
                        name: el.customer.name,
                        time: timeText,
                        rating: el.feedback.rating,
                        comment: el.feedback.content,
                        avatar: el.customer.avatar || null
                    }
                })

                setReviews(customerReviews)
            }
        }
        loadBookingByCleaner()
    }, [selectedStars])

    useEffect(() => {
        const loadBookingByCleaner = async () => {
            const resAll = await fetchAllBookingsWithoutPaginationAPI(
                encodeURIComponent(`cleaner.id~'${user.id}' and feedback is not null`)
            )

            if (resAll.data) {
                const allData = resAll.data.result || []

                // Tính phân bố sao
                const distribution = [
                    { stars: 5, count: 0 },
                    { stars: 4, count: 0 },
                    { stars: 3, count: 0 },
                    { stars: 2, count: 0 },
                    { stars: 1, count: 0 }
                ]

                allData.forEach(el => {
                    const rating = el?.feedback?.rating || 0
                    if (rating >= 1 && rating <= 5) {
                        const starObj = distribution.find(d => d.stars === Math.ceil(rating))
                        if (starObj) starObj.count += 1
                    }
                })

                setRatingDistribution(distribution)
            }
        }
        loadBookingByCleaner()

        const loadCleanerProfile = async () => {
            const res = await fetchCleanerByUserIdAPI(user.id)
            if (res.data) {
                setOverallRating(res.data.rating)
                setTotalReviews(res.data.ratingCount - 1)
            }
        }
        loadCleanerProfile()
    }, [])

    return (
        <>
            <div style={{
                padding: 20
            }}>
                {/* title */}
                <div div xs={24} style={{ display: "flex", justifyContent: "space-between", margin: "1%", background: "#fff", paddingBottom: "5px" }}>
                    <h1>
                        Đánh giá của khách hàng
                    </h1>
                </div>

                <Divider size="large" style={{ minWidth: "50%", width: "95%", margin: "0 auto", paddingBottom: "40px" }} />


                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, marginBottom: 40 }}>
                    {/* Left side - Overall rating */}
                    <Card>
                        <div>
                            <Text strong style={{ fontSize: 16, display: 'block', marginBottom: 12 }}>
                                Tổng quan đánh giá
                            </Text>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                                <span style={{ fontSize: 50, fontWeight: 'bold', lineHeight: 1, color: "#41864D" }}>
                                    {overallRating}
                                </span>
                                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                    <SmoothAntdStarRating value={overallRating} size={28} />

                                    <Text type="secondary" style={{ fontSize: 14 }}>
                                        ({totalReviews} Đánh giá)
                                    </Text>
                                </div>
                            </div>

                            <div style={{ marginTop: 24 }}>
                                {ratingDistribution.map(item => (
                                    <div
                                        key={item.stars}
                                        onClick={() => setSelectedStars(item.stars === selectedStars ? null : item.stars)}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 12,
                                            marginBottom: 12,
                                            cursor: 'pointer',
                                            backgroundColor: item.stars === selectedStars ? '#F6F6F6' : 'transparent',
                                            borderRadius: 8,
                                            padding: '4px 8px',
                                            transition: '0.2s'
                                        }}
                                    >
                                        <Text style={{ minWidth: 50 }}>{item.stars} sao</Text>
                                        <Progress
                                            percent={(item.count / totalReviews) * 100}
                                            showInfo={false}
                                            strokeColor="#41864D"
                                            trailColor="#E3FFD5"
                                            style={{ flex: 1 }}
                                        />
                                        <Text style={{ minWidth: 30, textAlign: 'right' }}>{item.count}</Text>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Reviews section */}
                <div>
                    <Title level={5} style={{ marginBottom: 24 }}>Nhận xét từ khách hàng (mới nhất)</Title>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
                        {reviews && reviews.length > 0 ? reviews.map((review, index) => (
                            <Card
                                key={index}
                                style={{
                                    backgroundColor: '#fafafa',
                                    border: 'none'
                                }}
                            >
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                                    <div style={{ display: 'flex', gap: 12 }}>
                                        <Avatar size={40} icon={<UserOutlined />} src={`http://localhost:8080/upload/avatar/${review.avatar}`} />
                                        <div>
                                            <Text strong style={{ display: 'block' }}>{review.name}</Text>
                                            <Text type="secondary" style={{ fontSize: 12 }}>{review.time}</Text>
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                                        <Rate disabled allowHalf value={review.rating} style={{ fontSize: 16, color: '#fadb14' }} />
                                        <Button type="text" icon={<MoreOutlined />} size="small" />
                                    </div>
                                </div>

                                <Paragraph style={{ marginBottom: 12, fontSize: 14 }}>
                                    {review.comment}
                                </Paragraph>

                                <Button type="link" style={{ padding: 0, height: 'auto' }} onClick={() => { setBookingId(review.bookingId); setIsModalDetailOpen(true) }}>
                                    Xem chi tiết công việc
                                </Button>
                            </Card>
                        )) :
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    minHeight: "300px", // hoặc 400px
                                    gridColumn: "1 / span 2", // để nó chiếm toàn bộ 2 cột của grid
                                }}
                            >
                                <Empty
                                    description="Không có đánh giá nào"
                                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                                />
                            </div>
                        }
                    </div>
                </div>
            </div>

            <ViewDetailBookingInFeedback
                isModalOpen={isModalDetailOpen}
                setIsModalOpen={setIsModalDetailOpen}
                bookingId={bookingId}
            />
        </>
    );
};

export default CustomerReviews;