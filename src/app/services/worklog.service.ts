import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Token} from '../models/token';
import {Observable, pipe, Subject} from 'rxjs';
import {Worklog} from '../models/worklog';
import {AuthService} from './auth.service';
import {last, tap} from 'rxjs/operators';
import {Hour} from '../models/hour';
import * as moment from 'moment';
import {WeekHours} from '../models/weekHours';
import {WorklogSend} from '../models/worklogSend';
import {DayDate} from '../models/dayDate';
import {Task} from "../models/task";
import {WorklogUpdate} from "../models/worklogUpdate";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root',
})
export class WorklogService {
     private callURL = environment.apiURL;
    dayHours: Hour;
    private authUrl: string;
    private worklogUrl: string;
    weekHours: WeekHours;
    monthHour: Hour;
    worklogSelected: DayDate;
    private weekSelected: number;
    monthSelected: Date;
    daySelected: Date;
    private workedHoursUrl: string;
    private workedHoursWeeksUrl: string;
    private workedHoursWeekDaysUrl: string;
    private workedHoursDayUrl: string;
    private createWorklogUrl: string;
    private deleteWorklogUrl: string;
    private updateWorklogUrl: string;
    public workLogs: Worklog[] = [];
    private accessToken: string = undefined;
    options = {headers: {'Content-Type': 'application/json'}};
    constructor(private http: HttpClient , private authService: AuthService) {
        this.authUrl = this.callURL + 'auth.login';
        this.worklogUrl = this.callURL + 'worklogs.monthList';
        this.workedHoursUrl = this.callURL + 'worklogs.workedHours';
        this.workedHoursWeeksUrl = this.callURL + 'worklogs.workedHoursWeeks';
        this.workedHoursWeekDaysUrl = this.callURL + 'worklogs.workedHoursWeekDays';
        this.workedHoursDayUrl = this.callURL + 'worklogs.workedHoursDay';
        this.createWorklogUrl = this.callURL + 'worklogs.create';
        this.deleteWorklogUrl = this.callURL + 'worklogs.delete';
        this.updateWorklogUrl = this.callURL + 'worklogs.update';
      this.authService.token.subscribe((x ) => {
        if (x !== null) {
          this.accessToken = x;
        }
      });
    }
    getWorkedHours(year: number, month: number , startDay: number, endDay: number) {
        const header = new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + this.accessToken,
            year: year.toString(),
            month: month.toString(),
            startDay: startDay.toString(),
            endDay: endDay.toString()
        });
        return this.http.get(this.workedHoursUrl, { headers: header }).pipe(tap(x => {
        }));
    }
    getWorkedHoursWeek(year: number, month: number) {
        const header = new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + this.accessToken,
            year: year.toString(),
            month: month.toString()
        });
        return this.http.get(this.workedHoursWeeksUrl, { headers: header }).pipe(tap(x => {
        }));
    }
    getWorkedHoursDay(year: number, month: number , day: number) {
        const header = new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + this.accessToken,
            year: year.toString(),
            month: month.toString(),
            day: day.toString()
        });
        return this.http.get(this.workedHoursDayUrl, { headers: header }).pipe(tap(x => {
        }));
    }
    getWorkedHoursWeekDays(year: number, month: number , startDay: number, endDay: number) {
        const header = new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + this.accessToken,
            year: year.toString(),
            month: month.toString(),
            startday: startDay.toString(),
            endday: endDay.toString()
        });
        return this.http.get(this.workedHoursWeekDaysUrl, { headers: header }).pipe(tap(x => {
        }));
    }
    createNewWorklog(project: string, task: string, description: string, user: string, worked: number, startDate: Date, endDate: Date) {
        const header = new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + this.accessToken
        });
        const worklog = new WorklogSend( false, startDate, endDate, description, task, user, worked);
        console.log(worklog);
        return this.http.post(this.createWorklogUrl,  { body: JSON.stringify(worklog) }, {headers: header }).pipe(tap(x => {
        }));
    }
    deleteWorklog(id: string){
        const header = new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + this.accessToken
        });
        return this.http.post(this.deleteWorklogUrl,  { body: JSON.stringify(id) }, {headers: header }).pipe(tap(x => {
        }));
    }
    updateWorklog(id: string, deleted: boolean, startDate: Date, endDate: Date,
                  description: string, task: string, user: string, worked: number){
        const header = new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + this.accessToken
        });
        const worklog = new WorklogUpdate( id, deleted, startDate, endDate, description, task, user, worked);
        console.log(worklog);
        return this.http.post(this.updateWorklogUrl,  { body: JSON.stringify(worklog) }, {headers: header }).pipe(tap(x => {
        }));
    }
    public convertMinutesToHours(minutes: number) {
        const hours = Math.floor(minutes / 60);
        const minutes2 = minutes % 60;
        this.monthHour = new Hour(hours, minutes2, 0);
        return this.monthHour;
    }
    getWeeksInMonth(month, year) {
         const weeks = [];
         const date = moment([year, month ]);
         const firstDate = moment(date).startOf('month').toDate();
         const lastDate = moment(date).endOf('month').toDate();
         const numDays = lastDate.getDate();
         console.log(lastDate); // Thursday)
         const weekdays = [
             'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
         ];
         let start = 1;
         let end = (7 - firstDate.getDay()) + 1;
         console.log(weekdays[firstDate.getDay()]);
         if (weekdays[firstDate.getDay()] === 'Sunday') {
             start = 2;
             end = start + 6;
         } else if ( weekdays[firstDate.getDay()] === 'Saturday') {
             start = 3;
             end = start + 6;
         }
         while (start <= numDays) {
             weeks.push({start, end});
             start = end + 1;
             end = end + 7;
             if (end > numDays) {
                 end = numDays;
             }
         }
         for (let i = 0; i < weeks.length ; i++) {
             const date = new Date(year, month, weeks[i].end);
             if (weekdays[date.getDay()] === 'Sunday') {
                 weeks[i].end -= 2 ;
             }
             if (weekdays[date.getDay()] === 'Saturday') {
                 weeks[i].end -= 1 ;
             }
         }
         return weeks;
    }
    public getWeekHours(): WeekHours {
        return this.weekHours;
    }
    public setWeekHours(weekHours: WeekHours) {
        this.weekHours = weekHours;
    }
    public setMonthSelected(date: Date) {
        this.monthSelected = date;
    }
    public getMonthSelected(): Date {
        return this.monthSelected;
    }
    public setDaySelected(date: Date) {
        this.daySelected = date;
    }
    public getDaySelected(): Date {
        return this.daySelected;
    }
    public getWeekSelected(): number {
        return this.weekSelected;
    }
    public setWeekSelected(value: number) {
        this.weekSelected = value;
    }
    public setWorklogSelected(dayDate: DayDate) {
        this.worklogSelected = dayDate;
    }
    public getWorklogSelected(): DayDate {
        return  this.worklogSelected;
    }
    public setDayHours(dayHours: Hour) {
        this.dayHours = dayHours;
    }
    public getDayHours(): Hour {
        return this.dayHours;
    }
}
