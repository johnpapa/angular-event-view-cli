import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';

import { CanComponentDeactivate, EntityService, ModalService, ToastService } from '../../core';
import { Session } from '../shared/session.model';
import { SessionService } from '../shared/session.service';

@Component({
  selector: 'ev-session',
  templateUrl: 'session.component.html',
  styleUrls: ['session.component.css']
})
export class SessionComponent implements OnDestroy, OnInit, CanComponentDeactivate {
  private subs = new Subscription();
  @Input() session: Session;
  editSession: Session = <Session>{};

  private id: any;

  constructor(
    private entityService: EntityService,
    private modalService: ModalService,
    private route: ActivatedRoute,
    private router: Router,
    private sessionService: SessionService,
    private toastService: ToastService
  ) {}

  cancel(showToast = true) {
    this.editSession = this.entityService.clone(this.session);
    if (showToast) {
      this.toastService.activate(`Cancelled changes to ${this.session.name}`);
    }
  }

  canDeactivate() {
    return !this.session || !this.isDirty() || this.modalService.activate();
  }

  delete() {
    const msg = `Do you want to delete the ${this.session.name}?`;
    this.modalService.activate(msg).then(responseOK => {
      if (responseOK) {
        this.cancel(false);
        this.sessionService.deleteSession(this.session).subscribe(
          () => {
            // Success path
            this.toastService.activate(`Deleted ${this.session.name}`);
            this.gotoSessions();
          },
          err => this.handleServiceError('Delete', err), // Failure path
          () => console.log('Delete Completed') // Completed actions
        );
      }
    });
  }

  isAddMode() {
    return isNaN(this.id);
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  ngOnInit() {
    componentHandler.upgradeDom();
    this.subs.add(this.sessionService.onDbReset.subscribe(() => this.getSession()));

    // ** Could use a snapshot here, as long as the parameters do not change.
    // ** This may happen when a component is re-used, such as fwd/back.
    // this.id = +this.route.snapshot.paramMap.get('id');
    //
    // ** We could use a subscription to get the parameter, too.
    // ** The ActivatedRoute gets unsubscribed
    // this.route
    //   .paramMap
    //   .pipe()
    //     map(params => params.get('id')),
    //     tap(id => this.id = +id)
    //   )
    //   .subscribe(id => this.getSession());
    //
    // ** Instead we will use a Resolve(r)
    this.route.data.subscribe((data: { session: Session }) => {
      this.setEditSession(data.session);
      this.id = this.session.id;
    });
  }

  save() {
    const session = (this.session = this.entityService.merge(this.session, this.editSession));
    if (session.id == null) {
      this.sessionService.addSession(session).subscribe(s => {
        this.setEditSession(s);
        this.toastService.activate(`Successfully added ${s.name}`);
        this.gotoSessions();
      });
      return;
    }
    this.sessionService
      .updateSession(this.session)
      .subscribe(() => this.toastService.activate(`Successfully saved ${this.session.name}`));
  }

  private getSession() {
    if (this.id === 0) {
      return;
    }
    if (this.isAddMode()) {
      this.session = <Session>{ name: '', level: '' };
      this.editSession = this.entityService.clone(this.session);
      return;
    }
    this.sessionService
      .getSession(this.id)
      .subscribe((session: Session) => this.setEditSession(session));
  }

  private gotoSessions() {
    this.router.navigate(['/sessions']);
  }

  private handleServiceError(op: string, err: any) {
    console.error(`${op} error: ${err.message || err}`);
  }

  private isDirty() {
    return this.entityService.propertiesDiffer(this.session, this.editSession);
  }

  private setEditSession(session: Session) {
    if (session) {
      this.session = session;
      this.editSession = this.entityService.clone(this.session);
    } else {
      this.gotoSessions();
    }
  }
}
