import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthenticationService } from "../../shared/authentication-service";
import { AngularFireAuth } from "@angular/fire/auth";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})

export class RegistrationPage implements OnInit {

  constructor(
    public authService: AuthenticationService,
    public ngFireAuth: AngularFireAuth,
    public router: Router
  ) { }

  ngOnInit(){}

  //call authentication service to register new user
  signUp(email, password){
    this.authService.RegisterUser(email.value, password.value)
    .then((res) => {
      // Do something here
      this.authService.SendVerificationMail()
      this.router.navigate(['verify-email']);
      
    }).catch((error) => {
      window.alert(error.message)
    })
}

}