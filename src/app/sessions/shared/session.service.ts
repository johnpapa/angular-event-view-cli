import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, finalize, map } from 'rxjs/operators';

import { Session } from './session.model';
import { CONFIG, ExceptionService, MessageService, SpinnerService } from '../../core';

const sessionsUrl = CONFIG.baseUrls.sessions;

@Injectable({ providedIn: 'root' })
export class SessionService {
  onDbReset = this.messageService.state;

  private catchHttpErrors = () => (source$: Observable<any>) =>
    source$.pipe(
      catchError(this.exceptionService.catchBadResponse),
      finalize(() => this.spinnerService.hide())
    );

  constructor(
    private http: HttpClient,
    private exceptionService: ExceptionService,
    private messageService: MessageService,
    private spinnerService: SpinnerService
  ) {
    this.messageService.state.subscribe(state => this.getSessions());
  }

  addSession(session: Session): Observable<Session> {
    this.spinnerService.show();
    return this.http.post<Session>(`${sessionsUrl}`, session).pipe(this.catchHttpErrors());
  }

  deleteSession(session: Session) {
    this.spinnerService.show();
    return <Observable<Session>>(
      this.http.delete(`${sessionsUrl}/${session.id}`).pipe(this.catchHttpErrors())
    );
  }

  getSessions(): Observable<Session[]> {
    this.spinnerService.show();
    return this.http.get<Session[]>(sessionsUrl).pipe(
      map(sessions => this.sortSessions(sessions)),
      this.catchHttpErrors()
    );
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
    return this.http.get<Session>(`${sessionsUrl}/${id}`).pipe(this.catchHttpErrors());
  }

  updateSession(session: Session): Observable<Session> {
    this.spinnerService.show();

    return this.http
      .put<Session>(`${sessionsUrl}/${session.id}`, session)
      .pipe(this.catchHttpErrors());
  }
}
