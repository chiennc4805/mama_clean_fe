import axios from "./axios.customize";

//module student api
// const fetchAllStudentsAPI = (page, pageSize, filter = null) => {
//     let URL_BACKEND
//     if (filter) {
//         URL_BACKEND = `/students?page=${page}&size=${pageSize}&filter=${filter}`
//     }
//     else {
//         URL_BACKEND = `/students?page=${page}&size=${pageSize}`
//     }

//     return axios.get(URL_BACKEND)
// }

// const createStudentAPI = (name, gender, birthDate, height, weight, classes, parent) => {
//     const URL_BACKEND = "/students"
//     const data = {
//         name: name,
//         gender: gender,
//         birthDate: birthDate,
//         height: height,
//         weight: weight,
//         classes: classes,
//         parent: parent
//     }
//     return axios.post(URL_BACKEND, data)
// }

// const updateStudentAPI = (id, name, gender, birthDate, height, weight, classes, parent) => {
//     const URL_BACKEND = "/students"
//     const data = {
//         id: id,
//         name: name,
//         gender: gender,
//         birthDate: birthDate,
//         height: height,
//         weight: weight,
//         classes: classes,
//         parent: parent
//     }
//     return axios.put(URL_BACKEND, data)
// }

// const deleteStudentAPI = (id) => {
//     const URL_BACKEND = `/students/${id}`
//     return axios.delete(URL_BACKEND)
// }

// const exportStudentFeeToExcel = (month) => {
//     const URL_BACKEND = `/student-fee/export/excel?month=${month}`;

//     return axios.get(URL_BACKEND, {
//         responseType: 'blob', // Quan trọng: Xác định response type là blob
//     })
//         .then(response => {
//             let filename = `hoc_phi_thang_${month}.xlsx`;

//             // Tạo URL cho blob
//             const url = window.URL.createObjectURL(new Blob([response.data]));

//             // Tạo thẻ <a> tạm thời để download
//             const link = document.createElement('a');
//             link.href = url;
//             link.setAttribute('download', filename);
//             document.body.appendChild(link);

//             // Click để download
//             link.click();

//             // Clean up
//             document.body.removeChild(link);
//             window.URL.revokeObjectURL(url);

//             return true;
//         });
// }

//module auth api
const loginAPI = (email, password) => {
    const URL_BACKEND = "/auth/login"
    const data = {
        username: email,
        password: password,
    }
    return axios.post(URL_BACKEND, data)
}

const getAccountAPI = () => {
    const URL_BACKEND = "/auth/account"
    return axios.get(URL_BACKEND)
}

const logoutAPI = () => {
    const URL_BACKEND = "/auth/logout"
    return axios.post(URL_BACKEND)
}

const getRefreshToken = () => {
    const URL_BACKEND = "/auth/refresh"
    return axios.get(URL_BACKEND)
}

const registerAPI = (password, name, email, phone, gender) => {
    const URL_BACKEND = "/auth/register"
    const data = {
        username: email,
        password: password,
        name: name,
        phone: phone,
        email: email,
        gender: gender,
        role: {
            name: "CUSTOMER"
        }
    }
    return axios.post(URL_BACKEND, data)
}

const verifyOtp = (email, otp, type) => {
    const URL_BACKEND = "/auth/verify-otp"
    const data = {
        email: email,
        otp: otp,
        type: type
    }
    return axios.post(URL_BACKEND, data)
}

const resendOtp = (email, type) => {
    const URL_BACKEND = `/auth/resend-otp?email=${email}&type=${type}`
    return axios.get(URL_BACKEND)
}

const forgetPasswordAPI = (email) => {
    const URL_BACKEND = `/auth/forget-password?email=${email}`
    return axios.get(URL_BACKEND)
}

//module service
const fetchAllServicesWithPagination = (page, pageSize, filter = null) => {
    let URL_BACKEND
    if (filter) {
        URL_BACKEND = `/services?page=${page}&size=${pageSize}&filter=${filter}`
    } else {
        URL_BACKEND = `/services?page=${page}&size=${pageSize}`
    }
    return axios.get(URL_BACKEND)
}

const fetchAllServicesWithoutPagination = (filter = null) => {
    let URL_BACKEND
    if (filter) {
        URL_BACKEND = `/services?filter=${filter}`
    } else {
        URL_BACKEND = `/services`
    }
    return axios.get(URL_BACKEND)
}

const createServiceAPI = (name, description, area, price) => {
    const URL_BACKEND = "/services"
    const data = {
        name: name,
        description: description,
        area: area,
        price: price
    }
    return axios.post(URL_BACKEND, data)
}

const fetchServiceById = (id) => {
    const URL_BACKEND = `/services/${id}`
    return axios.get(URL_BACKEND)
}

//module user
const fetchAllUserWithPaginationAPI = (page, pageSize, filter = null) => {
    let URL_BACKEND
    if (filter) {
        URL_BACKEND = `/users?page=${page}&size=${pageSize}&filter=${filter}`
    } else {
        URL_BACKEND = `/users?page=${page}&size=${pageSize}`
    }
    return axios.get(URL_BACKEND)

}

const fetchAllUsersWithoutPagination = (filter = null) => {
    let URL_BACKEND
    if (filter) {
        URL_BACKEND = `/users?filter=${filter}`
    } else {
        URL_BACKEND = `/users`
    }
    return axios.get(URL_BACKEND)
}

const createUserAPI = (password, name, email, phone, roleName) => {
    const URL_BACKEND = "/users"
    const data = {
        username: email,
        password: password,
        name: name,
        email: email,
        phone: phone,
        role: {
            name: roleName
        }
    }
    return axios.post(URL_BACKEND, data)
}

const fetchUserByIdAPI = (id) => {
    const URL_BACKEND = `/users/${id}`
    return axios.get(URL_BACKEND)
}

const updateUserAPI = (id, name, email, phone, gender, roleId) => {
    const URL_BACKEND = "/users"
    const data = {
        id: id,
        name: name,
        username: email,
        email: email,
        phone: phone,
        gender: gender,
        role: {
            id: roleId
        }
    }
    return axios.put(URL_BACKEND, data)
}

//module cleaner
const createCleanerAPI = (name, email, phone, gender, password, roleName, dob, idNumber, idDate, idPlace) => {
    const URL_BACKEND = "/cleaner-profiles"
    const data = {
        userProfile: {
            username: email,
            name: name,
            email: email,
            phone: phone,
            gender: gender,
            password: password,
            role: {
                name: roleName
            }
        },
        cleanerProfile: {
            dob: dob,
            idNumber: idNumber,
            idDate: idDate,
            idPlace: idPlace
        }
    }
    return axios.post(URL_BACKEND, data)
}

const updateCleanerAPI = (id, dob, idNumber, idDate, idPlace, bank, bankNo, userId) => {
    const URL_BACKEND = '/cleaner-profiles'
    const data = {
        id: id,
        dob: dob,
        idNumber: idNumber,
        idDate: idDate,
        idPlace: idPlace,
        bank: bank,
        bankNo: bankNo,
        user: {
            id: userId
        }
    }
    return axios.put(URL_BACKEND, data)
}


const fetchCleanerByUserIdAPI = (userId) => {
    const URL_BACKEND = `/cleaner-profiles/${userId}`
    return axios.get(URL_BACKEND)
}

const fetchAllCleanerWithPaginationAPI = (page, pageSize, filter = null) => {
    let URL_BACKEND
    if (filter) {
        URL_BACKEND = `/cleaner-profiles?page=${page}&size=${pageSize}&filter=${filter}`
    } else {
        URL_BACKEND = `/cleaner-profiles?page=${page}&size=${pageSize}`
    }
    return axios.get(URL_BACKEND)
}

const fetchAllCleanersWithoutPaginationAPI = (filter = null) => {
    let URL_BACKEND
    if (filter) {
        URL_BACKEND = `/cleaners-profile?filter=${filter}`
    } else {
        URL_BACKEND = `/cleaners-profile`
    }
    return axios.get(URL_BACKEND)
}



const createBookingAPI = (address, addressLat, addressLon, date, startTime, totalPrice, note, customerId, serviceId) => {
    const URL_BACKEND = `/bookings`
    const data = {
        address: address,
        addressLat: addressLat,
        addressLon: addressLon,
        date: date,
        startTime: startTime,
        totalPrice: totalPrice,
        note: note,
        status: "Mới",
        customer: {
            id: customerId
        },
        cleaner: null,
        service: {
            id: serviceId
        }
    }
    return axios.post(URL_BACKEND, data)
}

const fetchAllBookingsWithPaginationAPI = (page, pageSize, filter = null) => {
    let URL_BACKEND
    if (filter) {
        URL_BACKEND = `/bookings?page=${page}&size=${pageSize}&filter=${filter}`
    } else {
        URL_BACKEND = `/bookings?page=${page}&size=${pageSize}`
    }
    return axios.get(URL_BACKEND)
}

const updateBookingAPI = (id, address, addressLat, addressLon, date, startTime, totalPrice, note, status, customerId, cleanerId, serviceId) => {
    const URL_BACKEND = "/bookings"
    const data = {
        id: id,
        address: address,
        addressLat: addressLat,
        addressLon: addressLon,
        date: date,
        startTime: startTime,
        totalPrice: totalPrice,
        note: note,
        status: status,
        customer: {
            id: customerId
        },
        cleaner: {
            id: cleanerId
        },
        service: {
            id: serviceId
        }
    }
    return axios.put(URL_BACKEND, data)
}

const checkInAPI = (customerLat, customerLon, cleanerLat, cleanerLon) => {
    const URL_BACKEND = "/check-in"
    const data = {
        customerLat: customerLat,
        customerLon: customerLon,
        cleanerLat: cleanerLat,
        cleanerLon: cleanerLon
    }
    return axios.post(URL_BACKEND, data)
}

const createBookingCheckInAPI = (addressLat, addressLon, bookingId) => {
    const URL_BACKEND = '/booking-check-in'
    const data = {
        addressLat: addressLat,
        addressLon: addressLon,
        booking: {
            id: bookingId
        }
    }
    return axios.post(URL_BACKEND, data)
}

export { checkInAPI, createBookingAPI, createBookingCheckInAPI, createCleanerAPI, createServiceAPI, createUserAPI, fetchAllBookingsWithPaginationAPI, fetchAllCleanerWithPaginationAPI, fetchAllServicesWithoutPagination, fetchAllServicesWithPagination, fetchAllUsersWithoutPagination, fetchAllUserWithPaginationAPI, fetchCleanerByUserIdAPI, fetchServiceById, fetchUserByIdAPI, forgetPasswordAPI, getAccountAPI, getRefreshToken, loginAPI, logoutAPI, registerAPI, resendOtp, updateBookingAPI, updateCleanerAPI, updateUserAPI, verifyOtp };

