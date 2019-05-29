import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core';
import { OnDemandPreloadStrategy } from './core/strategies/on-demand-preload-strategy';
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

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: OnDemandPreloadStrategy })],
  exports: [RouterModule]
})
export class AppRoutingModule {}

/***************************************************************
 * Lazy Loading to Eager Loading
 *
 * 1. Add the module and NgModule imports in `app.module.ts`
 *
 * 2. Remove the lazy load route from `app-routing.module.ts`
 *
 * 3. Change the lazy loaded module's default route path
 *    from '' to 'pathname'
 *****************************************************************/
