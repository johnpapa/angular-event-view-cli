import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeuntil';

import { SpinnerState, SpinnerService } from './spinner.service';

@Component({
  selector: 'ev-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent implements OnDestroy, OnInit {
  visible = false;
  private destroyed: Subject<boolean> = new Subject();

  private spinnerStateChanged: Subscription;

  constructor(private spinnerService: SpinnerService) { }

  ngOnInit() {
    componentHandler.upgradeDom();
    this.spinnerStateChanged = this.spinnerService.spinnerState
      .takeUntil(this.destroyed)
      .subscribe((state: SpinnerState) => this.visible = state.show);
  }

  ngOnDestroy() {
    this.destroyed.next(true);
    // this.spinnerStateChanged.unsubscribe();
  }
}
