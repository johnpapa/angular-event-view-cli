import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';

import { throwIfAlreadyLoaded } from '../module-import-guard';
import { ToastComponent } from './toast.component';
import { ToastService } from './toast.service';

@NgModule({
  imports: [CommonModule],
  exports: [ToastComponent],
  declarations: [ToastComponent],
  providers: [ToastService]
})
export class ToastModule {
  constructor(@Optional() @SkipSelf() parentModule: ToastModule) {
    throwIfAlreadyLoaded(parentModule, 'ToastModule')
  }
}
