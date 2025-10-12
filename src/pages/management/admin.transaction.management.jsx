import React, { useEffect, useState } from 'react';
import { Table, Statistic, Row, Col, Card, Select, Input, Button, Space, Tag, DatePicker, message } from 'antd';
import { CheckCircleOutlined, DollarOutlined, EyeOutlined, FileTextOutlined } from '@ant-design/icons';
import { fetchAllWalletTransactionsWithPaginationAPI, getTotalOfAllBookingIncomeAPI, updateWalletTransactionAPI } from '../../services/api.service';
import dayjs from 'dayjs';
import { formatterNumber } from '../../services/common.function';

const AdminTransactionManagementPage = () => {

    const [totalIncome, setTotalIncome] = useState(0)
    const [transactions, setTransactions] = useState([])
    const [current, setCurrent] = useState(1)
    const [pageSize, setPageSize] = useState(10)
    const [total, setTotal] = useState(0)
    const [filter, setFilter] = useState({
        type: "",
        status: "",
        date: ""
    })
    const [loadingSuccessId, setLoadingSuccessId] = useState(null)
    const [loadingDeniedId, setLoadingDeniedId] = useState(null)
    const [refresh, setRefresh] = useState(false)

    useEffect(() => {
        const loadTotalIncome = async () => {
            const res = await getTotalOfAllBookingIncomeAPI();
            if (res.statusCode === 200) {
                setTotalIncome(res.data)
            }
        }
        loadTotalIncome()
    }, [])

    useEffect(() => {
        const loadTransactions = async () => {
            let filterParam = ""
            if (filter.type) filterParam += `type~'${filter.type}'`
            if (filter.status) {
                if (filterParam) filterParam += ` and status~'${filter.status}'`
                else filterParam = `status~'${filter.status}'`
            }
            if (filter.date) {
                const isoDate = `${filter.date.format("YYYY-MM-DD")}T00:00:00`
                if (filterParam) filterParam += ` and createdAt >= '${isoDate}'`
                else filterParam = `createdAt >= '${isoDate}'`
            }
            const res = await fetchAllWalletTransactionsWithPaginationAPI(current, pageSize, encodeURIComponent(filterParam))
            if (res.data) {
                setTransactions(res.data.result.map(item => {
                    let type = ""
                    let fee = ""
                    if (item.type === "BOOKING_PAYMENT") {
                        fee = Math.round(item.amount * 0.2)
                    }
                    return {
                        key: item.id,
                        id: item.id,
                        type: item.type,
                        user: item.user,
                        amount: item.amount,
                        fee: fee ? formatterNumber(fee) : "",
                        payment: fee ? formatterNumber(item.amount - fee) : "",
                        datetime: dayjs(item.createdAt).format("DD/MM/YYYY HH:mm"),
                        status: item.status
                    }
                }))
            }
        }
        loadTransactions()
    }, [pageSize, current, filter, refresh])

    const onChange = (pagination, filters, sorter, extra) => {
        if (pagination && pagination.current) {
            if (+pagination.current !== +current) {
                setCurrent(+pagination.current)
            }
        }

        if (pagination && pagination.pageSize) {
            if (+pagination.pageSize !== +pageSize) {
                setPageSize(+pagination.pageSize)
            }
        }
    };

    const handleActionWithdraw = async (transaction, action) => {
        action === "Hoàn thành" ? setLoadingSuccessId(transaction.id) : setLoadingDeniedId(transaction.id)
        let statusParam = action === "Hoàn thành" ? "SUCCESS" : "DENIED"
        const res = await updateWalletTransactionAPI(transaction.id, transaction.amount, transaction.type, transaction.ref_id, statusParam, transaction.user.id)
        if (res.data) {
            message.success(`${action} giao dịch thành công`)
            setTimeout(() => {
                setRefresh(prev => !prev)
                setLoadingSuccessId(null)
            }, 2000)
        } else {
            message.error(res.message.trim())
            setLoadingSuccessId(null)
        }
    }

    const statistics = [
        {
            label: 'Tổng thu nhập',
            value: totalIncome,
            prefix: <DollarOutlined />,
            color: "#41864D"
        },
        {
            label: 'Tổng phí nền tảng',
            value: Math.round(totalIncome * 0.2),
            prefix: <FileTextOutlined />,
            color: "#E8618C"
        },
        {
            label: 'Tổng thanh toán cho người dọn dẹp',
            value: totalIncome - Math.round(totalIncome * 0.2),
            prefix: <CheckCircleOutlined />,
            color: "#262626"
        }
    ];

    const columns = [
        {
            title: 'Loại giao dịch',
            key: 'type',
            width: 180,
            render: (record) => {
                if (record.type === "BOOKING_PAYMENT") {
                    return "Thanh toán đặt lịch"
                } else if (record.type === "WITHDRAW") {
                    return "Rút tiền từ ví"
                } else if (record.type === "REFUND") {
                    return "Hoàn tiền đặt lịch"
                }
            }
        },
        {
            title: 'Người dùng',
            key: 'user',
            width: 150,
            render: (record) => (record.user.name)
        },
        {
            title: 'Số tiền',
            key: 'amount',
            align: 'center',
            width: 100,
            render: (record) => (
                <span style={{ color: "#41864D" }}>{formatterNumber(record.amount)}</span>
            )
        },
        {
            title: 'Phí nền tảng',
            key: 'fee',
            align: 'center',
            width: 100,
            render: (record) => (
                <span style={{ color: "#E8618C" }}>{record.fee}</span>
            )
        },
        {
            title: 'Thanh toán cho người dọn dẹp',
            dataIndex: 'payment',
            key: 'payment',
            align: 'center',
            width: 150
        },
        {
            title: 'Ngày & Giờ',
            dataIndex: 'datetime',
            key: 'datetime',
            width: 160
        },
        {
            title: 'Trạng thái',
            key: 'status',
            width: 120,
            render: (record) => {
                if (record.status === "PENDING") return <Tag color="#2db7f5">Đang xử lý</Tag>;
                else if (record.status === "SUCCESS") return <Tag color="#87d068">Hoàn thành</Tag>;
                else if (record.status === "DENIED") return <Tag color="#f50">Từ chối</Tag>;
            }
        },
        {
            title: 'Hành động',
            key: 'action',
            width: 160,
            align: 'center',
            render: (record) => {
                if (record.type === "WITHDRAW" && record.status === "PENDING") {
                    return (
                        <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
                            <Button
                                type="primary"
                                size="small"
                                style={{ backgroundColor: '#41864D', borderColor: '#41864D' }}
                                loading={loadingSuccessId === record.id ? true : false}
                                onClick={() => handleActionWithdraw(record, "Hoàn thành")}
                            >
                                Hoàn thành
                            </Button>
                            <Button
                                danger
                                size="small"
                                loading={loadingDeniedId === record.id ? true : false}
                                onClick={() => handleActionWithdraw(record, "Từ chối")}
                            >
                                Từ chối
                            </Button>
                        </div>
                    )
                } else {
                    return <span></span>
                }
            }
        }
    ];

    return (
        <div style={{ padding: '24px', background: '#FFFFFF', minHeight: '100vh' }}>
            <Row gutter={[24, 24]} style={{ marginBottom: '32px' }}>
                {statistics.map((stat, index) => (
                    <Col xs={24} sm={12} lg={8} key={index}>
                        <Card
                            style={{
                                height: '100%',
                                borderRadius: 8,
                                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                            }}
                        >
                            <Statistic
                                title={stat.label}
                                value={stat.value}
                                suffix="VNĐ"
                                prefix={stat.prefix}
                                valueStyle={{ color: stat.color, fontWeight: 600 }}
                            />
                        </Card>
                    </Col>
                ))}
            </Row>

            <Card
                style={{
                    height: '100%',
                    borderRadius: 8,
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                }}
            >
                <Row gutter={[16, 16]} style={{ marginBottom: '20px' }}>
                    <Col xs={24} sm={12} md={6}>
                        <Select
                            placeholder="Loại giao dịch"
                            style={{ width: '100%' }}
                            allowClear
                            options={[
                                { value: 'BOOKING_PAYMENT', label: 'Thanh toán đặt lịch' },
                                { value: 'WITHDRAW', label: 'Rút tiền từ ví' },
                                { value: 'REFUND', label: 'Hoàn tiền đặt lịch' }
                            ]}
                            onChange={value => setFilter(prev => ({ ...prev, type: value }))}
                        />
                    </Col>
                    <Col xs={24} sm={12} md={6}>
                        <Select
                            placeholder="Trạng thái"
                            style={{ width: '100%' }}
                            allowClear
                            options={[
                                { value: 'PENDING', label: 'Đang xử lý' },
                                { value: 'SUCCESS', label: 'Hoàn thành' },
                                { value: 'DENIED', label: 'Từ chối' }
                            ]}
                            onChange={value => setFilter(prev => ({ ...prev, status: value }))}
                        />
                    </Col>
                    <Col xs={24} sm={12} md={6}>
                        <DatePicker
                            style={{ width: '100%' }}
                            placeholder="Ngày giao dịch"
                            format={"DD/MM/YYYY"}
                            onChange={(date, dateString) => setFilter(prev => ({ ...prev, date: date }))}
                        />
                    </Col>
                </Row>

                <Table
                    columns={columns}
                    dataSource={transactions}
                    pagination={
                        {
                            current: current,
                            pageSize: pageSize,
                            showSizeChanger: true,
                            total: total,
                            showTotal: (total, range) => { return (<div> {range[0]}-{range[1]} trên {total} rows</div>) }
                        }}
                    onChange={onChange}
                />
            </Card>
        </div>
    );
};

export default AdminTransactionManagementPage;