import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WorkoutStrengthPageRoutingModule } from './workout-strength-routing.module';

import { WorkoutStrengthPage } from './workout-strength.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    WorkoutStrengthPageRoutingModule
  ],
  declarations: [WorkoutStrengthPage]
})
export class WorkoutStrengthPageModule {}
