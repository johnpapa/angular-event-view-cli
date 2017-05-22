import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';

import { FilterTextComponent } from '../../shared/filter-text/filter-text.component';
import { FilterTextService } from '../../shared/filter-text/filter-text.service';
import { Session } from '../shared/session.model';
import { SessionService } from '../shared/session.service';

@Component({
  selector: 'ev-session-list',
  templateUrl: './session-list.component.html',
  styleUrls: ['./session-list.component.css']
})
export class SessionListComponent implements OnDestroy, OnInit {
  sessions: Session[];
  filteredSessions = this.sessions;
  @ViewChild(FilterTextComponent) filterComponent: FilterTextComponent;

  private onDestroy = new Subject();
  private dbResetSubscription: Subscription;

  constructor(
    private filterService: FilterTextService,
    private sessionService: SessionService) { }

  filterChanged(searchText: string) {
    const props = ['id', 'name', 'level'];
    this.filteredSessions = this.filterService.filter(searchText, props, this.sessions);
  }

  getSessions() {
    this.sessions = [];
    this.sessionService.getSessions()
      .subscribe(sessions => {
        this.sessions = this.filteredSessions = sessions;
        this.filterComponent.clear();
      },
      error => {
        console.log('error occurred here');
        console.log(error);
      },
       () => {
        console.log('session retrieval completed');
      });
  }

  ngOnDestroy() {
    this.onDestroy.next(true);
    // this.dbResetSubscription.unsubscribe();
  }

  ngOnInit() {
    componentHandler.upgradeDom();
    this.getSessions();
    this.dbResetSubscription = this.sessionService.onDbReset
      .takeUntil(this.onDestroy)
      .subscribe(() => this.getSessions());
  }

  trackBySessions(index: number, session: Session) {
    return session.id;
  }
}
