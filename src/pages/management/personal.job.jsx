import { Divider, Select } from 'antd';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../components/context/auth.context';
import CheckInJob from '../../components/personal_job/check.in';
import JobDetail from '../../components/personal_job/job.detail';
import PersonalJobTable from '../../components/personal_job/job.table';
import { fetchAllBookingsWithPaginationAPI } from '../../services/api.service';

const { Option } = Select;

const PersonalJob = () => {

    const { user } = useContext(AuthContext)
    const [step, setStep] = useState("list")
    const [dataJobs, setDataJobs] = useState()
    const [current, setCurrent] = useState(1)
    const [pageSize, setPageSize] = useState(10)
    const [total, setTotal] = useState(0)
    const [dataDetail, setDataDetail] = useState({})
    const [filter, setFilter] = useState("")
    const [activeTab, setActiveTab] = useState('new');


    useEffect(() => {
        loadJobs()
    }, [current, pageSize, filter])

    const loadJobs = async () => {
        const res = await fetchAllBookingsWithPaginationAPI(current, pageSize, `cleaner.id~'${user.id}'` + filter)
        if (res.data) {
            if (res.data.result.length === 0 && current > 1) {
                setCurrent(res.data.meta.page - 1)
            } else {
                setCurrent(res.data.meta.page)
            }
            setDataJobs(res.data.result)
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
                        Công việc cá nhân
                    </h1>
                </div>

                <Divider size="large" style={{ minWidth: "50%", width: "95%", margin: "0 auto", paddingBottom: "40px" }} />

                {/* filter */}

                {(() => {
                    if (step === "list") {
                        return (
                            <PersonalJobTable
                                dataJobs={dataJobs}
                                loadJobs={loadJobs}
                                current={current}
                                setCurrent={setCurrent}
                                pageSize={pageSize}
                                setPageSize={setPageSize}
                                setFilter={setFilter}
                                total={total}
                                setStep={setStep}
                                setDataDetail={setDataDetail}
                                activeTab={activeTab}
                                setActiveTab={setActiveTab}
                            />
                        )
                    }
                    else if (step === "detail") {
                        return (
                            <JobDetail
                                dataDetail={dataDetail}
                                setStep={setStep}
                            />
                        )
                    } else if (step === "check-in") {
                        return (
                            <CheckInJob dataDetail={dataDetail} setStep={setStep} />
                        )
                    } else if (step === "check-out") {
                        return (
                            <span>check out</span>
                        )
                    }
                })()
                }
            </div>

        </>
    )
};

export default PersonalJob;