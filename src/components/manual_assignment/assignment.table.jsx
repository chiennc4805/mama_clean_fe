import { Button, Col, message, notification, Row, Select, Table } from 'antd';
import { updateBookingAPI } from '../../services/api.service';


const AssignmentTable = (props) => {

    const [api, contextHolder] = notification.useNotification();
    const { dataCleaners, loadCleaner, pageSize, setPageSize,
        current, setCurrent, total, cleanersOption } = props

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

    const assignCleaner = async (record) => {
        const res = await updateBookingAPI(record.id, record.address, record.addressLat, record.addressLon, record.date, record.startTime, record.totalPrice, record.note, "Chờ xác nhận", record.customer.id, record.cleaner.id, record.service.id)

        setTimeout(() => {
            if (res.data) {
                message.success("Phân công thành công")
            }
            else {
                setLoading(false);
                notification.error({
                    message: "Phân công thất bại",
                    description: JSON.stringify(res.message)
                })
            }
        }, 2000)
    }

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
            title: 'Phân công nhiệm vụ',
            render: (record) => (
                <Select
                    style={{ width: 140 }}
                    placeholder="Chọn cleaner"
                    value={record.cleaner ? record.cleaner.id : undefined}
                    onChange={(value) => {
                        // gán cleaner vào record
                        record.cleaner = { id: value };
                        // hoặc gọi API lưu tạm
                    }}
                    options={cleanersOption}
                >
                </Select>
            ),
            width: 180,
        },
        {
            title: '',
            key: 'action',
            width: 130,
            render: (record) => (
                <Button
                    type="primary"
                    size="small"
                    onClick={() => {
                        // Gọi API phân công cleaner
                        console.log("Phân công:", record);
                        assignCleaner(record)
                    }}
                >
                    Phân công
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

export default AssignmentTable;