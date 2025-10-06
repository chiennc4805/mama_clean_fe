import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, DatePicker, Divider, Input, InputNumber, Select } from 'antd';
import { useEffect, useState } from 'react';
import CleanerTable from '../../components/cleaner_management/cleaner.table';
import CleanerForm from '../../components/cleaner_management/create.cleaner.modal';
import { fetchAllCleanerWithPaginationAPI } from '../../services/api.service';
import { debounce } from 'lodash';
import CleanerDetail from '../../components/cleaner_management/cleaner.detail';

const { Option } = Select;

const CleanerManagement = () => {

    const [dataCleaners, setDataUsers] = useState([])
    const [dataDetail, setDataDetail] = useState({})
    const [current, setCurrent] = useState(1)
    const [pageSize, setPageSize] = useState(10)
    const [total, setTotal] = useState(0)
    const [isFormOpen, setIsFormOpen] = useState(false)
    const [filter, setFilter] = useState({
        name: "",
        rating: 0
    })
    const [activeComponent, setActiveComponent] = useState("list")


    useEffect(() => {
        const handler = debounce(() => {
            loadCleaner();
        }, 500); // chỉ gọi sau 500ms không gõ thêm

        handler();
        return () => handler.cancel();
    }, [current, pageSize, filter])

    const loadCleaner = async () => {
        let filterParam = filter.name ? `user.name ~ '${filter.name}'` : "";
        if (filterParam)
            filterParam += filter.rating !== 0 ? ` and rating >: ${filter.rating}` : "";
        else
            filterParam += filter.rating !== 0 ? `rating >: ${filter.rating}` : "";

        const res = await fetchAllCleanerWithPaginationAPI(current, pageSize, filterParam)
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
                    <div xs={24} style={{ display: "flex", justifyContent: "space-between", margin: "1%", background: "#fff", paddingBottom: "5px" }}>
                        <h1>
                            Quản Lý Nhân Viên
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
                    <div style={{
                        display: 'flex',
                        gap: 50,
                        marginBottom: '20px',
                        padding: "0px 20px"
                    }}>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <div style={{ marginBottom: '8px', fontSize: '14px', color: '#666' }}>
                                Họ và tên
                            </div>
                            <Input
                                placeholder="Tìm kiếm theo tên"
                                prefix={<SearchOutlined style={{ color: '#bfbfbf' }} />}
                                style={{ width: 250, height: 40 }} // tăng chiều rộng
                                onChange={(e) => setFilter({ name: e.target.value, rating: filter.rating })}
                            />
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <div style={{ marginBottom: '8px', fontSize: '14px', color: '#666' }}>
                                Rating (min)
                            </div>
                            <InputNumber
                                placeholder="Tìm kiếm rating >="
                                min={0}
                                max={5}
                                style={{ width: 250, height: 40 }} // tăng chiều rộng
                                onChange={(value) => setFilter({ name: filter.name, rating: value })}
                            />
                        </div>
                    </div>

                    <CleanerForm
                        loadCleaner={loadCleaner}
                        isFormOpen={isFormOpen}
                        setIsFormOpen={setIsFormOpen}
                    />

                    <CleanerTable
                        dataCleaners={dataCleaners}
                        loadCleaner={loadCleaner}
                        current={current}
                        setCurrent={setCurrent}
                        pageSize={pageSize}
                        setPageSize={setPageSize}
                        total={total}
                        setDataDetail={setDataDetail}
                        setActiveComponent={setActiveComponent}
                    />
                </div>

                :

                <CleanerDetail
                    dataDetail={dataDetail}
                    setActiveComponent={setActiveComponent}
                />
            }
        </>
    )
};

export default CleanerManagement;