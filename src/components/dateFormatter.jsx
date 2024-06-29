import dateFormat from "dateformat";

function dateFormatter({ inputDate, options = "notTime" }) {
    const getOrdinalSuffix = (day) => ['th', 'st', 'nd', 'rd'][(day % 10 > 3 || Math.floor(day % 100 / 10) === 1) ? 0 : day % 10];
    const date = new Date(inputDate);

    if (options === "time") {
        const formattedDateTime = `${date.getDate()}${getOrdinalSuffix(date.getDate())} ${dateFormat(date, "mmm yyyy")} at ${dateFormat(date, "HH:MM")}`;
        return formattedDateTime;
    } else {
        const formattedDate = `${date.getDate()}${getOrdinalSuffix(date.getDate())} ${dateFormat(date, "mmm yyyy")}`;
        return formattedDate;
    }
}

export default dateFormatter;