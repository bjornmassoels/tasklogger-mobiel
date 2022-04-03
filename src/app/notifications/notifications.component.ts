import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
})
export class NotificationsComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {}
  goBack(){
    console.log("yee");
    this.router.navigate(['/tabs/settings']);
  }
}
