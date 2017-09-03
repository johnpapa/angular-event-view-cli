import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/map';

import { Session } from './session.model';
import { CONFIG, ExceptionService, MessageService, SpinnerService } from '../../core';

const sessionsUrl = CONFIG.baseUrls.sessions;

@Injectable()
export class SessionService {
  onDbReset = this.messageService.state;

  constructor(
    private http: HttpClient,
    private exceptionService: ExceptionService,
    private messageService: MessageService,
    private spinnerService: SpinnerService
  ) {
    this.messageService.state.subscribe(state => this.getSessions());
  }

  addSession(session: Session): Observable<Session> {
    const body = JSON.stringify(session);
    this.spinnerService.show();
    return this.http
      .post<Session>(`${sessionsUrl}`, body)
      .catch(this.exceptionService.catchBadResponse)
      .finally(() => this.spinnerService.hide());
  }

  deleteSession(session: Session) {
    this.spinnerService.show();
    return <Observable<Session>>this.http
      .delete(`${sessionsUrl}/${session.id}`)
      .catch(this.exceptionService.catchBadResponse)
      .finally(() => this.spinnerService.hide());
  }

  getSessions(): Observable<Session[]> {
    this.spinnerService.show();
    return this.http
      .get<Session[]>(sessionsUrl)
      .map(sessions => this.sortSessions(sessions))
      .catch(this.exceptionService.catchBadResponse)
      .finally(() => this.spinnerService.hide());
  }

  sortSessions(sessions: Session[]) {
    return sessions.sort((a: Session, b: Session) => {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    });
  }

  getSession(id: number): Observable<Session> {
    this.spinnerService.show();
    return this.http
      .get<Session>(`${sessionsUrl}/${id}`)
      .catch(this.exceptionService.catchBadResponse)
      .finally(() => this.spinnerService.hide());
  }

  updateSession(session: Session): Observable<Session> {
    const body = JSON.stringify(session);
    this.spinnerService.show();

    return this.http
      .put<Session>(`${sessionsUrl}/${session.id}`, body)
      .catch(this.exceptionService.catchBadResponse)
      .finally(() => this.spinnerService.hide());
  }
}
