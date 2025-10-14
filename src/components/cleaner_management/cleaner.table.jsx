import { DeleteOutlined } from '@ant-design/icons';
import { Button, Col, message, notification, Popconfirm, Row, Table } from 'antd';
import { useState } from 'react';
import { deleteUserAPI } from '../../services/api.service';
import { useNavigate } from 'react-router-dom';


const CleanerTable = (props) => {

    const [api, contextHolder] = notification.useNotification();
    const { dataCleaners, loadCleaner, pageSize, setPageSize,
        current, setCurrent, total, setDataDetail, setActiveComponent } = props
    const navigate = useNavigate()

    const openNotificationWithIcon = (type, message, description) => {
        api[type]({
            message: message,
            description: description
        });
    };

    const handleDeleteUser = async (userId, cleanerProfileId) => {
        const deleteUser = await deleteUserAPI(userId)
        if (deleteUser.data) {
            message.success("Xoá cleaner thành công")
            setTimeout(() => {
                navigate(0)
            }, 1000)
        } else {
            message.error(deleteUser.message.trim())
        }
    }

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
            title: '',
            key: 'action',
            width: 130,
            render: (record) => (
                <>
                    <Button type="primary" size="small" onClick={() => { setDataDetail(record); setActiveComponent("detail") }}>
                        Xem chi tiết
                    </Button>

                    <Popconfirm
                        title="Xoá nguời dùng"
                        description="Bạn chắc chắn xoá nguời dùng này?"
                        onConfirm={() => handleDeleteUser(record.user.id, record.id)}
                        okText="Có"
                        cancelText="Không"
                        placement='left'
                    >
                        <DeleteOutlined style={{ cursor: "pointer", color: "red", marginLeft: 10 }} />
                    </Popconfirm>
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