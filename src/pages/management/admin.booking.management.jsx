import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { Breadcrumb, Button, Col, DatePicker, Divider, Input, Row, Select } from 'antd';
import { useEffect, useState } from 'react';
import BookingTable from '../../components/booking_management/booking.table';
import BookingForm from '../../components/booking_management/create.booking.modal';
import { fetchAllBookingsWithPaginationAPI } from '../../services/api.service';
import { debounce } from 'lodash';
import JobDetail from '../../components/personal_job/job.detail';
import BookingDetail from '../../components/admin_booking_mamagement/booking.detail';

const { Option } = Select;

const BookingManagement = () => {

    const [dataBookings, setDataBookings] = useState()
    const [current, setCurrent] = useState(1)
    const [pageSize, setPageSize] = useState(10)
    const [total, setTotal] = useState(0)
    const [isFormOpen, setIsFormOpen] = useState(false)
    const [dataDetail, setDataDetail] = useState({})
    const [filter, setFilter] = useState({
        status: "",
        customerName: "",
        cleanerName: "",
        date: ""
    });
    const [step, setStep] = useState("list")

    useEffect(() => {
        const handler = debounce(() => {
            loadBooking();
        }, 500); // chỉ gọi sau 500ms không gõ thêm

        handler();
        return () => handler.cancel();
    }, [current, pageSize, filter])

    const loadBooking = async () => {
        let filterParam = filter.status ? `status~'${filter.status}'` : ""
        if (filterParam) {
            filterParam += filter.customerName ? ` and customer.name~'${filter.customerName}'` : ""
        } else {
            filterParam += filter.customerName ? `customer.name~'${filter.customerName}'` : ""
        }
        if (filterParam) {
            filterParam += filter.cleanerName ? ` and cleaner.name~'${filter.cleanerName}'` : ""
        } else {
            filterParam += filter.cleanerName ? `cleaner.name~'${filter.cleanerName}'` : ""
        }
        if (filterParam) {
            filterParam += filter.date ? ` and date~'${filter.date}'` : ""
        } else {
            filterParam += filter.date ? `date~'${filter.date}'` : ""
        }
        const res = await fetchAllBookingsWithPaginationAPI(current, pageSize, filterParam)
        if (res.data) {
            if (res.data.result.length === 0 && current > 1) {
                setCurrent(res.data.meta.page - 1)
            } else {
                setCurrent(res.data.meta.page)
            }
            setDataBookings(res.data.result)
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
                <div xs={24} style={{ display: "flex", margin: "1%", background: "#fff", paddingBottom: "5px", gap: 20, alignItems: "center" }}>
                    <h1>
                        Quản Lý Đơn Hàng
                    </h1>

                    {step !== "list" ?
                        <Breadcrumb
                            separator=">"
                            items={[
                                {
                                    title: 'Danh sách',
                                    href: '',
                                    onClick: ((e) => { e.preventDefault(); setStep("list") })
                                },
                                {
                                    title: step === "detail"
                                        ? "Chi tiết công việc" : ""
                                },
                            ]}
                        />
                        :
                        ""
                    }

                    {/* <Button
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
                    </Button> */}
                </div>

                <Divider size="large" style={{ minWidth: "50%", width: "95%", margin: "0 auto", paddingBottom: "40px" }} />
                {step === "list" ?
                    <>
                        <Row gutter={[16, 24]} style={{
                            display: 'flex',
                            marginBottom: '20px',
                            padding: "0px 20px"
                        }}>
                            <Col xs={12} md={6} lg={6} style={{ display: 'flex', flexDirection: 'column' }}>
                                <div style={{ marginBottom: '8px', fontSize: '14px', color: '#666' }}>
                                    Trạng thái
                                </div>
                                <Select
                                    defaultValue=""
                                    placeholder="Chọn trạng thái"
                                    style={{ width: "100%" }}
                                    onChange={(value) => setFilter({ ...filter, status: value })}
                                >
                                    <Option value="">Chọn trạng thái</Option>
                                    <Option value="mới">Mới</Option>
                                    <Option value="chờ xác nhận">Chờ xác nhận</Option>
                                    <Option value="chờ check-in">Chờ Check-in</Option>
                                    <Option value="chờ check-out">Chờ Check-out</Option>
                                    <Option value="đã hoàn thành">Đã hoàn thành</Option>
                                    <Option value="đã huỷ">Đã huỷ</Option>
                                </Select>
                            </Col>

                            <Col xs={12} md={6} lg={6} style={{ display: 'flex', flexDirection: 'column' }}>
                                <div style={{ marginBottom: '8px', fontSize: '14px', color: '#666' }}>
                                    Ngày làm việc
                                </div>
                                <DatePicker
                                    format={"DD/MM/YYYY"}
                                    placeholder="Tìm kiếm theo ngày"
                                    style={{ width: "100%" }}
                                    onChange={(date, dateString) => setFilter({ ...filter, date: dateString })}
                                />
                            </Col>

                            <Col xs={12} md={6} lg={6} style={{ display: 'flex', flexDirection: 'column' }}>
                                <div style={{ marginBottom: '8px', fontSize: '14px', color: '#666' }}>
                                    Tên khách hàng
                                </div>
                                <Input
                                    placeholder="Tìm kiếm theo tên khách hàng"
                                    prefix={<SearchOutlined style={{ color: '#bfbfbf' }} />}
                                    style={{ width: "100%" }}
                                    onChange={(e) => setFilter({ ...filter, customerName: e.target.value })}
                                />
                            </Col>

                            <Col xs={12} md={6} lg={6} style={{ display: 'flex', flexDirection: 'column' }}>
                                <div style={{ marginBottom: '8px', fontSize: '14px', color: '#666' }}>
                                    Tên nhân viên
                                </div>
                                <Input
                                    placeholder="Tìm kiếm theo tên nhân viên"
                                    prefix={<SearchOutlined style={{ color: '#bfbfbf' }} />}
                                    style={{ width: "100%" }}
                                    onChange={(e) => setFilter({ ...filter, cleanerName: e.target.value })}
                                />
                            </Col>
                        </Row>

                        <BookingForm
                            loadBooking={loadBooking}
                            isFormOpen={isFormOpen}
                            setIsFormOpen={setIsFormOpen}
                        />

                        <BookingTable
                            dataBookings={dataBookings}
                            loadBooking={loadBooking}
                            current={current}
                            setCurrent={setCurrent}
                            pageSize={pageSize}
                            setPageSize={setPageSize}
                            total={total}
                            setStep={setStep}
                            setDataDetail={setDataDetail}
                        />
                    </>
                    :
                    <BookingDetail
                        dataDetail={dataDetail}
                    />
                }
            </div>

        </>
    )
};

export default BookingManagement;