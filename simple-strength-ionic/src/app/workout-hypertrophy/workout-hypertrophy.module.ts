import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WorkoutHypertrophyPageRoutingModule } from './workout-hypertrophy-routing.module';

import { WorkoutHypertrophyPage } from './workout-hypertrophy.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    WorkoutHypertrophyPageRoutingModule
  ],
  declarations: [WorkoutHypertrophyPage]
})
export class WorkoutHypertrophyPageModule {}
