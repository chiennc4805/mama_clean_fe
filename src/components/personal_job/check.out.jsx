import React, { useState } from 'react';
import { Card, Button, Typography, Space, Image, Upload, message } from 'antd';
import { UploadOutlined, ArrowLeftOutlined, CloseCircleOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;
const { TextArea } = Input;
import { Input } from 'antd';
import { createBookingCheckOutAPI, deleteBookingCheckOutAPI, updateBookingAPI, uploadImageAPI } from '../../services/api.service';


export default function CheckOutJob(props) {

    const [notes, setNotes] = useState('');
    const [checkOutImage, setCheckOutImage] = useState(null);
    const [checkOutFile, setCheckOutFile] = useState(null);
    const { dataDetail, setStep } = props
    const [loading, setLoading] = useState(false)

    // Upload handler
    const handleAfterUpload = (file) => {
        const newName = `${dataDetail.id}.${file.name.split('.').pop()}`;
        const renamedFile = new File([file], newName, { type: file.type });

        const reader = new FileReader();
        reader.onload = (e) => {
            setCheckOutImage(e.target.result); // ghi đè ảnh cũ
        };
        reader.readAsDataURL(renamedFile);
        setCheckOutFile(renamedFile);
        return false; // ngăn upload mặc định
    };

    const handleSubmit = async () => {
        if (!checkOutImage) {
            message.error("Vui lòng tải lên ảnh sau khi dọn dẹp!");
            return;
        }

        setLoading(true)

        const formData = new FormData()
        formData.append("file", checkOutFile)

        //upload file
        const resUploadFile = await uploadImageAPI("booking_check_out", formData)
        if (resUploadFile.data !== "Upload failed!") {
            //create checkout object
            const resCreate = await createBookingCheckOutAPI(resUploadFile.data, notes, dataDetail.id)
            if (resCreate.data) {
                //update booking status
                const resUpdate = await updateBookingAPI(dataDetail.id, dataDetail.name, dataDetail.address, dataDetail.addressLat, dataDetail.addressLon, dataDetail.date, dataDetail.startTime, dataDetail.totalPrice, dataDetail.note, "Đã hoàn thành", dataDetail.customer.id, dataDetail.cleaner.id, dataDetail.service.id)
                if (resUpdate.data) {
                    message.success('Đã xác nhận hoàn thành công việc thành công!');
                    setTimeout(() => {
                        window.location.reload()
                    }, 2000)
                }
                else {
                    await deleteBookingCheckOutAPI(resCreate.data.id)
                    message.error(resUpdate.message.trim())
                }
            } else {
                message.error(resCreate.message.trim())
            }
        } else {
            message.error("Lưu ảnh thất bại. Vui lòng thử lại!")
        }
        setLoading(false)
    };

    return (
        <div style={{
            maxWidth: 900,
            margin: '0 auto',
            padding: '40px 20px',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)"
        }}>
            {/* Header */}
            <div style={{ marginBottom: 40 }}>
                <Title level={2} style={{ marginBottom: 8, fontSize: 28, fontWeight: 600 }}>
                    Xác nhận hoàn thành công việc
                </Title>
                <Text style={{ color: '#666', fontSize: 14 }}>
                    Vui lòng tải lên ảnh trước/sau và ghi chú cuối cùng.
                </Text>
            </div>

            {/* Thông tin công việc */}
            <div style={{ marginBottom: 40 }}>
                <Title level={5} style={{ marginBottom: 16, fontSize: 20, fontWeight: 600 }}>
                    Thông tin công việc
                </Title>
                <div style={{ fontSize: 14 }}>
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
                        <Text style={{ color: '#000' }}>{dataDetail.date}, {dataDetail.startTime}</Text>
                    </div>
                </div>
            </div>

            {/* Ảnh sau khi đọn dẹp */}
            <div style={{ marginBottom: 40 }}>
                <Title level={5} style={{ marginBottom: 8, fontSize: 20, fontWeight: 600 }}>
                    Ảnh sau khi dọn dẹp (1 ảnh)
                </Title>
                <Text style={{ display: 'block', color: '#666', fontSize: 14, marginBottom: 16 }}>
                    Tải lên ảnh tình trạng sau khi bạn đã hoàn tất công việc.
                </Text>

                <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                    {checkOutImage && (
                        <div style={{ position: 'relative', display: 'inline-block' }}>
                            <Image
                                width={500}
                                height={300}
                                src={checkOutImage}
                                style={{ objectFit: 'cover', borderRadius: 8 }}
                            />
                        </div>
                    )}

                    <Upload
                        beforeUpload={handleAfterUpload}
                        showUploadList={false}
                        accept="image/*"
                    >
                        <Button icon={<UploadOutlined />} block>
                            Tải ảnh lên
                        </Button>
                    </Upload>
                </Space>
            </div>

            {/* Ghi chú cuối cùng */}
            <div style={{ marginBottom: 40 }}>
                <Title level={5} style={{ marginBottom: 8, fontSize: 16, fontWeight: 600 }}>
                    Ghi chú cuối cùng (Tùy chọn)
                </Title>
                <Text style={{ display: 'block', color: '#666', fontSize: 14, marginBottom: 12 }}>
                    Thêm bất kỳ ghi chú quan trọng nào về công việc.
                </Text>
                <TextArea
                    rows={4}
                    placeholder="Nhập ghi chú của bạn tại đây..."
                    value={notes}
                    style={{
                        fontSize: 14,
                        borderRadius: 8,
                        padding: 12
                    }}
                    onChange={(e) => setNotes(e.target.value)}
                />
            </div>

            {/* Action buttons */}
            <div style={{ display: 'flex', justifyContent: "end", gap: 20 }}>
                <Button
                    size="large"
                    icon={<ArrowLeftOutlined />}
                    style={{
                        height: 48,
                        borderRadius: 8,
                        fontSize: 15,
                        fontWeight: 500,
                    }}
                    onClick={() => setStep("list")}
                >
                    Quay lại chi tiết công việc
                </Button>
                <Button
                    type="primary"
                    size="large"
                    style={{
                        height: 48,
                        borderRadius: 8,
                        fontSize: 15,
                        fontWeight: 500,
                        backgroundColor: '#41864D',
                        borderColor: '#41864D'
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

// export default function CheckOutJob() {

//     const [beforeImages, setBeforeImages] = useState([
//         'https://images.unsplash.com/photo-1556912167-f556f1f39fdf?w=400&h=300&fit=crop'
//     ]);
//     const [afterImages, setAfterImages] = useState([
//         'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=400&h=300&fit=crop'
//     ]);

//     const handleBeforeUpload = (file) => {
//         const reader = new FileReader();
//         reader.onload = (e) => {
//             setBeforeImages([...beforeImages, e.target.result]);
//         };
//         reader.readAsDataURL(file);
//         return false;
//     };

//     const handleAfterUpload = (file) => {
//         const reader = new FileReader();
//         reader.onload = (e) => {
//             setAfterImages([...afterImages, e.target.result]);
//         };
//         reader.readAsDataURL(file);
//         return false;
//     };

//     const handleSubmit = () => {
//         message.success('Đã xác nhận hoàn thành công việc thành công!');
//     };

//     const handleBack = () => {
//         message.info('Quay lại chi tiết công việc');
//     };

//     return (
//             {/* Ảnh trước khi đọn dẹp */}
//             <div style={{ marginBottom: 40 }}>
//                 <Title level={5} style={{ marginBottom: 8, fontSize: 20, fontWeight: 600 }}>
//                     Ảnh trước khi đọn dẹp
//                 </Title>
//                 <Text style={{ display: 'block', color: '#666', fontSize: 14, marginBottom: 16 }}>
//                     Tải lên ảnh tình trạng trước khi bạn bắt đầu công việc.
//                 </Text>

//                 <div style={{ display: 'flex', gap: 16, marginBottom: 0 }}>
//                     {/* Image preview */}
//                     <Space direction="vertical" size="middle" style={{ width: '100%' }}>
//                         <Image.PreviewGroup>
//                             <Space wrap size="middle">
//                                 {beforeImages.map((img, idx) => (
//                                     <div key={idx} style={{ position: 'relative', display: 'inline-block' }}>
//                                         <Image
//                                             width={150}
//                                             height={120}
//                                             src={img}
//                                             style={{ objectFit: 'cover', borderRadius: 8 }}
//                                         />
//                                         <CloseCircleOutlined
//                                             onClick={() => {
//                                                 setBeforeImages(beforeImages.filter((_, i) => i !== idx));
//                                             }}
//                                             style={{
//                                                 position: 'absolute',
//                                                 top: 4,
//                                                 right: 4,
//                                                 fontSize: 18,
//                                                 color: 'gray',
//                                                 cursor: 'pointer',
//                                                 background: 'white',
//                                                 borderRadius: '50%'
//                                             }}
//                                         />
//                                     </div>
//                                 ))}
//                             </Space>
//                         </Image.PreviewGroup>
//                         <Upload
//                             beforeUpload={handleBeforeUpload}
//                             showUploadList={false}
//                             accept="image/*"
//                         >
//                             <Button icon={<UploadOutlined />} block>Tải ảnh lên</Button>
//                         </Upload>
//                     </Space>
//                 </div>
//             </div>

//             {/* Ảnh sau khi đọn dẹp */}
//             <div style={{ marginBottom: 40 }}>
//                 <Title level={5} style={{ marginBottom: 8, fontSize: 20, fontWeight: 600 }}>
//                     Ảnh sau khi đọn dẹp
//                 </Title>
//                 <Text style={{ display: 'block', color: '#666', fontSize: 14, marginBottom: 16 }}>
//                     Tải lên ảnh tình trạng sau khi bạn đã hoàn tát công việc.
//                 </Text>

//                 <Space direction="vertical" size="middle" style={{ width: '100%' }}>
//                     <Image.PreviewGroup>
//                         <Space wrap size="middle">
//                             {afterImages.map((img, idx) => (
//                                 <div key={idx} style={{ position: 'relative', display: 'inline-block' }}>
//                                     <Image
//                                         width={150}
//                                         height={120}
//                                         src={img}
//                                         style={{ objectFit: 'cover', borderRadius: 8 }}
//                                     />
//                                     <CloseCircleOutlined
//                                         onClick={() => {
//                                             setAfterImages(afterImages.filter((_, i) => i !== idx));
//                                         }}
//                                         style={{
//                                             position: 'absolute',
//                                             top: 4,
//                                             right: 4,
//                                             fontSize: 18,
//                                             color: 'gray',
//                                             cursor: 'pointer',
//                                             background: 'white',
//                                             borderRadius: '50%'
//                                         }}
//                                     />
//                                 </div>
//                             ))}
//                         </Space>
//                     </Image.PreviewGroup>
//                     <Upload
//                         beforeUpload={handleAfterUpload}
//                         showUploadList={false}
//                         accept="image/*"
//                     >
//                         <Button icon={<UploadOutlined />} block>Tải ảnh lên</Button>
//                     </Upload>
//                 </Space>
//             </div>