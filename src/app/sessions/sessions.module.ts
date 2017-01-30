import { NgModule } from '@angular/core';

import { SessionButtonComponent } from './shared/session-button/Session-button.component';

import { routedComponents, SessionsRoutingModule } from './sessions-routing.module';
import { SharedModule } from '../shared/shared.module';
import { SessionService } from './shared/session.service';

@NgModule({
  imports: [SessionsRoutingModule, SharedModule],
  declarations: [SessionButtonComponent, routedComponents],

  // We can put this in the component or we can do it in the module.
  // In the module, everyone gets it everywhere.
  providers: [SessionService]
})
export class SessionsModule { }
// avoids having to lazy load with loadChildren: "app/sessions/session.module#SessionModule"
