import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AuthenticationService } from "../../shared/authentication-service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  profileForm: FormGroup;
  //profile form error messages
  validation_messages = {
    'Name': [
            { type: 'required', message: 'Name is required.' },
            { type: 'maxlength', message: 'Name cannot be more than 20 characters long.' },
        ],
    'Sex': [
            { type: 'required', message: 'Sex is required.' }
        ],
    'Age': [
            { type: 'required', message: 'Age is required.' },
            { type: 'min', message: 'Age must be over 13 years.'},
            { type: 'max', message: 'Age must be under 90 years.'}
        ],
    'Bodyweight': [
            { type: 'required', message: 'Bodyweight is required.' },
            { type: 'min', message: 'Bodyweight must be over 89 pounds.'},
            { type: 'max', message: 'Bodyweight must be under 311 pounds.'}
        ],
    'FitnessLevel': [
            { type: 'required', message: 'Fitness Level is required.'}
        ]
    };

  constructor(public formBuilder: FormBuilder,
              public authService: AuthenticationService) { }

  ngOnInit() {
    this.profileForm = this.formBuilder.group({
      Sex: ['', [Validators.required]],
      Age: ['', [Validators.required, Validators.min(14),Validators.max(89)]],
      Bodyweight: ['', [Validators.required, Validators.min(90), Validators.max(310)]],
      FitnessLevel: ['', [Validators.required]]
    })
  };

  createProfile() {
    if (!this.profileForm.valid) {
      console.log('All fields are required.')
      return false;
    } else if (!this.authService.isLoggedIn){
      console.log('Must be logged in to create a profile.')
      return false;
    } else {
      //user id
      var temp = this.authService.getUserID();
      console.log("Creating Profile for user: " + temp);
    
      //user inputs from profile form
      console.log(this.profileForm.value)
    }
  };
}
