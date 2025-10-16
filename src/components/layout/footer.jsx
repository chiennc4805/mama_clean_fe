import {
    FacebookFilled,
    InstagramFilled,
    LinkedinFilled,
    TwitterSquareFilled,
    YoutubeFilled
} from "@ant-design/icons";
import { Row, Col } from "antd";

const FooterLayout = () => {
    const footerColumns = [
        {
            title: "Dịch vụ",
            items: [
                "Dọn dẹp nhà",
                "Dọn dẹp văn phòng",
                "Dọn dẹp chuyên sâu",
                "Dọn dẹp sau sự kiện"
            ]
        },
        {
            title: "Công ty",
            items: ["Về chúng tôi", "Tuyển dụng", "Đối tác", "Tin tức"]
        },
        {
            title: "Hỗ trợ",
            items: [
                "Câu hỏi thường gặp",
                "Chính sách bảo mật",
                "Điều khoản dịch vụ"
            ]
        },
        {
            title: "Liên hệ",
            items: [
                "0392-686-152",
                "hotro@mamasclean.vn",
                "Thôn 8, Thạch Thất, Hà Nội"
            ]
        }
    ];

    return (
        <footer
            style={{
                background: "#fff",
                padding: "40px 0 20px 0",
                borderTop: "1px solid #f0f0f0",
                fontFamily: "inherit",
                width: "100%"
            }}
        >
            <div
                style={{
                    maxWidth: "1200px",
                    margin: "0 auto",
                    padding: "0 24px"
                }}
            >
                <Row gutter={[32, 32]} justify="space-between" align="top">
                    {/* Logo + slogan + social */}
                    <Col xs={24} sm={24} md={8} lg={6}>
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 14,
                                marginBottom: 18,
                                flexWrap: "wrap"
                            }}
                        >
                            <img
                                src="logo.png"
                                alt="Mama's Clean"
                                style={{
                                    height: "clamp(40px, 8vw, 55px)",
                                    flexShrink: 0
                                }}
                            />
                            <span
                                style={{
                                    fontWeight: 700,
                                    color: "#21823b",
                                    fontSize: "clamp(20px, 4vw, 26px)",
                                    letterSpacing: 1.5,
                                    whiteSpace: "nowrap"
                                }}
                            >
                                MAMA’S CLEAN
                            </span>
                        </div>

                        <div
                            style={{
                                color: "#222",
                                fontSize: "clamp(13px, 2vw, 16px)",
                                marginBottom: 28,
                                lineHeight: 1.6
                            }}
                        >
                            “Mama's Clean mang đến dịch vụ dọn dẹp nhà cửa chuyên nghiệp,
                            giúp không gian sống của bạn luôn sạch như mẹ dọn”
                        </div>

                        <div
                            style={{
                                display: "flex",
                                gap: 18,
                                fontSize: "clamp(18px, 3vw, 20px)",
                                color: "#21823b"
                            }}
                        >
                            <a href="#" aria-label="Facebook" style={{ color: "#21823b" }}>
                                <FacebookFilled />
                            </a>
                            <a href="#" aria-label="Instagram" style={{ color: "#21823b" }}>
                                <InstagramFilled />
                            </a>
                            <a href="#" aria-label="Twitter" style={{ color: "#21823b" }}>
                                <TwitterSquareFilled />
                            </a>
                            <a href="#" aria-label="LinkedIn" style={{ color: "#21823b" }}>
                                <LinkedinFilled />
                            </a>
                            <a href="#" aria-label="YouTube" style={{ color: "#21823b" }}>
                                <YoutubeFilled />
                            </a>
                        </div>
                    </Col>

                    {/* Các cột nội dung */}
                    {footerColumns.map((col, index) => (
                        <Col key={index} xs={12} sm={12} md={8} lg={4}>
                            <div
                                style={{
                                    fontWeight: 600,
                                    marginBottom: 14,
                                    fontSize: "clamp(15px, 2vw, 16px)",
                                    color: "#222"
                                }}
                            >
                                {col.title}
                            </div>
                            {col.items.map((item, i) => (
                                <div
                                    key={i}
                                    style={{
                                        color: "#555",
                                        marginBottom: 10,
                                        fontSize: "clamp(12px, 1.8vw, 13px)"
                                    }}
                                >
                                    {item}
                                </div>
                            ))}
                        </Col>
                    ))}
                </Row>

                {/* Copyright */}
                <div
                    style={{
                        borderTop: "1px solid #eee",
                        marginTop: 25,
                        paddingTop: 12,
                        color: "#888",
                        fontSize: "clamp(11px, 1.8vw, 13px)",
                        textAlign: "center"
                    }}
                >
                    © 2025 Mama's Clean. Bảo lưu mọi quyền.
                </div>
            </div>
        </footer>
    );
};

export default FooterLayout;
