import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from "../services/auth.service";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  email = '';
  password = '';
  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
    //this.authService.login('demo', 'test1234').then(x => this.router.navigate(['/tabs/timesheets']));
  }

  login(){

    if(this.email !== "" || this.password !== ""){
      this.authService.login(this.email, this.password).then(x => this.router.navigate(['/tabs/clock']));
    }
    }

}
