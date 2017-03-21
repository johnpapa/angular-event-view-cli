import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/map';

import { Speaker } from './speaker.model';
import { CONFIG, ExceptionService, MessageService, SpinnerService } from '../core';

const speakersUrl = CONFIG.baseUrls.speakers;

@Injectable()
export class SpeakerService {
  onDbReset = this.messageService.state;

  constructor(private http: Http,
    private exceptionService: ExceptionService,
    private messageService: MessageService,
    private spinnerService: SpinnerService) {
    this.messageService.state.subscribe(state => this.getSpeakers());
  }

  addSpeaker(speaker: Speaker) {
    const body = JSON.stringify(speaker);
    this.spinnerService.show();
    return <Observable<Speaker>>this.http
      .post(`${speakersUrl}`, body)
      .map(res => res.json().data)
      .catch(this.exceptionService.catchBadResponse)
      .finally(() => this.spinnerService.hide());
  }

  deleteSpeaker(speaker: Speaker) {
    this.spinnerService.show();
    return <Observable<Speaker>>this.http
      .delete(`${speakersUrl}/${speaker.id}`)
      .map(res => this.extractData<Speaker>(res))
      .catch(this.exceptionService.catchBadResponse)
      .finally(() => this.spinnerService.hide());
  }

  getSpeakers() {
    this.spinnerService.show();
    return <Observable<Speaker[]>>this.http
      .get(speakersUrl)
      .map(res => this.extractData<Speaker[]>(res))
      .catch(this.exceptionService.catchBadResponse)
      .finally(() => this.spinnerService.hide());
  }

  getSpeaker(id: number) {
    this.spinnerService.show();
    return <Observable<Speaker>>this.http
      .get(`${speakersUrl}/${id}`)
      .map(res => this.extractData<Speaker>(res))
      .catch(this.exceptionService.catchBadResponse)
      .finally(() => this.spinnerService.hide());
  }

  updateSpeaker(speaker: Speaker) {
    const body = JSON.stringify(speaker);
    this.spinnerService.show();

    return <Observable<Speaker>>this.http
      .put(`${speakersUrl}/${speaker.id}`, body)
      .map(res => this.extractData<Speaker>(res))
      .catch(this.exceptionService.catchBadResponse)
      .finally(() => this.spinnerService.hide());
  }

  private extractData<T>(res: Response) {
    if (res.status < 200 || res.status >= 300) {
      throw new Error('Bad response status: ' + res.status);
    }
    const body = res.json ? res.json() : null;
    return <T>(body && body.data || {});
  }
}
