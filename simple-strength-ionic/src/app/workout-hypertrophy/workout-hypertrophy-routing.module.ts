import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WorkoutHypertrophyPage } from './workout-hypertrophy.page';

const routes: Routes = [
  {
    path: '',
    component: WorkoutHypertrophyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WorkoutHypertrophyPageRoutingModule {}
