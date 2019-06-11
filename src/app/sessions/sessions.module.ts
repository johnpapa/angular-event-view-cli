import { NgModule } from '@angular/core';

import { SessionButtonComponent } from './shared/session-button/session-button.component';

import { routedComponents, SessionsRoutingModule } from './sessions-routing.module';
import { SharedModule } from '../shared/shared.module';
import { SessionService } from './shared/session.service';

@NgModule({
  imports: [SessionsRoutingModule, SharedModule],
  declarations: [SessionButtonComponent, routedComponents],

  // We can put this service in the component or we can do it in the module.
  // This module is lazy loaded, so providing a service here
  // allows all features in this module to use it.
  // providers: [SessionService]
})
export class SessionsModule {}
