import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import 'firebase/firestore';
import { AuthenticationService } from 'src/shared/authentication-service';
import { Profile } from '../../models/profiles.interface';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(public firestore: AngularFirestore, public authService:AuthenticationService) { }

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
}
