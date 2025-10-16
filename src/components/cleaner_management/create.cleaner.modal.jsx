import { Col, DatePicker, Form, Input, Modal, notification, Row, Select } from "antd";
import { useEffect, useState } from "react";
import { createCleanerAPI } from "../../services/api.service";

const CleanerForm = (props) => {
    const [api, contextHolder] = notification.useNotification({ maxCount: 1 });
    const { loadCleaner, isFormOpen, setIsFormOpen } = props;
    const [form] = Form.useForm();
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const openNotificationWithIcon = (type, message, description) => {
        api[type]({
            message,
            description
        });
    };

    const onFinish = async (values) => {
        const res = await createCleanerAPI(
            values.fullname,
            values.email,
            values.phone,
            values.gender,
            values.password,
            "CLEANER",
            values.dob,
            values.idNumber,
            values.idDate,
            values.idPlace
        );

        if (res.data) {
            openNotificationWithIcon("success", "Thành công", "Thêm mới nhân viên thành công");
            await loadCleaner();
            setIsFormOpen(false);
            form.resetFields();
        } else {
            openNotificationWithIcon("error", "Thất bại", JSON.stringify(res.message));
        }
    };

    return (
        <>
            {contextHolder}
            <Modal
                title="Thêm mới nhân viên"
                open={isFormOpen}
                onOk={() => form.submit()}
                onCancel={() => {
                    setIsFormOpen(false);
                    form.resetFields();
                }}
                okText="Thêm mới"
                cancelText="Huỷ"
                footer={(_, { OkBtn, CancelBtn }) => (
                    <>
                        <OkBtn />
                        <CancelBtn />
                    </>
                )}
                width={isMobile ? "90%" : "50%"}
                bodyStyle={{
                    padding: isMobile ? "12px" : "24px",
                    maxHeight: "80vh",
                    overflowY: "auto"
                }}
                maskClosable={false}
            >
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    <Row gutter={[isMobile ? 0 : 16, 16]}>
                        <Col span={isMobile ? 24 : 12}>
                            <Form.Item
                                label={<span style={{ fontWeight: 500, fontSize: isMobile ? 15 : 17 }}>Họ và tên</span>}
                                name="fullname"
                                rules={[{ required: true, message: "Vui lòng nhập họ tên!" }]}
                            >
                                <Input size="large" placeholder="Nguyễn Văn A" style={{ borderRadius: 8 }} />
                            </Form.Item>
                        </Col>

                        <Col span={isMobile ? 24 : 12}>
                            <Form.Item
                                label={<span style={{ fontWeight: 500, fontSize: isMobile ? 15 : 17 }}>Email</span>}
                                name="email"
                                rules={[
                                    { required: true, message: "Vui lòng nhập email!" },
                                    { type: "email", message: "Email không đúng định dạng!" }
                                ]}
                            >
                                <Input size="large" placeholder="nguyenvana@example.com" style={{ borderRadius: 8 }} />
                            </Form.Item>
                        </Col>

                        <Col span={isMobile ? 24 : 11}>
                            <Form.Item
                                label={<span style={{ fontWeight: 500, fontSize: isMobile ? 15 : 17 }}>Số điện thoại</span>}
                                name="phone"
                                rules={[
                                    { required: true, message: "Vui lòng nhập số điện thoại!" },
                                    { pattern: /^0[0-9]{9}$/, message: "Số điện thoại không hợp lệ!" }
                                ]}
                            >
                                <Input size="large" placeholder="0912345678" style={{ borderRadius: 8 }} />
                            </Form.Item>
                        </Col>

                        <Col span={isMobile ? 12 : 7}>
                            <Form.Item
                                label={<span style={{ fontWeight: 500, fontSize: isMobile ? 15 : 17 }}>Giới tính</span>}
                                name="gender"
                                rules={[{ required: true, message: "Chọn giới tính!" }]}
                            >
                                <Select
                                    size="large"
                                    placeholder="Chọn"
                                    style={{ borderRadius: 8 }}
                                    options={[
                                        { value: true, label: "Nam" },
                                        { value: false, label: "Nữ" }
                                    ]}
                                />
                            </Form.Item>
                        </Col>

                        <Col span={isMobile ? 12 : 6}>
                            <Form.Item
                                label={<span style={{ fontWeight: 500, fontSize: isMobile ? 15 : 17 }}>Ngày sinh</span>}
                                name="dob"
                                rules={[{ required: true, message: "Chọn ngày sinh!" }]}
                            >
                                <DatePicker size="large" style={{ width: "100%" }} />
                            </Form.Item>
                        </Col>

                        <Col span={24}>
                            <h4 style={{ margin: "10px 0 10px", fontSize: isMobile ? 16 : 18 }}>Thông tin CCCD</h4>
                        </Col>

                        <Col span={isMobile ? 24 : 12}>
                            <Form.Item
                                label={<span style={{ fontWeight: 500, fontSize: isMobile ? 15 : 17 }}>Số CCCD</span>}
                                name="idNumber"
                                rules={[{ required: true, message: "Vui lòng nhập số CCCD!" }]}
                            >
                                <Input size="large" placeholder="0123456789" style={{ borderRadius: 8 }} />
                            </Form.Item>
                        </Col>

                        <Col span={isMobile ? 24 : 12}>
                            <Form.Item
                                label={<span style={{ fontWeight: 500, fontSize: isMobile ? 15 : 17 }}>Ngày cấp</span>}
                                name="idDate"
                                rules={[{ required: true, message: "Vui lòng chọn ngày cấp!" }]}
                            >
                                <DatePicker size="large" style={{ width: "100%" }} />
                            </Form.Item>
                        </Col>

                        <Col span={24}>
                            <Form.Item
                                label={<span style={{ fontWeight: 500, fontSize: isMobile ? 15 : 17 }}>Nơi cấp</span>}
                                name="idPlace"
                                rules={[{ required: true, message: "Vui lòng nhập nơi cấp!" }]}
                            >
                                <Input size="large" placeholder="Cục Cảnh sát QLHC về TTXH" style={{ borderRadius: 8 }} />
                            </Form.Item>
                        </Col>

                        <Col span={24}>
                            <h4 style={{ margin: "10px 0 10px", fontSize: isMobile ? 16 : 18 }}>Thông tin tài khoản</h4>
                        </Col>

                        <Col span={isMobile ? 24 : 12}>
                            <Form.Item
                                label={<span style={{ fontWeight: 500, fontSize: isMobile ? 15 : 17 }}>Mật khẩu</span>}
                                name="password"
                                rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
                            >
                                <Input.Password size="large" placeholder="******" style={{ borderRadius: 8 }} />
                            </Form.Item>
                        </Col>

                        <Col span={isMobile ? 24 : 12}>
                            <Form.Item
                                label={<span style={{ fontWeight: 500, fontSize: isMobile ? 15 : 17 }}>Xác nhận mật khẩu</span>}
                                name="confirm"
                                dependencies={["password"]}
                                rules={[
                                    { required: true, message: "Vui lòng xác nhận mật khẩu!" },
                                    ({ getFieldValue }) => ({
                                        validator(_, value) {
                                            if (!value || getFieldValue("password") === value) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject("Mật khẩu xác nhận không khớp!");
                                        }
                                    })
                                ]}
                            >
                                <Input.Password size="large" placeholder="******" style={{ borderRadius: 8 }} />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        </>
    );
};

export default CleanerForm;
