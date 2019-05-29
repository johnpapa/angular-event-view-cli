import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subject, Subscription } from 'rxjs';

import { Speaker, SpeakerService } from '../../core';
import { FilterTextComponent } from '../../shared/filter-text/filter-text.component';
import { FilterTextService } from '../../shared/filter-text/filter-text.service';

@Component({
  selector: 'ev-speaker-list',
  templateUrl: './speaker-list.component.html',
  styleUrls: ['./speaker-list.component.css']
})
export class SpeakerListComponent implements OnDestroy, OnInit {
  private subs = new Subscription();
  @ViewChild(FilterTextComponent, { static: true }) filterComponent: FilterTextComponent;
  speakers: Speaker[] = [];
  filteredSpeakers = this.speakers;

  constructor(private speakerService: SpeakerService, private filterService: FilterTextService) {}

  filterChanged(searchText: string) {
    this.filteredSpeakers = this.filterService.filter(
      searchText,
      ['id', 'name', 'twitter'],
      this.speakers
    );
  }

  getSpeakers() {
    this.speakers = [];

    this.speakerService.getSpeakers().subscribe(speakers => {
      this.speakers = this.filteredSpeakers = speakers;
      // this.filterComponent.clear();
    });
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  ngOnInit() {
    componentHandler.upgradeDom();
    this.getSpeakers();
    this.subs.add(this.speakerService.onDbReset.subscribe(() => this.getSpeakers()));
  }

  trackBySpeakers(index: number, speaker: Speaker) {
    return speaker.id;
  }
}
