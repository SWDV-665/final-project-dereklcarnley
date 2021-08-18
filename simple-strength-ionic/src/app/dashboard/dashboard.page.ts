import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from "../../shared/authentication-service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})

export class DashboardPage implements OnInit {

  constructor(
    public authService: AuthenticationService
  ) { }

  ngOnInit() {
      if (this.authService.isLoggedIn) {
        console.log("User is logged in.")
      } else {
        console.log("No logged in user.")
      }
    };
  }
