import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SpeakerListComponent } from './speaker-list/speaker-list.component';
import { SpeakerComponent } from './speaker/speaker.component';
import { SpeakersComponent } from './speakers.component';
import { canDeactivateGuard, isAuthenticatedGuard } from '../core';

const routes: Routes = [
  {
    path: '',
    component: SpeakersComponent,
    canActivateChild: [isAuthenticatedGuard],
    children: [
      { path: '', component: SpeakerListComponent },
      {
        path: ':id',
        component: SpeakerComponent,
        canDeactivate: [canDeactivateGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SpeakersRoutingModule {}

// This works too ... but let's be explicit, above
// export const SpeakersRoutingModule = RouterModule.forChild(routes);

export const routedComponents = [SpeakersComponent, SpeakerListComponent, SpeakerComponent];
