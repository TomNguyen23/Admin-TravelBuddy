export default function dateTimeFormat(dateTime) {
    if (dateTime == 'N/A') return dateTime;
    let date = new Date(dateTime);
    // turn the date into a string of hh:mm dd/mm/yyyy
    return date.toLocaleTimeString() + ' ' + date.toLocaleDateString();
}

export function dowEnum(dow) {
    if (dow == 'N/A') return dow;
    switch (dow) {
        case "SU":
            return "Chủ Nhật";
        case "MO":
            return "Thứ Hai";
        case "TU":
            return "Thứ Ba";
        case "WE":
            return "Thứ Tư";
        case "TH":
            return "Thứ Năm";
        case "FR":
            return "Thứ Sáu";
        case "SA":
            return "Thứ Bảy";
        default:
            return "N/A";
    }
}

export function dowShortEnum(dow) {
    if (dow == 'N/A') return dow;
    switch (dow) {
        case "SU":
            return "CN";
        case "MO":
            return "T2";
        case "TU":
            return "T3";
        case "WE":
            return "T4";
        case "TH":
            return "T5";
        case "FR":
            return "T6";
        case "SA":
            return "T7";
        default:
            return "N/A";
    }
}