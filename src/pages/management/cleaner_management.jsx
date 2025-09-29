import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, DatePicker, Divider, Input, Select } from 'antd';
import { useEffect, useState } from 'react';
import CleanerTable from '../../components/cleaner_management/cleaner.table';
import CleanerForm from '../../components/cleaner_management/create.cleaner.modal';
import { fetchAllUserWithPaginationAPI } from '../../services/api.service';

const { Option } = Select;

const CleanerManagement = () => {

    const [dataUsers, setDataUsers] = useState()
    const [current, setCurrent] = useState(1)
    const [pageSize, setPageSize] = useState(10)
    const [total, setTotal] = useState(0)
    const [roleOptions, setRoleOptions] = useState(null)
    const [isFormOpen, setIsFormOpen] = useState(false)
    let filter = "" //useSelector((state) => state.search.user)

    useEffect(() => {
        loadUser()
    }, [current, pageSize, filter])

    const loadUser = async () => {
        const res = await fetchAllUserWithPaginationAPI(current, pageSize, filter = "role.name~'CUSTOMER'")
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
                        Quản Lý Nhân Viên
                    </h1>

                    <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        onClick={() => setIsFormOpen(true)}
                        style={{
                            width: "150px",
                            height: "45px",
                            fontSize: "18px",
                            background: "#41864D"
                        }}
                    >
                        Thêm mới
                    </Button>
                </div>

                <Divider size="large" style={{ minWidth: "50%", width: "95%", margin: "0 auto", paddingBottom: "40px" }} />

                {/* filter */}
                <div style={{
                    display: 'flex',
                    gap: 100,
                    marginBottom: '50px',
                    padding: "0px 20px"
                }}>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <div style={{ marginBottom: '8px', fontSize: '14px', color: '#666' }}>
                            Trạng thái
                        </div>
                        <Select
                            defaultValue="all"
                            placeholder="Chọn trạng thái"
                            style={{ width: 200, height: 40 }}  // tăng chiều rộng
                        >
                            <Option value="all">Chọn trạng thái</Option>
                            <Option value="active">Hoạt động</Option>
                            <Option value="inactive">Không hoạt động</Option>
                        </Select>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <div style={{ marginBottom: '8px', fontSize: '14px', color: '#666' }}>
                            Ngày hoạt động cuối cùng
                        </div>
                        <DatePicker
                            placeholder="Chọn ngày"
                            style={{ width: 200, height: 40 }}  // tăng chiều rộng
                        />
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <div style={{ marginBottom: '8px', fontSize: '14px', color: '#666' }}>
                            Tên
                        </div>
                        <Input
                            placeholder="Tìm kiếm theo tên"
                            prefix={<SearchOutlined style={{ color: '#bfbfbf' }} />}
                            style={{ width: 250, height: 40 }} // tăng chiều rộng
                        />
                    </div>
                </div>

                <CleanerForm
                    loadUser={loadUser}
                    isFormOpen={isFormOpen}
                    setIsFormOpen={setIsFormOpen}
                />

                <CleanerTable
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

export default CleanerManagement;