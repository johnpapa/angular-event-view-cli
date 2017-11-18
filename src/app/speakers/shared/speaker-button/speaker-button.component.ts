import { Component, Input, OnInit } from '@angular/core';

import { Speaker } from '../../../core';

@Component({
  selector: 'ev-speaker-button',
  templateUrl: './speaker-button.component.html',
  styleUrls: ['./speaker-button.component.css']
})
export class SpeakerButtonComponent implements OnInit {
  @Input() speaker: Speaker;

  constructor() {}

  ngOnInit() {}
}
