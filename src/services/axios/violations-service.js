import axios from "./custom-axios";

const getAllViolators = (page) => {
    return axios.post("/violations/", { page: page });
}

const searchLicensePlate = (page, licensePlate) => {
    return axios.post("/violations/", { page: page, plate_number: licensePlate });
}

export {getAllViolators, searchLicensePlate};