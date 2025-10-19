import { DeleteOutlined } from '@ant-design/icons';
import { Button, Col, message, notification, Popconfirm, Row, Space, Switch, Table } from 'antd';
import { useState } from 'react';
import { deleteUserAPI, updateUserAPI } from '../../services/api.service';
import { useNavigate } from 'react-router-dom';


const CleanerTable = (props) => {

    const [api, contextHolder] = notification.useNotification();
    const { dataCleaners, loadCleaner, pageSize, setPageSize,
        current, setCurrent, total, setDataDetail, setActiveComponent } = props
    const navigate = useNavigate()
    const [loadingSwitch, setLoadingSwitch] = useState(false)

    const openNotificationWithIcon = (type, message, description) => {
        api[type]({
            message: message,
            description: description
        });
    };

    const columns = [
        {
            title: 'Họ tên',
            render: (record) => {
                return (
                    <span>
                        {record.user.name}
                    </span>
                )
            },
            width: 140,
        },
        {
            title: 'Email',
            render: (record) => {
                return (
                    <span>
                        {record.user.email}
                    </span>
                )
            },
            width: 100,
        },
        {
            title: 'Số CCCD',
            dataIndex: 'idNumber',
            key: 'idNumber',
            width: 180,
        },
        {
            title: 'Rating',
            dataIndex: 'rating',
            key: 'rating',
            width: 150,
        },
        {
            title: 'Trạng thái',
            key: 'status',
            width: 150,
            render: (record) => (
                <Space direction="vertical">
                    <Switch
                        checkedChildren="Đang làm"
                        unCheckedChildren="Nghỉ việc"
                        checked={record.user.status ? true : false}
                        style={{
                            backgroundColor: record.user.status === true ? '#52c41a' : '#ff4d4f', // xanh & đỏ
                        }}
                        loading={loadingSwitch}
                        onClick={async (checked, e) => {
                            if ((!checked && confirm("Bạn có chắc chắn muốn nghỉ việc nhân viên này không?") || checked)) {
                                setLoadingSwitch(true)
                                let res
                                if (checked) {
                                    res = await updateUserAPI(record.user.id, record.user.name, record.user.email, record.user.phone, record.user.gender, record.user.role.id, record.user.avatar)
                                } else {
                                    res = await deleteUserAPI(record.user.id)
                                }
                                if (res.data) {
                                    loadCleaner()
                                    message.success("Cập nhật trạng thái thành công")
                                    setTimeout(() => {
                                        setLoadingSwitch(false)
                                    }, 2000)
                                } else {
                                    message.error(res.message.trim())
                                    setLoadingSwitch(false)
                                }
                            }
                        }}
                    />
                </Space>
            )
        },
        {
            title: '',
            key: 'action',
            width: 130,
            render: (record) => (
                <>
                    <Button style={{ backgroundColor: "#41864D" }} type="primary" size="small" onClick={() => { setDataDetail(record); setActiveComponent("detail") }}>
                        Xem chi tiết
                    </Button>
                </>


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

export default CleanerTable;