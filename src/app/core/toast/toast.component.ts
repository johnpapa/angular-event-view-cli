import { Component, OnDestroy, OnInit } from '@angular/core';
import { ToastService } from './toast.service';

import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'ev-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css']
})
export class ToastComponent implements OnDestroy, OnInit {
  private defaults = {
    title: '',
    message: 'May the Force be with You'
  };
  private toastElement: any;
  private toastSubscription: Subscription;
  private onDestroy = new Subject();

  title: string;
  message: string;

  constructor(private toastService: ToastService) {
    this.toastSubscription = this.toastService.toastState
      .pipe(takeUntil(this.onDestroy))
      .subscribe(toastMessage => {
        console.log(`activiting toast: ${toastMessage.message}`);
        this.activate(toastMessage.message);
      });
  }

  activate(message = this.defaults.message, title = this.defaults.title) {
    this.title = title;
    this.message = message;
    this.show();
  }

  ngOnInit() {
    this.toastElement = document.getElementById('toast');
  }

  ngOnDestroy() {
    this.onDestroy.next(true);
    // this.toastSubscription.unsubscribe();
  }

  private show() {
    console.log(this.message);
    this.toastElement.style.opacity = 1;
    this.toastElement.style.zIndex = 9999;

    window.setTimeout(() => this.hide(), 2500);
  }

  private hide() {
    this.toastElement.style.opacity = 0;
    window.setTimeout(() => (this.toastElement.style.zIndex = 0), 400);
  }
}
