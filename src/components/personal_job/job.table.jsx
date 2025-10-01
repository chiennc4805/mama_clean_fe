import { Button, Col, notification, Row, Table, Tag } from 'antd';
import { useEffect } from 'react';


const PersonalJobTable = (props) => {

    const [api, contextHolder] = notification.useNotification();
    const { dataJobs, loadJobs, pageSize, setPageSize,
        current, setCurrent, total, setStep, setDataDetail, setFilter, activeTab, setActiveTab } = props

    const openNotificationWithIcon = (type, message, description) => {
        api[type]({
            message: message,
            description: description
        });
    };

    const tabs = [
        { key: 'new', label: 'Mới' },
        { key: 'confirmed', label: 'Đã xác nhận' },
        { key: 'finished', label: 'Đã hoàn thành' }
    ];

    useEffect(() => {
        let rawFilter = ""
        if (activeTab === "new") {
            rawFilter = `and status in ['Từ chối', 'Chờ xác nhận']`;
        }
        else if (activeTab === "confirmed") {
            rawFilter = " and status in ['Chờ Check-in', 'Chờ Check-out']"
        }
        else {
            rawFilter = " and status in ['Đã hoàn thành']"
        }
        const encodedFilter = encodeURIComponent(rawFilter);
        setFilter(encodedFilter)
    }, [activeTab])

    const columns = [
        {
            title: 'Dịch vụ',
            render: (record) => {
                return (
                    <span>
                        {record.service.name}
                    </span>
                )
            },
            width: 140,
        },
        {
            title: 'Thời gian',
            render: (record) => {
                return (
                    <span>
                        {record.date + " " + record.startTime}
                    </span>
                )
            },
            width: 100,
        },
        {
            title: 'Địa điểm',
            render: (record) => {
                return (
                    <span>
                        {record.address}
                    </span>
                )
            },
            width: 180,
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
            title: 'Chi tiết',
            key: 'action',
            width: 130,
            render: (record) => {
                if (record.status === "Chờ Check-in") {
                    return (
                        <>
                            <Button type="link" size="small" onClick={() => { setDataDetail(record); setStep("detail") }}>
                                Xem chi tiết
                            </Button>

                            <Button type="link" size="small" onClick={() => { setDataDetail(record); setStep("check-in") }}>
                                Check-in
                            </Button>
                        </>
                    )
                }
                else if (record.status === "Chờ Check-out") {
                    return (
                        <>
                            <Button type="link" size="small" onClick={() => { setDataDetail(record); setStep("detail") }}>
                                Xem chi tiết
                            </Button>

                            <Button type="link" size="small" onClick={() => { setDataDetail(record); setStep("check-out") }}>
                                Check-out
                            </Button>
                        </>
                    )
                } else {
                    return (
                        <>
                            <Button type="link" size="small" onClick={() => { setDataDetail(record); setStep("detail") }}>
                                Xem chi tiết
                            </Button>
                        </>
                    )
                }
            },
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

            <Row gutter={0} style={{ marginBottom: 24 }}>
                {tabs.map((tab) => (
                    <Col key={tab.key} span={8}>
                        <div
                            onClick={() => setActiveTab(tab.key)}
                            style={{
                                padding: '12px 0',
                                textAlign: 'center',
                                fontSize: 15,
                                fontWeight: 500,
                                cursor: 'pointer',
                                backgroundColor: activeTab === tab.key ? '#41864D' : '#f0f0f0',
                                color: activeTab === tab.key ? '#fff' : '#595959',
                                borderRadius: activeTab === tab.key ? '4px' : '0',
                                transition: 'all 0.3s ease'
                            }}
                        >
                            {tab.label}
                        </div>
                    </Col>
                ))}
            </Row>
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
                        Danh sách công việc
                    </h2>
                </div>

                <Row style={{ margin: "1%" }}>
                    <Col xs={24} style={{ width: "100vw" }}>
                        <Table
                            rowKey={"id"}
                            columns={columns}
                            dataSource={dataJobs}
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

export default PersonalJobTable;