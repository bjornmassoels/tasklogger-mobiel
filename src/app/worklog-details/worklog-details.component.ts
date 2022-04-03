import { Component, OnInit } from '@angular/core';
import {NavigationEnd, NavigationStart, Router} from '@angular/router';
import {WorklogService} from '../services/worklog.service';
import {Hour} from '../models/hour';
import {AuthService} from '../services/auth.service';
import {DayDate} from '../models/dayDate';

@Component({
  selector: 'app-worklog-details',
  templateUrl: './worklog-details.component.html',
  styleUrls: ['./worklog-details.component.scss'],
})
export class WorklogDetailsComponent implements OnInit {
  weekSelected: number;
  daySelected: Date;
  taskTitle: string;
  taskDescription: string;
  worklogSelected: DayDate;
  todayHours: Hour;
  startHours: Hour;
  timeSpendHours: Hour;
  endHours: Hour;
  monthNames: string[] = ['JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE',
    'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'];
  weekNames: string[] = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  dayHours: Hour = new Hour(0, 0, 0);
  dayString: string;

  constructor(private router: Router, private worklogService: WorklogService, private authService: AuthService) {
  }

  ngOnInit() {
    this.weekSelected = this.worklogService.getWeekSelected();
    this.daySelected = this.worklogService.getDaySelected();
    this.worklogSelected = this.worklogService.getWorklogSelected();
    this.taskTitle = this.worklogSelected.task.key;
    const startDate = new Date(this.worklogSelected.startDate);
    const endDate = new Date(this.worklogSelected.endDate);
    this.startHours = new Hour(startDate.getHours(), startDate.getMinutes(), 0);
    this.endHours = new Hour(endDate.getHours(), endDate.getMinutes(), 0);
    this.dayHours = this.worklogService.getWorklogSelected().hours;
    const timeSpend = (this.endHours.hours * 60 + this.endHours.minutes) - (this.startHours.hours * 60 + this.startHours.minutes);
    this.timeSpendHours = new Hour(Math.floor(timeSpend / 60), (timeSpend % 60), 0);
    this.todayHours = new Hour(new Date().getHours(), new Date().getMinutes(), 0);
    console.log(this.worklogSelected);
    this.router.events.subscribe((ev) => {
      if (ev instanceof NavigationEnd ) {
        this.weekSelected = this.worklogService.getWeekSelected();
        this.worklogSelected = this.worklogService.getWorklogSelected();
        const startDate = new Date(this.worklogSelected.startDate);
        const endDate = new Date(this.worklogSelected.endDate);
        this.dayHours = this.worklogService.getWorklogSelected().hours;
        this.startHours = new Hour(startDate.getHours(), startDate.getMinutes(), 0);
        this.endHours = new Hour(endDate.getHours(), endDate.getMinutes(), 0);
        this.todayHours = new Hour(new Date().getHours(), new Date().getMinutes(), 0);
        this.taskTitle = this.worklogSelected.task.description;
        this.taskDescription = this.worklogSelected.description;
        this.daySelected = new Date(this.worklogService.getDaySelected());
        const timeSpend = (this.endHours.hours * 60 + this.endHours.minutes) - (this.startHours.hours * 60 + this.startHours.minutes);
        this.timeSpendHours = new Hour(Math.floor(timeSpend / 60), (timeSpend % 60), 0);
        console.log(this.worklogSelected);
        this.getWorklogDetails();
      }
    });
  }

  getWorklogDetails() {
          this.worklogService.getWorkedHoursDay(this.daySelected.getFullYear(), this.daySelected.getMonth(), this.daySelected.getDate())
              .subscribe(x => {
                this.dayString = this.weekNames[this.daySelected.getDay()] + ', ' + this.daySelected.getDate()
                    + ' ' + this.monthNames[this.daySelected.getMonth()];
              });
  }
  createNewWorklog(){
    this.router.navigate(['/tabs/createWorklog', 'worklog-details']);
  }
  goBack() {
    this.router.navigate(['/tabs/day']);
  }
  goToUpdate(){
    this.router.navigate(['/tabs/update-worklog']);
  }
  deleteWorklog(){
    const worklog = this.worklogService.getWorklogSelected();
    console.log(worklog);
          this.worklogService.deleteWorklog(worklog._id)
              .subscribe(x => {
                console.log("deleted" + worklog._id);
              });
    this.router.navigate(['/tabs/day']);
    }
}
