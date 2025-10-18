import React, { useContext, useEffect, useState } from 'react';
import { Card, Statistic, Button, Input, Table, Row, Col, message, InputNumber, Tag } from 'antd';
import { DollarOutlined, FileTextOutlined, CheckCircleOutlined, RiseOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { Column } from '@ant-design/plots';
import { AuthContext } from '../../components/context/auth.context';
import { createWalletTransactionAPI, fetchAllWalletTransactionsWithPaginationAPI, fetchCleanerByUserIdAPI } from '../../services/api.service';
import dayjs from 'dayjs';
import { formatterNumber } from '../../services/common.function';
import JobHistoryModal from './cleaner.job.history.modal';

const IncomePaymentPage = () => {

    const { user, setUser } = useContext(AuthContext)
    const [withdrawAmount, setWithdrawAmount] = useState('');
    const [totalIncome, setTotalIncome] = useState(0)
    const [monthlyIncomeData, setMonthlyIncomeData] = useState([     // Dữ liệu thu nhập hàng tháng
        { month: 'T5', value: 0 },
        { month: 'T6', value: 0 },
        { month: 'T7', value: 0 },
        { month: 'T8', value: 0 },
        { month: 'T9', value: 0 },
        { month: 'T10', value: 0 },
    ])
    const [recentTransactions, setRecentTransactions] = useState([])
    const [refresh, setRefresh] = useState(false)
    const [loading, setLoading] = useState(false)
    const [openJobHistoryModal, setOpenJobHistoryModal] = useState(false)

    useEffect(() => {
        const loadCleanerProfile = async () => {
            const res = await fetchCleanerByUserIdAPI(user.id)
            if (res.data) {
                setTotalIncome(res.data.totalIncome)
            } else {
                message.error(res.message.trim())
            }
        }
        loadCleanerProfile()

        const loadWalletTransaction = async () => {
            const res = await fetchAllWalletTransactionsWithPaginationAPI(1, 5, `user.id~'${user.id}'`)
            if (res.data) {
                setRecentTransactions(res.data.result.map(item => ({
                    key: item.id,
                    date: dayjs(item.createdAt).format("DD/MM/YYYY HH:mm"),
                    amount: formatterNumber(item.amount),
                    status: item.status
                })))
            } else {
                message.error(res.message.trim())
            }
        }
        loadWalletTransaction()
    }, [refresh])

    const handleWithdraw = async () => {
        setLoading(true)
        if (!withdrawAmount || withdrawAmount <= 0) {
            message.error("Vui lòng nhập số tiền hợp lệ")
            setLoading(false)
            return;
        }
        if (withdrawAmount > user.balance) {
            message.error("Số dư không đủ")
            setLoading(false)
            return;
        }
        const res = await createWalletTransactionAPI(withdrawAmount, "WITHDRAW", null, "PENDING", user.id)
        if (res.data) {
            setTimeout(() => {
                setRefresh(prev => !prev)
                message.success("Rút tiền thành công")
                setLoading(false)
                setWithdrawAmount('')
            }, 2000)
        } else {
            message.error(res.message.trim())
            setLoading(false)
        }
    }

    const transactionColumns = [
        {
            title: 'NGÀY',
            dataIndex: 'date',
            key: 'date',
            align: 'center',
        },
        {
            title: 'SỐ TIỀN',
            dataIndex: 'amount',
            key: 'amount',
            align: 'center',
        },
        {
            title: 'TRẠNG THÁI',
            key: 'status',
            align: 'center',
            render: (record) => {
                if (record.status === "PENDING") {
                    return (<Tag color='#2db7f5'>Đang xử lý</Tag>)
                }
                else if (record.status === "SUCCESS") {
                    return (<Tag color='#87d068'>Hoàn thành</Tag>)
                }
                else if (record.status === "DENIED")
                    return <Tag color="#f50">Từ chối</Tag>;

            }
        },
    ];

    const chartConfig = {
        data: monthlyIncomeData,
        xField: 'month',
        yField: 'value',
        color: '#41864D',
        columnStyle: {
            radius: [4, 4, 0, 0],
        },
        yAxis: {
            label: {
                formatter: (v) => `${(v / 1000000).toFixed(2)}M`,
            },
        },
        tooltip: {
            formatter: (datum) => {
                return { name: 'Thu nhập', value: `${datum.value.toLocaleString()} VNĐ` };
            },
        },
    };

    return (
        <>

            <div style={{ padding: '24px', backgroundColor: '#FFFFFF', minHeight: '100vh' }}>
                <h1 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '32px' }}>
                    Thu nhập & Thanh toán
                </h1>

                {/* Statistics Cards */}
                <Row gutter={[24, 24]} style={{ marginBottom: '32px' }}>
                    <Col xs={24} sm={12} lg={6}>
                        <Card
                            style={{
                                height: '100%',
                                borderRadius: 8,
                                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                            }}
                        >
                            <Statistic
                                title="Tổng thu nhập"
                                value={totalIncome}
                                suffix="VNĐ"
                                prefix={<DollarOutlined />}
                                valueStyle={{ color: '#41864D' }}
                            />
                            <div style={{ fontSize: '12px', color: '#8c8c8c', marginTop: '8px' }}>
                                Từ trước đến nay
                            </div>
                        </Card>
                    </Col>

                    <Col xs={24} sm={12} lg={6}>
                        <Card
                            style={{
                                height: '100%',
                                borderRadius: 8,
                                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                            }}
                        >
                            <Statistic
                                title="Có thể rút"
                                value={user.balance}
                                suffix="VNĐ"
                                prefix={<FileTextOutlined />}
                                valueStyle={{ color: '#E8618C' }}
                            />
                            <div style={{ fontSize: '12px', color: '#8c8c8c', marginTop: '8px' }}>
                                Số dư hiện có
                            </div>
                        </Card>
                    </Col>

                    <Col xs={24} sm={12} lg={6}>
                        <Card
                            style={{
                                height: '100%',
                                borderRadius: 8,
                                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                            }}
                        >
                            <Statistic
                                title="Đã thanh toán"
                                value={totalIncome - user.balance}
                                suffix="VNĐ"
                                prefix={<CheckCircleOutlined />}
                                valueStyle={{ color: '#262626' }}
                            />
                            <div style={{ fontSize: '12px', color: '#8c8c8c', marginTop: '8px' }}>
                                Tổng số tiền đã rút
                            </div>
                        </Card>
                    </Col>

                    <Col xs={24} sm={12} lg={6}>
                        <Card
                            style={{
                                height: '100%',
                                borderRadius: 8,
                                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                            }}
                        >
                            <Statistic
                                title="Tăng trưởng"
                                value={0}
                                suffix="%"
                                prefix={<RiseOutlined />}
                                valueStyle={{ color: '#41864D' }}
                            />
                            <div style={{ fontSize: '12px', color: '#8c8c8c', marginTop: '8px' }}>
                                So với tháng trước
                            </div>
                        </Card>
                    </Col>
                </Row>

                {/* Main Content */}
                <Row gutter={[24, 24]} align="stretch">
                    {/* Monthly Income Chart */}
                    <Col xs={24} lg={10}>
                        <Card
                            title="Thu nhập hàng tháng (6 tháng gần nhất)"
                            bordered
                            style={{
                                height: '100%',
                                borderRadius: 8,
                                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                            }}
                        >
                            <div style={{ fontSize: '14px', color: '#8c8c8c', marginBottom: '16px' }}>
                                Tổng quan thu nhập của bạn theo tháng.
                            </div>
                            <Column {...chartConfig} height={300} />
                        </Card>
                    </Col>

                    {/* Recent Transactions */}
                    <Col xs={24} lg={8}>
                        <Card
                            title="Giao dịch gần đây"
                            bordered
                            style={{
                                height: '100%',
                                borderRadius: 8,
                                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                            }}                    >
                            <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: '30px' }}>
                                <Button
                                    type="link"
                                    icon={<ArrowRightOutlined />}
                                    style={{ color: '#41864d' }}
                                    onClick={() => { setOpenJobHistoryModal(true) }}
                                >
                                    Xem lịch sử công việc
                                </Button>
                            </div>

                            <div style={{ fontSize: '14px', color: '#8c8c8c', marginBottom: '16px' }}>
                                Các khoản thanh toán gần nhất.
                            </div>

                            <div style={{ flex: 1 }}>
                                <Table
                                    columns={transactionColumns}
                                    dataSource={recentTransactions}
                                    pagination={false}
                                    size="small"
                                />
                            </div>
                        </Card>
                    </Col>

                    {/* Withdraw Money */}
                    <Col xs={24} lg={6}>
                        <Card title="Yêu cầu rút tiền" bordered
                            style={{
                                height: '100%',
                                borderRadius: 8,
                                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                            }}
                        >
                            <div style={{ fontSize: '14px', color: '#595959', marginBottom: '4px' }}>
                                Số dư hiện có: <span style={{ fontWeight: 'bold' }}>{formatterNumber(user.balance)} VNĐ</span>
                            </div>
                            <div style={{ fontSize: '12px', color: '#8c8c8c', marginBottom: '16px' }}>
                                Số tiền muốn rút
                            </div>
                            <InputNumber
                                placeholder="Nhập số tiền"
                                size="large"
                                value={withdrawAmount}
                                formatter={value => value ? formatterNumber(value) : ''}
                                onChange={(value) => setWithdrawAmount(value)}
                                style={{ marginBottom: '12px', width: "100%" }}
                            />
                            <div style={{ fontSize: '12px', color: '#8c8c8c', marginBottom: '16px' }}>
                                Phí rút tiền: 0 VNĐ. Tiền sẽ được chuyển trong vòng 1-3 ngày làm việc.
                            </div>
                            <Button
                                type="primary"
                                size="large"
                                block
                                style={{
                                    backgroundColor: '#41864D',
                                    borderColor: '#41864D',
                                    color: '#fff',
                                    height: '48px',
                                    fontSize: '16px'
                                }}
                                onClick={() => handleWithdraw()}
                                loading={loading}
                            >
                                Gửi yêu cầu rút tiền
                            </Button>
                        </Card>
                    </Col>
                </Row>
            </div>

            <JobHistoryModal
                open={openJobHistoryModal}
                setOpen={setOpenJobHistoryModal}
            />
        </>
    );
};

export default IncomePaymentPage;