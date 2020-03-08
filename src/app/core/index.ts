import { ModalComponent } from './modal.component';
import { NavComponent } from './nav.component';
import { PageNotFoundComponent } from './page-not-found.component';
import { SpinnerComponent } from './spinner.component';
import { ToastComponent } from './toast.component';

export * from './guards/auth.guard';
export * from './guards/can-deactivate.guard';
export * from './config';
export * from './entity.service';
export * from './exception.service';
export * from './message.service';
export * from './modal.component';
export * from './modal.service';
export * from './models';
export * from './nav.component';
export * from './page-not-found.component';
export * from './spinner.component';
export * from './spinner.service';
export * from './interceptors';
export * from './toast.component';
export * from './toast.service';
export * from './strategies';
export * from './user-profile.service';

export const declarations = [
  ModalComponent,
  NavComponent,
  PageNotFoundComponent,
  SpinnerComponent,
  ToastComponent
];
