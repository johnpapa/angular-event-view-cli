import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/of';

import { Speaker, SpeakerService } from '../models';
import { ToastService } from '../core';

@Component({
  selector: 'ev-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnDestroy, OnInit {
  speakers: Observable<Speaker[]>;
  title: string;

  private dbResetSubscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private speakerService: SpeakerService,
    private router: Router,
    private toastService: ToastService) { }

  getSpeakers() {
    this.speakers = this.speakerService.getSpeakers()
      .do(() => this.toastService.activate('Got speakers for the dashboard'))
      .catch(e => {
        this.toastService.activate(`${e}`);
        return Observable.of([]);
      });
  }

  gotoDetail(speaker: Speaker) {
    const link = ['/speakers', speaker.id];
    this.router.navigate(link);
  }

  ngOnDestroy() {
    this.dbResetSubscription.unsubscribe();
  }

  ngOnInit() {
    this.route.data.subscribe((data: { title: string }) => {
      this.title = data.title;
    });
    this.getSpeakers();
    this.dbResetSubscription = this.speakerService.onDbReset
      .subscribe(() => this.getSpeakers());
  }

  trackBySpeakers(index: number, speaker: Speaker) {
    return speaker.id;
  }
}
