import { Form, Input, Modal, notification, Select } from "antd";
import { createUserAPI } from "../../services/api.service";

const CleanerForm = (props) => {

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
        const res = await createUserAPI(values.password, values.fullname, values.email, values.phone, "CUSTOMER")
        if (res.data) {
            openNotificationWithIcon('success', 'Thành công', 'Thêm mới khách hàng thành công')
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
                title="Thêm mới nhân viên" open={isFormOpen}
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
                    <Form.Item
                        label={<span style={{ fontWeight: 500, fontSize: 17 }}>Họ và tên</span>}
                        name="fullname"
                        rules={[{ required: true, message: "Vui lòng nhập họ tên!" }]}
                        style={{ marginBottom: 25 }}
                    >
                        <Input size="large" placeholder="Nguyễn Văn A" style={{ borderRadius: 8 }} />
                    </Form.Item>

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
                    <div style={{ display: "flex", gap: 12, marginBottom: 25 }}>
                        <Form.Item
                            label={<span style={{ fontWeight: 500, fontSize: 17 }}>Số điện thoại</span>}
                            name="phone"
                            rules={[
                                { required: true, message: "Vui lòng nhập số điện thoại!" },
                                { pattern: /^0[0-9]{9}$/, message: "Số điện thoại không hợp lệ!" }
                            ]}
                            style={{ flex: 2, marginBottom: 0 }}
                        >
                            <Input size="large" placeholder="0912345678" style={{ borderRadius: 8 }} />
                        </Form.Item>
                        <Form.Item
                            label={<span style={{ fontWeight: 500, fontSize: 17 }}>Giới tính</span>}
                            name="gender"
                            rules={[{ required: true, message: "Chọn giới tính!" }]}
                            style={{ flex: 1, minWidth: 100, marginBottom: 0 }}
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
                    </div>
                    <Form.Item
                        label={<span style={{ fontWeight: 500, fontSize: 17 }}>Mật khẩu</span>}
                        name="password"
                        rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
                        style={{ marginBottom: 25 }}
                    >
                        <Input.Password size="large" placeholder="******" style={{ borderRadius: 8 }} />
                    </Form.Item>
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
                    {/* <Form.Item style={{ marginBottom: 0 }}>
                        <Button
                            type="primary"
                            htmlType="submit"
                            size="large"
                            block
                            style={{
                                background: "#41894b",
                                borderColor: "#41894b",
                                borderRadius: 8,
                                fontWeight: 600,
                                fontSize: 17
                            }}
                        >
                            Đăng ký ngay
                        </Button>
                    </Form.Item> */}
                </Form>
            </Modal>
        </>
    )
}

export default CleanerForm;