import {Component, OnDestroy} from '@angular/core';
import {ObservableMedia, MediaChange} from '@angular/flex-layout';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector : 'media-query-status',
  template : `
    <div class="mqInfo" >
      <span title="Active MediaQuery">{{  activeMediaQuery }}</span>
    </div>
  `,
  styles : [
    ` .mqInfo {
      padding-left: 5px;
      margin-bottom: 25px;
      margin-top: -15px;
    }`,
    ` .mqInfo > span {
      padding-left: 0px;
      color: rgba(0, 0, 0, 0.54);
    }`,
    ` .mqInfo > span:before {
      content: attr(title) ": ";
    }`
  ]
})
export class MediaQueryStatus implements OnDestroy {
  private _watcher : Subscription;
  activeMediaQuery : string;

  constructor(media$ : ObservableMedia) { this.watchMediaQueries(media$); }

  ngOnDestroy() {
    this._watcher.unsubscribe();
  }

  private watchMediaQueries(media$:ObservableMedia) {
    this._watcher = media$.subscribe((change: MediaChange) => {
      let value = change ? `'${change.mqAlias}' = (${change.mediaQuery})` : "";
      this.activeMediaQuery = value;
    });
  }
}
