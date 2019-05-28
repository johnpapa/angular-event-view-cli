import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';

import { SpinnerState, SpinnerService } from './spinner.service';

@Component({
  selector: 'ev-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
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
