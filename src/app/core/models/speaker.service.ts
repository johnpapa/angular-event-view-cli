import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchError, finalize, map } from 'rxjs/operators';

import { Speaker } from './speaker.model';
import { CONFIG } from '../../core/config';
import { ExceptionService } from '../exception.service';
import { MessageService } from '../message.service';
import { SpinnerService } from '../spinner/spinner.service';

const speakersUrl = CONFIG.baseUrls.speakers;

@Injectable()
export class SpeakerService {
  onDbReset = this.messageService.state;

  constructor(
    private http: HttpClient,
    private exceptionService: ExceptionService,
    private messageService: MessageService,
    private spinnerService: SpinnerService
  ) {
    this.messageService.state.subscribe(state => this.getSpeakers());
  }

  addSpeaker(speaker: Speaker): Observable<Speaker> {
    const body = JSON.stringify(speaker);
    this.spinnerService.show();
    return this.http
      .post<Speaker>(`${speakersUrl}`, body)
      .pipe(
        catchError(this.exceptionService.catchBadResponse),
        finalize(() => this.spinnerService.hide())
      );
  }

  deleteSpeaker(speaker: Speaker): Observable<Speaker> {
    this.spinnerService.show();
    return this.http
      .delete(`${speakersUrl}/${speaker.id}`)
      .pipe(
        catchError(this.exceptionService.catchBadResponse),
        finalize(() => this.spinnerService.hide())
      );
  }

  getSpeakers(): Observable<Speaker[]> {
    this.spinnerService.show();
    return this.http
      .get<Speaker[]>(speakersUrl)
      .pipe(
        map(speakers => this.sortSpeakers(speakers)),
        catchError(this.exceptionService.catchBadResponse),
        finalize(() => this.spinnerService.hide())
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
    return this.http
      .get<Speaker>(`${speakersUrl}/${id}`)
      .pipe(
        catchError(this.exceptionService.catchBadResponse),
        finalize(() => this.spinnerService.hide())
      );
  }

  updateSpeaker(speaker: Speaker): Observable<Speaker> {
    const body = JSON.stringify(speaker);
    this.spinnerService.show();

    return this.http
      .put<Speaker>(`${speakersUrl}/${speaker.id}`, body)
      .pipe(
        catchError(this.exceptionService.catchBadResponse),
        finalize(() => this.spinnerService.hide())
      );
  }
}
