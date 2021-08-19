import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import 'firebase/firestore';
import { AuthenticationService } from 'src/shared/authentication-service';
import { Profile } from '../../models/profiles.interface';
import { ORM } from '../../models/one-rep-maxes.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(public firestore: AngularFirestore, 
              public authService:AuthenticationService,
              private router: Router) { }

  createProfile(
    Age: number,
    Bodyweight: number,
    FitnessLevel: string,
    Sex: string
  ): Promise<void> { 
    const id = this.authService.getUserID();
    
    return this.firestore.doc(`userProfiles/${id}`).set({
      id,
      Age,
      Bodyweight,
      FitnessLevel,
      Sex
    });
  }

  getProfileData(id: string): Observable<Profile> {
    console.log("Getting Profile Data for User ID: " + id);
    return this.firestore.collection('userProfiles').doc<Profile>(id).valueChanges();
  }

  deleteProfileData(id: string): Promise<void> {
    return this.firestore.doc(`userProfiles/${id}`).delete()
    .then((res) => {
      // Do something here
      console.log("Profile deleted.")
      this.router.navigate(['']);
    }).catch((error) => {
      window.alert(error.message)
    })
  }

  createORM(
    BenchMax: number,
    DeadliftMax: number,
    OHPMax: number,
    RowMax: number,
    SquatMax: number
  ): Promise<void> { 
    const id = this.authService.getUserID();
    
    return this.firestore.doc(`userORMs/${id}`).set({
      id,
      BenchMax,
      DeadliftMax,
      OHPMax,
      RowMax,
      SquatMax
    });
  }

  getORMData(id: string): Observable<ORM> {
    console.log("Getting ORM Data for User ID: " + id);
    return this.firestore.collection('userORMs').doc<ORM>(id).valueChanges();
  }

  deleteORMData(id: string): Promise<void> {
    return this.firestore.doc(`userORMs/${id}`).delete()
    .then((res) => {
      // Do something here
      console.log("ORM data deleted.")
      this.router.navigate(['']);
    }).catch((error) => {
      window.alert(error.message)
    })
  }
}
