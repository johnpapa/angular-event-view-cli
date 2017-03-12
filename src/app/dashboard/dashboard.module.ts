import {NgModule} from '@angular/core';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MaterialModule} from '@angular/material';

import {DashboardButtonComponent} from './shared/dashboard-button/dashboard-button.component';
import {DashboardRoutingModule, routedComponents} from './dashboard-routing.module';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  imports: [FlexLayoutModule, MaterialModule, DashboardRoutingModule, SharedModule],
  declarations: [DashboardButtonComponent, routedComponents]
})
export class DashboardModule {
}
