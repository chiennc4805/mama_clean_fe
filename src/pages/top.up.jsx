
import { WarningOutlined } from '@ant-design/icons';
import { Alert, Card, Col, Image, message, Modal, Row, Table, Typography } from 'antd';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../components/context/auth.context';
import { createPaymentAPI, fetchAllPaymentsWithoutPagination, fetchPaymentByIdAPI, getAccountAPI } from '../services/api.service';
import { formatterNumber } from '../services/common.function';
import dayjs from 'dayjs';

const { Title, Text } = Typography;

const TopUpPage = () => {

    const { user, setUser } = useContext(AuthContext);
    const [content, setContent] = useState(`MC${user.id}`)
    const [paymentId, setPaymentId] = useState("")
    const [paymentHistory, setPaymentHistory] = useState([])

    useEffect(() => {
        const createPayment = async () => {
            const res = await createPaymentAPI(0, "DEPOSIT", user.id)
            if (res.data) {
                setContent(res.data.content)
                setPaymentId(res.data.id)
            }
            else {
                message.error("Tạo QR không thành công")
            }
        }
        createPayment()
    }, [])

    useEffect(() => {
        if (!paymentId) return
        const interval = setInterval(async () => {
            const res = await fetchPaymentByIdAPI(paymentId)
            if (res.data.status === "SUCCESS") {
                Modal.success({
                    title: "Nạp tiền thành công!",
                    content: "Số dư tài khoản của bạn đã được cập nhật.",
                    centered: true,
                    onOk: async () => {
                        const newPayment = await createPaymentAPI(0, "DEPOSIT", user.id)
                        if (newPayment.data) {
                            setContent(newPayment.data.content)
                            setPaymentId(newPayment.data.id)
                        }
                    }
                })
                clearInterval(interval)
                setUser(prev => ({
                    ...prev,
                    balance: prev.balance + res.data.amount
                }))
            }
        }, 10000)

        const fetchListPaymentSuccess = async () => {
            let filterParam = `user.id~'${user.id}' and status~'SUCCESS'`
            const res = await fetchAllPaymentsWithoutPagination(encodeURIComponent(filterParam))
            if (res.data) {
                //         {
                //             key: '1',
                //                 code: 'D6B0807735918B',
                //                     amount: '+100.010đ',
                //                         method: 'Chuyển khoản ngân hàng',
                //                             date: '27-09-2025 22:49',
                // },
                setPaymentHistory(res.data.result.map(item => ({
                    key: item.id,
                    code: item.id,
                    amount: `+${formatterNumber(item.amount)}đ`,
                    method: 'Chuyển khoản ngân hàng',
                    date: dayjs(item.transactionTime).format("DD/MM/YYYY HH:mm")
                })))
            }
        }
        fetchListPaymentSuccess()

        return () => clearInterval(interval)
    }, [paymentId])

    const columns = [
        {
            title: 'Mã đơn',
            dataIndex: 'code',
            key: 'code',
        },
        {
            title: 'Số tiền',
            dataIndex: 'amount',
            key: 'amount',
            render: (text) => <Text style={{ color: '#52c41a', fontWeight: 500 }}>{text}</Text>
        },
        {
            title: 'Cách thanh toán',
            dataIndex: 'method',
            key: 'method',
        },
        {
            title: 'Ngày tạo',
            dataIndex: 'date',
            key: 'date',
        },
    ];

    const data = [
        {
            key: '1',
            code: 'D6B0807735918B',
            amount: '+100.010đ',
            method: 'Chuyển khoản ngân hàng',
            date: '27-09-2025 22:49',
        },
    ];

    return (
        <div style={{ backgroundColor: '#F6F6F6', minHeight: '100vh', padding: '24px' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                <Title style={{ textAlign: 'center', marginBottom: '40px', fontSize: "35px" }}>
                    Nạp tiền qua chuyển khoản ngân hàng
                </Title>

                <Row gutter={24} style={{ display: 'flex' }}>
                    <Col xs={24} lg={12} style={{ display: 'flex' }}>
                        <Card style={{ width: '100%' }}>
                            <div style={{ marginBottom: '24px' }}>
                                <Text type="secondary">Số dư tài khoản:</Text>
                                <div style={{
                                    backgroundColor: '#f0f0f0',
                                    padding: '12px',
                                    marginTop: '8px',
                                    borderRadius: '4px'
                                }}>
                                    <Text strong>{formatterNumber(user.balance)} VNĐ</Text>
                                </div>
                            </div>

                            <div>
                                <Text strong style={{ marginBottom: '12px', display: 'block' }}>
                                    Hướng dẫn nhanh
                                </Text>
                                <ol style={{ paddingLeft: '20px', lineHeight: '2' }}>
                                    <li>Mở ứng dụng banking trên điện thoại</li>
                                    <li>Chọn "Quét mã QR" hoặc "Chuyển/Liên QR"</li>
                                    <li>Quét mã QR và xác nhận giao dịch</li>
                                    <li>Chờ 5-10 phút để Mama's Clean được cộng vào tài khoản</li>
                                </ol>
                            </div>

                            <Alert
                                icon={<WarningOutlined />}
                                message="LƯU Ý QUAN TRỌNG"
                                description={
                                    <div>
                                        <p>• Vui lòng chuyển đúng nội dung để trạm trương hợp giao dịch bị chậm: hỗ trợ qua liên hệ trực tuyến</p>
                                        <p>• Sau khi chuyển tiền, vui lòng chờ 5-10 phút để hệ thống xử lý</p>
                                        <p style={{ marginBottom: 0 }}>• Liên hệ hỗ trợ: 0374098225</p>
                                    </div>
                                }
                                type="warning"
                                showIcon
                                style={{ marginTop: '24px' }}
                            />
                        </Card>
                    </Col>

                    <Col xs={24} lg={12} style={{ display: 'flex' }}>
                        <Card style={{ width: '100%' }}>
                            <Title level={5} style={{ textAlign: 'center', marginBottom: '24px' }}>
                                Quét mã QR để thanh toán
                            </Title>

                            <div style={{ textAlign: 'center' }}>
                                <div style={{
                                    display: 'inline-block',
                                    padding: '16px',
                                    backgroundColor: '#fff',
                                    border: '1px solid #d9d9d9',
                                    borderRadius: '8px'
                                }}>
                                    <Image
                                        src={content ? `https://qr.sepay.vn/img?bank=TPBank&acc=00000117045&&des=${content}` : ""}
                                        alt="QR Code"
                                        width={250}
                                        preview={false}
                                    />
                                </div>

                                <div style={{ marginTop: '24px' }}>
                                    <Text strong style={{ fontSize: '16px', display: 'block' }}>LÊ MINH HẢI</Text>
                                    <Text style={{ display: 'block', marginTop: '4px' }}>2120938947</Text>
                                    <Text type="secondary" style={{ display: 'block', marginTop: '4px' }}>
                                        BIDV-CN TÂY HỒ
                                    </Text>
                                </div>
                            </div>
                        </Card>
                    </Col>
                </Row>

                <Card style={{ marginTop: '24px', background: "#F2FDF4" }}>
                    <Title level={5} style={{ marginBottom: '16px' }}>Lịch sử nạp tiền</Title>
                    <Table
                        columns={columns}
                        dataSource={paymentHistory}
                        pagination={false}
                        scroll={{ x: 800 }}
                        bordered
                    />
                </Card>
            </div>
        </div>
    );
}

export default TopUpPage;