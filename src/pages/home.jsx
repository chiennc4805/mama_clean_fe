import { CalendarOutlined, CheckCircleOutlined, CheckOutlined, ClockCircleOutlined, HeartOutlined, HomeOutlined, SafetyOutlined, StarOutlined, ThunderboltOutlined, UserOutlined } from "@ant-design/icons"
import { Button, Card, Col, DatePicker, Form, Input, Row, Select, Typography } from "antd"
import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../components/context/auth.context"

const { Title, Paragraph, Text: AntText } = Typography;

const HomePage = () => {

    const { user, setUser } = useContext(AuthContext)
    const [form] = Form.useForm()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [servicesOption, setServicesOption] = useState([])

    const processSteps = [
        {
            icon: <CheckCircleOutlined style={{ fontSize: '32px', color: '#52c41a' }} />,
            title: 'Chọn dịch vụ',
            description: 'Lựa chọn loại hình và gói dịch vụ phù hợp với nhu cầu của bạn trên Mama\'s Clean.',
            number: '1'
        },
        {
            icon: <CalendarOutlined style={{ fontSize: '32px', color: '#52c41a' }} />,
            title: 'Chọn thời gian & địa điểm',
            description: 'Đặt lịch dọn dẹp vào thời gian và địa chỉ bạn mong muốn một cách dễ dàng và linh hoạt.',
            number: '2'
        },
        {
            icon: <HeartOutlined style={{ fontSize: '32px', color: '#52c41a' }} />,
            title: 'Xác nhận & Thanh toán',
            description: 'Xác nhận thông tin đặt lịch và hoàn tất thanh toán an toàn, minh bạch.',
            number: '3'
        },
        {
            icon: <HomeOutlined style={{ fontSize: '32px', color: '#52c41a' }} />,
            title: 'Tận hưởng không gian sạch sẽ',
            description: 'Đội ngũ chuyên nghiệp của chúng tôi sẽ đến và mang lại không gian sạch bóng cho bạn.',
            number: '4'
        }
    ];

    const fetchDataInFormBookingNow = async () => {
        // const res = await fetchAllServicesWithoutPagination()
        // if (res.data) {
        //     setServicesOption(res.data.result.map(x => ({ label: x.name, value: x.id })))
        // }
    }

    useEffect(() => {
        if (["SUPER_ADMIN", "CLEANER"].includes(user?.role?.name)) {
            navigate("/management")
        }
        fetchDataInFormBookingNow()
    }, [])

    const onFinish_now_booking = async (values) => {
        setLoading(true)
        // const res = await loginAPI(values.username, values.password)
        setTimeout(() => {
            // if (res.data) {
            //     message.success("Đăng nhập thành công")
            //     localStorage.setItem("access_token", res.data.access_token)
            //     setUser(res.data.user)
            //     navigate("/")
            // }
            setLoading(false)
        }, 2000)
    }

    return (
        <>
            {/* Banner Section - Responsive */}
            <div style={{
                position: "relative",
                width: "100%",
                height: "clamp(400px, 100vh, 750px)",
                overflow: "hidden"
            }}>
                <img
                    src="homepage/banner.jpg"
                    alt="banner"
                    style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        position: "absolute",
                        top: 0,
                        left: 0,
                        zIndex: 1
                    }}
                />

                <div style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    background: "rgba(255,255,255,0.4)",
                    zIndex: 2
                }} />

                <div className="banner-content" style={{
                    position: "relative",
                    zIndex: 3,
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "flex-start",
                    padding: "20px",
                    color: "#222"
                }}>
                    <h1 className="banner-title">
                        Dịch vụ dọn dẹp nhà cửa
                        <br />
                        chuyên nghiệp Mama's Clean
                    </h1>

                    <p className="banner-description">
                        Mang đến không gian sống sạch sẽ, thông thoáng cho gia đình bạn. Đặt lịch nhanh chóng, tiện lợi, đội ngũ tận tâm và đáng tin cậy.
                    </p>

                    <div style={{ marginTop: 'clamp(20px, 5vh, 50px)', display: "flex", gap: 20, flexWrap: "wrap" }}>
                        <button
                            className="btn-primary"
                            onClick={() => navigate("/booking")}>
                            Đặt lịch ngay
                        </button>
                    </div>
                </div>
            </div>

            {/* Why Choose Section - Responsive */}
            <div className="section-padding" style={{
                background: "#F6F6F6",
                width: "100%",
            }}>
                <div className="container">
                    <h2 className="section-title">
                        Tại sao chọn Mama's Clean?
                    </h2>
                    <p className="section-description">
                        Chúng tôi cam kết mang đến trải nghiệm dọn dẹp tuyệt vời nhất với đội ngũ chuyên nghiệp và dịch vụ tận tâm.
                    </p>

                    <div className="why-choose-grid">
                        {/* 4 box lý do */}
                        <div className="features-grid">
                            <div className="feature-card">
                                <CheckCircleOutlined className="feature-icon" />
                                <div>
                                    <div className="feature-title">
                                        Đội ngũ chuyên nghiệp
                                    </div>
                                    <div className="feature-description">
                                        Nhân viên được đào tạo bài bản, tận tâm, đảm bảo chất lượng dịch vụ cao nhất.
                                    </div>
                                </div>
                            </div>
                            <div className="feature-card">
                                <ThunderboltOutlined className="feature-icon" />
                                <div>
                                    <div className="feature-title">Nhanh chóng & Tiện lợi</div>
                                    <div className="feature-description">
                                        Đặt lịch dễ dàng qua ứng dụng hoặc website, tiết kiệm thời gian cho bạn.
                                    </div>
                                </div>
                            </div>
                            <div className="feature-card">
                                <HeartOutlined className="feature-icon" />
                                <div>
                                    <div className="feature-title">Sạch sẽ vượt trội</div>
                                    <div className="feature-description">
                                        Sử dụng hóa chất an toàn và kỹ thuật tiên tiến, mang lại không gian sạch bóng.
                                    </div>
                                </div>
                            </div>
                            <div className="feature-card">
                                <UserOutlined className="feature-icon" />
                                <div>
                                    <div className="feature-title">Hỗ trợ 24/7</div>
                                    <div className="feature-description">
                                        Đội ngũ chăm sóc khách hàng luôn sẵn sàng giải đáp mọi thắc mắc.
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Ảnh lớn bên phải */}
                        <div className="why-choose-image">
                            <img
                                src="homepage/why_choose.png"
                                alt="Mama's Clean Team"
                                style={{
                                    width: "100%",
                                    maxWidth: 700,
                                    borderRadius: 16,
                                    objectFit: "cover",
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Featured Services Section - Responsive */}
            <div className="section-padding" style={{
                background: "#FFFFFF",
                width: "100%",
            }}>
                <div className="container">
                    <h2 className="section-title">
                        Các dịch vụ nổi bật của Mama's Clean
                    </h2>
                    <p className="section-description" style={{
                        maxWidth: 900,
                        marginLeft: "auto",
                        marginRight: "auto"
                    }}>
                        Chúng tôi cung cấp đa dạng các gói dịch vụ dọn dẹp, đáp ứng mọi nhu cầu của bạn với chất lượng hàng đầu và sự tận tâm.
                    </p>
                    <div className="services-grid">
                        {/* Box 1 */}
                        <div className="service-card">
                            <div className="service-icon-wrapper">
                                <span className="service-icon">✧</span>
                            </div>
                            <div className="service-title">
                                Dọn dẹp cơ bản
                            </div>
                            <div className="service-description">
                                Làm sạch tổng thể, hút bụi, lau sàn, vệ sinh bề mặt nhà bạn.
                            </div>
                        </div>
                        {/* Box 2 */}
                        <div className="service-card">
                            <div className="service-icon-wrapper">
                                <span className="service-icon">🏠</span>
                            </div>
                            <div className="service-title">
                                Dọn dẹp chuyên sâu
                            </div>
                            <div className="service-description">
                                Vệ sinh chi tiết mọi ngóc ngách, khử trùng, làm sạch đồ dùng kỹ lưỡng.
                            </div>
                        </div>
                        {/* Box 3 */}
                        <div className="service-card">
                            <div className="service-icon-wrapper">
                                <span className="service-icon">🏢</span>
                            </div>
                            <div className="service-title">
                                Dọn dẹp văn phòng
                            </div>
                            <div className="service-description">
                                Duy trì môi trường làm việc sạch sẽ, gọn gàng, tăng cường năng suất làm việc.
                            </div>
                        </div>
                        {/* Box 4 */}
                        <div className="service-card">
                            <div className="service-icon-wrapper">
                                <span className="service-icon">🧹</span>
                            </div>
                            <div className="service-title">
                                Dọn dẹp sau sự kiện
                            </div>
                            <div className="service-description">
                                Thu dọn nhanh chóng sau các buổi tiệc, sự kiện, trả lại không gian ban đầu sạch đẹp.
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Process Step Section - Responsive */}
            <div className="section-padding" style={{
                backgroundColor: '#F6F6F6',
                minHeight: '90vh',
            }}>
                <div className="container">
                    <div style={{ textAlign: 'center', marginBottom: '60px' }}>
                        <Title level={2} className="section-title">
                            Cách thức hoạt động đơn giản của Mama's Clean
                        </Title>
                        <Paragraph className="section-description" style={{
                            maxWidth: '900px',
                            margin: '0 auto',
                        }}>
                            Chỉ với vài bước đơn giản, bạn đã có thể tận hưởng không gian sống sạch sẽ và thoải mái ngay lập tức.
                        </Paragraph>
                    </div>

                    <Row gutter={[32, 32]} justify="center">
                        {processSteps.map((step, index) => (
                            <Col xs={24} sm={12} lg={6} key={index}>
                                <Card
                                    style={{
                                        textAlign: 'center',
                                        height: '100%',
                                        borderRadius: '16px',
                                        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                                        transition: 'all 0.3s ease',
                                        position: 'relative',
                                        overflow: 'visible'
                                    }}
                                    bodyStyle={{
                                        padding: '40px 24px 32px',
                                        height: '100%',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'space-between'
                                    }}
                                    className="process-card"
                                >
                                    <div style={{
                                        position: 'absolute',
                                        top: '-15px',
                                        left: '20px',
                                        width: '40px',
                                        height: '40px',
                                        backgroundColor: '#52c41a',
                                        color: 'white',
                                        borderRadius: '50%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '18px',
                                        fontWeight: 'bold',
                                        boxShadow: '0 2px 8px rgba(82, 196, 26, 0.3)'
                                    }}>
                                        {step.number}
                                    </div>

                                    <div>
                                        <div style={{
                                            marginBottom: '24px',
                                            padding: '20px',
                                            backgroundColor: '#f6ffed',
                                            borderRadius: '50%',
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}>
                                            {step.icon}
                                        </div>

                                        <Title level={4} className="process-card-title">
                                            {step.title}
                                        </Title>

                                        <Paragraph className="process-card-description">
                                            {step.description}
                                        </Paragraph>
                                    </div>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </div>
            </div>

            {/* Customer Feedback Section - Responsive */}
            <div className="section-padding" style={{
                backgroundColor: '#FFFFFF',
                minHeight: '90vh'
            }}>
                <div className="container">
                    <div style={{ textAlign: 'center', marginBottom: '60px' }}>
                        <Title level={2} className="section-title">
                            Khách hàng nói gì về Mama's Clean
                        </Title>
                        <Paragraph className="section-description" style={{
                            maxWidth: '800px',
                            margin: '0 auto',
                        }}>
                            Sự hài lòng của khách hàng là động lực lớn nhất để chúng tôi không ngừng cải thiện dịch vụ mỗi ngày.
                        </Paragraph>
                    </div>
                    <Row gutter={[32, 32]} justify="center">
                        {/* Testimonial 1 */}
                        <Col xs={24} md={8}>
                            <Card className="testimonial-card">
                                <div style={{ marginBottom: '24px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
                                        <div className="testimonial-avatar" style={{
                                            backgroundImage: 'linear-gradient(45deg, #ff9a9e 0%, #fecfef 100%)',
                                        }}>
                                            <span style={{ color: 'white', fontSize: '18px', fontWeight: 'bold' }}>NH</span>
                                        </div>
                                        <div>
                                            <div className="testimonial-name">
                                                Nguyễn Thị Hoa
                                            </div>
                                            <div className="testimonial-rating">
                                                ⭐⭐⭐⭐⭐
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <Paragraph className="testimonial-text">
                                    "Dịch vụ quá tuyệt vời! Nhân viên dọn dẹp kỹ lưỡng và rất chuyên nghiệp. Nhà tôi luôn sạch bóng sau mỗi lần sử dụng dịch vụ của Mama's Clean."
                                </Paragraph>
                            </Card>
                        </Col>

                        {/* Testimonial 2 */}
                        <Col xs={24} md={8}>
                            <Card className="testimonial-card">
                                <div style={{ marginBottom: '24px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
                                        <div className="testimonial-avatar" style={{
                                            backgroundImage: 'linear-gradient(45deg, #a8edea 0%, #fed6e3 100%)',
                                        }}>
                                            <span style={{ color: 'white', fontSize: '18px', fontWeight: 'bold' }}>TH</span>
                                        </div>
                                        <div>
                                            <div className="testimonial-name">
                                                Trần Văn Hùng
                                            </div>
                                            <div className="testimonial-rating">
                                                ⭐⭐⭐⭐⭐
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <Paragraph className="testimonial-text">
                                    "Tôi rất hài lòng với sự tiện lợi và chất lượng dịch vụ từ Mama's Clean. Đặt lịch dễ dàng, nhân viên đúng giờ và làm việc hiệu quả, không gian nhà luôn thơm mát."
                                </Paragraph>
                            </Card>
                        </Col>

                        {/* Testimonial 3 */}
                        <Col xs={24} md={8}>
                            <Card className="testimonial-card">
                                <div style={{ marginBottom: '24px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
                                        <div className="testimonial-avatar" style={{
                                            backgroundImage: 'linear-gradient(45deg, #ffecd2 0%, #fcb69f 100%)',
                                        }}>
                                            <span style={{ color: 'white', fontSize: '18px', fontWeight: 'bold' }}>LM</span>
                                        </div>
                                        <div>
                                            <div className="testimonial-name">
                                                Lê Thị Mai
                                            </div>
                                            <div className="testimonial-rating">
                                                ⭐⭐⭐⭐⭐
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <Paragraph className="testimonial-text">
                                    "Ứng dụng dễ sử dụng, đội ngũ hỗ trợ nhiệt tình. Tuyệt vời! Tôi sẽ giới thiệu Mama's Clean cho bạn bè và gia đình."
                                </Paragraph>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </div>

            {/* Student Cleaning Service Section - Responsive */}
            <div style={{
                minHeight: '100vh',
                background: '#F2FDF4',
                padding: '60px 20px'
            }}>
                <div className="container">
                    <div style={{ textAlign: 'center', marginBottom: '60px' }}>
                        <Title level={1} className="section-title">
                            Dọn dẹp tiện lợi cho đời sống sinh viên năng động
                        </Title>
                        <Paragraph className="section-description" style={{
                            maxWidth: '1000px',
                            margin: '0 auto',
                        }}>
                            Mama's Clean giúp sinh viên giữ gìn không gian sống sạch sẽ, để bạn tập trung vào việc
                            học và tận hưởng cuộc sống đại học.
                        </Paragraph>
                    </div>

                    <Row gutter={[48, 48]} align="middle">
                        <Col xs={24} lg={12}>
                            <div className="student-image-wrapper">
                                <img
                                    src="homepage/student_cleaning_service.jpg"
                                    alt="Clean living space"
                                    className="student-image"
                                />
                            </div>
                        </Col>

                        <Col xs={24} lg={12}>
                            <div className="student-content">
                                <Title level={2} className="student-title">
                                    Tối ưu thời gian, tối đa trải nghiệm
                                </Title>

                                <Paragraph className="student-description">
                                    Với Mama's Clean, bạn không cần lo lắng về việc dọn dẹp nhà cửa. Hãy
                                    để chúng tôi lo liệu, bạn chỉ cần tập trung vào học tập, bạn bè và những
                                    hoạt động yêu thích.
                                </Paragraph>

                                <div style={{ marginBottom: '40px' }}>
                                    {[
                                        'Dịch vụ nhanh chóng, phù hợp với lịch trình bận rộn.',
                                        'Chi phí hợp lý, tiết kiệm cho sinh viên.',
                                        'Không gian sạch sẽ giúp tăng cường sự tập trung và sức khỏe.',
                                        'Đặt lịch dễ dàng, không tốn nhiều công sức.'
                                    ].map((feature, index) => (
                                        <div key={index} className="student-feature">
                                            <CheckCircleOutlined className="student-feature-icon" />
                                            <AntText className="student-feature-text">
                                                {feature}
                                            </AntText>
                                        </div>
                                    ))}
                                </div>

                                <Button
                                    type="primary"
                                    size="large"
                                    className="cta-button"
                                    onClick={() => navigate("/services")}
                                >
                                    Tìm hiểu gói sinh viên
                                </Button>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>

            {/* Finish Section - Responsive */}
            <div className="section-padding" style={{
                minHeight: '30vh',
                background: '#F2FDF4',
            }}>
                <div style={{
                    padding: '80px 20px',
                    background: '#F2FDF4',
                    textAlign: 'center'
                }}>
                    <div className="container">
                        <Title level={2} className="section-title">
                            Sẵn sàng trải nghiệm không gian sạch sẽ với Mama's Clean?
                        </Title>

                        <Paragraph className="section-description">
                            Đặt lịch ngay hôm nay để ngôi nhà của bạn luôn tinh tươm và thơm mát như ý muốn.
                        </Paragraph>

                        <Button
                            type="primary"
                            size="large"
                            className="cta-button-large"
                            onClick={() => navigate("/booking")}
                        >
                            Đặt lịch dọn dẹp ngay
                        </Button>
                    </div>
                </div>
            </div>

            <style jsx>{`
                /* Container & Layout */
                .container {
                    max-width: 90%;
                    margin: 0 auto;
                    padding: 0 24px;
                }

                .section-padding {
                    padding: 80px 0;
                }

                /* Banner Section */
                .banner-content {
                    padding-left: clamp(20px, 8vw, 120px) !important;
                }

                .banner-title {
                    font-size: clamp(28px, 6vw, 60px);
                    font-weight: bold;
                    margin-bottom: 20px;
                }

                .banner-description {
                    font-size: clamp(16px, 2.5vw, 25px);
                    max-width: 800px;
                }

                .btn-primary {
                    background: #21823b;
                    color: #fff;
                    border: none;
                    padding: 12px 28px;
                    border-radius: 6px;
                    font-size: clamp(16px, 2vw, 18px);
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }

                .btn-primary:hover {
                    background: #1a6b2f;
                    transform: translateY(-2px);
                }

                /* Section Titles & Descriptions */
                .section-title {
                    text-align: center;
                    font-size: clamp(32px, 5vw, 50px) !important;
                    font-weight: bold;
                    margin-bottom: 30px;
                    color: #2c3e50;
                }

                .section-description {
                    text-align: center;
                    font-size: clamp(16px, 2.5vw, 25px);
                    color: #666;
                    margin-bottom: 60px;
                }

                /* Why Choose Grid */
                .why-choose-grid {
                    display: grid;
                    grid-template-columns: 1fr;
                    gap: 40px;
                    align-items: center;
                }

                .features-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
                    gap: 32px;
                }

                .feature-card {
                    background: #fff;
                    border-radius: 16px;
                    padding: 24px;
                    box-shadow: 0 2px 8px #f0f1f2;
                    display: flex;
                    align-items: flex-start;
                    gap: 16px;
                    min-height: 160px;
                }

                .feature-icon {
                    font-size: 32px;
                    color: #b6e7c9;
                    margin-top: 4px;
                    flex-shrink: 0;
                }

                .feature-title {
                    font-weight: bold;
                    font-size: clamp(20px, 2.5vw, 25px);
                    margin-bottom: 8px;
                }

                .feature-description {
                    color: #555;
                    font-size: clamp(16px, 2vw, 20px);
                    line-height: 1.5;
                }

                .why-choose-image {
                    width: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                /* Services Grid */
                .services-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                    gap: 32px;
                }

                .service-card {
                    background: #fff;
                    border-radius: 16px;
                    padding: 36px 18px;
                    box-shadow: 0 2px 8px #f0f1f2;
                    border: 1px solid #f3f3f3;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    min-height: 220px;
                    transition: all 0.3s ease;
                }

                .service-card:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 4px 16px rgba(0,0,0,0.1);
                }

                .service-icon-wrapper {
                    background: #eafaf1;
                    border-radius: 50%;
                    width: 70px;
                    height: 70px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-bottom: 25px;
                }

                .service-icon {
                    font-size: 40px;
                    color: #21823b;
                }

                .service-title {
                    font-weight: bold;
                    font-size: clamp(22px, 2.5vw, 28px);
                    margin-bottom: 20px;
                    text-align: center;
                }

                .service-description {
                    color: #555;
                    font-size: clamp(16px, 2vw, 20px);
                    text-align: center;
                    line-height: 1.5;
                }

                /* Booking Form */
                .booking-form-wrapper {
                    background: #fff;
                    border-radius: 18px;
                    box-shadow: 0 2px 16px #e6e6e6;
                    padding: clamp(24px, 5vw, 48px) clamp(18px, 4vw, 36px) 36px;
                    width: 100%;
                    max-width: 700px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                }

                .booking-title {
                    font-weight: 700;
                    font-size: clamp(24px, 4vw, 35px);
                    margin-bottom: 15px;
                    text-align: center;
                }

                .booking-description {
                    color: #444;
                    font-size: clamp(14px, 2vw, 18px);
                    margin-bottom: 35px;
                    text-align: center;
                }

                .form-label {
                    width: 100%;
                    margin-bottom: 8px;
                    font-weight: 500;
                    font-size: clamp(15px, 2vw, 17px);
                }

                .booking-submit-btn {
                    background: #41894b !important;
                    border-color: #41894b !important;
                    border-radius: 8px;
                    font-weight: 600;
                    font-size: clamp(16px, 2vw, 20px);
                    margin-bottom: 18px;
                    height: auto;
                    padding: 12px 24px;
                }

                .booking-submit-btn:hover {
                    background: #357a3d !important;
                    transform: translateY(-2px);
                }

                /* Process Cards */
                .process-card:hover {
                    transform: translateY(-8px);
                    box-shadow: 0 8px 30px rgba(0,0,0,0.12) !important;
                }

                .process-card-title {
                    margin-bottom: 20px;
                    color: #2c3e50;
                    font-size: clamp(20px, 2.5vw, 25px) !important;
                    font-weight: 600;
                }

                .process-card-description {
                    color: #7f8c8d;
                    font-size: clamp(14px, 1.5vw, 16px);
                    line-height: 1.6;
                    margin: 0;
                }

                /* Testimonial Cards */
                .testimonial-card {
                    border: none;
                    border-radius: 16px;
                    box-shadow: 0 4px 20px rgba(0,0,0,0.08);
                    height: 100%;
                }

                .testimonial-card .ant-card-body {
                    padding: 32px;
                }

                .testimonial-avatar {
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-right: 12px;
                    flex-shrink: 0;
                }

                .testimonial-name {
                    font-weight: 600;
                    color: #2c3e50;
                    font-size: clamp(16px, 2vw, 20px);
                }

                .testimonial-rating {
                    color: #f39c12;
                    font-size: 14px;
                }

                .testimonial-text {
                    color: #7f8c8d;
                    font-size: clamp(15px, 2vw, 18px);
                    line-height: 1.6;
                    font-style: italic;
                    margin: 0;
                }

                /* Student Section */
                .student-image-wrapper {
                    border-radius: 10px;
                    overflow: hidden;
                    box-shadow: 0 20px 40px rgba(0,0,0,0.1);
                    background: #fff;
                }

                .student-image {
                    width: 100%;
                    height: auto;
                    min-height: 300px;
                    max-height: 550px;
                    object-fit: cover;
                    display: block;
                }

                .student-content {
                    padding-left: 0;
                }

                .student-title {
                    font-size: clamp(28px, 4vw, 45px) !important;
                    color: #1f2937;
                    margin-bottom: 24px;
                    font-weight: 650;
                }

                .student-description {
                    font-size: clamp(16px, 2.5vw, 25px);
                    color: #4b5563;
                    margin-bottom: 32px;
                    line-height: 1.7;
                }

                .student-feature {
                    display: flex;
                    align-items: flex-start;
                    margin-bottom: 16px;
                }

                .student-feature-icon {
                    color: #10b981;
                    font-size: clamp(20px, 2.5vw, 23px);
                    margin-right: 12px;
                    margin-top: 2px;
                    flex-shrink: 0;
                }

                .student-feature-text {
                    font-size: clamp(16px, 2vw, 21px);
                    color: #374151;
                    line-height: 1.6;
                }

                /* CTA Buttons */
                .cta-button {
                    background-color: #41864D !important;
                    border-color: #41864D !important;
                    font-size: clamp(16px, 2vw, 18px);
                    font-weight: 600;
                    height: auto;
                    padding: 12px 32px;
                    border-radius: 6px;
                }

                .cta-button:hover {
                    background-color: #357a3d !important;
                    transform: translateY(-2px);
                }

                .cta-button-large {
                    background-color: #41864D !important;
                    border-color: #41864D !important;
                    color: white;
                    border-radius: 8px;
                    font-weight: 600;
                    font-size: clamp(16px, 2vw, 20px);
                    height: auto;
                    padding: clamp(12px, 2vw, 18px) clamp(32px, 5vw, 50px);
                }

                .cta-button-large:hover {
                    background-color: #357a3d !important;
                    transform: translateY(-2px);
                    box-shadow: 0 4px 12px rgba(65, 134, 77, 0.3);
                }

                /* Responsive Breakpoints */
                @media (min-width: 992px) {
                    .why-choose-grid {
                        grid-template-columns: 2fr 1.5fr;
                    }

                    .student-content {
                        padding-left: 20px;
                    }
                }

                @media (max-width: 991px) {
                    .section-padding {
                        padding: 60px 0;
                    }

                    .features-grid {
                        grid-template-columns: 1fr;
                    }

                    .why-choose-image {
                        order: -1;
                    }
                }

                @media (max-width: 768px) {
                    .container {
                        max-width: 95%;
                        padding: 0 16px;
                    }

                    .section-padding {
                        padding: 40px 0;
                    }

                    .services-grid {
                        grid-template-columns: 1fr;
                        gap: 24px;
                    }

                    .features-grid {
                        gap: 20px;
                    }

                    .feature-card {
                        padding: 20px;
                        min-height: auto;
                    }

                    .service-card {
                        padding: 28px 16px;
                        min-height: auto;
                    }

                    .booking-form-wrapper {
                        padding: 24px 20px;
                    }

                    .student-image {
                        min-height: 250px;
                        max-height: 400px;
                    }
                }

                @media (max-width: 576px) {
                    .banner-content {
                        align-items: center;
                        text-align: center;
                    }

                    .banner-description {
                        max-width: 100%;
                    }

                    .section-description {
                        margin-bottom: 40px;
                    }

                    .process-card .ant-card-body {
                        padding: 32px 20px 24px;
                    }

                    .testimonial-card .ant-card-body {
                        padding: 24px;
                    }
                }

                /* Animation */
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .feature-card,
                .service-card,
                .process-card,
                .testimonial-card {
                    animation: fadeInUp 0.6s ease-out;
                }
            `}</style>
        </>
    )
}

export default HomePage;