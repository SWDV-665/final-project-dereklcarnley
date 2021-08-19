import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from "../../shared/authentication-service";

@Component({
  selector: 'app-workout-tracking',
  templateUrl: './workout-tracking.page.html',
  styleUrls: ['./workout-tracking.page.scss'],
})
export class WorkoutTrackingPage implements OnInit {

  constructor(public authService: AuthenticationService) { }

  ngOnInit() {}

}
