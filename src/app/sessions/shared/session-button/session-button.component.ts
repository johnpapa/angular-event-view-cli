import { Component, Input, OnInit } from '@angular/core';

import { Session } from '../session.model';

@Component({
  selector: 'ev-session-button',
  templateUrl: './session-button.component.html',
  styleUrls: ['./session-button.component.css']
})
export class SessionButtonComponent implements OnInit {
  @Input() session: Session;

  constructor() {}

  ngOnInit() {}
}
