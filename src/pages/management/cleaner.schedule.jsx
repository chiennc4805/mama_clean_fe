import dayGridPlugin from '@fullcalendar/daygrid'
import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import { useContext, useEffect, useState } from 'react'
import { fetchAllBookingsWithoutPaginationAPI } from '../../services/api.service'
import { AuthContext } from '../../components/context/auth.context'
import dayjs from 'dayjs'

const CleanerSchedulePage = () => {

    const { user } = useContext(AuthContext)
    const [events, setEvents] = useState([])

    const fetchDataSet = async (info) => {
        console.log('Start of view:', info.start); // object Date, đầu tuần 
        // Start of view: Sun Sep 28 2025 00:00:00 GMT+0700 (Indochina Time)
        console.log('End of view:', info.end);     // object Date, cuối tuần
        // End of view: Sun Oct 05 2025 00:00:00 GMT+0700 (Indochina Time)

        const rawFilter = `cleaner.id~'${user.id}' and date >= '${dayjs(info.start).format("YYYY-MM-DD")}' and date <= '${dayjs(info.end).format("YYYY-MM-DD")}'`
        const encodedFilter = encodeURIComponent(rawFilter)
        const res = await fetchAllBookingsWithoutPaginationAPI(encodedFilter)
        if (res.data) {
            setEvents(res.data.result.map(item => {
                // chuyển "dd/MM/yyyy" + "HH:mm:ss" thành ISO string "yyyy-MM-ddTHH:mm:ss"
                const startDateTime = dayjs(item.date, "DD/MM/YYYY")
                    .hour(Number(item.startTime.split(':')[0]))
                    .minute(Number(item.startTime.split(':')[1]))
                    .second(Number(item.startTime.split(':')[2]))

                const endDateTime = startDateTime.add(item.service.duration, 'hour'); // tăng 2 tiếng

                return {
                    title: item.name,
                    start: startDateTime.toISOString(),
                    end: endDateTime.toISOString(),
                    status: item.status
                }
            }))
        }
    }

    return (
        <>
            <FullCalendar
                height={800}
                plugins={[dayGridPlugin, timeGridPlugin]}
                initialView="timeGridWeek"
                headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek,timeGridDay'
                }}
                locale='vi'
                events={events}
                eventDidMount={(info) => {
                    const { status } = info.event.extendedProps;
                    if (["Chờ Check-in", "Chờ Check-out"].includes(status)) {
                        info.el.style.backgroundColor = "#FAAD14";
                    } else if (status === "Đã hoàn thành") {
                        info.el.style.backgroundColor = "#52C41A";
                    } else {
                        info.el.style.backgroundColor = "red";
                    }
                }}
                slotMinTime="08:00:00"   // bắt đầu từ 8h sáng
                slotMaxTime="20:00:00"   // kết thúc 8h tối
                allDaySlot={false}
                expandRows={true}
                datesSet={fetchDataSet}
                eventClick={(info) => {
                    // info.event chứa thông tin event
                    console.log("Event clicked:", info.event);

                    // lấy ra data custom
                    alert(`Bạn đã bấm vào: ${info.event.title}, status: ${info.event.extendedProps.status}`);

                    // có thể mở modal, chuyển trang, gọi API,... tùy ý
                }}
            />
        </>
    )
}

export default CleanerSchedulePage;
