import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WorkoutGeneralPage } from './workout-general.page';

const routes: Routes = [
  {
    path: '',
    component: WorkoutGeneralPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WorkoutGeneralPageRoutingModule {}
