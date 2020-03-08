import { Component, OnInit } from '@angular/core';

import { ModalService } from './modal.service';
import { MessageService } from './message.service';
import { OnDemandPreloadService } from './strategies';

class MenuItem {
  constructor(public caption: string, public path: string, public link: string) {}
}

@Component({
  selector: 'ev-nav',
  template: `
    <header class="mdl-layout__header">
      <div class="mdl-layout__header-row">
        <a class="md-title-icon" href="http://angular.io" target="_blank"><i></i></a>
        <h1 class="mdl-layout-title">Event View</h1>
        <div class="nav-buttons-right">
          <button
            class="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--accent mdl-button--raised"
            (click)="preloadAll()"
          >
            Preload All
          </button>
          <button
            class="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--accent mdl-button--raised"
            (click)="resetDb()"
          >
            Reset Data
          </button>
        </div>
      </div>
      <div class="mdl-navigation">
        <a
          *ngFor="let item of menuItems"
          [routerLink]="item.link"
          class="nav-link"
          routerLinkActive="router-link-active"
          #rla="routerLinkActive"
          href=""
          (mouseover)="preloadBundle(item.path)"
          >{{ item.caption }} {{ rla.isActive ? '*' : '' }}</a
        >
      </div>
    </header>
  `,
  styles: [
    `
      .mdl-layout__header {
        display: flex;
        position: fixed;
        background-color: #222;
      }

      .nav-link {
        padding: 0 1em;
        width: 100px;
        color: rgba(255, 255, 255, 0.6);
        text-align: center;
        text-decoration: none;
      }

      .nav-link.router-link-active {
        color: rgba(255, 255, 255, 1);
      }

      .nav-link.router-link-active::after {
        height: 3px;
        width: 100%;
        display: block;
        content: ' ';
        bottom: 0;
        left: 0;
        position: inherit;
        background: rgb(83, 109, 254);
      }

      .md-title-icon > i {
        background-image: url('/assets/ng.png');
        background-repeat: no-repeat;
        background-position: center center;
        padding: 1em 2em;
      }

      .mdl-layout__header-row {
        height: 56px;
        padding: 0 16px 0 72px;
        padding-left: 8px;
        background-color: #673ab7;
        background: #0033ff;
        background-color: #222;
      }

      .nav-buttons-right {
        position: fixed;
        right: 2em;
        top: 1em;
      }
      .nav-buttons-right > button {
        margin-right: 8px;
      }

      @media (max-width: 480px) {
        #nav-buttons-right {
          display: none;
        }
      }

      @media (max-width: 320px) {
        a.nav-link {
          font-size: 12px;
        }
      }
    `
  ]
})
export class NavComponent implements OnInit {
  menuItems: MenuItem[];

  ngOnInit() {
    this.menuItems = [
      { caption: 'Dashboard', path: 'dashboard', link: '/dashboard' },
      { caption: 'Speakers', path: 'speakers', link: '/speakers' },
      { caption: 'Sessions', path: 'sessions', link: '/sessions' },
      { caption: 'Admin', path: 'admin', link: '/admin' },
      { caption: 'Login', path: 'login', link: '/login' }
    ];
  }

  constructor(
    private messageService: MessageService,
    private modalService: ModalService,
    private preloadOnDemandService: OnDemandPreloadService
  ) {}

  preloadAll() {
    this.preloadOnDemandService.startPreload('*');
  }

  preloadBundle(routePath) {
    this.preloadOnDemandService.startPreload(routePath);
  }

  resetDb() {
    // console.log('*** The "Reset DB" is disabled until in memory API is re-enabled');
    const msg = 'Are you sure you want to reset the database?';
    this.modalService.activate(msg).then(responseOK => {
      if (responseOK) {
        this.messageService.resetDb();
      }
    });
  }
}
