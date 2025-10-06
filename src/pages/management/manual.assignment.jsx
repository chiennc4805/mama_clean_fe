import { SearchOutlined } from '@ant-design/icons';
import { DatePicker, Divider, Input, Select } from 'antd';
import { useEffect, useState } from 'react';
import AssignmentTable from '../../components/manual_assignment/assignment.table';
import { fetchAllBookingsWithPaginationAPI, fetchAllUsersWithoutPagination } from '../../services/api.service';
import { debounce } from 'lodash';

const { Option } = Select;

const ManualAssignment = () => {

    const [dataCleaners, setDataUsers] = useState()
    const [current, setCurrent] = useState(1)
    const [pageSize, setPageSize] = useState(10)
    const [total, setTotal] = useState(0)
    const [cleanersOption, setCleanersOption] = useState([])
    const [filter, setFilter] = useState({
        customerName: "",
        date: ""
    });

    useEffect(() => {
        loadCleaner()
    }, [])

    useEffect(() => {
        const handler = debounce(() => {
            loadBooking();
        }, 500); // chỉ gọi sau 500ms không gõ thêm

        handler();
        return () => handler.cancel();
    }, [current, pageSize, filter])

    const loadBooking = async () => {
        let filterParam = "status~'mới'";
        filterParam += filter.customerName ? ` and customer.name~'${filter.customerName}'` : "";
        filterParam += filter.date ? ` and date~'${filter.date}'` : "";

        const res = await fetchAllBookingsWithPaginationAPI(current, pageSize, filterParam)
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

    const loadCleaner = async () => {
        const res = await fetchAllUsersWithoutPagination("role.name~'CLEANER'")
        if (res.data) {
            setCleanersOption(res.data.result.map(item => ({ label: item.name, value: item.id })))
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
                        Phân công thủ công
                    </h1>

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
                            Ngày làm việc
                        </div>
                        <DatePicker
                            placeholder="Tìm kiếm theo ngày"
                            style={{ width: 200, height: 40 }} // tăng chiều rộng
                            onChange={(date, dateString) => setFilter({ ...filter, date: dateString })}
                        />
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <div style={{ marginBottom: '8px', fontSize: '14px', color: '#666' }}>
                            Tên khách hàng
                        </div>
                        <Input
                            placeholder="Tìm kiếm theo tên khách hàng"
                            prefix={<SearchOutlined style={{ color: '#bfbfbf' }} />}
                            style={{ width: 250, height: 40 }} // tăng chiều rộng
                            onChange={(e) => setFilter({ ...filter, customerName: e.target.value })}
                        />
                    </div>
                </div>

                <AssignmentTable
                    dataCleaners={dataCleaners}
                    loadCleaner={loadCleaner}
                    loadBooking={loadBooking}
                    current={current}
                    setCurrent={setCurrent}
                    pageSize={pageSize}
                    setPageSize={setPageSize}
                    total={total}
                    cleanersOption={cleanersOption}
                />
            </div>

        </>
    )
};

export default ManualAssignment;