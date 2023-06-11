import { Routes } from '@angular/router';
import { isAuthenticatedGuard, authLoadGuard, PageNotFoundComponent } from './core';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then((m) => m.AdminModule),
    canMatch: [authLoadGuard],
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
    data: { preload: true },
  },
  {
    path: 'speakers',
    loadChildren: () => import('./speakers/speakers.module').then((m) => m.SpeakersModule),
    data: { preload: true },
  },
  {
    path: 'sessions',
    loadChildren: () => import('./sessions/sessions.module').then((m) => m.SessionsModule),
    data: { preload: true },
  },
  { path: '**', pathMatch: 'full', component: PageNotFoundComponent },
];
