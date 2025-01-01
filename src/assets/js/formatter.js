export default function dateTimeFormat(dateTime) {
    // If datetime is an array like [2025, 1, 1, 10, 2, 59, 452409000] convert to string
    if (Array.isArray(dateTime)) {
        let rst = dateTime[0] + '-' + numberPerfixing(dateTime[1]) + '-' + numberPerfixing(dateTime[2]) + 'T' + numberPerfixing(dateTime[3]) + ':' + numberPerfixing(dateTime[4]) + ':' + numberPerfixing(dateTime[5]) + '.' + dateTime[6] + 'Z';
        dateTime = rst;
    }
    if (dateTime == 'N/A') return dateTime;
    let date = new Date(dateTime);
    // turn the date into a string of hh:mm dd/mm/yyyy
    return date.toLocaleTimeString() + ' ' + date.toLocaleDateString();
}

function numberPerfixing(num) {
    return num < 10 ? '0' + num : num;
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

export function getNamePlaceHolder(name) {
    // If there is a single word, return the first 2 letters of that word
    if (name.split(' ').length == 1) return name.substring(0, 2).toUpperCase();
    // If there are multiple words, return the first letter of 2 word
    return (name.split(' ')[0].charAt(0) + name.split(' ')[1].charAt(0)).toUpperCase();
}