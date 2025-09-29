import { CalendarOutlined, CheckCircleOutlined, CheckOutlined, ClockCircleOutlined, HeartOutlined, HomeOutlined, SafetyOutlined, StarOutlined, ThunderboltOutlined, UserOutlined } from "@ant-design/icons"
import { Button, Card, Col, DatePicker, Form, Input, Row, Select, Typography } from "antd"
import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../components/context/auth.context"
import { fetchAllServicesWithoutPagination } from "../services/api.service"

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
        const res = await fetchAllServicesWithoutPagination()
        if (res.data) {
            setServicesOption(res.data.result.map(x => ({ label: x.name, value: x.id })))
        }
    }

    useEffect(() => {
        if (["SUPER_ADMIN", "CLEANER"].includes(user?.role?.name)) {
            navigate("/management")
        }
        fetchDataInFormBookingNow()
    }, [])

    const onFinish_now_booking = async (values) => {
        setLoading(true)
        const res = await loginAPI(values.username, values.password)
        setTimeout(() => {
            if (res.data) {
                message.success("Đăng nhập thành công")
                localStorage.setItem("access_token", res.data.access_token)
                setUser(res.data.user)
                navigate("/")
            }
            else {
                setLoading(false)
                notification.error({
                    message: "Error login",
                    description: JSON.stringify(res.message)
                })
            }
        }, 2000)
    }

    const benefits = [
        {
            icon: <CheckOutlined style={{ color: '#52c41a' }} />,
            text: 'Dịch vụ nhanh chóng, phù hợp với lịch trình bận rộn.'
        },
        {
            icon: <ClockCircleOutlined style={{ color: '#52c41a' }} />,
            text: 'Chi phí hợp lý, tiết kiệm cho sinh viên.'
        },
        {
            icon: <StarOutlined style={{ color: '#52c41a' }} />,
            text: 'Không gian sạch sẽ giúp tăng cường sự tập trung và sức khỏe.'
        },
        {
            icon: <SafetyOutlined style={{ color: '#52c41a' }} />,
            text: 'Đặt lịch dễ dàng, không tốn nhiều công sức.'
        }
    ];

    return (
        <>
            {/* banner section */}
            <div style={{
                position: "relative",
                width: "100%",
                height: "750px", // hoặc chiều cao bạn muốn
                overflow: "hidden"
            }}>
                {/* Ảnh nền làm mờ */}
                <img
                    src="src/assets/homepage/banner.jpg"
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

                {/* Lớp phủ mờ nhẹ để chữ nổi bật hơn */}
                <div style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    background: "rgba(255,255,255,0.4)",
                    zIndex: 2
                }}
                />

                {/* Chữ đè lên */}
                <div style={{
                    position: "relative",
                    zIndex: 3,
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "flex-start",
                    paddingLeft: 120,
                    color: "#222"
                }}>
                    <h1 style={{ fontSize: 60, fontWeight: "bold" }}>
                        Dịch vụ dọn dẹp nhà cửa
                        <br />
                        chuyên nghiệp Mama's Clean
                    </h1>

                    <br />
                    <br />


                    <p style={{ fontSize: 25, maxWidth: 800 }}>
                        Mang đến không gian sống sạch sẽ, thông thoáng cho gia đình bạn. Đặt lịch nhanh chóng, tiện lợi, đội ngũ tận tâm và đáng tin cậy.
                    </p>

                    <div style={{ marginTop: 50, display: "flex", gap: 20 }}>

                        <button
                            style={{
                                background: "#21823b",
                                color: "#fff",
                                border: "none",
                                padding: "12px 28px",
                                borderRadius: 6,
                                fontSize: 18,
                                fontWeight: 600,
                                cursor: "pointer"
                            }}
                            onClick={() => navigate("/booking")}>
                            Đặt lịch ngay
                        </button>

                        <button
                            style={{
                                border: "1px solid #fff",
                                padding: "12px 28px",
                                borderRadius: 6,
                                fontSize: 18,
                                fontWeight: 600,
                                cursor: "pointer"
                            }}>
                            Tìm hiểu thêm
                        </button>
                    </div>
                </div>
            </div>

            {/* why-choose section */}
            <div style={{
                background: "#F6F6F6",
                padding: "150px 0",
                width: "100%",
            }}>
                <div style={{
                    maxWidth: "90%",
                    margin: "0 auto",
                    padding: "0 24px",
                }}>
                    <h2 style={{
                        textAlign: "center",
                        fontSize: 50,
                        marginBottom: 30,
                    }}>
                        Tại sao chọn Mama's Clean?
                    </h2>
                    <p style={{
                        textAlign: "center",
                        fontSize: 25,
                        color: "#666",
                        maxWidth: "100%",
                        marginBottom: 70,
                    }}>
                        Chúng tôi cam kết mang đến trải nghiệm dọn dẹp tuyệt vời nhất với đội ngũ chuyên nghiệp và dịch vụ tận tâm.
                    </p>

                    <div style={{
                        display: "grid",
                        gridTemplateColumns: "2fr 1.5fr",
                        gap: 40,
                        alignItems: "center",
                    }}>
                        {/* 4 box lý do */}
                        <div style={{
                            display: "grid",
                            gridTemplateColumns: "1fr 1fr",
                            gridTemplateRows: "1fr 1fr",
                            gap: 32,
                        }}>
                            <div style={{
                                background: "#fff",
                                borderRadius: 16,
                                padding: 24,
                                boxShadow: "0 2px 8px #f0f1f2",
                                display: "flex",
                                alignItems: "flex-start",
                                gap: 16,
                                minHeight: 160,
                            }}>
                                <CheckCircleOutlined style={{ fontSize: 32, color: "#b6e7c9", marginTop: 4 }} />
                                <div>
                                    <div style={{ fontWeight: "bold", fontSize: 25 }}>
                                        Đội ngũ chuyên nghiệp
                                    </div>
                                    <div style={{ color: "#555", marginTop: 4, fontSize: 20 }}>
                                        Nhân viên được đào tạo bài bản, tận tâm, đảm bảo chất lượng dịch vụ cao nhất.
                                    </div>
                                </div>
                            </div>
                            <div style={{
                                background: "#fff",
                                borderRadius: 16,
                                padding: 24,
                                boxShadow: "0 2px 8px #f0f1f2",
                                display: "flex",
                                alignItems: "flex-start",
                                gap: 16,
                                minHeight: 160,
                            }}>
                                <ThunderboltOutlined style={{ fontSize: 32, color: "#b6e7c9", marginTop: 4 }} />
                                <div>
                                    <div style={{ fontWeight: "bold", fontSize: 25 }}>Nhanh chóng & Tiện lợi</div>
                                    <div style={{ color: "#555", marginTop: 4, fontSize: 20 }}>
                                        Đặt lịch dễ dàng qua ứng dụng hoặc website, tiết kiệm thời gian cho bạn.
                                    </div>
                                </div>
                            </div>
                            <div style={{
                                background: "#fff",
                                borderRadius: 16,
                                padding: 24,
                                boxShadow: "0 2px 8px #f0f1f2",
                                display: "flex",
                                alignItems: "flex-start",
                                gap: 16,
                                minHeight: 160,
                            }}>
                                <HeartOutlined style={{ fontSize: 32, color: "#b6e7c9", marginTop: 4 }} />
                                <div>
                                    <div style={{ fontWeight: "bold", fontSize: 25 }}>Sạch sẽ vượt trội</div>
                                    <div style={{ color: "#555", marginTop: 4, fontSize: 20 }}>
                                        Sử dụng hóa chất an toàn và kỹ thuật tiên tiến, mang lại không gian sạch bóng.
                                    </div>
                                </div>
                            </div>
                            <div style={{
                                background: "#fff",
                                borderRadius: 16,
                                padding: 24,
                                boxShadow: "0 2px 8px #f0f1f2",
                                display: "flex",
                                alignItems: "flex-start",
                                gap: 16,
                                minHeight: 160,
                            }}>
                                <UserOutlined style={{ fontSize: 32, color: "#b6e7c9", marginTop: 4 }} />
                                <div>
                                    <div style={{ fontWeight: "bold", fontSize: 25 }}>Hỗ trợ 24/7</div>
                                    <div style={{ color: "#555", marginTop: 4, fontSize: 20 }}>
                                        Đội ngũ chăm sóc khách hàng luôn sẵn sàng giải đáp mọi thắc mắc.
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Ảnh lớn bên phải */}
                        <div style={{
                            width: "100%",
                            height: "100%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}>
                            <img
                                src="src/assets/homepage/why_choose.png"
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

            {/* featured-service section */}
            <div style={{
                background: "#FFFFFF",
                padding: "130px 0",
                width: "100%",
            }}>
                <div style={{
                    maxWidth: "90%",
                    margin: "0 auto",
                    padding: "0 24px",
                }}>
                    <h2 style={{
                        textAlign: "center",
                        fontSize: 50,
                        fontWeight: "bold",
                        marginBottom: 18,
                    }}>
                        Các dịch vụ nổi bật của Mama's Clean
                    </h2>
                    <p style={{
                        textAlign: "center",
                        fontSize: 25,
                        color: "#666",
                        marginBottom: 60,
                        maxWidth: 900,
                        marginLeft: "auto",
                        marginRight: "auto"
                    }}>
                        Chúng tôi cung cấp đa dạng các gói dịch vụ dọn dẹp, đáp ứng mọi nhu cầu của bạn với chất lượng hàng đầu và sự tận tâm.
                    </p>
                    <div style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(4, 1fr)",
                        gap: 32,
                    }}>
                        {/* Box 1 */}
                        <div style={{
                            background: "#fff",
                            borderRadius: 16,
                            padding: "36px 18px",
                            boxShadow: "0 2px 8px #f0f1f2",
                            border: "1px solid #f3f3f3",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            minHeight: 220,
                        }}>
                            <div style={{
                                background: "#eafaf1",
                                borderRadius: "50%",
                                width: 70,
                                height: 70,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                marginBottom: 25,
                            }}>
                                {/* Icon dịch vụ cơ bản */}
                                <span style={{ fontSize: 40, color: "#21823b" }}>✧</span>
                            </div>
                            <div style={{ fontWeight: "bold", fontSize: 28, marginBottom: 20, textAlign: "center" }}>
                                Dọn dẹp cơ bản
                            </div>
                            <div style={{ color: "#555", fontSize: 20, textAlign: "center" }}>
                                Làm sạch tổng thể, hút bụi, lau sàn, vệ sinh bề mặt nhà bạn.
                            </div>
                        </div>
                        {/* Box 2 */}
                        <div style={{
                            background: "#fff",
                            borderRadius: 16,
                            padding: "36px 18px",
                            boxShadow: "0 2px 8px #f0f1f2",
                            border: "1px solid #f3f3f3",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            minHeight: 220,
                        }}>
                            <div style={{
                                background: "#eafaf1",
                                borderRadius: "50%",
                                width: 70,
                                height: 70,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                marginBottom: 25,
                            }}>
                                {/* Icon dịch vụ chuyên sâu */}
                                <span style={{ fontSize: 40, color: "#21823b" }}>🏠</span>
                            </div>
                            <div style={{ fontWeight: "bold", fontSize: 28, marginBottom: 20, textAlign: "center" }}>
                                Dọn dẹp chuyên sâu
                            </div>
                            <div style={{ color: "#555", fontSize: 20, textAlign: "center" }}>
                                Vệ sinh chi tiết mọi ngóc ngách, khử trùng, làm sạch đồ dùng kỹ lưỡng.
                            </div>
                        </div>
                        {/* Box 3 */}
                        <div style={{
                            background: "#fff",
                            borderRadius: 16,
                            padding: "36px 18px",
                            boxShadow: "0 2px 8px #f0f1f2",
                            border: "1px solid #f3f3f3",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            minHeight: 220,
                        }}>
                            <div style={{
                                background: "#eafaf1",
                                borderRadius: "50%",
                                width: 70,
                                height: 70,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                marginBottom: 25,
                            }}>
                                {/* Icon văn phòng */}
                                <span style={{ fontSize: 40, color: "#21823b" }}>🏢</span>
                            </div>
                            <div style={{ fontWeight: "bold", fontSize: 28, marginBottom: 20, textAlign: "center" }}>
                                Dọn dẹp văn phòng
                            </div>
                            <div style={{ color: "#555", fontSize: 20, textAlign: "center" }}>
                                Duy trì môi trường làm việc sạch sẽ, gọn gàng, tăng cường năng suất làm việc.
                            </div>
                        </div>
                        {/* Box 4 */}
                        <div style={{
                            background: "#fff",
                            borderRadius: 16,
                            padding: "36px 18px",
                            boxShadow: "0 2px 8px #f0f1f2",
                            border: "1px solid #f3f3f3",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            minHeight: 220,
                        }}>
                            <div style={{
                                background: "#eafaf1",
                                borderRadius: "50%",
                                width: 70,
                                height: 70,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                marginBottom: 25,
                            }}>
                                {/* Icon sau sự kiện */}
                                <span style={{ fontSize: 40, color: "#21823b" }}>🧹</span>
                            </div>
                            <div style={{ fontWeight: "bold", fontSize: 28, marginBottom: 20, textAlign: "center" }}>
                                Dọn dẹp sau sự kiện
                            </div>
                            <div style={{ color: "#555", fontSize: 20, textAlign: "center" }}>
                                Thu dọn nhanh chóng sau các buổi tiệc, sự kiện, trả lại không gian ban đầu sạch đẹp.
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* booking-now section */}
            <div style={{
                minHeight: "100vh",
                background: "#F6F6F6",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
            }}>
                <div style={{
                    background: "#fff",
                    borderRadius: 18,
                    boxShadow: "0 2px 16px #e6e6e6",
                    padding: "48px 36px 36px 36px",
                    width: 700,
                    maxWidth: "95vw",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center"
                }}>
                    <h2 style={{
                        fontWeight: 700,
                        fontSize: 35,
                        marginBottom: 15,
                        textAlign: "center"
                    }}>
                        Đặt lịch dọn phòng nhanh chóng với Mama's Clean
                    </h2>
                    <div style={{
                        color: "#444",
                        fontSize: 18,
                        marginBottom: 35,
                        textAlign: "center"
                    }}>
                        Chọn dịch vụ, thời gian và địa điểm của bạn để trải nghiệm không gian sống sạch sẽ, tươi mới.
                    </div>
                    {/* Form */}
                    <Form
                        form={form}
                        name="basic"
                        layout="vertical"
                        style={{ width: "100%" }}
                        onFinish={onFinish_now_booking}
                        autoComplete="off"
                    >
                        <Row
                            style={{
                                display: "flex",
                                justifyContent: "space-between"
                            }}
                        >
                            <Col span={11}>
                                <div style={{ width: "100%", marginBottom: 8, fontWeight: 500, fontSize: 17 }}>Loại dịch vụ</div>
                                <Form.Item
                                    name="username"
                                    rules={[
                                        { required: true, message: 'Vui lòng nhập email!' },
                                        { type: "email", message: "Email không đúng định dạng!" }
                                    ]}
                                    style={{ marginBottom: 30 }}
                                >
                                    <Select
                                        placeholder="Chọn dịch vụ"
                                        allowClear={true}
                                        options={servicesOption}
                                    />
                                </Form.Item>
                            </Col>

                            <Col span={11}>
                                <div style={{ width: "100%", marginBottom: 8, fontWeight: 500, fontSize: 17 }}>Ngày</div>
                                <Form.Item
                                    name="username"
                                    rules={[
                                        { required: true, message: 'Vui lòng nhập email!' },
                                        { type: "email", message: "Email không đúng định dạng!" }
                                    ]}
                                    style={{ marginBottom: 30 }}
                                >
                                    <DatePicker
                                        placeholder='Chọn ngày'
                                        style={{ width: '100%' }}
                                        size="large"
                                        format="DD/MM/YYYY"
                                    />
                                </Form.Item>
                            </Col>

                            <Col span={11}>
                                <div style={{ width: "100%", marginBottom: 8, fontWeight: 500, fontSize: 17 }}>Giờ</div>
                                <Form.Item
                                    name="username"
                                    rules={[
                                        { required: true, message: 'Vui lòng nhập email!' },
                                        { type: "email", message: "Email không đúng định dạng!" }
                                    ]}
                                    style={{ marginBottom: 30 }}
                                >
                                    <Input
                                        size="large"
                                        placeholder="Nhập địa chỉ của bạn"
                                        style={{ borderRadius: 8 }}
                                    />
                                </Form.Item>
                            </Col>

                            <Col span={11}>
                                <div style={{ width: "100%", marginBottom: 8, fontWeight: 500, fontSize: 17 }}>Địa chỉ</div>
                                <Form.Item
                                    name="username"
                                    rules={[
                                        { required: true, message: 'Vui lòng nhập email!' },
                                        { type: "email", message: "Email không đúng định dạng!" }
                                    ]}
                                    style={{ marginBottom: 30 }}
                                >
                                    <Input
                                        size="large"
                                        placeholder="Nhập địa chỉ của bạn"
                                        style={{ borderRadius: 8 }}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Form.Item style={{ marginBottom: 0 }}>
                            <Button
                                type="primary"
                                size="large"
                                block
                                style={{
                                    background: "#41894b",
                                    borderColor: "#41894b",
                                    borderRadius: 8,
                                    fontWeight: 600,
                                    fontSize: 20,
                                    marginBottom: 18
                                }}
                                htmlType="submit"
                                loading={loading}
                            >
                                Đặt lịch
                            </Button>
                        </Form.Item>
                    </Form>

                </div>
            </div>

            {/* process-step section */}
            <div style={{
                padding: '100px 20px 60px 20px',
                backgroundColor: '#FFFFFF',
                minHeight: '90vh',
            }}>
                <div style={{ maxWidth: '90%', margin: '0 auto' }}>
                    {/* Header */}
                    <div style={{ textAlign: 'center', marginBottom: '60px' }}>
                        <Title level={2} style={{
                            fontSize: '50px',
                            fontWeight: 'bold',
                            color: '#2c3e50',
                            marginBottom: '50px'
                        }}>
                            Cách thức hoạt động đơn giản của Mama's Clean
                        </Title>
                        <Paragraph style={{
                            fontSize: '25px',
                            color: '#7f8c8d',
                            maxWidth: '900px',
                            margin: '0 auto',
                            lineHeight: '1.6'
                        }}>
                            Chỉ với vài bước đơn giản, bạn đã có thể tận hưởng không gian sống sạch sẽ và thoải mái ngay lập tức.
                        </Paragraph>
                    </div>

                    {/* Process Steps */}
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
                                    {/* Step Number */}
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
                                        {/* Icon */}
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

                                        {/* Title */}
                                        <Title level={4} style={{
                                            marginBottom: '20px',
                                            color: '#2c3e50',
                                            fontSize: '25px',
                                            fontWeight: '600'
                                        }}>
                                            {step.title}
                                        </Title>

                                        <Paragraph style={{
                                            color: '#7f8c8d',
                                            fontSize: '16px',
                                            lineHeight: '1.6',
                                            margin: 0
                                        }}>
                                            {step.description}
                                        </Paragraph>
                                    </div>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </div>

                <style jsx>{`
                    .process-card:hover {
                    transform: translateY(-8px);
                    box-shadow: 0 8px 30px rgba(0,0,0,0.12) !important;
                    }
                    
                    .process-card .ant-card-body {
                    position: relative;
                    }
                    
                    @media (max-width: 768px) {
                    .process-card {
                        margin-bottom: 20px;
                    }
                    }
                `}</style>
            </div>

            {/* customer-feedback section */}
            <div style={{
                padding: '60px 20px',
                backgroundColor: '#F6F6F6',
                minHeight: '90vh'
            }}>
                <div style={{ marginTop: '100px' }}>
                    {/* Testimonials Header */}
                    <div style={{ textAlign: 'center', marginBottom: '60px' }}>
                        <Title level={2} style={{
                            fontSize: '50px',
                            fontWeight: 'bold',
                            color: '#2c3e50',
                            marginBottom: '20px'
                        }}>
                            Khách hàng nói gì về Mama's Clean
                        </Title>
                        <Paragraph style={{
                            fontSize: '23px',
                            color: '#7f8c8d',
                            maxWidth: '800px',
                            margin: '0 auto',
                            lineHeight: '1.6'
                        }}>
                            Sự hài lòng của khách hàng là động lực lớn nhất để chúng tôi không ngừng cải thiện dịch vụ mỗi ngày.
                        </Paragraph>
                    </div>
                    {/* Testimonials Cards */}
                    <Row gutter={[32, 32]} justify="center">
                        {/* Testimonial 1 */}
                        <Col xs={24} md={8}>
                            <Card
                                bordered={false}
                                style={{
                                    borderRadius: '16px',
                                    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                                    height: '100%'
                                }}
                                bodyStyle={{ padding: '32px' }}
                            >
                                <div style={{ marginBottom: '24px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
                                        <div style={{
                                            width: '50px',
                                            height: '50px',
                                            borderRadius: '50%',
                                            backgroundImage: 'linear-gradient(45deg, #ff9a9e 0%, #fecfef 100%)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            marginRight: '12px'
                                        }}>
                                            <span style={{ color: 'white', fontSize: '18px', fontWeight: 'bold' }}>NH</span>
                                        </div>
                                        <div>
                                            <div style={{ fontWeight: '600', color: '#2c3e50', fontSize: '20px' }}>
                                                Nguyễn Thị Hoa
                                            </div>
                                            <div style={{ color: '#f39c12', fontSize: '14px' }}>
                                                ⭐⭐⭐⭐⭐
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <Paragraph style={{
                                    color: '#7f8c8d',
                                    fontSize: '18px',
                                    lineHeight: '1.6',
                                    fontStyle: 'italic',
                                    margin: 0
                                }}>
                                    "Dịch vụ quá tuyệt vời! Nhân viên dọn dẹp kỹ lưỡng và rất chuyên nghiệp. Nhà tôi luôn sạch bóng sau mỗi lần sử dụng dịch vụ của Mama's Clean."
                                </Paragraph>
                            </Card>
                        </Col>

                        {/* Testimonial 2 */}
                        <Col xs={24} md={8}>
                            <Card
                                bordered={false}
                                style={{
                                    borderRadius: '16px',
                                    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                                    height: '100%'
                                }}
                                bodyStyle={{ padding: '32px' }}
                            >
                                <div style={{ marginBottom: '24px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
                                        <div style={{
                                            width: '50px',
                                            height: '50px',
                                            borderRadius: '50%',
                                            backgroundImage: 'linear-gradient(45deg, #a8edea 0%, #fed6e3 100%)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            marginRight: '12px'
                                        }}>
                                            <span style={{ color: 'white', fontSize: '18px', fontWeight: 'bold' }}>TH</span>
                                        </div>
                                        <div>
                                            <div style={{ fontWeight: '600', color: '#2c3e50', fontSize: '20px' }}>
                                                Trần Văn Hùng
                                            </div>
                                            <div style={{ color: '#f39c12', fontSize: '14px' }}>
                                                ⭐⭐⭐⭐⭐
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <Paragraph style={{
                                    color: '#7f8c8d',
                                    fontSize: '18px',
                                    lineHeight: '1.6',
                                    fontStyle: 'italic',
                                    margin: 0
                                }}>
                                    "Tôi rất hài lòng với sự tiện lợi và chất lượng dịch vụ từ Mama's Clean. Đặt lịch dễ dàng, nhân viên đúng giờ và làm việc hiệu quả, không gian nhà luôn thơm mát."
                                </Paragraph>
                            </Card>
                        </Col>

                        {/* Testimonial 3 */}
                        <Col xs={24} md={8}>
                            <Card
                                bordered={false}
                                style={{
                                    borderRadius: '16px',
                                    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                                    height: '100%'
                                }}
                                bodyStyle={{ padding: '32px' }}
                            >
                                <div style={{ marginBottom: '24px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
                                        <div style={{
                                            width: '50px',
                                            height: '50px',
                                            borderRadius: '50%',
                                            backgroundImage: 'linear-gradient(45deg, #ffecd2 0%, #fcb69f 100%)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            marginRight: '12px'
                                        }}>
                                            <span style={{ color: 'white', fontSize: '18px', fontWeight: 'bold' }}>LM</span>
                                        </div>
                                        <div>
                                            <div style={{ fontWeight: '600', color: '#2c3e50', fontSize: '20px' }}>
                                                Lê Thị Mai
                                            </div>
                                            <div style={{ color: '#f39c12', fontSize: '14px' }}>
                                                ⭐⭐⭐⭐⭐
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <Paragraph style={{
                                    color: '#7f8c8d',
                                    fontSize: '18px',
                                    lineHeight: '1.6',
                                    fontStyle: 'italic',
                                    margin: 0
                                }}>
                                    "Ứng dụng dễ sử dụng, đội ngũ hỗ trợ nhiệt tình. Tuyệt vời! Tôi sẽ giới thiệu Mama's Clean cho bạn bè và gia đình."
                                </Paragraph>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </div >

            {/* student-cleaning-service section */}
            <div style={{
                minHeight: '100vh',
                background: '#F2FDF4',
                padding: '0px 20px'
            }}>
                <div style={{ maxWidth: '95%', margin: '0 auto', padding: "100px 0px" }}>
                    {/* Header Section */}
                    <div style={{ textAlign: 'center', marginBottom: '60px' }}>
                        <Title
                            level={1}
                            style={{
                                fontSize: '50px',
                                fontWeight: 'bold',
                                color: '#1f2937',
                                marginBottom: '20px',
                                lineHeight: '1.2'
                            }}
                        >
                            Dọn dẹp tiện lợi cho đời sống sinh viên năng động
                        </Title>
                        <Paragraph
                            style={{
                                fontSize: '25px',
                                color: '#6b7280',
                                maxWidth: '1000px',
                                margin: '0 auto',
                                lineHeight: '1.6'
                            }}
                        >
                            Mama's Clean giúp sinh viên giữ gìn không gian sống sạch sẽ, để bạn tập trung vào việc
                            học và tận hưởng cuộc sống đại học.
                        </Paragraph>
                    </div>

                    {/* Main Content Section */}
                    <Row gutter={[48, 48]} align="middle">
                        {/* Image Column */}
                        <Col xs={24} lg={12}>
                            <div style={{
                                borderRadius: '10px',
                                overflow: 'hidden',
                                boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                                background: '#fff'
                            }}>
                                <img
                                    src="src/assets/homepage/student_cleaning_service.jpg"
                                    alt="Clean living space"
                                    style={{
                                        width: '100%',
                                        height: '550px',
                                        objectFit: 'cover',
                                        display: 'block'
                                    }}
                                />
                            </div>
                        </Col>

                        {/* Content Column */}
                        <Col xs={24} lg={12}>
                            <div style={{ paddingLeft: '20px' }}>
                                <Title
                                    level={2}
                                    style={{
                                        fontSize: '45px',
                                        color: '#1f2937',
                                        marginBottom: '24px',
                                        fontWeight: '650'
                                    }}
                                >
                                    Tối ưu thời gian, tối đa trải nghiệm
                                </Title>

                                <Paragraph
                                    style={{
                                        fontSize: '25px',
                                        color: '#4b5563',
                                        marginBottom: '32px',
                                        lineHeight: '1.7'
                                    }}
                                >
                                    Với Mama's Clean, bạn không cần lo lắng về việc dọn dẹp nhà cửa. Hãy
                                    để chúng tôi lo liệu, bạn chỉ cần tập trung vào học tập, bạn bè và những
                                    hoat động yêu thích.
                                </Paragraph>

                                {/* Features List */}
                                <div style={{ marginBottom: '40px' }}>
                                    {[
                                        'Dịch vụ nhanh chóng, phù hợp với lịch trình bận rộn.',
                                        'Chi phí hợp lý, tiết kiệm cho sinh viên.',
                                        'Không gian sách sẽ giúp tăng cường sự tập trung và sức khỏe.',
                                        'Đặt lịch dễ dàng, không tốn nhiều công sức.'
                                    ].map((feature, index) => (
                                        <div
                                            key={index}
                                            style={{
                                                display: 'flex',
                                                alignItems: 'flex-start',
                                                marginBottom: '16px'
                                            }}
                                        >
                                            <CheckCircleOutlined
                                                style={{
                                                    color: '#10b981',
                                                    fontSize: '23px',
                                                    marginRight: '12px',
                                                    marginTop: '2px',
                                                    flexShrink: 0
                                                }}
                                            />
                                            <AntText
                                                style={{
                                                    fontSize: '21px',
                                                    color: '#374151',
                                                    lineHeight: '1.6'
                                                }}
                                            >
                                                {feature}
                                            </AntText>
                                        </div>
                                    ))}
                                </div>

                                {/* CTA Button */}
                                <Button
                                    type="primary"
                                    size="large"
                                    style={{
                                        backgroundColor: '#41864D',
                                        borderColor: '#41864D',
                                        fontSize: '18px',
                                        fontWeight: '600',
                                        height: '56px',
                                        paddingLeft: '32px',
                                        paddingRight: '32px',
                                        borderRadius: '6px',
                                    }}
                                >
                                    Tìm hiểu gói sinh viên
                                </Button>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>

            {/* finish section */}
            <div style={{
                minHeight: '30vh',
                background: '#F2FDF4',
                padding: '150px 20px 100px 20px',
            }}>
                {/* CTA Section */}
                <div style={{
                    padding: '80px 20px',
                    background: '#F2FDF4',
                    textAlign: 'center'
                }}>
                    <div style={{ maxWidth: '100%', margin: '0 auto' }}>
                        <Title level={2} style={{
                            fontSize: '50px',
                            fontWeight: 'bold',
                            marginBottom: '24px'
                        }}>
                            Sẵn sàng trải nghiệm không gian sạch sẽ với Mama's Clean?
                        </Title>

                        <Paragraph style={{
                            fontSize: '25px',
                            marginBottom: '40px',
                            lineHeight: '1.6'
                        }}>
                            Đặt lịch ngay hôm nay để ngôi nhà của bạn luôn tinh tươm và thơm mát như ý muốn.
                        </Paragraph>

                        <Button
                            type="primary"
                            size="large"
                            style={{
                                backgroundColor: '#41864D',
                                borderColor: '#41864D',
                                color: 'white',
                                borderRadius: '8px',
                                fontWeight: '600',
                                fontSize: '20px',
                                height: '60px',
                                paddingLeft: '50px',
                                paddingRight: '50px',
                            }}
                            onClick={() => navigate("/booking")}
                        >
                            Đặt lịch dọn dẹp ngay
                        </Button>
                    </div>
                </div>

                <style jsx>{`
                    .ant-btn:hover {
                    transform: translateY(-2px);
                    transition: all 0.3s ease;
                    }
                    
                    @media (max-width: 992px) {
                    .hero-title {
                        font-size: 32px !important;
                    }
                    
                    .hero-description {
                        font-size: 16px !important;
                    }
                    }
                    
                    @media (max-width: 576px) {
                    .hero-title {
                        font-size: 28px !important;
                    }
                    }
                `}</style>
            </div>

        </>
    )

}

export default HomePage;