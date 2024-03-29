import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SessionListComponent } from './session-list/session-list.component';
import { SessionComponent } from './session/session.component';
import { SessionsComponent } from './sessions.component';
import { SessionResolver } from './shared/session-resolver.service';
import { canDeactivateGuard, isAuthenticatedGuard } from '../core';

const routes: Routes = [
  {
    path: '',
    component: SessionsComponent,
    canActivateChild: [isAuthenticatedGuard],
    children: [
      {
        path: '',
        component: SessionListComponent,
      },
      {
        path: ':id',
        component: SessionComponent,
        canDeactivate: [canDeactivateGuard],
        resolve: {
          session: SessionResolver,
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SessionsRoutingModule {}

export const routedComponents = [SessionsComponent, SessionListComponent, SessionComponent];
