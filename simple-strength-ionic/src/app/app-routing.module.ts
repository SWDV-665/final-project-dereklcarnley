import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'registration',
    loadChildren: () => import('./registration/registration.module').then( m => m.RegistrationPageModule)
  },
  {
    path: 'verify-email',
    loadChildren: () => import('./verify-email/verify-email.module').then( m => m.VerifyEmailPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then( m => m.DashboardPageModule)
  },
  {
    path: 'create-profile',
    loadChildren: () => import('./create-profile/create-profile.module').then( m => m.CreateProfilePageModule)
  },
  {
    path: 'view-profile',
    loadChildren: () => import('./view-profile/view-profile.module').then( m => m.ViewProfilePageModule)
  },
  {
    path: 'workout-tracking',
    loadChildren: () => import('./workout-tracking/workout-tracking.module').then( m => m.WorkoutTrackingPageModule)
  },
  {
    path: 'workout-strength',
    loadChildren: () => import('./workout-strength/workout-strength.module').then( m => m.WorkoutStrengthPageModule)
  },
  {
    path: 'workout-hypertrophy',
    loadChildren: () => import('./workout-hypertrophy/workout-hypertrophy.module').then( m => m.WorkoutHypertrophyPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
