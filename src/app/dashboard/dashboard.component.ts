import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of, Subject, Subscription } from 'rxjs';
import { catchError, tap, takeUntil } from 'rxjs/operators';

import { Speaker, SpeakerService, ToastService } from '../core';
import { WhenReadyPreloadStrategy, PreloadExecutioner } from 'app/core/preload-strategy';

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
  speakers$: Observable<Speaker[]>;
  title: string;

  private onDestroy = new Subject();
  private dbResetSubscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private speakerService: SpeakerService,
    private router: Router,
    private toastService: ToastService,
    private preloadExecutionerService: PreloadExecutioner
  ) {}

  makeItSo() {
    this.preloadExecutionerService.makeItSo();
  }

  getSpeakers() {
    this.speakers$ = this.speakerService.getSpeakers().pipe(
      tap(() => this.toastService.activate('Got speakers for the dashboard')),
      catchError(e => {
        this.toastService.activate(`${e}`);
        return of([]);
      })
    );
  }

  gotoDetail(speaker: Speaker) {
    const link = ['/speakers', speaker.id];
    this.router.navigate(link);
  }

  ngOnDestroy() {
    this.onDestroy.next(true);
    // this.dbResetSubscription.unsubscribe();
  }

  ngOnInit() {
    this.route.data.subscribe((data: { title: string }) => {
      this.title = data.title;
    });
    this.getSpeakers();
    this.dbResetSubscription = this.speakerService.onDbReset
      .pipe(takeUntil(this.onDestroy))
      .subscribe(() => this.getSpeakers());
  }

  trackBySpeakers(index: number, speaker: Speaker) {
    return speaker.id;
  }
}
