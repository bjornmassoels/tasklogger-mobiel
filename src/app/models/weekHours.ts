import {Hour} from "./hour";

export class WeekHours{
    _id: string;
    Hour: Hour;
    weekNumber: number;
    startDay: number;
    endDay: number;
    constructor(_id: string, weekNumber: number, hour: Hour, startDay: number, endDay: number) {
        this.Hour = hour;
        this.weekNumber = weekNumber;
        this.startDay = startDay;
        this.endDay = endDay;
        this._id = _id;
    }
}
