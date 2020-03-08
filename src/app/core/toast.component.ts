import { Component, OnDestroy, OnInit } from '@angular/core';
import { ToastService } from './toast.service';

import { Subscription } from 'rxjs';

@Component({
  selector: 'ev-toast',
  template: `
    <div id="toast" class="toast-container">
      <div class="toast-card mdl-shadow--16dp">
        <h5 class="toast-title">{{ title }}</h5>
        <p class="toast-message">{{ message }}</p>
      </div>
    </div>
  `,
  styles: [
    `
      .toast-container {
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        overflow: scroll;
        background: rgba(0, 0, 0, 0.4);
        z-index: 9999;
        opacity: 0;

        -webkit-transition: opacity 400ms ease-in;
        -moz-transition: opacity 400ms ease-in;
        transition: opacity 400ms ease-in;
      }

      .toast-container > * {
        text-align: center;
      }

      .toast-card {
        width: 100%;
        z-index: 1;
        padding: 2px;
        position: relative;
        background-color: rgb(255, 64, 129);
        background-color: #f06292;
        background-color: rgb(103, 58, 183);
        background-color: rgb(83, 109, 254);
        text-align: center;
        color: white;
      }

      .toast-card .toast-message {
        margin: 0em 2em 1em 2em;
      }

      .toast-card .toast-title {
        text-transform: uppercase;
        margin: 16px;
        font-size: 18px;
      }
    `
  ]
})
export class ToastComponent implements OnDestroy, OnInit {
  private subs = new Subscription();
  private defaults = {
    title: '',
    message: 'May the Force be with You'
  };
  private toastElement: any;

  title: string;
  message: string;

  constructor(private toastService: ToastService) {
    this.subs.add(
      this.toastService.toastState.subscribe(toastMessage => {
        console.log(`activiting toast: ${toastMessage.message}`);
        this.activate(toastMessage.message);
      })
    );
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
    this.subs.unsubscribe();
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
