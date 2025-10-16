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
            setAvatarPreviewUrl(e.target.result);
        };
        reader.readAsDataURL(renamedFile);
        setAvatarImageFile(renamedFile);
        return false;
    };

    return (
        <>
            <div className="profile-container">
                <div className="profile-card">
                    <h1 className="profile-title">
                        Hồ sơ cá nhân
                    </h1>

                    <Tabs defaultActiveKey="personal" size="large" className="profile-tabs">
                        <Tabs.TabPane
                            tab={
                                <span className="tab-label">
                                    <UserOutlined />
                                    <span className="tab-text">Thông tin cá nhân</span>
                                </span>
                            }
                            key="personal"
                        >
                            <div className="tab-content">
                                <p className="tab-description">
                                    Cập nhật thông tin cá nhân của bạn.
                                </p>

                                {/* Avatar Upload */}
                                <div className="avatar-section">
                                    <Upload
                                        name="avatar"
                                        listType="picture-circle"
                                        showUploadList={false}
                                        beforeUpload={handleBeforeUpload}
                                    >
                                        <Avatar
                                            className="profile-avatar"
                                            src={avatarPreviewUrl || `https://mamasclean.com/upload/avatar/${user.avatar}`}
                                        />
                                    </Upload>
                                    <div className="avatar-hint">
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

                                    <Row gutter={[16, 0]}>
                                        <Col xs={24} sm={12}>
                                            <Form.Item
                                                label="Tên"
                                                name="name"
                                                rules={[{ required: true, message: 'Vui lòng nhập tên!' }]}
                                            >
                                                <Input size="large" placeholder="Nguyễn Thị Thảo" />
                                            </Form.Item>
                                        </Col>

                                        <Col xs={24} sm={12}>
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

                                        <Col xs={24} sm={12} md={6}>
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

                                        <Col xs={24} sm={12} md={6}>
                                            <Form.Item
                                                label="Ngày sinh"
                                                name="dob"
                                                rules={[{ required: true, message: 'Vui lòng chọn ngày sinh!' }]}
                                            >
                                                <DatePicker size="large" style={{ width: '100%' }} placeholder="Chọn ngày sinh" />
                                            </Form.Item>
                                        </Col>

                                        <Col xs={24} sm={24} md={12}>
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

                                        <Col span={24} className="section-divider">
                                            <Title level={4} className="section-title">
                                                Thông tin CCCD
                                            </Title>
                                        </Col>

                                        <Col xs={24} sm={12}>
                                            <Form.Item
                                                label="Số CCCD"
                                                name="idNumber"
                                                rules={[{ required: true, message: 'Vui lòng nhập số CCCD!' }]}
                                            >
                                                <Input size="large" placeholder="Nhập số CCCD" />
                                            </Form.Item>
                                        </Col>

                                        <Col xs={24} sm={12}>
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

                                        <Col span={24} className="section-divider">
                                            <Title level={4} className="section-title">
                                                Thông tin ngân hàng
                                            </Title>
                                        </Col>

                                        <Col xs={24} sm={12}>
                                            <Form.Item
                                                label="Ngân hàng"
                                                name="bank"
                                                rules={[{ required: true, message: 'Vui lòng nhập tên ngân hàng!' }]}
                                            >
                                                <Input size="large" placeholder="Nhập tên ngân hàng" />
                                            </Form.Item>
                                        </Col>

                                        <Col xs={24} sm={12}>
                                            <Form.Item
                                                label="Số tài khoản"
                                                name="bankNo"
                                                rules={[{ required: true, message: 'Vui lòng nhập số tài khoản!' }]}
                                            >
                                                <Input size="large" placeholder="Nhập số tài khoản" />
                                            </Form.Item>
                                        </Col>

                                        <Form.Item label="Rating" name="rating" hidden>
                                            <Input size="large" />
                                        </Form.Item>
                                        <Form.Item label="RatingCount" name="ratingCount" hidden>
                                            <Input size="large" />
                                        </Form.Item>

                                        <Col span={24}>
                                            <Form.Item>
                                                <div className="form-actions">
                                                    <Button
                                                        type="primary"
                                                        size="large"
                                                        htmlType="submit"
                                                        className="submit-btn"
                                                        loading={loading}
                                                    >
                                                        Lưu thay đổi
                                                    </Button>
                                                    <Button size="large" onClick={() => personalForm.resetFields()}>
                                                        Xoá
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
                                <span className="tab-label">
                                    <LockOutlined />
                                    <span className="tab-text">Mật khẩu</span>
                                </span>
                            }
                            key="password"
                        >
                            <div className="tab-content">
                                <p className="tab-description">
                                    Thay đổi mật khẩu của bạn để bảo mật tài khoản.
                                </p>

                                <Form
                                    form={passwordForm}
                                    layout="vertical"
                                    onFinish={handlePasswordSubmit}
                                    className="password-form"
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
                                        <div className="form-actions">
                                            <Button size="large" onClick={() => passwordForm.resetFields()}>
                                                Reset
                                            </Button>
                                            <Button
                                                type="primary"
                                                size="large"
                                                htmlType="submit"
                                                loading={loading}
                                                className="submit-btn"
                                            >
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

            <style jsx>{`
                /* Container */
                .profile-container {
                    padding: clamp(16px, 3vw, 24px);
                    max-width: 90%;
                    margin: 0 auto;
                }

                .profile-card {
                    background: #fff;
                    border-radius: 8px;
                    padding: clamp(16px, 3vw, 24px);
                }

                .profile-title {
                    font-size: clamp(24px, 4vw, 28px);
                    font-weight: bold;
                    margin-bottom: clamp(16px, 3vw, 24px);
                }

                /* Tabs */
                .profile-tabs .ant-tabs-nav {
                    margin-bottom: clamp(16px, 3vw, 24px);
                }

                .tab-label {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                }

                .tab-text {
                    display: inline;
                }

                .tab-content {
                    margin-top: 16px;
                }

                .tab-description {
                    color: #666;
                    margin-bottom: clamp(16px, 3vw, 24px);
                    font-size: clamp(14px, 1.5vw, 16px);
                }

                /* Avatar Section */
                .avatar-section {
                    text-align: center;
                    margin-bottom: clamp(24px, 4vw, 32px);
                }

                .profile-avatar {
                    width: clamp(80px, 15vw, 100px) !important;
                    height: clamp(80px, 15vw, 100px) !important;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }

                .profile-avatar:hover {
                    transform: scale(1.05);
                }

                .avatar-hint {
                    margin-top: 8px;
                    color: #1890ff;
                    font-size: clamp(12px, 1.5vw, 14px);
                    cursor: pointer;
                }

                /* Form Sections */
                .section-divider {
                    margin-top: clamp(16px, 3vw, 20px);
                }

                .section-title {
                    margin-bottom: 4px !important;
                    font-size: clamp(16px, 2vw, 18px) !important;
                }

                /* Form Actions */
                .form-actions {
                    display: flex;
                    justify-content: center;
                    gap: 12px;
                    flex-wrap: wrap;
                }

                .submit-btn {
                    background-color: #41864D !important;
                    border-color: #41864D !important;
                }

                .submit-btn:hover {
                    background-color: #357a3d !important;
                    border-color: #357a3d !important;
                }

                /* Password Form */
                .password-form {
                    max-width: 100%;
                }

                /* Form Labels */
                .ant-form-item-label > label {
                    font-size: clamp(13px, 1.5vw, 14px);
                }

                /* Input Sizes */
                .ant-input-lg,
                .ant-picker-large,
                .ant-select-lg {
                    font-size: clamp(14px, 1.8vw, 16px) !important;
                }

                /* Responsive Breakpoints */
                @media (min-width: 768px) {
                    .password-form {
                        max-width: 500px;
                    }
                }

                @media (max-width: 767px) {
                    .profile-container {
                        padding: 12px;
                        max-width: 100%;
                    }

                    .profile-card {
                        padding: 16px;
                    }

                    .profile-tabs .ant-tabs-nav {
                        margin-bottom: 16px;
                    }

                    .tab-content {
                        margin-top: 12px;
                    }

                    .form-actions {
                        flex-direction: column;
                    }

                    .form-actions .ant-btn {
                        width: 100%;
                    }
                }

                @media (max-width: 576px) {
                    .tab-text {
                        display: none;
                    }

                    .tab-label {
                        justify-content: center;
                    }

                    .profile-tabs .ant-tabs-tab {
                        padding: 8px 16px;
                    }

                    .section-divider {
                        margin-top: 12px;
                    }

                    .avatar-section {
                        margin-bottom: 20px;
                    }
                }

                /* Print Styles */
                @media print {
                    .profile-tabs .ant-tabs-nav,
                    .form-actions {
                        display: none !important;
                    }
                }
            `}</style>
        </>
    );
}

export default CleanerProfile;