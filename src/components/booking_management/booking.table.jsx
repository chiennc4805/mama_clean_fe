import { Col, notification, Row, Table, Tag } from 'antd';
import dayjs from 'dayjs';


const BookingTable = (props) => {

    const [api, contextHolder] = notification.useNotification();
    const { dataBookings, loadBooking, pageSize, setPageSize,
        current, setCurrent, total } = props

    const formatterNumber = (val) => {
        if (!val) return "0";
        return Number(val).toLocaleString("en-US");
    };

    const openNotificationWithIcon = (type, message, description) => {
        api[type]({
            message: message,
            description: description
        });
    };

    const columns = [
        {
            title: 'Khách hàng',
            render: (record) => {
                return (
                    <span>
                        {record.customer.name}
                    </span>
                )
            },
            width: 150,
        },
        {
            title: 'Người dọn dẹp',
            render: (record) => {
                return (
                    record.cleaner
                        ? <span>{record.cleaner.name}</span>
                        : <span></span>
                )
            },
            width: 150,
        },
        {
            title: 'Dịch vụ',
            render: (record) => {
                return (
                    <span>
                        {record.service.name}
                    </span>
                )
            },
            width: 150,
        },
        {
            title: 'Công việc',
            render: (record) => {
                return (
                    <span>
                        {record.name}
                    </span>
                )
            },
            width: 220,
        },
        {
            title: 'Ngày & Giờ',
            render: (record) => {
                return (
                    <span>
                        {record.date + " " + record.startTime}
                    </span>
                )
            },
            width: 120,
            sorter: (a, b) => {
                const dateA = dayjs(`${a.date} ${a.startTime}`);
                const dateB = dayjs(`${b.date} ${b.startTime}`);
                return dateA - dateB;
            },
        },
        {
            title: 'Trạng thái',
            render: (record) => {
                if (record.status === "Đang chờ") {
                    return <Tag color="default">{record.status}</Tag>
                } else if (record.status === "Đã hoàn thành") {
                    return <Tag color="#87d068">{record.status}</Tag>
                } else if (record.status === "Chờ Check-in") {
                    return <Tag color="processing">{record.status}</Tag>
                } else if (record.status === "Chờ Check-out") {
                    return <Tag color="processing">{record.status}</Tag>
                } else if (record.status === "Đã huỷ") {
                    return <Tag color="red">{record.status}</Tag>
                } else if (record.status === "Từ chối") {
                    return <Tag color="red">{record.status}</Tag>
                } else if (record.status === "Mới") {
                    return <Tag color="green">{record.status}</Tag>
                } else {
                    return <Tag color="magenta">{record.status}</Tag>
                }
            },
            width: 100,
            align: 'center'
        },
        {
            title: 'Tổng cộng',
            render: (record) => {
                return (
                    <span>
                        {formatterNumber(record.totalPrice)}
                    </span>
                )
            },
            width: 120,
            align: 'center'
        },
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
            {contextHolder}
            <div
                style={{
                    border: "1px solid #ccc",
                    borderRadius: "8px",
                    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)", // đổ bóng nhẹ
                    padding: "16px",
                }}
            >
                <div xs={24} style={{ display: "flex", justifyContent: "space-between", margin: "1%", background: "#fff", paddingBottom: "5px" }}>
                    <h2>
                        Danh sách đơn hàng
                    </h2>
                </div>

                <Row style={{ margin: "1%" }}>
                    <Col xs={24} style={{ width: "100vw" }}>
                        <Table
                            rowKey="id"
                            columns={columns}
                            dataSource={dataBookings}
                            bordered
                            size="middle"
                            scroll={{ x: "max-content" }}
                            pagination={{
                                current,
                                pageSize,
                                showSizeChanger: true,
                                total,
                                showTotal: (total, range) => (
                                    <div>{range[0]}-{range[1]} trên {total} rows</div>
                                ),
                            }}
                            onChange={onChange}
                            style={{
                                fontSize: "14px",
                                overflowX: "auto",
                            }}
                        />
                    </Col>
                </Row>
            </div>
        </>

    )

}

export default BookingTable;