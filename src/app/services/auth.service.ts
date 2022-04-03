import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Token} from '../models/token';
import {BehaviorSubject} from 'rxjs';
import {Router} from "@angular/router";
import {ToastController} from "@ionic/angular";
import { environment } from "src/environments/environment";


@Injectable({
    providedIn: 'root',
})
export class AuthService {
  private authUrl: string;
  private callURL = environment.apiURL;
  public options = { headers: { 'Content-Type': 'application/json' } };
  public token: BehaviorSubject<string | undefined> = new BehaviorSubject(
    undefined
  );

  public userId;

  public company_id;

  public role;

  public token$ = this.token.asObservable();
  public tracking: boolean = false;
  constructor(
    private http: HttpClient,
    private router: Router,
    private toast: ToastController
  ) {
    this.authUrl = this.callURL + 'auth.login'; // 'http://localhost:4100/api/v1/auth.login';
  }

  async login(email: string, password: string) {
    let inlog = JSON.stringify({
      email: email,
      password: password
    });
    return await fetch(this.authUrl, {
      headers: {
        'Content-Type': 'application/json'
      },
      body: inlog,
      method: 'post'
    })
      .then(async (res) => {
        const userInfo = await res.json();
        console.log(userInfo)
        this.token.next(userInfo['access_token']);
        if(userInfo['tracking'] === true){
          this.tracking = true;
        }
        /*this.company_id = userInfo['company_id'];
        this.role = userInfo['role'];
        this.userId = userInfo['userid'];
        this.nativeStorage.setItem('email', { property: email }).then(
          () => console.log('Stored item!'),
          (error) => console.error('Error storing item', error)
        );
        this.nativeStorage.setItem('password', { property: password }).then(
          () => console.log('Stored item!'),
          (error) => console.error('Error storing item', error)
        );*/
        await this.router.navigate(['/tabs/timesheets']);
      })
      .catch(async (err) => {
          console.error('error logging in ' + err);
          const toast = await this.toast.create({
            message: 'Uw email en/of wachtwoord klopt niet.',
            duration: 2500,
            cssClass: 'toast-custom-class-failed-login',

            buttons: [
              {
                text: 'Ok',
                role: 'cancel',
                handler: () => {}
              }
            ]
          });
          toast.present();
      });
  }

  public isAuthenticated(): boolean {
    if (this.token.value !== undefined) {
      return true;
    } else {
      return false;
    }
  }
}
