import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from "../../shared/authentication-service";

import * as BenchPressStandards from "./data/bench-standards.json";
import * as DeadliftStandards from "./data/deadlift-standards.json";
import * as OHPStandards from "./data/ohp-standards.json";
import * as RowStandards from "./data/row-standards.json";
import * as SquatStandards from "./data/squat-standards.json";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})

export class DashboardPage implements OnInit {

  BenchStandards: any = (BenchPressStandards as any).default;
  DeadliftStandards: any = (DeadliftStandards as any).default;
  OHPStandards: any = (OHPStandards as any).default;
  RowStandards: any = (RowStandards as any).default;
  SquatStandards: any = (SquatStandards as any).default;
  

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
