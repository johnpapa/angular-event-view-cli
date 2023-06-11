import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ModalService {
  activate: (message?: string) => Promise<boolean>;
}
