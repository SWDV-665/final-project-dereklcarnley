import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from "../../shared/authentication-service";
import { Profile } from '../models/profiles.interface';
import { FirestoreService } from '../services/data/firestore.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.page.html',
  styleUrls: ['./view-profile.page.scss'],
})
export class ViewProfilePage implements OnInit {

  public profile: Profile;

  constructor(
    public authService: AuthenticationService,
    private router: Router,
    private firestoreService: FirestoreService,
    private alertCtrl: AlertController
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

  async deleteProfile():Promise<void> {
    const id = this.authService.getUserID();

    const alert = await this.alertCtrl.create({
      message: `Are you sure you want to delete your profile?`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: blah => {
            console.log('Confirm Cancel: blah');
          },
        },
        {
          text: 'Delete',
          handler: () => {
            this.firestoreService.deleteProfileData(id).then(() => {
              this.router.navigateByUrl('');
            });
          },
        },
      ],
    });
  
    await alert.present();
  }
}
