import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, finalize, map } from 'rxjs/operators';

import { Speaker } from './speaker.model';
import { CONFIG } from '../../core/config';
import { ExceptionService } from '../exception.service';
import { MessageService } from '../message.service';
import { SpinnerService } from '../spinner/spinner.service';

const speakersUrl = CONFIG.baseUrls.speakers;

@Injectable({ providedIn: 'root' })
export class SpeakerService {
  onDbReset = this.messageService.state;

  // const catchHttpErrors = () => <T>(source$: Observable<T>) =>
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
    this.messageService.state.subscribe(state => this.getSpeakers());
  }

  addSpeaker(speaker: Speaker): Observable<Speaker> {
    this.spinnerService.show();
    return this.http.post<Speaker>(`${speakersUrl}`, speaker).pipe(this.catchHttpErrors());
  }

  deleteSpeaker(speaker: Speaker): Observable<Speaker> {
    this.spinnerService.show();
    return this.http.delete(`${speakersUrl}/${speaker.id}`).pipe(this.catchHttpErrors());
  }

  getSpeakers(): Observable<Speaker[]> {
    this.spinnerService.show();
    return this.http.get<Speaker[]>(speakersUrl).pipe(
      map(speakers => this.sortSpeakers(speakers)),
      this.catchHttpErrors()
    );
  }

  sortSpeakers(speakers: Speaker[]) {
    return speakers.sort((a: Speaker, b: Speaker) => {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    });
  }

  getSpeaker(id: number) {
    this.spinnerService.show();
    return this.http.get<Speaker[]>(speakersUrl).pipe(
      map(speakers => speakers.find(speaker => speaker.id === id)),
      this.catchHttpErrors()
    );
    /**
     * TODO:
     *  When using JSON, we need the map above.
     *  When using a DB, we use http, as shown below
     */
    // return this.http.get<Speaker>(`${speakersUrl}/${id}`).pipe(this.catchHttpErrors());
  }

  updateSpeaker(speaker: Speaker): Observable<Speaker> {
    this.spinnerService.show();

    return this.http
      .put<Speaker>(`${speakersUrl}/${speaker.id}`, speaker)
      .pipe(this.catchHttpErrors());
  }
}
