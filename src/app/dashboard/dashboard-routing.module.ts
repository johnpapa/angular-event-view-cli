import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import {MaterialModule} from '@angular/material';

const routes: Routes = [
  { path: '', component: DashboardComponent, data: {title: 'Top Speakers'} },
];

@NgModule({
  imports: [MaterialModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule { }

export const routedComponents = [DashboardComponent];
