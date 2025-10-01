import { Button, Col, notification, Row, Table, Tag } from 'antd';


const ServiceTable = (props) => {

    const [api, contextHolder] = notification.useNotification();
    const { dataUsers, loadUser, pageSize, setPageSize,
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
            title: 'Tên',
            dataIndex: 'name',
            key: 'name',
            width: 180,
        },
        {
            title: 'Mô tả',
            dataIndex: 'description',
            key: 'description',
            width: 220,
        },
        {
            title: 'Diện tích (m2)',
            dataIndex: 'area',
            key: 'area',
            width: 120,
            align: 'center',
        },
        {
            title: 'Giá cả (VNĐ)',
            render: (record) => {
                return (
                    <span>
                        {formatterNumber(record.price)}
                    </span>
                )
            },
            width: 100,
            align: 'center',
        },
        {
            title: 'Trạng thái',
            key: 'status',
            width: 150,
            render: (status) => (
                <Tag color={'green'}>
                    {"Kích hoạt"}
                </Tag>
            ),
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
                        Danh sách dịch vụ
                    </h2>
                </div>

                <Row style={{ margin: "1%" }}>
                    <Col xs={24} style={{ width: "100vw" }}>
                        <Table
                            rowKey={"id"}
                            columns={columns}
                            dataSource={dataUsers}
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

export default ServiceTable;