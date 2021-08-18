import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from "../../shared/authentication-service";
import { Profile } from '../models/profiles.interface';
import { FirestoreService } from '../services/data/firestore.service';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.page.html',
  styleUrls: ['./view-profile.page.scss'],
})
export class ViewProfilePage implements OnInit {

  public profile: Profile;

  constructor(
    public authService: AuthenticationService,
    private firestoreService: FirestoreService,
  ) { }

  ngOnInit() {
    if (this.authService.isLoggedIn) {
      //get user id from authService
    const id: string = this.authService.getUserID();
    //get profile data from firestore
    this.firestoreService.getProfileData(id).subscribe(profile => {
      this.profile = profile;
    });} else {
      console.log("No logged in user.")
    }
  }
}
