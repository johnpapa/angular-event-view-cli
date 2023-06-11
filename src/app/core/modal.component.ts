import { Component, OnInit } from '@angular/core';

import { ModalService } from './modal.service';

const KEY_ESC = 27;

@Component({
  selector: 'ev-modal',
  template: `
    <div id="confirmationModal" class="dialog-container">
      <div class="mdl-card mdl-shadow--16dp">
        <h5>{{ title }}</h5>
        <p>{{ message }}</p>
        <div class="mdl-card__actions dialog-button-bar">
          <button
            class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect"
            id="cancelButton"
            data-upgraded=",MaterialButton,MaterialRipple"
          >
            {{ cancelText
            }}<span class="mdl-button__ripple-container"><span class="mdl-ripple"></span></span>
          </button>
          <button
            class="mdl-button mdl-button--accent mdl-button--raised mdl-js-button mdl-js-ripple-effect"
            id="okButton"
            data-upgraded=",MaterialButton,MaterialRipple"
          >
            {{ okText
            }}<span class="mdl-button__ripple-container"><span class="mdl-ripple"></span></span>
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .dialog-container,
      .loading-container {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        overflow: scroll;
        background: rgba(0, 0, 0, 0.4);
        z-index: 0;
        opacity: 0;
        -webkit-transition: opacity 400ms ease-in;
        -moz-transition: opacity 400ms ease-in;
        transition: opacity 400ms ease-in;
      }

      .dialog-container > div {
        position: relative;
        width: 90%;
        max-width: 500px;
        min-height: 25px;
        margin: 10% auto;
        z-index: 99999;
        padding: 16px 16px 0;
      }

      .dialog-button-bar {
        text-align: right;
        margin-top: 8px;
      }

      .loading-container > div {
        position: relative;
        width: 50px;
        height: 50px;
        margin: 10% auto;
        z-index: 99999;
      }

      .loading-container > div > div {
        width: 100%;
        height: 100%;
      }

      .dialog-container .dialog-button-bar button {
        margin: 0 0 0 1em;
      }
    `,
  ],
})
export class ModalComponent implements OnInit {
  title: string;
  message: string;
  okText: string;
  cancelText: string;
  negativeOnClick: (e: any) => void;
  positiveOnClick: (e: any) => void;

  private defaults = {
    title: 'Confirmation',
    message: 'Do you want to cancel your changes?',
    cancelText: 'Cancel',
    okText: 'OK',
  };
  private modalElement: any;
  private cancelButton: any;
  private okButton: any;

  constructor(modalService: ModalService) {
    modalService.activate = this.activate.bind(this);
  }

  activate(
    // title = this.defaults.title,
    message = this.defaults.message
    // cancelText = this.defaults.cancelText,
    // okText = this.defaults.okText
  ) {
    this.title = this.defaults.title;
    this.message = message;
    this.cancelText = this.defaults.cancelText;
    this.okText = this.defaults.okText;

    const promise = new Promise<boolean>((resolve, reject) => {
      this.negativeOnClick = (e: any) => resolve(false);
      this.positiveOnClick = (e: any) => resolve(true);
      this.show();
    });

    return promise;
  }

  ngOnInit() {
    this.modalElement = document.getElementById('confirmationModal');
    this.cancelButton = document.getElementById('cancelButton');
    this.okButton = document.getElementById('okButton');
  }

  private show() {
    document.onkeyup = null;

    if (!this.modalElement || !this.cancelButton || !this.okButton) {
      return;
    }

    this.modalElement.style.opacity = 0;
    this.modalElement.style.zIndex = 9999;

    this.cancelButton.onclick = (e: any) => {
      e.preventDefault();
      this.negativeOnClick(e);
      // if (!this.negativeOnClick(e)) {
      this.hideDialog();
      // }
    };

    this.okButton.onclick = (e: any) => {
      e.preventDefault();
      this.positiveOnClick(e);
      // if (!this.positiveOnClick(e)) {
      //   this.hideDialog();
      // }
    };

    this.modalElement.onclick = () => {
      this.hideDialog();
      return this.negativeOnClick(null);
    };

    document.onkeyup = (e: any) => {
      if (e.which === KEY_ESC) {
        this.hideDialog();
        return this.negativeOnClick(null);
      }
    };

    this.modalElement.style.opacity = 1;
  }

  private hideDialog() {
    document.onkeyup = null;
    this.modalElement.style.opacity = 0;
    window.setTimeout(() => (this.modalElement.style.zIndex = 0), 400);
  }
}
