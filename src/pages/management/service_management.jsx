
import { PlusOutlined } from '@ant-design/icons';
import { Button, Divider, Select } from 'antd';
import { useEffect, useState } from 'react';
import ServiceForm from '../../components/service_management/create.service.modal';
import ServiceTable from '../../components/service_management/service.table';
import { fetchAllServicesWithPagination } from '../../services/api.service';

const { Option } = Select;

const ServiceManagement = () => {

    const [dataUsers, setDataUsers] = useState()
    const [current, setCurrent] = useState(1)
    const [pageSize, setPageSize] = useState(10)
    const [total, setTotal] = useState(0)
    const [isFormOpen, setIsFormOpen] = useState(false)
    let filter = "" //useSelector((state) => state.search.user)

    useEffect(() => {
        loadUser()
    }, [current, pageSize, filter])

    const loadUser = async () => {
        const res = await fetchAllServicesWithPagination(current, pageSize, null)
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
            <div style={{
                padding: 20
            }}>
                {/* title */}
                <div xs={24} style={{ display: "flex", justifyContent: "space-between", margin: "1%", background: "#fff", paddingBottom: "5px" }}>
                    <h1>
                        Quản Lý Dịch Vụ
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

                <ServiceForm
                    loadUser={loadUser}
                    isFormOpen={isFormOpen}
                    setIsFormOpen={setIsFormOpen}
                />

                <ServiceTable
                    dataUsers={dataUsers}
                    loadUser={loadUser}
                    current={current}
                    setCurrent={setCurrent}
                    pageSize={pageSize}
                    setPageSize={setPageSize}
                    total={total}
                />
            </div>

        </>
    )
};

export default ServiceManagement;