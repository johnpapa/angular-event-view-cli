import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/takeuntil';

import { Speaker, SpeakerService } from '../models';
import { ToastService } from '../core';

@Component({
  selector: 'ev-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnDestroy, OnInit {
  /**
   * Here we are using an Observable<> so we can use the async pipe in the
   * template. Whether you use the async pipe or not, be consistent.
   */
  speakers: Observable<Speaker[]>;
  title: string;

  private destroyed: Subject<boolean> = new Subject();
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
    this.destroyed.next(true);
    // this.dbResetSubscription.unsubscribe();
  }

  ngOnInit() {
    this.route.data.subscribe((data: { title: string }) => {
      this.title = data.title;
    });
    this.getSpeakers();
    this.dbResetSubscription = this.speakerService.onDbReset
      .takeUntil(this.destroyed)
      .subscribe(() => this.getSpeakers());
  }

  trackBySpeakers(index: number, speaker: Speaker) {
    return speaker.id;
  }
}
