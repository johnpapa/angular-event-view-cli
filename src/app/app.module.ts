import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryStoreService } from '../api/in-memory-store.service';
import { AppRoutingModule } from './app-routing.module';
import { PageNotFoundComponent } from './page-not-found.component';
import { CoreModule } from './core/core.module';
import { LoginModule } from './login/login.module';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    LoginModule,
    // Routes get loaded in order.
    // It is important that login comes before AppRoutingModule,
    // as AppRoutingModule defines the catch-all ** route
    AppRoutingModule,
    CoreModule
    // InMemoryWebApiModule.forRoot(InMemoryStoreService, { delay: 10 })
  ],
  declarations: [AppComponent, PageNotFoundComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
