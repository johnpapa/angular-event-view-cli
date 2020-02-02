import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, NoPreloading } from '@angular/router';

import { AppComponent } from './app.component';
import { routes } from './routes';
import { PageNotFoundComponent } from './page-not-found.component';
import { CoreModule } from './core/core.module';
import { LoginModule } from './login/login.module';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryStoreService } from '../api/in-memory-store.service';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    LoginModule,

    // Routes get loaded in order.
    // It is important that login comes before AppRoutingModule,
    // as AppRoutingModule defines the catch-all ** route
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
      { preloadingStrategy: NoPreloading }
    ),
    CoreModule
    // InMemoryWebApiModule.forRoot(InMemoryStoreService, { delay: 10 })
  ],
  declarations: [AppComponent, PageNotFoundComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
