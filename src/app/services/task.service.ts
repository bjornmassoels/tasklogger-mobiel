import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Token} from '../models/token';
import {Observable, pipe, Subject} from 'rxjs';
import {Worklog} from '../models/worklog';
import {AuthService} from './auth.service';
import {last, tap} from 'rxjs/operators';
import {TaskSend} from "../models/taskSend";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root',
})
export class TaskService {
    private callURL = environment.apiURL;
    private createTaskUrl: string;
    private admin = JSON.stringify({
        email: 'bart@codious.io',
        password: 'test1234'
    });
    private accessToken: string = undefined;
    constructor(private http: HttpClient , private authService: AuthService) {
        this.createTaskUrl = this.callURL + 'tasks.create';
        this.authService.token.subscribe(x => {
            if (x) { this.accessToken = x; }
        });
    }
    createNewTask( deleted: boolean, key: string, description: string, due: Date , summary: string, project: string, reporter: string) {
        const header = new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + this.accessToken
        });
        const task = new TaskSend( deleted, key, reporter, description, due, summary, project);
        console.log(task);
        return this.http.post(this.createTaskUrl,  { body: JSON.stringify(task) }, {headers: header }).pipe(tap(x => {
        }));
    }
}
