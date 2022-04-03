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
export class UserService {
    private callURL = environment.apiURL;
    private getUsersUrl: string;
    private getUserAvatarUrl: string;
    private admin = JSON.stringify({
        email: 'bart@codious.io',
        password: 'test1234'
    });
    private accessToken: string = undefined;
    constructor(private http: HttpClient , private authService: AuthService) {
        this.getUsersUrl = this.callURL + 'users.list';
        this.getUserAvatarUrl = this.callURL + 'users.avatar';
        this.authService.token.subscribe(x => {
            if (x) { this.accessToken = x; }
        });
    }
    getUsers() {
        const header = new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + this.accessToken
        });
        return this.http.get(this.getUsersUrl, { headers: header }).pipe(tap(x => {
        }));
    }
}
