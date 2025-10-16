import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Card, Col, DatePicker, Divider, Input, InputNumber, Row, Select, Statistic, Table } from 'antd';
import { useEffect, useState } from 'react';
import CustomerForm from '../../components/customer_management/create.customer.modal';
import CustomerTable from '../../components/customer_management/customer.table';
import { fetchAllFeedbacksWithPaginationAPI, fetchAllUserWithPaginationAPI } from '../../services/api.service';
import { debounce } from "lodash";
import CustomerDetail from '../../components/customer_management/customer.detail';
import dayjs from 'dayjs';


const { Option } = Select;

const FeedbackManagement = () => {

    const [dataDetail, setDataDetail] = useState({})
    const [feedbacks, setFeedbacks] = useState([])
    const [current, setCurrent] = useState(1)
    const [pageSize, setPageSize] = useState(10)
    const [total, setTotal] = useState(0)
    const [filter, setFilter] = useState({
        rating: 0,
        date: ""
    })

    useEffect(() => {
        const handler = debounce(() => {
            loadFeedback();
        }, 500); // chỉ gọi sau 500ms không gõ thêm

        handler();
        return () => handler.cancel();
    }, [current, pageSize, filter])

    const loadFeedback = async () => {
        let filterParam = ""
        if (filter.rating > 0) filterParam += `rating:${filter.rating}`
        if (filter.date) {
            const isoDate = `${filter.date.format("YYYY-MM-DD")}T00:00:00`
            if (filterParam) filterParam += ` and createdAt >= '${isoDate}'`
            else filterParam = `createdAt >= '${isoDate}'`
        }
        const res = await fetchAllFeedbacksWithPaginationAPI(current, pageSize, filterParam)
        if (res.data) {
            if (res.data.result.length === 0 && current > 1) {
                setCurrent(res.data.meta.page - 1)
            } else {
                setCurrent(res.data.meta.page)
            }
            setFeedbacks(res.data.result)
            setPageSize(res.data.meta.pageSize)
            setTotal(res.data.meta.total)
        }
    }

    const columns = [
        {
            title: 'Khách hàng',
            key: 'customeruser',
            width: 150,
            render: (record) => (record.booking.customer.name)
        },
        {
            title: 'Người dọn dẹp',
            key: 'cleaner',
            width: 150,
            render: (record) => (record.booking.cleaner.name)
        },
        {
            title: 'Xếp hạng',
            key: 'rating',
            align: 'center',
            width: 100,
            render: (record) => (
                <span>{record.rating} / 5</span>
            ),
            sorter: {
                compare: (a, b) => a.rating - b.rating,
                multiple: 2, // mức ưu tiên
            },
        },
        {
            title: 'Bình luận',
            key: 'content',
            width: 100,
            render: (record) => (
                <span style={{ color: "#E8618C" }}>{record.content}</span>
            )
        },
        {
            title: 'Ngày & Giờ',
            key: 'datetime',
            width: 160,
            render: (record) => (dayjs(record.createdAt).format("DD/MM/YYYY HH:mm")),
            sorter: {
                compare: (a, b) => dayjs(a.createdAt) - dayjs(b.createdAt),
                multiple: 1, // mức ưu tiên cao hơn rating
            },
        }
    ];

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

    return (
        <>
            <div style={{
                padding: 20
            }}>
                {/* title */}
                <div div xs={24} style={{ display: "flex", justifyContent: "space-between", margin: "1%", background: "#fff", paddingBottom: "5px" }}>
                    <h1>
                        Quản Lý Đánh giá
                    </h1>
                </div>

                <Divider size="large" style={{ minWidth: "50%", width: "95%", margin: "0 auto", paddingBottom: "40px" }} />

                {/* filter */}
                <Row gutter={[16, 24]} style={{
                    display: 'flex',
                    marginBottom: 20,
                    padding: "0px 20px"
                }}>
                    <Col xs={12} md={6} lg={6}>
                        <InputNumber
                            placeholder="Xếp hạng"
                            style={{ width: '100%' }}
                            onChange={value => setFilter(prev => ({ ...prev, rating: value }))}
                            min={0}
                            max={5}
                        />
                    </Col>
                    <Col xs={12} md={6} lg={6}>
                        <DatePicker
                            style={{ width: '100%' }}
                            placeholder="Ngày giao dịch"
                            format={"DD/MM/YYYY"}
                            onChange={(date, dateString) => setFilter(prev => ({ ...prev, date: date }))}
                        />
                    </Col>
                </Row>

                <div
                    style={{
                        border: "1px solid #ccc",
                        borderRadius: "8px",
                        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)", // đổ bóng nhẹ
                        padding: "16px",
                    }}
                >
                    <Table
                        columns={columns}
                        dataSource={feedbacks}
                        size='medium'
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
                </div>
            </div>

        </>
    )
};

export default FeedbackManagement;