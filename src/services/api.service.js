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




export { getAccountAPI, getRefreshToken, loginAPI, logoutAPI };

