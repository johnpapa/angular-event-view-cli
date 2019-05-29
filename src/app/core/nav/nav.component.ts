import { Component, OnInit } from '@angular/core';

import { MessageService, ModalService } from '../';
import { OnDemandPreloadService } from '../';

class MenuItem {
  constructor(public caption: string, public path: string, public link: any[]) {}
}

@Component({
  selector: 'ev-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  menuItems: MenuItem[];

  ngOnInit() {
    this.menuItems = [
      { caption: 'Dashboard', path: 'dashboard', link: ['/dashboard'] },
      { caption: 'Speakers', path: 'speakers', link: ['/speakers'] },
      { caption: 'Sessions', path: 'sessions', link: ['/sessions'] },
      { caption: 'Admin', path: 'admin', link: ['/admin'] },
      { caption: 'Login', path: 'login', link: ['/login'] }
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
