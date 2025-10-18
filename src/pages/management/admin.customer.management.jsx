import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Col, DatePicker, Divider, Input, Row, Select } from 'antd';
import { useEffect, useState } from 'react';
import CustomerForm from '../../components/customer_management/create.customer.modal';
import CustomerTable from '../../components/customer_management/customer.table';
import { fetchAllUserWithPaginationAPI } from '../../services/api.service';
import { debounce } from "lodash";
import CustomerDetail from '../../components/customer_management/customer.detail';

const CustomerManagement = () => {

    const [dataUsers, setDataUsers] = useState([])
    const [dataDetail, setDataDetail] = useState({})
    const [current, setCurrent] = useState(1)
    const [pageSize, setPageSize] = useState(10)
    const [total, setTotal] = useState(0)
    const [isFormOpen, setIsFormOpen] = useState(false)
    const [filter, setFilter] = useState({
        name: "",
        email: "",
        role: "role.name~'CUSTOMER'"
    });
    const [activeComponent, setActiveComponent] = useState("list")

    useEffect(() => {
        const handler = debounce(() => {
            loadUser();
        }, 500); // chỉ gọi sau 500ms không gõ thêm

        handler();
        return () => handler.cancel();
    }, [current, pageSize, filter])

    const loadUser = async () => {
        const filterParam = filter.role
            + (filter.name ? ` and name~'${filter.name}'` : "")
            + (filter.email ? ` and email~'${filter.email}'` : "")
        const res = await fetchAllUserWithPaginationAPI(current, pageSize, filterParam)
        if (res.data) {
            if (res.data.result.length === 0 && current > 1) {
                setCurrent(res.data.meta.page - 1)
            } else {
                setCurrent(res.data.meta.page)
            }
            setDataUsers(res.data.result)
            setPageSize(res.data.meta.pageSize)
            setTotal(res.data.meta.total)
        }
    }

    return (
        <>
            {activeComponent === "list" ?

                <div style={{
                    padding: 20
                }}>
                    {/* title */}
                    <div div xs={24} style={{ display: "flex", justifyContent: "space-between", margin: "1%", background: "#fff", paddingBottom: "5px" }}>
                        <h1>
                            Quản Lý Khách Hàng
                        </h1>

                        <Button
                            type="primary"
                            icon={<PlusOutlined />}
                            onClick={() => setIsFormOpen(true)}
                            style={{
                                width: "120px",
                                height: "40px",
                                fontSize: "14px",
                                background: "#41864D"
                            }}
                        >
                            Thêm mới
                        </Button>
                    </div>

                    <Divider size="large" style={{ minWidth: "50%", width: "95%", margin: "0 auto", paddingBottom: "40px" }} />

                    {/* filter */}
                    <Row gutter={[16, 24]} style={{
                        display: 'flex',
                        marginBottom: '20px',
                        padding: "0px 20px"
                    }}>

                        <Col xs={12} md={6} lg={6} style={{ display: 'flex', flexDirection: 'column' }}>
                            <div style={{ marginBottom: '8px', fontSize: '14px', color: '#666' }}>
                                Họ và tên
                            </div>
                            <Input
                                placeholder="Tìm kiếm theo tên"
                                prefix={<SearchOutlined style={{ color: '#bfbfbf' }} />}
                                style={{ width: "100%" }}
                                onChange={(e) => setFilter({ ...filter, name: e.target.value })}
                            />
                        </Col>

                        <Col xs={12} md={6} lg={6} style={{ display: 'flex', flexDirection: 'column' }}>
                            <div style={{ marginBottom: '8px', fontSize: '14px', color: '#666' }}>
                                Email
                            </div>
                            <Input
                                placeholder="Tìm kiếm theo email"
                                prefix={<SearchOutlined style={{ color: '#bfbfbf' }} />}
                                style={{ width: "100%" }}
                                onChange={(e) => setFilter({ ...filter, email: e.target.value })}
                            />
                        </Col>
                    </Row>

                    <CustomerForm
                        loadUser={loadUser}
                        isFormOpen={isFormOpen}
                        setIsFormOpen={setIsFormOpen}
                    />


                    <CustomerTable
                        dataUsers={dataUsers}
                        loadUser={loadUser}
                        current={current}
                        setCurrent={setCurrent}
                        pageSize={pageSize}
                        setPageSize={setPageSize}
                        total={total}
                        setDataDetail={setDataDetail}
                        setActiveComponent={setActiveComponent}
                    />


                </div >
                :
                <CustomerDetail
                    loadUser={loadUser}
                    dataDetail={dataDetail}
                    setActiveComponent={setActiveComponent}
                />
            }
        </>
    )
};

export default CustomerManagement;