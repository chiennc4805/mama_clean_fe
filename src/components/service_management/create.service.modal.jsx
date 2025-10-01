import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal, notification, Space } from "antd";
import TextArea from "antd/es/input/TextArea";
import { createServiceAPI } from "../../services/api.service";

const ServiceForm = (props) => {

    const [api, contextHolder] = notification.useNotification({ maxCount: 1 });
    const { loadUser, isFormOpen, setIsFormOpen } = props
    const [form] = Form.useForm();

    const openNotificationWithIcon = (type, message, description) => {
        api[type]({
            message: message,
            description: description
        });
    };

    const onFinish = (values) => {

        console.log(values)
        values.prices.forEach(async e => {
            const res = await createServiceAPI(values.name, values.description, e.area, e.price)
            if (res.data) {
                openNotificationWithIcon('success', 'Thành công', 'Thêm mới dịch vụ thành công')
                await loadUser()
                setIsFormOpen(false)
                form.resetFields()
            } else {
                openNotificationWithIcon('error', 'Thất bại', JSON.stringify(res.message))
            }
        })
        // const res = await createUserAPI(values.password, values.fullname, values.email, values.phone, "CUSTOMER")
        // if (res.data) {
        //     openNotificationWithIcon('success', 'Thành công', 'Thêm mới dịch vụ thành công')
        //     await loadUser()
        //     setIsFormOpen(false)
        //     form.resetFields()
        // } else {
        //     openNotificationWithIcon('error', 'Thất bại', JSON.stringify(res.message))
        // }
    };

    return (
        <>
            {contextHolder}

            <Modal
                title="Thêm mới người dùng" open={isFormOpen}
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
                    initialValues={{
                        prices: [{ area: '', price: '' }] // 👈 tạo sẵn 1 field ban đầu
                    }}
                >
                    <Form.Item
                        label={<span style={{ fontWeight: 500, fontSize: 17 }}>Tên dịch vụ</span>}
                        name="name"
                        rules={[{ required: true, message: "Vui lòng nhập họ tên!" }]}
                        style={{ marginBottom: 25 }}
                    >
                        <Input size="large" placeholder="Nguyễn Văn A" style={{ borderRadius: 8 }} />
                    </Form.Item>

                    <Form.Item
                        label={<span style={{ fontWeight: 500, fontSize: 17 }}>Mô tả</span>}
                        name="description"
                        rules={[
                            { required: true, message: "Vui lòng nhập email!" },
                        ]}
                        style={{ marginBottom: 25 }}
                    >
                        <TextArea
                            rows={4}
                            placeholder="Mô tả chi tiết về dịch vụ"
                            style={{ width: '100%', marginBottom: 20 }}
                        />
                    </Form.Item>

                    <Form.List
                        name="prices"
                        rules={[
                            {
                                validator: async (_, prices) => {
                                    if (!prices || prices.length < 1) {
                                        return Promise.reject(new Error("Phải có ít nhất 1 giá tiền"));
                                    }
                                }
                            }
                        ]}
                    >

                        {(fields, { add, remove }, { errors }) => (
                            <>
                                {fields.map(({ key, name }) => (
                                    <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                                        <Form.Item
                                            name={[name, 'area']}
                                            rules={[{ required: true, message: 'Missing' }]}
                                        >
                                            <Input placeholder="Diện tích" />
                                        </Form.Item>
                                        -
                                        <Form.Item
                                            name={[name, 'price']}
                                            rules={[{ required: true, message: 'Missing' }]}
                                        >
                                            <Input placeholder="Giá cả" />
                                        </Form.Item>
                                        {fields.length > 1 && (
                                            <MinusCircleOutlined onClick={() => remove(name)} />
                                        )}
                                    </Space>
                                ))}
                                <Form.Item>
                                    <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                        Add field
                                    </Button>
                                    <Form.ErrorList errors={errors} />

                                </Form.Item>
                            </>
                        )}
                    </Form.List>
                </Form>
            </Modal>
        </>
    )
}

export default ServiceForm;