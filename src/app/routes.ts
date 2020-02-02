import { Routes } from '@angular/router';
import { AuthGuard } from './core';
import { PageNotFoundComponent } from './page-not-found.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
  {
    path: 'admin',
    loadChildren: () => import('app/admin/admin.module').then(m => m.AdminModule),
    canActivate: [AuthGuard],
    canLoad: [AuthGuard]
  },
  {
    path: 'dashboard',
    loadChildren: () => import('app/dashboard/dashboard.module').then(m => m.DashboardModule),
    data: { preload: true }
  },
  {
    path: 'speakers',
    loadChildren: () => import('app/speakers/speakers.module').then(m => m.SpeakersModule),
    data: { preload: true }
  },
  {
    path: 'sessions',
    loadChildren: () => import('app/sessions/sessions.module').then(m => m.SessionsModule),
    data: { preload: true }
  },
  { path: '**', pathMatch: 'full', component: PageNotFoundComponent }
];
