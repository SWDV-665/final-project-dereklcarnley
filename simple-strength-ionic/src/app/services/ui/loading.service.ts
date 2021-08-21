import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  constructor(private loadingCtrl: LoadingController) { }

  //generic loading function; optional message and duration parameters
  async presentLoading(message:string="Please wait...", duration:number=500) {
    const loading = await this.loadingCtrl.create({
      cssClass: 'my-custom-class',
      message: message,
      duration: duration
    });
    await loading.present();
  }

}