import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { AuthenticationService } from "../../shared/authentication-service";
import { FirestoreService } from '../services/data/firestore.service';
import { LoadingService } from '../services/ui/loading.service';
import { ToastController } from '@ionic/angular';
import { ORM } from '../models/one-rep-maxes.interface';

@Component({
  selector: 'app-workout-strength',
  templateUrl: './workout-strength.page.html',
  styleUrls: ['./workout-strength.page.scss'],
})
export class WorkoutStrengthPage implements OnInit {

  strengthWorkoutForm: FormGroup;

  public ORMs: ORM;

  benchDiv=true;
  deadliftDiv=true;
  ohpDiv=true;
  squatDiv=true;
  rowDiv=true;

  constructor(public formBuilder: FormBuilder,
              public authService: AuthenticationService,
              private router: Router,
              private firestoreService: FirestoreService,
              private loadingService: LoadingService,
              private toastCtrl: ToastController) { }

  ngOnInit() {
    this.strengthWorkoutForm = this.formBuilder.group({
      benchResponse: ['0', [Validators.required]],
      deadliftResponse: ['0', [Validators.required]],
      ohpResponse: ['0', [Validators.required]],
      squatResponse: ['0', [Validators.required]],
      rowResponse: ['0', [Validators.required]]
    });

    if (this.authService.isLoggedIn) {
      this.loadingService.presentLoading('Loading your workout...');
      //get user id from authService
      const id: string = this.authService.getUserID();
      //get ORM data from firestore
      this.firestoreService.getORMData(id).subscribe(ORMs => {
        this.ORMs = ORMs;});
    } else {
      console.log("No logged in user.")
    }
  }

  async presentToast(message:string="Confirmed", color="success", duration:number=3000) {
    const toast = await this.toastCtrl.create({
      message: message,
      color: color,
      duration: duration
    });
    toast.present();
  }

  //all of these functions just toggle [hidden] on some divs. 
  //couldn't find this functionality in the ionic components, so I made it myself
  toggleBenchDiv() {
    if (this.benchDiv) {
      this.benchDiv = false;
    } else {
      this.benchDiv = true;
    }
  }
  toggleDeadliftDiv() {
    if (this.deadliftDiv) {
      this.deadliftDiv = false;
    } else {
      this.deadliftDiv = true;
    }
  }
  toggleOHPDiv() {
    if (this.ohpDiv) {
      this.ohpDiv = false;
    } else {
      this.ohpDiv = true;
    }
  }
  toggleSquatDiv() {
    if (this.squatDiv) {
      this.squatDiv = false;
    } else {
      this.squatDiv = true;
    }
  }
  toggleRowDiv() {
    if (this.rowDiv) {
      this.rowDiv = false;
    } else {
      this.rowDiv = true;
    }
  }


  //quick function to allow rounding inside Angular interpolation expression {{}}
  //rounds to the smallest weight plate available at most gyms: 2.5 pounds
  plateIncrementRound(number:number) {
    var remainder = number % 2.5;
    return remainder >= 1.25 ? ((number - remainder) + 2.5) : (number - remainder);
  };

  //increment by 2.5 if user replies 'complete'
  //decrement by 2.5 if user replies 'too heavy'
  //increments more than other workout types
  incrementOrDecrementMax(response:string, maxType:string){
    if (this.strengthWorkoutForm.value[response] == '1'){
      //increment max
      return Number(this.ORMs[maxType]) + 2.5;
    } else if (this.strengthWorkoutForm.value[response] == '3'){
      //decrement max
      return Number(this.ORMs[maxType]) - 2.5;
    } else {
      return Number(this.ORMs[maxType]);
    };
  }

  //checks for completed sets on any one of the prescribed lifts
  checkForSuccess() {
    if (this.strengthWorkoutForm.value.benchResponse == '1' ||
        this.strengthWorkoutForm.value.deadliftResponse == '1' ||
        this.strengthWorkoutForm.value.ohpResponse == '1' ||
        this.strengthWorkoutForm.value.rowResponse == '1' ||
        this.strengthWorkoutForm.value.squatResponse == '1'){ 
      return true;
    }
  }

  /*------------
  finish workout does 3 things:
  1) check for successful sets, and present the appropriate toast
  2) increment or decrement user maxes based on their responses, and
  3) update user ORMs in the database
  --------------*/ 
  finishStrengthWorkout() {
    console.log("Workout finished.");
    if (this.checkForSuccess()) {
      this.presentToast('Great Workout! Maxes increased.');
    } else {
      this.presentToast('Great Workout! Keep up the good work!', 'tertiary');
    };
    const benchMax = this.incrementOrDecrementMax('benchResponse', 'BenchMax');
    const deadliftMax = this.incrementOrDecrementMax('deadliftResponse', 'DeadliftMax');
    const ohpMax = this.incrementOrDecrementMax('ohpResponse', 'OHPMax');
    const rowMax = this.incrementOrDecrementMax('rowResponse', 'RowMax');
    const squatMax = this.incrementOrDecrementMax('squatResponse', 'SquatMax');
    
    this.firestoreService.createORM(benchMax, deadliftMax, ohpMax, rowMax, squatMax)
      .then(() => {
        this.router.navigateByUrl('');
      });
  }
}
