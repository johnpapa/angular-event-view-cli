import { NgModule } from '@angular/core';

import { DashboardButtonComponent } from './shared/dashboard-button/dashboard-button.component';
import { DashboardRoutingModule, routedComponents } from './dashboard-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [DashboardRoutingModule, SharedModule],
  declarations: [DashboardButtonComponent, routedComponents]
})
export class DashboardModule { }
