import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WorkoutGeneralPageRoutingModule } from './workout-general-routing.module';

import { WorkoutGeneralPage } from './workout-general.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    WorkoutGeneralPageRoutingModule
  ],
  declarations: [WorkoutGeneralPage]
})
export class WorkoutGeneralPageModule {}
