import { Avatar, Button, Col, DatePicker, Form, Input, message, notification, Row, Select, Space, Tabs, Typography, Upload } from 'antd';
import dayjs from 'dayjs';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../components/context/auth.context';
import { fetchCleanerByUserIdAPI, updateCleanerAPI, updateUserAPI, changePasswordAPI, uploadImageAPI } from '../../services/api.service';
import { LockOutlined, UserOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;
const { Option } = Select;

const CleanerProfile = () => {
    const { user, setUser } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [personalForm] = Form.useForm();
    const [passwordForm] = Form.useForm();
    const [cleanerId, setCleanerId] = useState("");
    const [avatarImageFile, setAvatarImageFile] = useState(null);
    const [avatarPreviewUrl, setAvatarPreviewUrl] = useState(null);

    useEffect(() => {
        const loadCleaner = async () => {
            const res = await fetchCleanerByUserIdAPI(user?.id);
            if (res.data) {
                setCleanerId(res.data.id);
                personalForm.setFieldsValue({
                    id: res.data.user.id,
                    name: res.data.user.name,
                    phone: res.data.user.phone,
                    gender: res.data.user.gender ? "1" : "0",
                    email: res.data.user.email,
                    dob: dayjs(res.data.dob),
                    idNumber: res.data.idNumber,
                    idDate: dayjs(res.data.idDate),
                    idPlace: res.data.idPlace,
                    bank: res.data.bank,
                    bankNo: res.data.bankNo,
                    rating: res.data.rating,
                    ratingCount: res.data.ratingCount
                });
            }
        };
        loadCleaner();
    }, []);

    const handlePersonalInfoSubmit = async (values) => {
        console.log('Form values:', values);

        setLoading(true);
        const gender = values.gender === "1" ? true : false;

        if (avatarImageFile) {
            let formData = new FormData()
            formData.append("file", avatarImageFile)
            const resUpload = await uploadImageAPI("avatar", formData)
            if (resUpload.data !== "Upload failed!") {

                const resUser = await updateUserAPI(values.id, values.name, values.email, values.phone, gender, user.role?.id, resUpload.data);
                const resCleaner = await updateCleanerAPI(cleanerId, values.dob, values.idNumber, values.idDate, values.idPlace, values.bank, values.bankNo, values.rating, values.ratingCount, values.id);

                setTimeout(() => {
                    if (resUser.data && resCleaner.data) {
                        setUser({
                            id: user.id,
                            name: values.name,
                            email: user.email,
                            balance: user.balance,
                            role: user.role,
                            avatar: resUpload.data
                        });
                        message.success("Cập nhật thành công");
                    } else {
                        notification.error({
                            message: "Cập nhật thất bại",
                            description: JSON.stringify(resUser.message + "\n" + resCleaner.message)
                        });
                    }
                    setLoading(false);
                }, 3000);

            } else {
                message.error(resUpload.data.trim())
            }
        } else {
            const resUser = await updateUserAPI(values.id, values.name, values.email, values.phone, gender, user.role?.id, user.avatar);
            const resCleaner = await updateCleanerAPI(cleanerId, values.dob, values.idNumber, values.idDate, values.idPlace, values.bank, values.bankNo, values.rating, values.ratingCount, values.id);

            setTimeout(() => {
                if (resUser.data && resCleaner.data) {
                    setUser({
                        id: user.id,
                        name: values.name,
                        email: user.email,
                        balance: user.balance,
                        role: user.role,
                        avatar: user.avatar
                    });
                    message.success("Cập nhật thành công");
                } else {
                    notification.error({
                        message: "Cập nhật thất bại",
                        description: JSON.stringify(resUser.message + "\n" + resCleaner.message)
                    });
                }
                setLoading(false);
            }, 3000);
        }

    };

    const handlePasswordSubmit = async (values) => {
        setLoading(true);
        const res = await changePasswordAPI(user.id, values.currentPassword, values.newPassword);
        if (res.data) {
            setTimeout(() => {
                message.success('Đổi mật khẩu thành công!');
                passwordForm.resetFields();
                setLoading(false);
            }, 2000);
        } else {
            message.error(res.message.trim());
            setLoading(false);
        }
    };

    const handleBeforeUpload = (file) => {
        const newName = `${user.id}.${file.name.split('.').pop()}`;
        const renamedFile = new File([file], newName, { type: file.type });

        const reader = new FileReader();
        reader.onload = (e) => {
            setAvatarPreviewUrl(e.target.result); // ghi đè ảnh cũ
        };
        reader.readAsDataURL(renamedFile);
        setAvatarImageFile(renamedFile);
        return false; // ngăn upload mặc định
    };

    return (
        <div style={{ padding: '24px', maxWidth: '90%', margin: '0 auto' }}>
            <div style={{ background: '#fff', borderRadius: '8px', padding: '24px' }}>
                <h1 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '24px' }}>
                    Hồ sơ cá nhân
                </h1>

                <Tabs defaultActiveKey="personal" size="large">
                    <Tabs.TabPane
                        tab={
                            <span>
                                <UserOutlined />
                                Thông tin cá nhân
                            </span>
                        }
                        key="personal"
                    >
                        <div style={{ marginTop: '16px' }}>
                            <p style={{ color: '#666', marginBottom: '24px' }}>
                                Cập nhật thông tin cá nhân của bạn.
                            </p>

                            {/* Avatar Upload */}
                            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                                <Upload
                                    name="avatar"
                                    listType="picture-circle"
                                    showUploadList={false}
                                    beforeUpload={handleBeforeUpload}
                                >
                                    <Avatar size={100} src={avatarPreviewUrl || `http://localhost:8080/upload/avatar/${user.avatar}`} />
                                </Upload>
                                <div style={{ marginTop: '8px', color: '#1890ff' }}>
                                    Thay đổi ảnh đại diện
                                </div>
                            </div>

                            <Form
                                form={personalForm}
                                layout="vertical"
                                onFinish={handlePersonalInfoSubmit}
                            >
                                <Form.Item name="id" hidden>
                                    <Input />
                                </Form.Item>

                                <Row gutter={20}>
                                    <Col span={12}>
                                        <Form.Item
                                            label="Tên"
                                            name="name"
                                            rules={[{ required: true, message: 'Vui lòng nhập tên!' }]}
                                        >
                                            <Input size="large" placeholder="Nguyễn Thị Thảo" />
                                        </Form.Item>
                                    </Col>

                                    <Col span={12}>
                                        <Form.Item
                                            label="Số điện thoại"
                                            name="phone"
                                            rules={[
                                                { required: true, message: 'Vui lòng nhập số điện thoại!' },
                                                { pattern: /^[0-9]{10}$/, message: 'Số điện thoại không hợp lệ!' }
                                            ]}
                                        >
                                            <Input size="large" placeholder="0912 345 678" />
                                        </Form.Item>
                                    </Col>

                                    <Col span={6}>
                                        <Form.Item
                                            label="Giới tính"
                                            name="gender"
                                            rules={[{ required: true, message: 'Vui lòng chọn giới tính!' }]}
                                        >
                                            <Select size="large" placeholder="Chọn giới tính">
                                                <Option value="1">Nam</Option>
                                                <Option value="0">Nữ</Option>
                                            </Select>
                                        </Form.Item>
                                    </Col>

                                    <Col span={6}>
                                        <Form.Item
                                            label="Ngày sinh"
                                            name="dob"
                                            rules={[{ required: true, message: 'Vui lòng chọn ngày sinh!' }]}
                                        >
                                            <DatePicker size="large" style={{ width: '100%' }} placeholder="Chọn ngày sinh" />
                                        </Form.Item>
                                    </Col>

                                    <Col span={12}>
                                        <Form.Item
                                            label="Email"
                                            name="email"
                                            rules={[
                                                { required: true, message: 'Vui lòng nhập email!' },
                                                { type: 'email', message: 'Email không hợp lệ!' }
                                            ]}
                                        >
                                            <Input size="large" placeholder="thaonguyen@example.com" disabled />
                                        </Form.Item>
                                    </Col>

                                    <Col span={24} style={{ marginTop: '20px' }}>
                                        <Title level={4} style={{ marginBottom: '4px' }}>
                                            Thông tin CCCD
                                        </Title>
                                    </Col>

                                    <Col span={12}>
                                        <Form.Item
                                            label="Số CCCD"
                                            name="idNumber"
                                            rules={[{ required: true, message: 'Vui lòng nhập số CCCD!' }]}
                                        >
                                            <Input size="large" placeholder="Nhập số CCCD" />
                                        </Form.Item>
                                    </Col>

                                    <Col span={12}>
                                        <Form.Item
                                            label="Ngày cấp"
                                            name="idDate"
                                            rules={[{ required: true, message: 'Vui lòng chọn ngày cấp!' }]}
                                        >
                                            <DatePicker size="large" style={{ width: '100%' }} placeholder="Chọn ngày cấp" />
                                        </Form.Item>
                                    </Col>

                                    <Col span={24}>
                                        <Form.Item
                                            label="Nơi cấp"
                                            name="idPlace"
                                            rules={[{ required: true, message: 'Vui lòng nhập nơi cấp!' }]}
                                        >
                                            <Input size="large" placeholder="Nhập nơi cấp" />
                                        </Form.Item>
                                    </Col>

                                    <Col span={24} style={{ marginTop: '20px' }}>
                                        <Title level={4} style={{ marginBottom: '4px' }}>
                                            Thông tin ngân hàng
                                        </Title>
                                    </Col>

                                    <Col span={12}>
                                        <Form.Item
                                            label="Ngân hàng"
                                            name="bank"
                                            rules={[{ required: true, message: 'Vui lòng nhập tên ngân hàng!' }]}
                                        >
                                            <Input size="large" placeholder="Nhập tên ngân hàng" />
                                        </Form.Item>
                                    </Col>

                                    <Col span={12}>
                                        <Form.Item
                                            label="Số tài khoản"
                                            name="bankNo"
                                            rules={[{ required: true, message: 'Vui lòng nhập số tài khoản!' }]}
                                        >
                                            <Input size="large" placeholder="Nhập số tài khoản" />
                                        </Form.Item>
                                    </Col>

                                    <Form.Item
                                        label="Rating"
                                        name="rating"
                                        hidden
                                    >
                                        <Input size="large" placeholder="Nhập số tài khoản" />
                                    </Form.Item>
                                    <Form.Item
                                        label="RatingCount"
                                        name="ratingCount"
                                        hidden
                                    >
                                        <Input size="large" placeholder="Nhập số tài khoản" />
                                    </Form.Item>

                                    <Col span={24}>
                                        <Form.Item>
                                            <div style={{ display: 'flex', justifyContent: 'center', gap: '12px' }}>
                                                <Button size="large" onClick={() => personalForm.resetFields()}>
                                                    Hủy
                                                </Button>
                                                <Button
                                                    type="primary"
                                                    size="large"
                                                    htmlType="submit"
                                                    style={{
                                                        backgroundColor: '#41864D',
                                                        borderColor: '#41864D'
                                                    }}
                                                    loading={loading}
                                                >
                                                    Lưu thay đổi
                                                </Button>
                                            </div>
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </Form>
                        </div>
                    </Tabs.TabPane>

                    <Tabs.TabPane
                        tab={
                            <span>
                                <LockOutlined />
                                Mật khẩu
                            </span>
                        }
                        key="password"
                    >
                        <div style={{ marginTop: '16px' }}>
                            <p style={{ color: '#666', marginBottom: '24px' }}>
                                Thay đổi mật khẩu của bạn để bảo mật tài khoản.
                            </p>

                            <Form
                                form={passwordForm}
                                layout="vertical"
                                onFinish={handlePasswordSubmit}
                                style={{ maxWidth: '500px' }}
                            >
                                <Form.Item
                                    label="Mật khẩu hiện tại"
                                    name="currentPassword"
                                    rules={[{ required: true, message: 'Vui lòng nhập mật khẩu hiện tại!' }]}
                                >
                                    <Input.Password size="large" placeholder="Nhập mật khẩu hiện tại" />
                                </Form.Item>

                                <Form.Item
                                    label="Mật khẩu mới"
                                    name="newPassword"
                                    rules={[
                                        { required: true, message: 'Vui lòng nhập mật khẩu mới!' },
                                    ]}
                                >
                                    <Input.Password size="large" placeholder="Nhập mật khẩu mới" />
                                </Form.Item>

                                <Form.Item
                                    label="Xác nhận mật khẩu mới"
                                    name="confirmPassword"
                                    dependencies={['newPassword']}
                                    rules={[
                                        { required: true, message: 'Vui lòng xác nhận mật khẩu mới!' },
                                        ({ getFieldValue }) => ({
                                            validator(_, value) {
                                                if (!value || getFieldValue('newPassword') === value) {
                                                    return Promise.resolve();
                                                }
                                                return Promise.reject(new Error('Mật khẩu xác nhận không khớp!'));
                                            },
                                        }),
                                    ]}
                                >
                                    <Input.Password size="large" placeholder="Nhập lại mật khẩu mới" />
                                </Form.Item>

                                <Form.Item>
                                    <div style={{ display: 'flex', gap: '12px' }}>
                                        <Button size="large" onClick={() => passwordForm.resetFields()}>
                                            Reset
                                        </Button>
                                        <Button type="primary" size="large" htmlType="submit" loading={loading}>
                                            Đổi mật khẩu
                                        </Button>
                                    </div>
                                </Form.Item>
                            </Form>
                        </div>
                    </Tabs.TabPane>
                </Tabs>
            </div>
        </div>
    );
}

export default CleanerProfile;