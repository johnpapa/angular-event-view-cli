import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { SpinnerState, SpinnerService } from './spinner.service';

@Component({
  selector: 'ev-spinner',
  template: `
    <div
      class="spinner mdl-spinner mdl-js-spinner mdl-spinner--single-color"
      [class.is-active]="visible"
    ></div>
  `,
  styles: [
    `
      .spinner {
        position: absolute;
        left: 46%;
        top: 12%;
      }
    `
  ]
})
export class SpinnerComponent implements OnDestroy, OnInit {
  visible = false;
  private subs = new Subscription();

  constructor(private spinnerService: SpinnerService) {}

  ngOnInit() {
    componentHandler.upgradeDom();
    this.subs.add(
      this.spinnerService.spinnerState.subscribe(
        (state: SpinnerState) => (this.visible = state.show)
      )
    );
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
