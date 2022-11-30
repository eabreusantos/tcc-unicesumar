import moment from "moment";

export function getDateFormatted(date) {
    return moment(date).utc().format('DD/MM/YYYY');
}

export function getDateTimeFormatted(date) {
    return moment(date).format('DD/MM/YYYY HH:mm:ss');
}