import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpModule, RequestOptions} from '@angular/http';
import {MaterialModule} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';

import { AppComponent } from './app.component';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryStoreService } from '../api/in-memory-store.service';
import { AppRoutingModule } from './app-routing.module';
import { SpeakerService } from './models';
import { PageNotFoundComponent } from './page-not-found.component';
import { CoreModule } from './core/core.module';
import { LoginModule } from './login/login.module';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    LoginModule,
    // Routes get loaded in order. It is important that login
    // come before AppRoutingModule, as
    // AppRoutingModule defines the catch-all ** route
    AppRoutingModule,
    CoreModule,
    InMemoryWebApiModule.forRoot(InMemoryStoreService, {delay: 600}),
    FlexLayoutModule,
    MaterialModule.forRoot(),
  ],
  declarations: [AppComponent, PageNotFoundComponent],
  providers: [SpeakerService],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(requestOptions: RequestOptions) {
    requestOptions.headers.set('Content-Type', 'application/json');
  }
}

