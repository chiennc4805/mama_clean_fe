import { Button, Col, notification, Row, Table, Tag } from 'antd';
import { useEffect, useState } from 'react';


const CustomerTable = (props) => {

    const [api, contextHolder] = notification.useNotification();
    const { dataUsers, loadUser, pageSize, setPageSize,
        current, setCurrent, total, setDataDetail, setActiveComponent } = props
    const [dataUpdate, setDataUpdate] = useState(null)
    const [dataTable, setDataTable] = useState([])

    const openNotificationWithIcon = (type, message, description) => {
        api[type]({
            message: message,
            description: description
        });
    };

    useEffect(() => {
        //mapping user object to fit with UI
        const mapped = dataUsers?.map(user => {
            let lastActivityDate = null;
            let isOnline = false;

            if (user.latestActivityTime) {
                lastActivityDate = new Date(user.latestActivityTime);

                // Xác định online nếu hoạt động trong 5 phút gần nhất
                const now = new Date();
                const diffMinutes = (now - lastActivityDate) / 1000 / 60;
                isOnline = diffMinutes <= 5;
            }

            return {
                id: user.id,
                name: user.name,
                phone: user.phone,
                email: user.email,
                orders: user.orders?.length || 0, // nếu có trường orders
                status: isOnline ? "Hoạt động" : "Không hoạt động",
                lastActivity: lastActivityDate
                    ? lastActivityDate.toLocaleString("vi-VN", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: false
                    })
                    : "Chưa có hoạt động",
                role: user.role
            };
        });

        setDataTable(mapped);
    }, [dataUsers])

    const columns = [
        {
            title: 'Họ tên',
            dataIndex: 'name',
            key: 'name',
            width: 180,
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            width: 220,
        },
        {
            title: 'Đơn hàng',
            dataIndex: 'orders',
            key: 'orders',
            width: 100,
            align: 'center',
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            width: 150,
            render: (status) => (
                <Tag color={status === 'Hoạt động' ? 'green' : 'error'}>
                    {status}
                </Tag>
            ),
        },
        {
            title: 'Hoạt động gần nhất',
            dataIndex: 'lastActivity',
            key: 'lastActivity',
            width: 150,
        },
        {
            title: 'Hành động',
            key: 'action',
            width: 130,
            render: (record) => (
                <Button type="primary" size="small" onClick={() => { setDataDetail(record); setActiveComponent("detail") }}>
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
                        Danh sách khách hàng
                    </h2>
                </div>

                <Row style={{ margin: "1%" }}>
                    <Col xs={24} style={{ width: "100vw" }}>
                        <Table
                            rowKey={"id"}
                            columns={columns}
                            dataSource={dataTable}
                            bordered
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

            {/* <UpdateUserModal
                loadUser={loadUser}
                isUpdateFormOpen={isUpdateFormOpen}
                setIsUpdateFormOpen={setIsUpdateFormOpen}
                dataUpdate={dataUpdate}
                setDataUpdate={setDataUpdate}
                roleOptions={roleOptions}
            /> */}
        </>

    )

}

export default CustomerTable;