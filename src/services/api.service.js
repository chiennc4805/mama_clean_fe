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

const createServiceAPI = (name, duration, area, description, price) => {
    const URL_BACKEND = "/services"
    const data = {
        name: name,
        duration: duration,
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

const updateUserAPI = (id, name, email, phone, gender, roleId, avatar) => {
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
        },
        avatar: avatar
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

const updateCleanerAPI = (id, dob, idNumber, idDate, idPlace, bank, bankNo, rating, ratingCount, userId) => {
    const URL_BACKEND = '/cleaner-profiles'
    const data = {
        id: id,
        dob: dob,
        idNumber: idNumber,
        idDate: idDate,
        idPlace: idPlace,
        bank: bank,
        bankNo: bankNo,
        rating: rating,
        ratingCount: ratingCount,
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

const deleteUserAPI = id => {
    const URL_BACKEND = `/users/${id}`
    return axios.delete(URL_BACKEND)
}


const deleteCleanerProfileAPI = id => {
    const URL_BACKEND = `/cleaner-profiles/${id}`
    return axios.delete(URL_BACKEND)
}


const createBookingAPI = (name, address, addressLat, addressLon, date, startTime, totalPrice, note, customerId, serviceId) => {
    const URL_BACKEND = `/bookings`
    const data = {
        name: name,
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

const fetchBookingByIdAPI = id => {
    const URL_BACKEND = `/bookings/${id}`
    return axios.get(URL_BACKEND)
}

const fetchAllBookingsWithoutPaginationAPI = (filter = null) => {
    let URL_BACKEND
    if (filter) {
        URL_BACKEND = `/bookings?filter=${filter}`
    } else {
        URL_BACKEND = `/bookings`
    }
    return axios.get(URL_BACKEND)
}

const updateBookingAPI = (id, name, address, addressLat, addressLon, date, startTime, totalPrice, note, status, customerId, cleanerId, serviceId) => {
    const URL_BACKEND = "/bookings"
    const data = {
        id: id,
        name: name,
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
    const URL_BACKEND = '/booking/checkin'
    const data = {
        addressLat: addressLat,
        addressLon: addressLon,
        booking: {
            id: bookingId
        }
    }
    return axios.post(URL_BACKEND, data)
}

const assignCleanerJobManuallyAPI = (id, name, address, addressLat, addressLon, date, startTime, totalPrice, note, status, customerId, cleanerId, serviceId) => {
    const URL_BACKEND = "/manual-assign-job"
    const data = {
        id: id,
        name: name,
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

const getAvailableJobAPI = (id, name, address, addressLat, addressLon, date, startTime, totalPrice, note, status, customerId, cleanerId, serviceId) => {
    const URL_BACKEND = "/get-available-job"
    const data = {
        id: id,
        name: name,
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

const uploadImageAPI = (directory, formData) => {
    return axios.post("/uploads/images/" + directory, formData)
}

const createBookingCheckOutAPI = (checkOutImageName, note, bookingId) => {
    const URL_BACKEND = "/booking/checkout"
    const data = {
        checkOutImageName: checkOutImageName,
        note: note,
        booking: {
            id: bookingId
        }
    }
    return axios.post(URL_BACKEND, data)
}

const deleteBookingCheckOutAPI = (id) => {
    const URL_BACKEND = `/booking/checkout/${id}`
    return axios.delete(URL_BACKEND)
}

const deleteBookingCheckInAPI = (id) => {
    const URL_BACKEND = `/booking/checkin/${id}`
    return axios.delete(URL_BACKEND)
}

const changePasswordAPI = (userId, currentPassword, newPassword) => {
    const URL_BACKEND = "/auth/change-password"
    const data = {
        userId: userId,
        currentPassword: currentPassword,
        newPassword: newPassword
    }
    return axios.put(URL_BACKEND, data)
}

const createFeedBackAPI = (content, rating, bookingId) => {
    const URL_BACKEND = "/feedbacks"
    const data = {
        content: content,
        rating: rating,
        booking: {
            id: bookingId
        }
    }
    return axios.post(URL_BACKEND, data)
}

const updateCleanerRatingAPI = (cleanerUserId, newRating) => {
    const URL_BACKEND = `/cleaner-profiles/${cleanerUserId}?rating=${newRating}`
    return axios.put(URL_BACKEND)
}

const deleteFeedbackAPI = (id) => {
    const URL_BACKEND = `/feedbacks/${id}`
    return axios.delete(URL_BACKEND)
}

const createPaymentAPI = (amount, type, userId) => {
    const URL_BACKEND = "/payments"
    const data = {
        amount: amount,
        type: type,
        user: {
            id: userId
        }
    }
    return axios.post(URL_BACKEND, data)
}

const fetchPaymentByIdAPI = id => {
    const URL_BACKEND = `/payments/${id}`
    return axios.get(URL_BACKEND)
}

const fetchAllPaymentsWithPaginationAPI = (page, pageSize, filter = null) => {
    let URL_BACKEND
    if (filter) {
        URL_BACKEND = `/payments?page=${page}&size=${pageSize}&filter=${filter}`
    } else {
        URL_BACKEND = `/payments?page=${page}&size=${pageSize}`
    }
    return axios.get(URL_BACKEND)
}

const fetchAllPaymentsWithoutPagination = (filter = null) => {
    let URL_BACKEND
    if (filter) {
        URL_BACKEND = `/payments?filter=${filter}`
    } else {
        URL_BACKEND = `/payments`
    }
    return axios.get(URL_BACKEND)
}

const fetchAllWalletTransactionsWithoutPagination = (filter = null) => {
    let URL_BACKEND
    if (filter) {
        URL_BACKEND = `/transactions?filter=${filter}`
    } else {
        URL_BACKEND = `/transactions`
    }
    return axios.get(URL_BACKEND)
}

const fetchAllWalletTransactionsWithPaginationAPI = (page, pageSize, filter = null) => {
    let URL_BACKEND
    if (filter) {
        URL_BACKEND = `/transactions?page=${page}&size=${pageSize}&filter=${filter}`
    } else {
        URL_BACKEND = `/transactions?page=${page}&size=${pageSize}`
    }
    return axios.get(URL_BACKEND)
}

const createWalletTransactionAPI = (amount, type, ref_id, status, userId) => {
    const URL_BACKEND = "/transactions"
    const data = {
        amount: amount,
        type: type,
        ref_id: ref_id,
        status: status,
        user: {
            id: userId
        }
    }
    return axios.post(URL_BACKEND, data)
}

const getTotalOfAllBookingIncomeAPI = () => {
    return axios.get("/get-all-booking-income")
}

const updateWalletTransactionAPI = (id, amount, type, ref_id, status, userId) => {
    const URL_BACKEND = "/transactions"
    const data = {
        id: id,
        amount: amount,
        type: type,
        ref_id: ref_id,
        status: status,
        user: {
            id: userId
        }
    }
    return axios.put(URL_BACKEND, data)
}

const fetchAllFeedbacksWithPaginationAPI = (page, pageSize, filter = null) => {
    let URL_BACKEND
    if (filter) {
        URL_BACKEND = `/feedbacks?page=${page}&size=${pageSize}&filter=${filter}`
    } else {
        URL_BACKEND = `/feedbacks?page=${page}&size=${pageSize}`
    }
    return axios.get(URL_BACKEND)
}

const fetchBookingCheckInByBookingIdAPI = bookingId => {
    return axios.get(`/booking/checkin/${bookingId}`)
}

const fetchBookingCheckOutByBookingIdAPI = bookingId => {
    return axios.get(`/booking/checkout/${bookingId}`)
}


export { checkInAPI, createBookingAPI, createBookingCheckInAPI, createCleanerAPI, createServiceAPI, createUserAPI, fetchAllBookingsWithPaginationAPI, fetchAllCleanerWithPaginationAPI, fetchAllServicesWithoutPagination, fetchAllServicesWithPagination, fetchAllUsersWithoutPagination, fetchAllUserWithPaginationAPI, fetchCleanerByUserIdAPI, fetchServiceById, fetchUserByIdAPI, forgetPasswordAPI, getAccountAPI, getRefreshToken, loginAPI, logoutAPI, registerAPI, resendOtp, updateBookingAPI, updateCleanerAPI, updateUserAPI, verifyOtp, fetchAllBookingsWithoutPaginationAPI, assignCleanerJobManuallyAPI, getAvailableJobAPI, uploadImageAPI, createBookingCheckOutAPI, deleteBookingCheckOutAPI, deleteBookingCheckInAPI, deleteCleanerProfileAPI, deleteUserAPI, changePasswordAPI, fetchBookingByIdAPI, createFeedBackAPI, updateCleanerRatingAPI, deleteFeedbackAPI, createPaymentAPI, fetchPaymentByIdAPI, fetchAllPaymentsWithPaginationAPI, fetchAllPaymentsWithoutPagination, fetchAllWalletTransactionsWithoutPagination, fetchAllWalletTransactionsWithPaginationAPI, createWalletTransactionAPI, getTotalOfAllBookingIncomeAPI, updateWalletTransactionAPI, fetchAllFeedbacksWithPaginationAPI, fetchBookingCheckInByBookingIdAPI, fetchBookingCheckOutByBookingIdAPI };

