import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';

import { Speaker, SpeakerService } from '../../core';
import { FilterTextComponent } from '../../shared/filter-text/filter-text.component';
import { FilterTextService } from '../../shared/filter-text/filter-text.service';

@Component({
  selector: 'ev-speaker-list',
  templateUrl: './speaker-list.component.html',
  styleUrls: ['./speaker-list.component.css'],
})
export class SpeakerListComponent implements OnDestroy, OnInit {
  @ViewChild(FilterTextComponent) filterComponent: FilterTextComponent;
  speakers: Speaker[] = [];
  filteredSpeakers = this.speakers;

  private dbResetSubscription: Subscription;
  private onDestroy = new Subject();

  constructor(private speakerService: SpeakerService,
    private filterService: FilterTextService) { }

  filterChanged(searchText: string) {
    this.filteredSpeakers = this.filterService.filter(searchText, ['id', 'name', 'twitter'], this.speakers);
  }

  getSpeakers() {
    this.speakers = [];

    this.speakerService.getSpeakers()
      .subscribe(speakers => {
        this.speakers = this.filteredSpeakers = speakers;
        // this.filterComponent.clear();
      });
  }

  ngOnDestroy() {
    this.onDestroy.next(true);
    // this.dbResetSubscription.unsubscribe();
  }

  ngOnInit() {
    componentHandler.upgradeDom();
    this.getSpeakers();
    this.dbResetSubscription = this.speakerService.onDbReset
      .takeUntil(this.onDestroy)
      .subscribe(() => this.getSpeakers());
  }

  trackBySpeakers(index: number, speaker: Speaker) {
    return speaker.id;
  }
}
