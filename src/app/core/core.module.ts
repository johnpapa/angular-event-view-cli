import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { EntityService } from './entity.service';
import { ExceptionService } from './exception.service';
import { MessageService } from './message.service';
import { NavComponent } from './nav/nav.component';

import { throwIfAlreadyLoaded } from './module-import-guard';
import { ModalModule } from './modal/modal.module';
import { SpinnerModule } from './spinner/spinner.module';
import { ToastModule } from './toast/toast.module';
import {FlexLayoutModule} from '@angular/flex-layout';

// imports: imports the module's exports. which is usually declarables and providers
// in our case the spinner has no providers.
//
// exports: exports modules AND components/directives/pipes that other modules may want to use
@NgModule({
  imports: [
    CommonModule, // we use ngFor
    RouterModule, // because we use <router-outlet> and routerLink
    ModalModule, SpinnerModule, ToastModule,
    FlexLayoutModule
  ],
  exports: [ModalModule, SpinnerModule, ToastModule, NavComponent],
  declarations: [NavComponent],
  providers: [EntityService, ExceptionService, MessageService ]
})
export class CoreModule {
  constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
