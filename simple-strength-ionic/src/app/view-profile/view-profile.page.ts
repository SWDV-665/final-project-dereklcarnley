import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from "../../shared/authentication-service";
import { Profile } from '../models/profiles.interface';
import { FirestoreService } from '../services/data/firestore.service';
import { LoadingService } from '../services/ui/loading.service';
import { AlertController } from '@ionic/angular';
import { ORM } from '../models/one-rep-maxes.interface';

import * as BenchStandards from "../data/bench-standards.json";
import * as DeadliftStandards from "../data/deadlift-standards.json";
import * as OHPStandards from "../data/ohp-standards.json";
import * as RowStandards from "../data/row-standards.json";
import * as SquatStandards from "../data/squat-standards.json";

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.page.html',
  styleUrls: ['./view-profile.page.scss'],
})
export class ViewProfilePage implements OnInit {

  //imports for accessing user data
  public profile: Profile;
  public ORMs: ORM;

  //JSON file imports for strength standards
  BenchStandards: any = (BenchStandards as any).default;
  DeadliftStandards: any = (DeadliftStandards as any).default;
  OHPStandards: any = (OHPStandards as any).default;
  RowStandards: any = (RowStandards as any).default;
  SquatStandards: any = (SquatStandards as any).default;

  constructor(
    public authService: AuthenticationService,
    private router: Router,
    private firestoreService: FirestoreService,
    private alertCtrl: AlertController,
    private loadingService: LoadingService
  ) { }

  async ngOnInit() {
    if (this.authService.isLoggedIn) {
      this.loadingService.presentLoading('Loading your profile...');
      //get user id from authService
      const id: string = this.authService.getUserID();
      //get profile data from firestore
      this.firestoreService.getProfileData(id).subscribe(profile => {
        this.profile = profile;});
      //get ORM data from firestore
      this.firestoreService.getORMData(id).subscribe(ORMs => {
        this.ORMs = ORMs;});
    } else {
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

  //used to round user bodyweight to nearest 10
  roundToNearestTen(number:number) {
    var remainder = number % 10;
    return remainder >= 5 ? ((number - remainder) + 10) : (number - remainder);
  };

  //used to calculate maxes, account for age
  accountForAge(max:number) {
    console.log("Accounting for age group...");
    const age = this.profile.Age;

         if (age >= 14 && age <= 17){return max * 0.87}
    else if (age >= 18 && age <= 23){return max * 0.98}
    else if (age >= 40 && age <= 49){return max * 0.95}
    else if (age >= 50 && age <= 59){return max * 0.83}
    else if (age >= 60 && age <= 69){return max * 0.69}
    else if (age >= 70 && age <= 79){return max * 0.55}
    else if (age >= 80 && age <= 89){return max * 0.44}
    else {return max};
  }

  /*------
  Suggest ORMs based on Strength Level's crowdsourced standards.
  Great for beginners who don't know what weight to start with.
  -------*/
  async suggestMaxes() {
      console.log("Getting suggested one-rep maxes...");
      if (this.profile.Sex == null || this.profile.Bodyweight == null || 
          this.profile.FitnessLevel == null || this.profile.Age == null) {
        console.log("Insufficient data to suggest maxes. Please update profile");
        return false;
      } else {
          var fitnessLevel = this.profile.FitnessLevel;
          var sex = this.profile.Sex;
          
          if (sex == "Female" && this.profile.Bodyweight > 260) {
          // standards data for females has a maximum bodyweight of 260
          console.log("Standards data for females does not exceed 260 lbs bodyweight.");
          console.log("Will retrieve standards for 260 lbs instead.");
          var bodyweight = 260;
          } 
          else if (sex == "Male" && this.profile.Bodyweight < 110) {
          // standards data for males has a minimum bodyweight of 110
          console.log("Standards data for males starts at 110 lbs bodyweight.");
          console.log("Will retrieve standards for 110 lbs instead.");
          bodyweight = 110;
          } 
          else {
          //round bodyweight to nearest 10
          bodyweight = this.roundToNearestTen(this.profile.Bodyweight);
        };
        
      console.log("Getting bench press max...");
      console.log(this.BenchStandards[sex][bodyweight][fitnessLevel]);
      var benchMax = this.accountForAge(this.BenchStandards[sex][bodyweight][fitnessLevel]);

      console.log("Getting deadlift max...");
      console.log(this.DeadliftStandards[sex][bodyweight][fitnessLevel]);
      var deadliftMax = this.accountForAge(this.DeadliftStandards[sex][bodyweight][fitnessLevel]);

      console.log("Getting overhead press max...");
      console.log(this.OHPStandards[sex][bodyweight][fitnessLevel]);
      var ohpMax = this.accountForAge(this.OHPStandards[sex][bodyweight][fitnessLevel]);

      console.log("Getting bent-over row max...");
      console.log(this.RowStandards[sex][bodyweight][fitnessLevel]);
      var rowMax = this.accountForAge(this.RowStandards[sex][bodyweight][fitnessLevel]);

      console.log("Getting squat max...");
      console.log(this.SquatStandards[sex][bodyweight][fitnessLevel]);
      var squatMax = this.accountForAge(this.SquatStandards[sex][bodyweight][fitnessLevel]);
    
      this.loadingService.presentLoading('Setting One-Rep Maxes...');
      this.firestoreService.createORM(benchMax, deadliftMax, ohpMax, rowMax, squatMax);
      }
    }

    async deleteMaxes():Promise<void> {
      const id = this.authService.getUserID();
  
      const alert = await this.alertCtrl.create({
        message: `Are you sure you want to delete your ORM data?`,
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
              this.firestoreService.deleteORMData(id).then(() => {
                this.router.navigateByUrl('');
              });
            },
          },
        ],
      });
      await alert.present();
  }

  /*------
  Manually set maxes with an alert-input prompt.
  Useful for experienced lifters who have above- or below-average maxes in certain lifts.
  -------*/
  async manuallySetMaxes() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Set Maxes:',
      inputs: [
        {
          name: 'benchMax',
          type: 'number',
          min: 0,
          placeholder: 'Bench Press'
        },
        {
          name: 'deadliftMax',
          type: 'number',
          min: 0,
          placeholder: 'Deadlift'
        },
        {
          name: 'ohpMax',
          type: 'number',
          min: 0,
          placeholder: 'Overhead Press' 
        },
        {
          name: 'rowMax',
          type: 'number',
          min: 0,
          placeholder: 'Bent-Over Row'
        },
        // input date with min & max
        {
          name: 'squatMax',
          type: 'number',
          min: 0,
          placeholder: 'Squat' 
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Confirm',
          handler: (alertData) => {
            console.log('Confirmed');
            this.firestoreService.createORM(alertData.benchMax, alertData.deadliftMax, 
                                            alertData.ohpMax, alertData.rowMax, alertData.squatMax);
          }
        }
      ]
    });

    await alert.present();
  }

}