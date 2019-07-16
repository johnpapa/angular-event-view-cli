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
  imports: [
    RouterModule.forRoot(
      routes,
      /**
       * Preloading strategies:
       *  - https://angular.io/guide/router#custom-preloading-strategy
       *
       * NoPreloading
       *  - No bundles will preload
       *  - built-in strategy
       *
       * PreloadAllModules
       *  - All bundles will preload, automatically
       *  - built-in strategy
       *  - https://dev.to/angular/preload-all-angular-bundles-1b6l
       *
       * OptInPreloadStrategy
       *  - set data.preload to true/false in the route configuration
       *  - custom strategy
       *  - https://dev.to/angular/you-pick-which-angular-bundles-to-preload-5l9
       *
       * NetworkAwarePreloadStrategy
       *  - Customize which connections types to avoid
       *    ['slow-2g', '2g', '3g', '4g' ]
       *  - custom strategy
       *  - https://dev.to/angular/preload-angular-bundles-when-good-network-connectivity-is-detected-j3a
       *
       * OnDemandPreloadStrategy
       *  - Only preload when a specific event occurs.
       *  - You control when it preloads and what preloads.
       *    - Preload everything
       *      this.preloadOnDemandService.startPreload('*');
       *    - Preload a specific bundle
       *      this.preloadOnDemandService.startPreload(routePath);
       *  - custom strategy
       *  - https://dev.to/angular/predictive-preloading-strategy-for-your-angular-bundles-4bgl
       *
       */

      { preloadingStrategy: OnDemandPreloadStrategy }
    )
  ],
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
