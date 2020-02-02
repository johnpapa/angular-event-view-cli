import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

import { CONFIG } from './config';
import { ToastService } from './toast/toast.service';

export interface ResetMessage {
  message: string;
}

@Injectable({ providedIn: 'root' })
export class MessageService {
  private subject = new Subject<ResetMessage>();

  state = this.subject.asObservable();

  constructor(private http: HttpClient, private toastService: ToastService) {}

  resetDb() {
    const msg = 'Reset the Data Successfully';
    this.http.post(CONFIG.baseUrls.resetDb, null).subscribe(() => {
      this.subject.next({ message: msg });
      this.toastService.activate(msg);
    });
  }
}
