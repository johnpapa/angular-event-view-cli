import { NgModule } from '@angular/core';
import { PreloadAllModules, NoPreloading, Routes, RouterModule } from '@angular/router';

import { AuthGuard, CanDeactivateGuard, UserProfileService } from './core';
import { PageNotFoundComponent } from './page-not-found.component';
import { PreloadSelectedModulesList } from './core/preload-strategy';

/***************************************************************
* Lazy Loading to Eager Loading
*
* 1. Add the module and NgModule imports in `app.module.ts`
*
* 2. Remove the lazy load route from `app.routing.ts`
*
* 3. Change the module's default route path from '' to 'pathname'
*****************************************************************/
export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'dashboard', },
  {
    path: 'admin',
    loadChildren: 'app/admin/admin.module#AdminModule',
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
  },
  {
    path: 'dashboard', loadChildren: 'app/dashboard/dashboard.module#DashboardModule',
    data: { preload: true }
  },
  {
    path: 'speakers', loadChildren: 'app/speakers/speakers.module#SpeakersModule',
    data: { preload: true }
  },
  { path: 'sessions', loadChildren: 'app/sessions/sessions.module#SessionsModule' },
  { path: '**', pathMatch: 'full', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes,
    { preloadingStrategy: PreloadSelectedModulesList }
  )],
  exports: [RouterModule],
  providers: [
    AuthGuard,
    CanDeactivateGuard,
    PreloadSelectedModulesList,
    UserProfileService
  ]
})
export class AppRoutingModule { }
