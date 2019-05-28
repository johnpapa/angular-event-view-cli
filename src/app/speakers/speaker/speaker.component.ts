import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { Speaker, SpeakerService } from '../../core';
import { CanComponentDeactivate, EntityService, ModalService, ToastService } from '../../core';

@Component({
  selector: 'ev-speaker',
  templateUrl: './speaker.component.html',
  styleUrls: ['./speaker.component.css']
})
export class SpeakerComponent implements OnDestroy, OnInit, CanComponentDeactivate {
  private subs = new Subscription();
  @Input() speaker: Speaker;
  editSpeaker: Speaker = <Speaker>{};
  showJSON = false;
  toggleText = 'Show JSON';

  private id: any;

  constructor(
    private entityService: EntityService,
    private modalService: ModalService,
    private route: ActivatedRoute,
    private router: Router,
    private speakerService: SpeakerService,
    private toastService: ToastService
  ) {}

  cancel(showToast = true) {
    this.editSpeaker = this.entityService.clone(this.speaker);
    if (showToast) {
      this.toastService.activate(`Cancelled changes to ${this.speaker.name}`);
    }
  }

  canDeactivate() {
    return !this.speaker || !this.isDirty() || this.modalService.activate();
  }

  delete() {
    const msg = `Do you want to delete ${this.speaker.name}?`;
    this.modalService.activate(msg).then(responseOK => {
      if (responseOK) {
        this.cancel(false);
        this.speakerService.deleteSpeaker(this.speaker).subscribe(
          () => {
            this.toastService.activate(`Deleted ${this.speaker.name}`);
            this.gotoSpeakers();
          },
          err => this.handleServiceError('Delete', err), // Failure path
          () => console.log('Delete Completed') // Completed actions
        );
      }
    });
  }

  isAddMode() {
    return isNaN(this.id);
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  ngOnInit() {
    componentHandler.upgradeDom();
    this.subs.add(this.speakerService.onDbReset.subscribe(() => this.getSpeaker()));

    // Could use a snapshot here, as long as the parameters do not change.
    // This may happen when a component is re-used.
    // this.id = +this.route.snapshot.paramMap.get('id');
    this.route.paramMap
      .pipe(
        map(params => params.get('id')),
        tap(id => (this.id = +id))
      )
      .subscribe(id => this.getSpeaker());
  }

  save() {
    const speaker = (this.speaker = this.entityService.merge(this.speaker, this.editSpeaker));
    if (speaker.id == null) {
      this.speakerService.addSpeaker(speaker).subscribe(s => {
        this.setEditSpeaker(s);
        this.toastService.activate(`Successfully added ${s.name}`);
        this.gotoSpeakers();
      });
      return;
    }
    this.speakerService
      .updateSpeaker(speaker)
      .subscribe(() => this.toastService.activate(`Successfully saved ${speaker.name}`));
  }

  toggleJsonText() {
    this.showJSON = !this.showJSON;
    this.toggleText = this.showJSON ? 'Hide JSON' : 'Show JSON';
  }

  private getSpeaker() {
    if (this.id === 0) {
      return;
    }
    if (this.isAddMode()) {
      this.speaker = <Speaker>{ name: '', twitter: '' };
      this.editSpeaker = this.entityService.clone(this.speaker);
      return;
    }
    this.speakerService.getSpeaker(this.id).subscribe(speaker => this.setEditSpeaker(speaker));
  }

  private gotoSpeakers() {
    this.router.navigate(['/speakers']);
  }

  private handleServiceError(op: string, err: any) {
    console.error(`${op} error: ${err.message || err}`);
  }

  private isDirty() {
    return this.entityService.propertiesDiffer(this.speaker, this.editSpeaker);
  }

  private setEditSpeaker(speaker: Speaker) {
    if (speaker) {
      this.speaker = speaker;
      this.editSpeaker = this.entityService.clone(this.speaker);
    } else {
      this.gotoSpeakers();
    }
  }
}
