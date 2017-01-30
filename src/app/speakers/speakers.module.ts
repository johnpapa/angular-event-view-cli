import { NgModule } from '@angular/core';

import { SpeakerButtonComponent } from './shared/speaker-button/speaker-button.component';
import { SortSpeakersPipe } from './shared/sort-speakers.pipe';
import { SpeakersRoutingModule, routedComponents } from './speakers-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [SharedModule, SpeakersRoutingModule],
  declarations: [SpeakerButtonComponent, SortSpeakersPipe, routedComponents]
})
export class SpeakersModule { }
