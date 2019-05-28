import { NgModule } from '@angular/core';
import { RouterModule, NoPreloading, Routes, PreloadAllModules } from '@angular/router';
import { AuthGuard, CanDeactivateGuard, UserProfileService } from './core';
import { PreloadSelectedModulesList, NetworkAwarePreloadStrategy } from './core/preload-strategy';
import { PageNotFoundComponent } from './page-not-found.component';

// Define the paths to the lazily loaded modules
const lazyPaths = {
  admin: 'app/admin/admin.module#AdminModule',
  dashboard: 'app/dashboard/dashboard.module#DashboardModule',
  speakers: 'app/speakers/speakers.module#SpeakersModule',
  sessions: 'app/sessions/sessions.module#SessionsModule'
};

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'dashboard'
  },
  {
    path: 'admin',
    loadChildren: lazyPaths.admin,
    canActivate: [AuthGuard],
    canLoad: [AuthGuard]
  },
  {
    path: 'dashboard',
    loadChildren: lazyPaths.dashboard
    // data: { preload: true }
  },
  {
    path: 'speakers',
    loadChildren: lazyPaths.speakers
    // data: { preload: true }
  },
  { path: 'sessions', loadChildren: lazyPaths.sessions },
  { path: '**', pathMatch: 'full', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: NetworkAwarePreloadStrategy
    })
  ],
  exports: [RouterModule],
  providers: [AuthGuard, CanDeactivateGuard, UserProfileService]
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
