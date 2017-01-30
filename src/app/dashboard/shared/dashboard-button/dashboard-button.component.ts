import { Component, Input, OnInit } from '@angular/core';

import { Speaker } from '../../../models';

@Component({
  moduleId: module.id,
  selector: 'ev-dashboard-button',
  templateUrl: './dashboard-button.component.html',
  styleUrls: ['./dashboard-button.component.css']
})
export class DashboardButtonComponent implements OnInit {
  @Input() speaker: Speaker;

  constructor() {}

  ngOnInit() {
  }
}
