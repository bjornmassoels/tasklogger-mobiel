import {Task} from './task';

export class Worklog{
    _id: string;
    deleted: boolean;
    startDate: Date;
    endDate: Date;
    description: string;
    task: Task;
    user: string;
    worked: number;
    constructor(  _id: string, deleted: boolean, startDate: Date, endDate: Date,
                  description: string, task: Task, user: string, worked: number) {
        this.startDate = startDate;
        this.endDate = endDate;
        this.description = description;
        this.worked = worked;
        this._id = _id;
        this.deleted = deleted;
        this.task = task;
        this.user = user;
    }
}
