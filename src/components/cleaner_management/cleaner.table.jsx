import { Button, Col, notification, Row, Table } from 'antd';
import { useEffect, useState } from 'react';


const CleanerTable = (props) => {

    const [api, contextHolder] = notification.useNotification();
    const { dataUsers, loadUser, pageSize, setPageSize,
        current, setCurrent, total } = props
    const [dataUpdate, setDataUpdate] = useState(null)
    const [isUpdateFormOpen, setIsUpdateFormOpen] = useState(false)
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

            if (user.userActivities && user.userActivities.length > 0) {
                // Lấy activity mới nhất
                const latestActivity = user.userActivities
                    .slice()
                    .sort((a, b) => new Date(b.requestTime) - new Date(a.requestTime))[0];

                lastActivityDate = new Date(latestActivity.requestTime);

                // Xác định online nếu hoạt động trong 5 phút gần nhất
                const now = new Date();
                const diffMinutes = (now - lastActivityDate) / 1000 / 60;
                isOnline = diffMinutes <= 5;
            }

            return {
                key: user.id,
                name: user.name,
                email: user.email,
                orders: user.orders?.length || 0, // nếu có trường orders
                status: isOnline ? "Hoạt động" : "Không hoạt động",
                lastActivity: lastActivityDate
                    ? lastActivityDate.toLocaleString()
                    : "Chưa có hoạt động",
            };
        });

        setDataTable(mapped);
    }, [dataUsers])

    const columns = [
        {
            title: 'Họ tên',
            dataIndex: 'name',
            key: 'name',
            width: 140,
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            width: 100,
        },
        {
            title: 'Số CCCD',
            dataIndex: 'uid',
            key: 'uid',
            width: 180,
        },
        {
            title: 'Điểm',
            dataIndex: 'rating',
            key: 'rating',
            width: 150,
        },
        {
            title: 'Hành động',
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
                        Danh sách nhân viên
                    </h2>
                </div>

                <Row style={{ margin: "1%" }}>
                    <Col xs={24} style={{ width: "100vw" }}>
                        <Table
                            rowKey={"id"}
                            columns={columns}
                            dataSource={dataTable}
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

export default CleanerTable;