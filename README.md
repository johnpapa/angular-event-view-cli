This is a fork of John Papa's **[StoryTracker Angular CLI](https://github.com/johnpapa/angular-event-view-cli)** repository.

### Adaptive UX

This repository uses the **[@angular/flex-layout](http://www.github.com/angular/flex-layout)** library to easily support both responsive and adaptive layouts; resulting in 90% reduction in hand-crafted **`@media{...}`** CSS,

**Adapative Dashboards**

```html
<div fxLayout="column" fxFlex="auto">
  <ev-nav></ev-nav>
  <article class="template animated slideInRight">

    <h4 [ngStyle.xs]="{'margin': '48px 0 16px'}">{{title}}</h4>
    <media-query-status></media-query-status>

    <div fxLayout="row wrap" fxLayoutAlign >
      <div ngStyle.xs="{'margin': '0.5em auto'}"
           fxFlex.xs="calc(50% -16px)" fxFlex.sm="33%" fxFlex="calc(25% - 16px)"
           *ngFor="let speaker of speakers | async; trackBy:trackBySpeakers"
           (click)="gotoDetail(speaker)">
        <button ngClass="dashboard-button" ngClass.xs="mobile" ngClass.sm="tablet">
          {{speaker.name}}
        </button>
      </div>
    </div>

  </article>
</div>
```

<a href="https://github.com/ThomasBurleson/angular-event-view-cli/blob/master/src/app/dashboard/dashboard.component.html#L4-L6">
  <img src="https://cloud.githubusercontent.com/assets/210413/23834061/d953cfaa-071d-11e7-9390-40ac52a3fbf5.png">
</a>

