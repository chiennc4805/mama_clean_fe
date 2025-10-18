import { Card, Col, DatePicker, message, Modal, Rate, Row, Select, Table, Tag } from "antd"
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../components/context/auth.context";
import { fetchAllBookingsWithPaginationAPI } from "../../services/api.service";
import { formatterNumber } from "../../services/common.function";

const JobHistoryModal = (props) => {

    const { user } = useContext(AuthContext)
    const { open, setOpen } = props
    const [current, setCurrent] = useState(1)
    const [pageSize, setPageSize] = useState(10)
    const [total, setTotal] = useState(0)
    const [filter, setFilter] = useState({
        status: "",
        date: ""
    })
    const [historicalJobs, setHistoricalJobs] = useState([])

    useEffect(() => {
        let filterParam = `cleaner.id~'${user.id}'`
        if (filter.status) {
            filterParam += ` and status~'${filter.status}'`
        }
        else {
            filterParam += ` and status in ['Đã hoàn thành', 'Đã huỷ']`
        }
        if (filter.date) {
            filterParam += ` and date~'${filter.date.format("YYYY-MM-DD")}'`
        }

        const loadHistoricalBooking = async () => {
            const res = await fetchAllBookingsWithPaginationAPI(current, pageSize, encodeURIComponent(filterParam))
            if (res.data) {
                setHistoricalJobs(res.data.result)
            } else {
                message.error(res.message.trim())
            }
        }
        loadHistoricalBooking()
    }, [current, pageSize, filter])

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


    const hideModal = () => {
        setOpen(false);
    };

    const columns = [
        {
            title: 'Khách hàng',
            key: 'customer',
            width: 150,
            render: (record) => (record.customer.name)
        },
        {
            title: 'Ngày hoàn thành',
            key: 'completedDate',
            align: 'center',
            width: 150,
            render: (record) => (
                <span >{record.date}</span>
            )
        },
        {
            title: 'Trạng thái',
            key: 'status',
            align: 'center',
            width: 120,
            render: (record) => {
                if (record.status === "Đã hoàn thành")
                    return <Tag color="#87d068">{record.status}</Tag>
                else return <Tag color="#f50">{record.status}</Tag>;
            }
        },
        {
            title: 'Số tiền',
            key: 'price',
            align: 'center',
            width: 130,
            render: (record) => {
                if (record.status === "Đã hoàn thành")
                    return <span>{formatterNumber(Math.round(record.totalPrice * (1 - import.meta.env.VITE_INCOME_DEDUCTION)))} đ</span>
                else return "0 đ"
            }
        },
        {
            title: 'Đánh giá',
            key: 'rating',
            width: 160,
            render: (record) => (
                record.feedback ? (
                    <Rate disabled defaultValue={record.feedback.rating} />
                ) : (
                    <span style={{ color: '#999' }}>Chưa có</span>
                )
            ),
        }
    ];

    return (
        <>
            <Modal
                title="Lịch sử công việc"
                centered
                open={open}
                onOk={hideModal}
                onCancel={hideModal}
                width={1000}
                footer={null}
            >
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
                                placeholder="Trạng thái"
                                style={{ width: '100%' }}
                                allowClear
                                options={[
                                    { value: 'Đã hoàn thành', label: 'Đã hoàn thành' },
                                    { value: 'Đã huỷ', label: 'Đã huỷ' },
                                ]}
                                onChange={value => setFilter(prev => ({ ...prev, status: value }))}
                            />
                        </Col>
                        <Col xs={24} sm={12} md={6}>
                            <DatePicker
                                style={{ width: '100%' }}
                                placeholder="Ngày hoàn thành"
                                format={"DD/MM/YYYY"}
                                onChange={(date, dateString) => setFilter(prev => ({ ...prev, date: date }))}
                            />
                        </Col>
                    </Row>

                    <Table
                        columns={columns}
                        dataSource={historicalJobs}
                        size="middle"
                        scroll={{ x: "max-content" }}
                        pagination={
                            {
                                current: current,
                                pageSize: pageSize,
                                showSizeChanger: true,
                                total: total,
                                showTotal: (total, range) => { return (<div> {range[0]}-{range[1]} trên {total} rows</div>) }
                            }}
                        onChange={onChange}
                        style={{
                            fontSize: "14px",
                            overflowX: "auto",
                        }}
                    />
                </Card>
            </Modal>
        </>

    )

}

export default JobHistoryModal