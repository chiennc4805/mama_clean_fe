import { Button, Col, message, notification, Row, Select, Table } from 'antd';
import { assignCleanerJobManuallyAPI, createBookingActionAPI } from '../../services/api.service';
import dayjs from 'dayjs';
import { useContext, useState } from 'react';
import { AuthContext } from '../context/auth.context';


const AssignmentTable = (props) => {

    const { user } = useContext(AuthContext)
    const [api, contextHolder] = notification.useNotification();
    const { dataCleaners, loadCleaner, pageSize, setPageSize,
        current, setCurrent, total, cleanersOption, loadBooking } = props
    const [loadingId, setLoadingId] = useState(null)

    const assignCleaner = async (record) => {
        setLoadingId(record.id)
        const statusParam = "Chờ xác nhận"
        const res = await assignCleanerJobManuallyAPI(record.id, record.name, record.address, record.addressLat, record.addressLon, record.date, record.startTime, record.totalPrice, record.note, statusParam, record.customer.id, record.cleaner.id, record.service.id)

        if (res.data) {
            const resCreate = await createBookingActionAPI("ASSIGN", statusParam, record.id, user.id)
            if (resCreate.data) {
                message.success("Phân công thành công")
                loadCleaner()
                loadBooking()
                setTimeout(() => {
                    setLoadingId(null)
                }, 2000)
            } else {
                message.error(resCreate.message.trim())
                setLoadingId(null)
            }
        }
        else {
            message.error(res.message.trim())
            setLoadingId(null)
        }
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
            title: 'Công việc',
            render: (record) => {
                return (
                    <span>
                        {record.name}
                    </span>
                )
            },
            width: 140,
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
            sorter: (a, b) => {
                const dateA = dayjs(`${a.date} ${a.startTime}`);
                const dateB = dayjs(`${b.date} ${b.startTime}`);
                return dateA - dateB;
            },
        },
        {
            title: 'Phân công nhiệm vụ',
            render: (record) => (
                <Select
                    style={{ width: 180 }}
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
            width: 160,
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
                        assignCleaner(record)
                    }}
                    loading={loadingId === record.id ? true : false}
                    style={{ backgroundColor: "#41864D" }}
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
                        Danh sách phân công
                    </h2>
                </div>

                <Row style={{ margin: "1%" }}>
                    <Col xs={24} style={{ width: "100vw" }}>
                        <Table
                            rowKey={"id"}
                            columns={columns}
                            dataSource={dataCleaners}
                            bordered={true}
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
                    </Col>
                </Row>
            </div>
        </>

    )

}

export default AssignmentTable;