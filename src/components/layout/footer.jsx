import {
    FacebookFilled,
    InstagramFilled,
    LinkedinFilled,
    TwitterSquareFilled,
    YoutubeFilled
} from "@ant-design/icons";

const FooterLayout = () => {
    return (
        <footer style={{
            background: "#fff",
            padding: "30px 0 10px 0",
            borderTop: "1px solid #f0f0f0",
            fontFamily: "inherit",
            width: "100%"
        }}>
            <div style={{
                maxWidth: "90%",
                margin: "0 auto",
                padding: "0 32px"
            }}>
                <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                    gap: 32,
                    alignItems: "flex-start"
                }}>
                    {/* Logo + slogan + social */}
                    <div style={{ minWidth: 300, flex: "1 1 320px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 18 }}>
                            <img src="src/assets/logo.png" alt="Mama's Clean" style={{ height: 55 }} />
                            <span style={{
                                fontWeight: 700,
                                color: "#21823b",
                                fontSize: 24,
                                letterSpacing: 1.5
                            }}>MAMA’S CLEAN</span>
                        </div>
                        <div style={{
                            color: "#222",
                            fontSize: 16,
                            marginBottom: 28,
                            maxWidth: 340,
                            lineHeight: 1.6
                        }}>
                            “Mama's Clean mang đến dịch vụ dọn dẹp nhà cửa chuyên nghiệp, giúp không gian sống của bạn luôn sạch như mẹ dọn”
                        </div>
                        <div style={{ display: "flex", gap: 18, fontSize: 18, color: "#21823b" }}>
                            <a href="#" aria-label="Facebook" style={{ color: "#21823b" }}><FacebookFilled /></a>
                            <a href="#" aria-label="Instagram" style={{ color: "#21823b" }}><InstagramFilled /></a>
                            <a href="#" aria-label="Twitter" style={{ color: "#21823b" }}><TwitterSquareFilled /></a>
                            <a href="#" aria-label="LinkedIn" style={{ color: "#21823b" }}><LinkedinFilled /></a>
                            <a href="#" aria-label="YouTube" style={{ color: "#21823b" }}><YoutubeFilled /></a>
                        </div>
                    </div>
                    {/* Dịch vụ */}
                    <div style={{ minWidth: 180, flex: "1 1 180px" }}>
                        <div style={{ fontWeight: 600, marginBottom: 18, fontSize: 16, color: "#222" }}>Dịch vụ</div>
                        <div style={{ color: "#555", marginBottom: 10, fontSize: 12 }}>Dọn dẹp nhà</div>
                        <div style={{ color: "#555", marginBottom: 10, fontSize: 12 }}>Dọn dẹp văn phòng</div>
                        <div style={{ color: "#555", marginBottom: 10, fontSize: 12 }}>Dọn dẹp chuyên sâu</div>
                        <div style={{ color: "#555", fontSize: 12 }}>Dọn dẹp sau sự kiện</div>
                    </div>
                    {/* Công ty */}
                    <div style={{ minWidth: 180, flex: "1 1 180px" }}>
                        <div style={{ fontWeight: 600, marginBottom: 18, fontSize: 16, color: "#222" }}>Công ty</div>
                        <div style={{ color: "#555", marginBottom: 10, fontSize: 12 }}>Về chúng tôi</div>
                        <div style={{ color: "#555", marginBottom: 10, fontSize: 12 }}>Tuyển dụng</div>
                        <div style={{ color: "#555", marginBottom: 10, fontSize: 12 }}>Đối tác</div>
                        <div style={{ color: "#555", fontSize: 12 }}>Tin tức</div>
                    </div>
                    {/* Hỗ trợ */}
                    <div style={{ minWidth: 180, flex: "1 1 180px" }}>
                        <div style={{ fontWeight: 600, marginBottom: 18, fontSize: 16, color: "#222" }}>Hỗ trợ</div>
                        <div style={{ color: "#555", marginBottom: 10, fontSize: 12 }}>Câu hỏi thường gặp</div>
                        <div style={{ color: "#555", marginBottom: 10, fontSize: 12 }}>Chính sách bảo mật</div>
                        <div style={{ color: "#555", marginBottom: 10, fontSize: 12 }}>Điều khoản dịch vụ</div>
                        <div style={{ color: "#555", fontSize: 12 }}>Sitemap</div>
                    </div>
                    {/* Liên hệ */}
                    <div style={{ minWidth: 220, flex: "1 1 220px" }}>
                        <div style={{ fontWeight: 600, marginBottom: 18, fontSize: 16, color: "#222" }}>Liên hệ</div>
                        <div style={{ color: "#555", marginBottom: 10, fontSize: 12 }}>1900-1234</div>
                        <div style={{ color: "#555", marginBottom: 10, fontSize: 12 }}>hotro@mamasclean.vn</div>
                        <div style={{ color: "#555", fontSize: 12 }}>123 Đường ABC, Quận 1, TP.HCM</div>
                    </div>
                </div>
                {/* Copyright */}
                <div style={{
                    borderTop: "1px solid #eee",
                    marginTop: 10,
                    padding: "11px 0 0 0",
                    color: "#888",
                    fontSize: 12,
                    textAlign: "left"
                }}>
                    © 2024 Mama's Clean. Bảo lưu mọi quyền.
                </div>
            </div>
        </footer>
    );
};

export default FooterLayout;