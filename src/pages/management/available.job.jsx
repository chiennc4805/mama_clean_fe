import { DatePicker, Divider, Select } from 'antd';
import { useEffect, useState } from 'react';
import AvailableJobDetail from '../../components/available_job/available.job.detail';
import AvailableJobList from '../../components/available_job/available.job.list';
import { fetchAllBookingsWithPaginationAPI } from '../../services/api.service';



const AvailableJobPage = () => {

    const [step, setStep] = useState("list")
    const [dataDetail, setDataDetail] = useState({})
    const [bookings, setBookings] = useState([])
    const [current, setCurrent] = useState(1)
    const [pageSize, setPageSize] = useState(9)
    const [total, setTotal] = useState(0)
    const [filter, setFilter] = useState(null)

    useEffect(() => {
        loadBooking()
    }, [current, pageSize, filter])

    const loadBooking = async () => {
        const res = await fetchAllBookingsWithPaginationAPI(current, pageSize, "status~'Mới'" + (filter ? filter : ""))
        if (res.data) {
            if (res.data.result.length === 0 && current > 1) {
                setCurrent(res.data.meta.page - 1)
            } else {
                setCurrent(res.data.meta.page)
            }
            setBookings(res.data.result)
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
                        Công việc có sẵn
                    </h1>
                </div>

                <Divider size="large" style={{ minWidth: "50%", width: "95%", margin: "0 auto", paddingBottom: "40px" }} />

                {/* filter */}
                <div style={{
                    display: 'flex',
                    gap: 100,
                    marginBottom: '20px',
                    padding: "0px 20px"
                }}>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <div style={{ marginBottom: '8px', fontSize: '14px', color: '#666' }}>
                            Ngày dọn dẹp
                        </div>
                        <DatePicker
                            placeholder="Chọn ngày"
                            style={{ width: 200, height: 40 }}  // tăng chiều rộng
                            onChange={(date) => {
                                if (date) {
                                    setFilter(` and date~'${date.format("YYYY-MM-DD")}'`);
                                } else {
                                    setFilter(null);
                                }
                            }}
                        />
                    </div>
                </div>
            </div>

            {step === "list" ?
                <AvailableJobList
                    bookings={bookings}
                    total={total}
                    current={current}
                    setCurrent={setCurrent}
                    pageSize={pageSize}
                    setPageSize={setPageSize}
                    setStep={setStep}
                    setDataDetail={setDataDetail}
                />
                :
                <AvailableJobDetail
                    setStep={setStep}
                    dataDetail={dataDetail}
                />
            }

        </>
    );
}

export default AvailableJobPage;