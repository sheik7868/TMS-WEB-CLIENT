import moment from "moment";

export class Helper {
    converttoDateFormat = (actualDate: string, dateFormat: string) => {
        return moment(actualDate).format(dateFormat)
    }

}