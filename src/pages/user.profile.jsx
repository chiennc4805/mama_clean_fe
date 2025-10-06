import { Avatar, Button, Card, Form, Input, message, notification, Select, Space, Tabs, Typography, Upload } from 'antd';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../components/context/auth.context';
import { changePasswordAPI, fetchUserByIdAPI, updateUserAPI, uploadImageAPI } from '../services/api.service';
import { User, Lock } from 'lucide-react';
import { CameraOutlined, LockOutlined, UserOutlined } from '@ant-design/icons';
import TabPane from 'antd/es/tabs/TabPane';
import { useNavigate } from 'react-router-dom';

const { Option } = Select;

const UserProfile = () => {

    const [personalForm] = Form.useForm();
    const [passwordForm] = Form.useForm();
    const [avatarImageFile, setAvatarImageFile] = useState(null);
    const [avatarPreviewUrl, setAvatarPreviewUrl] = useState(null);
    const { user, setUser } = useContext(AuthContext)
    const [loading, setLoading] = useState(false)
    const [dataUser, setDataUser] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        const loadUser = async () => {
            const res = await fetchUserByIdAPI(user?.id)
            if (res.data) {
                const dataUser = {
                    id: res.data.id,
                    name: res.data.name,
                    phone: res.data.phone,
                    gender: res.data.gender ? "1" : "0",
                    email: res.data.email,
                }
                personalForm.setFieldsValue(dataUser)
            }
        }
        loadUser()
    }, [])

    const handlePersonalInfoSubmit = async (values) => {
        setLoading(true)
        const gender = values.gender === "1" ? true : false
        if (avatarImageFile) {
            let formData = new FormData()
            formData.append("file", avatarImageFile)
            const resUploadAPI = await uploadImageAPI("avatar", formData)
            console.log("upload res: " + resUploadAPI)
            if (resUploadAPI.data != "Upload failed!") {
                const res = await updateUserAPI(user.id, values.name, values.email, values.phone, gender, user.role?.id, resUploadAPI.data)
                setTimeout(() => {
                    if (res.data) {
                        setUser({
                            id: user.id,
                            name: values.name,
                            email: user.email,
                            balance: user.balance,
                            role: user.role,
                            avatar: resUploadAPI.data
                        })
                        message.success("Cập nhật thành công")
                    }
                    else {
                        notification.error({
                            message: "Cập nhật thất bại",
                            description: JSON.stringify(res.message)
                        })
                    }
                    setLoading(false)
                }, 2000)
            } else {
                message.error(resUploadAPI.data.trim())
            }
        } else {
            const res = await updateUserAPI(user.id, values.name, values.email, values.phone, gender, user.role?.id, user.avatar)
            setTimeout(() => {
                if (res.data) {
                    setUser({
                        id: user.id,
                        name: values.name,
                        email: user.email,
                        balance: user.balance,
                        role: user.role,
                        avatar: user.avatar
                    })
                    message.success("Cập nhật thành công")
                }
                else {
                    notification.error({
                        message: "Cập nhật thất bại",
                        description: JSON.stringify(res.message)
                    })
                }
                setLoading(false)
            }, 2000)
        }


    };

    const handlePasswordSubmit = async (values) => {
        setLoading(true)
        const res = await changePasswordAPI(user.id, values.currentPassword, values.newPassword)
        if (res.data) {
            setTimeout(() => {
                message.success('Đổi mật khẩu thành công!');
                passwordForm.resetFields();
                setLoading(false)
            }, 2000)
        } else {
            message.error(res.message.trim())
            setLoading(false)
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
        <div style={{ padding: '24px', maxWidth: '900px', margin: '0 auto' }}>
            <div style={{ background: '#fff', borderRadius: '8px', padding: '24px' }}>
                <h1 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '24px' }}>
                    Hồ sơ cá nhân
                </h1>

                <Tabs defaultActiveKey="personal" size="large">
                    <TabPane
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

                            {/* Form thông tin cá nhân */}
                            <Form
                                form={personalForm}
                                layout="vertical"
                                onFinish={handlePersonalInfoSubmit}
                            >
                                <Form.Item
                                    label="Tên"
                                    name="name"
                                    rules={[{ required: true, message: 'Vui lòng nhập tên!' }]}
                                >
                                    <Input size="large" placeholder="Nhập tên của bạn" />
                                </Form.Item>

                                <Form.Item
                                    label="Số điện thoại"
                                    name="phone"
                                    rules={[
                                        { required: true, message: 'Vui lòng nhập số điện thoại!' },
                                        { pattern: /^[0-9]{10}$/, message: 'Số điện thoại không hợp lệ!' }
                                    ]}
                                >
                                    <Input size="large" placeholder="Nhập số điện thoại" />
                                </Form.Item>

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

                                <Form.Item
                                    label="Email"
                                    name="email"
                                    rules={[
                                        { required: true, message: 'Vui lòng nhập email!' },
                                        { type: 'email', message: 'Email không hợp lệ!' }
                                    ]}
                                >
                                    <Input size="large" placeholder="Nhập email" disabled />
                                </Form.Item>

                                <Form.Item>
                                    <div style={{ display: 'flex', justifyContent: "center" }}>
                                        <Button type="primary" size="large" htmlType="submit" loading={loading}>
                                            Lưu thay đổi
                                        </Button>
                                    </div>
                                </Form.Item>
                            </Form>
                        </div>
                    </TabPane>

                    <TabPane
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

                            {/* Form đổi mật khẩu */}
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
                    </TabPane>
                </Tabs>
            </div>
        </div>
    );
}

export default UserProfile;