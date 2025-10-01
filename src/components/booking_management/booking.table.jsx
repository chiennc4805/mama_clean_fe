import { Button, Col, notification, Row, Table, Tag } from 'antd';


const BookingTable = (props) => {

    const [api, contextHolder] = notification.useNotification();
    const { dataCleaners, loadCleaner, pageSize, setPageSize,
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
            width: 140,
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
            width: 100,
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
            width: 180,
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
            width: 150,
        },
        {
            title: 'Trạng thái',
            render: (record) => {
                if (record.status === "Đang chờ") {
                    return <Tag color="default">{record.status}</Tag>
                } else if (record.status === "Hoàn thành") {
                    return <Tag color="success">{record.status}</Tag>
                } else if (record.status === "Đang tiến hành") {
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
            width: 150,
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
            width: 150,
        },
        {
            title: 'Trạng thái',
            key: 'action',
            width: 130,
            render: () => (
                <Button type="link" size="small">
                    Xem chi tiết
                </Button>
            ),
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
                            rowKey={"id"}
                            columns={columns}
                            dataSource={dataCleaners}
                            bordered={true}
                            size='large'
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
                    </Col>
                </Row>
            </div>
        </>

    )

}

export default BookingTable;