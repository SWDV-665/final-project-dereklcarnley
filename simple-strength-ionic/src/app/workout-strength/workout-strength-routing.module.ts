import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WorkoutStrengthPage } from './workout-strength.page';

const routes: Routes = [
  {
    path: '',
    component: WorkoutStrengthPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WorkoutStrengthPageRoutingModule {}
