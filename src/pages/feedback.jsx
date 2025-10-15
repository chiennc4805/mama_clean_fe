import { Avatar, Card, Col, Rate, Row, Typography, message } from 'antd';
import 'antd/dist/reset.css';
import { useState } from 'react';

const { Title, Paragraph, Text } = Typography;

const FeedbackPage = () => {
    const [formData, setFormData] = useState({
        customerName: '',
        email: '',
        feedback: '',
        rating: 0
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const reviews = [
        {
            id: 1,
            name: 'Nguyễn Thị Thảo',
            date: '12/10/2025',
            rating: 5,
            comment: 'Dịch vụ vệ sinh tuyệt vời, căn phòng của tôi sạch sẽ đến từng ngóc ngách! Các bạn nhân viên rất nhiệt tình và chuyên nghiệp. Tôi rất hài lòng và chắc chắn sẽ sử dụng dịch vụ của Mama\'s Clean thường xuyên hơn. Rất khuyến khích cho mọi sinh viên!',
        },
        {
            id: 2,
            name: 'Trần Văn Long',
            date: '12/10/2025',
            rating: 4,
            comment: 'Chất lượng dịch vụ tốt, giá cả phải chăng phù hợp với tôi làm sinh viên. Tuy nhiên, thời gian chờ đợi hơi lâu một chút vào giờ cao điểm. Mong rằng Mama\'s Clean có thể cải thiện điểm này. Ngoài ra mọi thứ đều ổn.',
        },
        {
            id: 3,
            name: 'Lê Thanh Vy',
            date: '12/10/2025',
            rating: 5,
            comment: 'Tôi thực sự ấn tượng với sự tỉ mỉ của đội ngũ Mama\'s Clean. Họ đã làm sạch căn hộ của tôi kỹ lượng hơn tôi mong đợi. Đặc biệt là nhà bếp, sáng bóng như mới! Một trải nghiệm tuyệt vời cho những bạn bận rộn như tôi.',
        },
        {
            id: 4,
            name: 'Phạm Đức Anh',
            date: '12/10/2025',
            rating: 4,
            comment: 'Dịch vụ rất đáng tiền. Tôi thường xuyên đặt lịch đơn dẹp hàng tuần và luôn nhận được sự hài lòng. Chỉ có một lần tôi thấy hơi bừa bộn ở khu vực ban công, nhưng tổng thể vẫn rất tốt.',
        },
        {
            id: 5,
            name: 'Hoàng Thị Yến',
            date: '12/10/2025',
            rating: 5,
            comment: 'Mama\'s Clean đã cứu tôi rất nhiều lần khi tôi quá bận rộn với việc học. Chất tẩy rửa thân thiện với môi trường cũng là một điểm cộng lớn. Rất thích cách họ quan tâm đến chi tiết nhỏ nhất. Cảm ơn rất nhiều!',
        }
    ];

    // Hàm lấy chữ viết tắt từ tên
    const getInitials = (name) => {
        const words = name.trim().split(' ');
        if (words.length >= 2) {
            return (words[0][0] + words[words.length - 1][0]).toUpperCase();
        }
        return name.substring(0, 2).toUpperCase();
    };

    // Hàm tạo màu background từ tên
    const getColorFromName = (name) => {
        const colors = [
            '#4a8966', // Xanh lá chủ đạo
            '#5a9d7a', // Xanh lá nhạt
            '#6ba88e', // Xanh mint
            '#3d7355', // Xanh đậm
            '#2d5e45', // Xanh rêu
            '#7eb09b', // Xanh pastel
            '#52876b', // Xanh medium
            '#4f9170', // Xanh olive
            '#e57373', // Đỏ coral
            '#f06292', // Hồng
            '#ba68c8', // Tím
            '#9575cd', // Tím lavender
            '#7986cb', // Xanh dương
            '#64b5f6', // Xanh biển
            '#4dd0e1', // Xanh cyan
            '#4db6ac', // Xanh teal
            '#81c784', // Xanh lá sáng
            '#aed581', // Xanh lime
            '#ffd54f', // Vàng
            '#ffb74d', // Cam
            '#ff8a65', // Cam đậm
            '#a1887f', // Nâu
            '#90a4ae'  // Xám xanh
        ];

        let hash = 0;
        for (let i = 0; i < name.length; i++) {
            hash = name.charCodeAt(i) + ((hash << 5) - hash);
        }

        return colors[Math.abs(hash) % colors.length];
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.customerName.trim()) {
            newErrors.customerName = 'Vui lòng nhập tên của bạn';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Vui lòng nhập email';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Email không hợp lệ';
        }

        if (!formData.feedback.trim()) {
            newErrors.feedback = 'Vui lòng nhập nội dung phản hồi';
        }

        if (formData.rating === 0) {
            newErrors.rating = 'Vui lòng đánh giá';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateForm()) {
            setLoading(true);

            setTimeout(() => {
                setLoading(false);
                message.success('Cảm ơn bạn đã gửi phản hồi!');
                setFormData({
                    customerName: '',
                    email: '',
                    feedback: '',
                    rating: 0
                });
                setErrors({});
            }, 1000);
        }
    };

    const handleChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: '' }));
        }
    };

    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
            {/* Header Section */}
            <div style={{
                backgroundColor: '#F2FDF4',
                padding: '60px 0',
                marginBottom: '40px',
            }}>
                <Row justify="center" align="middle" gutter={[48, 32]} style={{
                    marginLeft: 0,
                    marginRight: 0
                }}>
                    <Col xs={24} md={10} lg={10}>
                        <Title level={1} style={{ marginBottom: '16px', fontWeight: "bold" }}>
                            Chúng tôi lắng nghe bạn!
                        </Title>
                        <Paragraph style={{ fontSize: '16px', color: '#666', marginBottom: 0 }}>
                            Phản hồi của bạn giúp Mama's Clean cải thiện dịch vụ mỗi ngày. Hãy chia sẻ trải nghiệm của bạn với chúng tôi!
                        </Paragraph>
                    </Col>
                    <Col xs={24} md={12} lg={10}>
                        <div style={{
                            backgroundColor: '#d4e4e8',
                            borderRadius: '16px',
                            padding: '40px',
                            textAlign: 'center',
                            minHeight: '250px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <div style={{ color: '#999', fontSize: '16px' }}>
                                <img src="feedbackpage/header.png" alt="" />
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>

            {/* Form Section */}
            <Row justify="center" style={{ padding: '50px' }}>
                <Col xs={24} sm={22} md={18} lg={14} xl={12}>
                    <Card
                        style={{
                            borderRadius: '12px',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                        }}
                    >
                        <Title level={3} style={{ textAlign: 'center', marginBottom: '32px' }}>
                            Gửi Phản Hồi Của Bạn
                        </Title>

                        <div>
                            {/* Tên khách hàng */}
                            <div style={{ marginBottom: '24px' }}>
                                <label style={{
                                    display: 'block',
                                    marginBottom: '8px',
                                    color: '#333',
                                    fontSize: '14px',
                                    fontWeight: '500'
                                }}>
                                    Tên khách hàng
                                </label>
                                <input
                                    type="text"
                                    placeholder="Nhập tên của bạn"
                                    value={formData.customerName}
                                    onChange={(e) => handleChange('customerName', e.target.value)}
                                    style={{
                                        width: '100%',
                                        padding: '10px 12px',
                                        fontSize: '14px',
                                        border: errors.customerName ? '1px solid #ff4d4f' : '1px solid #d9d9d9',
                                        borderRadius: '6px',
                                        outline: 'none',
                                        transition: 'all 0.3s'
                                    }}
                                    onFocus={(e) => e.target.style.borderColor = '#4096ff'}
                                    onBlur={(e) => e.target.style.borderColor = errors.customerName ? '#ff4d4f' : '#d9d9d9'}
                                />
                                {errors.customerName && (
                                    <div style={{ color: '#ff4d4f', fontSize: '12px', marginTop: '4px' }}>
                                        {errors.customerName}
                                    </div>
                                )}
                            </div>

                            {/* Email */}
                            <div style={{ marginBottom: '24px' }}>
                                <label style={{
                                    display: 'block',
                                    marginBottom: '8px',
                                    color: '#333',
                                    fontSize: '14px',
                                    fontWeight: '500'
                                }}>
                                    Email
                                </label>
                                <input
                                    type="email"
                                    placeholder="Nhập email của bạn"
                                    value={formData.email}
                                    onChange={(e) => handleChange('email', e.target.value)}
                                    style={{
                                        width: '100%',
                                        padding: '10px 12px',
                                        fontSize: '14px',
                                        border: errors.email ? '1px solid #ff4d4f' : '1px solid #d9d9d9',
                                        borderRadius: '6px',
                                        outline: 'none',
                                        transition: 'all 0.3s'
                                    }}
                                    onFocus={(e) => e.target.style.borderColor = '#4096ff'}
                                    onBlur={(e) => e.target.style.borderColor = errors.email ? '#ff4d4f' : '#d9d9d9'}
                                />
                                {errors.email && (
                                    <div style={{ color: '#ff4d4f', fontSize: '12px', marginTop: '4px' }}>
                                        {errors.email}
                                    </div>
                                )}
                            </div>

                            {/* Nội dung phản hồi */}
                            <div style={{ marginBottom: '24px' }}>
                                <label style={{
                                    display: 'block',
                                    marginBottom: '8px',
                                    color: '#333',
                                    fontSize: '14px',
                                    fontWeight: '500'
                                }}>
                                    Nội dung phản hồi
                                </label>
                                <textarea
                                    placeholder="Chia sẻ suy nghĩ của bạn về dịch vụ của chúng tôi"
                                    value={formData.feedback}
                                    onChange={(e) => handleChange('feedback', e.target.value)}
                                    rows={6}
                                    style={{
                                        width: '100%',
                                        padding: '10px 12px',
                                        fontSize: '14px',
                                        border: errors.feedback ? '1px solid #ff4d4f' : '1px solid #d9d9d9',
                                        borderRadius: '6px',
                                        outline: 'none',
                                        resize: 'vertical',
                                        fontFamily: 'inherit',
                                        transition: 'all 0.3s'
                                    }}
                                    onFocus={(e) => e.target.style.borderColor = '#4096ff'}
                                    onBlur={(e) => e.target.style.borderColor = errors.feedback ? '#ff4d4f' : '#d9d9d9'}
                                />
                                {errors.feedback && (
                                    <div style={{ color: '#ff4d4f', fontSize: '12px', marginTop: '4px' }}>
                                        {errors.feedback}
                                    </div>
                                )}
                            </div>

                            {/* Đánh giá */}
                            <div style={{ marginBottom: '32px' }}>
                                <label style={{
                                    display: 'block',
                                    marginBottom: '8px',
                                    color: '#333',
                                    fontSize: '14px',
                                    fontWeight: '500'
                                }}>
                                    Đánh giá của bạn
                                </label>
                                <Rate
                                    value={formData.rating}
                                    onChange={(value) => handleChange('rating', value)}
                                    style={{ fontSize: '32px' }}
                                    allowHalf
                                />
                                {errors.rating && (
                                    <div style={{ color: '#ff4d4f', fontSize: '12px', marginTop: '4px' }}>
                                        {errors.rating}
                                    </div>
                                )}
                            </div>

                            {/* Submit Button */}
                            <button
                                onClick={handleSubmit}
                                disabled={loading}
                                style={{
                                    width: '100%',
                                    height: '48px',
                                    backgroundColor: loading ? '#95d5b2' : '#4a8966',
                                    color: '#fff',
                                    fontSize: '16px',
                                    fontWeight: '500',
                                    border: 'none',
                                    borderRadius: '6px',
                                    cursor: loading ? 'not-allowed' : 'pointer',
                                    transition: 'all 0.3s'
                                }}
                                onMouseEnter={(e) => {
                                    if (!loading) e.target.style.backgroundColor = '#3d7355';
                                }}
                                onMouseLeave={(e) => {
                                    if (!loading) e.target.style.backgroundColor = '#4a8966';
                                }}
                            >
                                {loading ? 'Đang gửi...' : 'Gửi phản hồi'}
                            </button>
                        </div>
                    </Card>
                </Col>
            </Row>


            {/* review section */}
            <div style={{ maxWidth: '100%', margin: '0 auto', backgroundColor: "#FAFAFB", padding: "100px 50px" }}>

                <Title
                    level={2}
                    style={{
                        textAlign: 'center',
                        marginBottom: '60px',
                        color: '#333',
                        fontSize: '32px'
                    }}
                >
                    Đánh Giá Từ Khách Hàng
                </Title>

                <Row gutter={[24, 24]}>
                    {reviews.map((review) => (
                        <Col xs={24} sm={24} md={12} lg={8} key={review.id}>
                            <Card
                                style={{
                                    borderRadius: '12px',
                                    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                                    height: '100%',
                                    border: '1px solid #e8e8e8'
                                }}
                                bodyStyle={{ padding: '24px' }}
                            >
                                <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '16px' }}>
                                    <Avatar
                                        size={56}
                                        style={{
                                            backgroundColor: getColorFromName(review.name),
                                            flexShrink: 0
                                        }}
                                    >
                                        {getInitials(review.name)}
                                    </Avatar>
                                    <div style={{ marginLeft: '16px', flex: 1 }}>
                                        <Text
                                            strong
                                            style={{
                                                fontSize: '16px',
                                                display: 'block',
                                                marginBottom: '4px',
                                                color: '#333'
                                            }}
                                        >
                                            {review.name}
                                        </Text>
                                        <Text
                                            type="secondary"
                                            style={{
                                                fontSize: '13px',
                                                display: 'block',
                                                marginBottom: '8px'
                                            }}
                                        >
                                            {review.date}
                                        </Text>
                                        <Rate
                                            disabled
                                            defaultValue={review.rating}
                                            style={{ fontSize: '16px' }}
                                        />
                                    </div>
                                </div>

                                <Paragraph
                                    style={{
                                        marginBottom: 0,
                                        fontSize: '14px',
                                        lineHeight: '1.8',
                                        color: '#595959'
                                    }}
                                >
                                    {review.comment}
                                </Paragraph>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </div>
        </div>
    );
}

export default FeedbackPage;