export default function dateTimeFormat(dateTime) {
    if (dateTime == 'N/A') return dateTime;
    let date = new Date(dateTime);
    // turn the date into a string of hh:mm dd/mm/yyyy
    return date.toLocaleTimeString() + ' ' + date.toLocaleDateString();
}