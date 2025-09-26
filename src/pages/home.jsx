import { CheckCircleOutlined, HeartOutlined, ThunderboltOutlined, UserOutlined } from "@ant-design/icons"

const HomePage = () => {

    return (
        <>
            {/* banner */}
            <div style={{
                position: "relative",
                width: "100%",
                height: "750px", // hoặc chiều cao bạn muốn
                overflow: "hidden"
            }}>
                {/* Ảnh nền làm mờ */}
                <img
                    src="src/assets/homepage/anh1.jpg"
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
                            }}>
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

            {/* why choose area */}
            <div style={{
                background: "#f7f7f7",
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
                                src="src/assets/homepage/why_choose_right.png"
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

            {/* Dịch vụ nổi bật */}
            <div style={{
                background: "#fff",
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
        </>
    )

}

export default HomePage