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
export class ProjectService {
    private callURL = environment.apiURL;
    private getProjectsUrl: string;
    private admin = JSON.stringify({
        email: 'bart@codious.io',
        password: 'test1234'
    });
    private accessToken: string = undefined;
    constructor(private http: HttpClient , private authService: AuthService) {
        this.getProjectsUrl = this.callURL + 'projects.list';
        this.authService.token.subscribe(x => {
            if (x) { this.accessToken = x; }
    });
    }
    getProjects() {
        const header = new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + this.accessToken
        });
        console.log(this.accessToken);
        return this.http.get(this.getProjectsUrl, { headers: header }).pipe(tap(x => {
        }));
    }
}
