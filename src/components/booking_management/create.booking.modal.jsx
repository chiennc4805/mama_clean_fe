import { Col, DatePicker, Form, Input, Modal, notification, Row, Select } from "antd";
import { createCleanerAPI } from "../../services/api.service";

const BookingForm = (props) => {

    const [api, contextHolder] = notification.useNotification({ maxCount: 1 });
    const { loadUser, isFormOpen, setIsFormOpen } = props
    const [form] = Form.useForm();

    const openNotificationWithIcon = (type, message, description) => {
        api[type]({
            message: message,
            description: description
        });
    };

    const onFinish = async (values) => {
        console.log(values)
        const res = await createCleanerAPI(values.fullname, values.email, values.phone, values.gender, values.password, "CLEANER", values.dob, values.idNumber, values.idDate, values.idPlace)
        if (res.data) {
            openNotificationWithIcon('success', 'Thành công', 'Thêm mới nhân viên thành công')
            await loadUser()
            setIsFormOpen(false)
            form.resetFields()
        } else {
            openNotificationWithIcon('error', 'Thất bại', JSON.stringify(res.message))
        }
    };

    return (
        <>
            {contextHolder}

            <Modal
                title="Thêm mới đơn hàng" open={isFormOpen}
                onOk={() => form.submit()}
                onCancel={() => {
                    setIsFormOpen(false);
                    form.resetFields()
                }
                }
                okText="Thêm mới"
                cancelText="Huỷ"
                footer={(_, { OkBtn, CancelBtn }) => (
                    <>
                        <OkBtn />
                        <CancelBtn />
                    </>
                )}
                width={{
                    xs: '90%',
                    sm: '80%',
                    md: '70%',
                    lg: '60%',
                    xl: '50%',
                    xxl: '40%',
                }}
                maskClosable={false}
            >
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    <Row gutter={16} style={{ marginBottom: 25 }}>
                        <Col span={12}>
                            <Form.Item
                                label={<span style={{ fontWeight: 500, fontSize: 17 }}>Họ và tên</span>}
                                name="fullname"
                                rules={[{ required: true, message: "Vui lòng nhập họ tên!" }]}
                                style={{ marginBottom: 25 }}
                            >
                                <Input size="large" placeholder="Nguyễn Văn A" style={{ borderRadius: 8 }} />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label={<span style={{ fontWeight: 500, fontSize: 17 }}>Email</span>}
                                name="email"
                                rules={[
                                    { required: true, message: "Vui lòng nhập email!" },
                                    { type: "email", message: "Email không đúng định dạng!" }
                                ]}
                                style={{ marginBottom: 25 }}
                            >
                                <Input size="large" placeholder="nguyenvana@example.com" style={{ borderRadius: 8 }} />
                            </Form.Item>
                        </Col>

                        <Col span={11}>
                            <Form.Item
                                label={<span style={{ fontWeight: 500, fontSize: 17 }}>Số điện thoại</span>}
                                name="phone"
                                rules={[
                                    { required: true, message: "Vui lòng nhập số điện thoại!" },
                                    { pattern: /^0[0-9]{9}$/, message: "Số điện thoại không hợp lệ!" }
                                ]}
                                style={{ flex: 2, marginBottom: 25 }}
                            >
                                <Input size="large" placeholder="0912345678" style={{ borderRadius: 8 }} />
                            </Form.Item>
                        </Col>

                        <Col span={7}>
                            <Form.Item
                                label={<span style={{ fontWeight: 500, fontSize: 17 }}>Giới tính</span>}
                                name="gender"
                                rules={[{ required: true, message: "Chọn giới tính!" }]}
                                style={{ flex: 1, minWidth: 100, marginBottom: 25 }}
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

                        <Col span={6}>
                            <Form.Item
                                label={<span style={{ fontWeight: 500, fontSize: 17 }}>Ngày sinh</span>}
                                name="dob"
                                rules={[{ required: true, message: "Chọn giới tính!" }]}
                                style={{ flex: 1, minWidth: 100, marginBottom: 25 }}
                            >
                                <DatePicker
                                    size="large"
                                />
                            </Form.Item>
                        </Col>

                        <Col xs={24}>
                            <h4 style={{ margin: "0px 0px 20px 0px" }}>Thông tin CCCD</h4>
                        </Col>

                        <Col span={12}>
                            <Form.Item
                                label={<span style={{ fontWeight: 500, fontSize: 17 }}>Số CCCD</span>}
                                name="idNumber"
                                rules={[{ required: true, message: "Vui lòng nhập họ tên!" }]}
                                style={{ marginBottom: 25 }}
                            >
                                <Input size="large" placeholder="Nguyễn Văn A" style={{ borderRadius: 8 }} />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label={<span style={{ fontWeight: 500, fontSize: 17 }}>Ngày cấp</span>}
                                name="idDate"
                                rules={[
                                    { required: true, message: "Vui lòng nhập email!" },
                                ]}
                                style={{ marginBottom: 25 }}
                            >
                                <DatePicker size="large" />
                            </Form.Item>
                        </Col>

                        <Col span={24}>
                            <Form.Item
                                label={<span style={{ fontWeight: 500, fontSize: 17 }}>Nơi cấp</span>}
                                name="idPlace"
                                rules={[
                                    { required: true, message: "Vui lòng nhập email!" },
                                ]}
                                style={{ marginBottom: 25 }}
                            >
                                <Input size="large" placeholder="nguyenvana@example.com" style={{ borderRadius: 8 }} />
                            </Form.Item>
                        </Col>

                        <Col xs={24}>
                            <h4 style={{ margin: "0px 0px 20px 0px" }}>Thông tin tài khoản</h4>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label={<span style={{ fontWeight: 500, fontSize: 17 }}>Mật khẩu</span>}
                                name="password"
                                rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
                                style={{ marginBottom: 25 }}
                            >
                                <Input.Password size="large" placeholder="******" style={{ borderRadius: 8 }} />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label={<span style={{ fontWeight: 500, fontSize: 17 }}>Xác nhận mật khẩu</span>}
                                name="confirm"
                                dependencies={['password']}
                                rules={[
                                    { required: true, message: "Vui lòng xác nhận mật khẩu!" },
                                    ({ getFieldValue }) => ({
                                        validator(_, value) {
                                            if (!value || getFieldValue('password') === value) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject("Mật khẩu xác nhận không khớp!");
                                        }
                                    })
                                ]}
                                style={{ marginBottom: 40 }}
                            >
                                <Input.Password size="large" placeholder="******" style={{ borderRadius: 8 }} />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        </>
    )
}

export default BookingForm;