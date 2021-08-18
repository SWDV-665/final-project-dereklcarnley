import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from "../../shared/authentication-service";
import { Profile } from '../models/profiles.interface';
import { FirestoreService } from '../services/data/firestore.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})

export class DashboardPage implements OnInit {

  public profile: Profile;

  constructor(
    public authService: AuthenticationService,
    private firestoreService: FirestoreService,
  ) { }

  ngOnInit() {
      if (this.authService.isLoggedIn) {
        console.log("User is logged in.")
        
        //get user id from authService
        const id: string = this.authService.getUserID();

        //get profile data from firestore
        this.firestoreService.getProfileData(id).subscribe(profile => {
          this.profile = profile;
        });
      } else {
        console.log("No logged in user.")
      }
    };
  }
