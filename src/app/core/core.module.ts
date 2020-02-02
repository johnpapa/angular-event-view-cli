import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NavComponent } from './nav/nav.component';

import { throwIfAlreadyLoaded } from './module-import-check';
import { ModalModule } from './modal/modal.module';
import { SpinnerModule } from './spinner/spinner.module';
import { ToastModule } from './toast/toast.module';
import { httpInterceptorProviders } from './interceptors';

/**
 * imports: imports the module's exports.
 * which is usually declarables and providers
 * in our case the spinner has no providers.
 *
 * exports: exports modules AND components/directives/pipes
 * that other modules may want to use
 */
@NgModule({
  imports: [
    CommonModule, // we use ngFor
    RouterModule, // because we use <router-outlet> and routerLink
    ModalModule,
    SpinnerModule,
    ToastModule
  ],
  exports: [ModalModule, SpinnerModule, ToastModule, NavComponent],
  declarations: [NavComponent],
  providers: [httpInterceptorProviders]
})
export class CoreModule {
  constructor(
    @Optional()
    @SkipSelf()
    parentModule: CoreModule
  ) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
