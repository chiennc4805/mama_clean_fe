import React, { useState, useEffect, useContext } from 'react';
import { Button, Typography, Space, Image, Upload, message, Input } from 'antd';
import { UploadOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import {
    createBookingActionAPI,
    createBookingCheckOutAPI,
    deleteBookingCheckOutAPI,
    updateBookingAPI,
    uploadImageAPI
} from '../../services/api.service';
import { AuthContext } from '../context/auth.context';

const { Title, Text } = Typography;
const { TextArea } = Input;

export default function CheckOutJob(props) {

    const { user, setUser } = useContext(AuthContext)
    const [notes, setNotes] = useState('');
    const [checkOutImage, setCheckOutImage] = useState(null);
    const [checkOutFile, setCheckOutFile] = useState(null);
    const { dataDetail, setStep, loadJobs } = props;
    const [loading, setLoading] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleAfterUpload = (file) => {
        const newName = `${dataDetail.id}.${file.name.split('.').pop()}`;
        const renamedFile = new File([file], newName, { type: file.type });
        const reader = new FileReader();
        reader.onload = (e) => {
            setCheckOutImage(e.target.result);
        };
        reader.readAsDataURL(renamedFile);
        setCheckOutFile(renamedFile);
        return false;
    };

    const handleSubmit = async () => {
        if (!checkOutImage) {
            message.error('Vui lòng tải lên ảnh sau khi dọn dẹp!');
            return;
        }

        setLoading(true);
        const formData = new FormData();
        formData.append('file', checkOutFile);

        const resUploadFile = await uploadImageAPI('booking_check_out', formData);
        if (resUploadFile.data !== 'Upload failed!') {
            const resCreate = await createBookingCheckOutAPI(resUploadFile.data, notes, dataDetail.id);
            if (resCreate.data) {
                const statusParam = 'Đã hoàn thành'
                const resUpdate = await updateBookingAPI(
                    dataDetail.id,
                    dataDetail.name,
                    dataDetail.address,
                    dataDetail.addressLat,
                    dataDetail.addressLon,
                    dataDetail.date,
                    dataDetail.startTime,
                    dataDetail.totalPrice,
                    dataDetail.note,
                    statusParam,
                    dataDetail.customer.id,
                    dataDetail.cleaner.id,
                    dataDetail.service.id
                );
                if (resUpdate.data) {
                    const resCreateBookingAction = await createBookingActionAPI("CHECK_OUT", statusParam, dataDetail.id, user.id)
                    if (resCreateBookingAction.data) {
                        loadJobs()
                        message.success('Đã xác nhận hoàn thành công việc thành công!');
                        setTimeout(() => {
                            setStep("list")
                            setLoading(false);
                            setUser(prev => ({
                                ...prev,
                                balance: prev.balance + Math.round(dataDetail.totalPrice * (1 - import.meta.env.VITE_INCOME_DEDUCTION))
                            }))
                        }, 2000);
                    } else {
                        message.error(resCreateBookingAction.message.trim());
                        setLoading(false);
                    }
                } else {
                    await deleteBookingCheckOutAPI(resCreate.data.id);
                    message.error(resUpdate.message.trim());
                    setLoading(false);
                }
            } else {
                message.error(resCreate.message.trim());
                setLoading(false);
            }
        } else {
            message.error('Lưu ảnh thất bại. Vui lòng thử lại!');
            setLoading(false);
        }
    };

    return (
        <div
            style={{
                maxWidth: 900,
                margin: '0 auto',
                padding: isMobile ? '20px 12px' : '40px 20px',
                fontFamily:
                    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
            }}
        >
            {/* Header */}
            <div style={{ marginBottom: isMobile ? 24 : 40 }}>
                <Title
                    level={2}
                    style={{
                        marginBottom: 8,
                        fontSize: isMobile ? 22 : 28,
                        fontWeight: 600,
                        textAlign: isMobile ? 'center' : 'left',
                    }}
                >
                    Xác nhận hoàn thành công việc
                </Title>
                <Text
                    style={{
                        color: '#666',
                        fontSize: isMobile ? 13 : 14,
                        display: 'block',
                        textAlign: isMobile ? 'center' : 'left',
                    }}
                >
                    Vui lòng tải lên ảnh sau khi dọn dẹp và ghi chú cuối cùng.
                </Text>
            </div>

            {/* Thông tin công việc */}
            <div style={{ marginBottom: 40 }}>
                <Title
                    level={5}
                    style={{
                        marginBottom: 16,
                        fontSize: isMobile ? 18 : 20,
                        fontWeight: 600,
                        textAlign: isMobile ? 'center' : 'left',
                    }}
                >
                    Thông tin công việc
                </Title>
                <div style={{ fontSize: isMobile ? 13 : 14 }}>
                    <div style={{ marginBottom: 8 }}>
                        <Text style={{ color: '#666' }}>Mã công việc: </Text>
                        <Text style={{ color: '#000' }}>{dataDetail.id}</Text>
                    </div>
                    <div style={{ marginBottom: 8 }}>
                        <Text style={{ color: '#666' }}>Khách hàng: </Text>
                        <Text style={{ color: '#000' }}>{dataDetail.customer.name}</Text>
                    </div>
                    <div>
                        <Text style={{ color: '#666' }}>Thời gian: </Text>
                        <Text style={{ color: '#000' }}>
                            {dataDetail.date}, {dataDetail.startTime}
                        </Text>
                    </div>
                </div>
            </div>

            {/* Ảnh sau khi dọn dẹp */}
            <div style={{ marginBottom: 40 }}>
                <Title
                    level={5}
                    style={{
                        marginBottom: 8,
                        fontSize: isMobile ? 18 : 20,
                        fontWeight: 600,
                        textAlign: isMobile ? 'center' : 'left',
                    }}
                >
                    Ảnh sau khi dọn dẹp (1 ảnh)
                </Title>
                <Text
                    style={{
                        display: 'block',
                        color: '#666',
                        fontSize: isMobile ? 13 : 14,
                        marginBottom: 16,
                        textAlign: isMobile ? 'center' : 'left',
                    }}
                >
                    Tải lên ảnh tình trạng sau khi bạn đã hoàn tất công việc.
                </Text>

                <Space
                    direction="vertical"
                    size="middle"
                    style={{
                        width: '100%',
                        alignItems: 'center',
                    }}
                >
                    {checkOutImage && (
                        <div style={{ position: 'relative', display: 'inline-block' }}>
                            <Image
                                width={isMobile ? 280 : 500}
                                height={isMobile ? 180 : 300}
                                src={checkOutImage}
                                style={{ objectFit: 'cover', borderRadius: 8 }}
                            />
                        </div>
                    )}

                    <Upload beforeUpload={handleAfterUpload} showUploadList={false} accept="image/*">
                        <Button icon={<UploadOutlined />} block={isMobile}>
                            Tải ảnh lên
                        </Button>
                    </Upload>
                </Space>
            </div>

            {/* Ghi chú cuối cùng */}
            <div style={{ marginBottom: 40 }}>
                <Title
                    level={5}
                    style={{
                        marginBottom: 8,
                        fontSize: isMobile ? 16 : 18,
                        fontWeight: 600,
                        textAlign: isMobile ? 'center' : 'left',
                    }}
                >
                    Ghi chú cuối cùng (Tùy chọn)
                </Title>
                <Text
                    style={{
                        display: 'block',
                        color: '#666',
                        fontSize: isMobile ? 13 : 14,
                        marginBottom: 12,
                        textAlign: isMobile ? 'center' : 'left',
                    }}
                >
                    Thêm bất kỳ ghi chú quan trọng nào về công việc.
                </Text>
                <TextArea
                    rows={4}
                    placeholder="Nhập ghi chú của bạn tại đây..."
                    value={notes}
                    style={{
                        fontSize: 14,
                        borderRadius: 8,
                        padding: 12,
                    }}
                    onChange={(e) => setNotes(e.target.value)}
                />
            </div>

            {/* Action buttons */}
            <div
                style={{
                    display: 'flex',
                    flexDirection: isMobile ? 'column-reverse' : 'row',
                    justifyContent: isMobile ? 'center' : 'end',
                    alignItems: 'center',
                    gap: isMobile ? 12 : 20,
                }}
            >
                <Button
                    size="large"
                    icon={<ArrowLeftOutlined />}
                    style={{
                        height: 48,
                        borderRadius: 8,
                        fontSize: isMobile ? 14 : 15,
                        fontWeight: 500,
                        width: isMobile ? '100%' : 'auto',
                    }}
                    onClick={() => setStep('list')}
                >
                    Quay lại chi tiết công việc
                </Button>
                <Button
                    type="primary"
                    size="large"
                    style={{
                        height: 48,
                        borderRadius: 8,
                        fontSize: isMobile ? 14 : 15,
                        fontWeight: 500,
                        backgroundColor: '#41864D',
                        borderColor: '#41864D',
                        width: isMobile ? '100%' : 'auto',
                    }}
                    onClick={() => handleSubmit()}
                    loading={loading}
                >
                    Xác nhận hoàn tất công việc
                </Button>
            </div>
        </div>
    );
}
