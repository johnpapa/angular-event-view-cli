import { NgModule } from '@angular/core';

import { SpeakerButtonComponent } from './shared/speaker-button/speaker-button.component';
import { SpeakersRoutingModule, routedComponents } from './speakers-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [SharedModule, SpeakersRoutingModule],
  declarations: [SpeakerButtonComponent, routedComponents]
})
export class SpeakersModule {}
