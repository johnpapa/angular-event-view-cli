import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { Speaker, SpeakerService } from '../../models';
import { CanComponentDeactivate, EntityService, ModalService, ToastService } from '../../core';

@Component({
  moduleId: module.id,
  selector: 'ev-speaker',
  templateUrl: 'speaker.component.html',
  styleUrls: ['speaker.component.css']
})
export class SpeakerComponent implements OnDestroy, OnInit, CanComponentDeactivate {
  @Input() speaker: Speaker;
  editSpeaker: Speaker = <Speaker>{};

  private dbResetSubscription: Subscription;
  private id: any;

  constructor(
    private entityService: EntityService,
    private modalService: ModalService,
    private route: ActivatedRoute,
    private router: Router,
    private speakerService: SpeakerService,
    private toastService: ToastService) { }

  cancel(showToast = true) {
    this.editSpeaker = this.entityService.clone(this.speaker);
    if (showToast) {
      this.toastService.activate(`Cancelled changes to ${this.speaker.name}`);
    }
  }

  canDeactivate() {
    return !this.speaker ||
      !this.isDirty() ||
      this.modalService.activate();
  }

  delete() {
    let msg = `Do you want to delete ${this.speaker.name}?`;
    this.modalService.activate(msg).then(responseOK => {
      if (responseOK) {
        this.cancel(false);
        this.speakerService.deleteSpeaker(this.speaker)
          .subscribe(() => {
            this.toastService.activate(`Deleted ${this.speaker.name}`);
            this.gotoSpeakers();
          },
          (err) => this.handleServiceError('Delete', err), // Failure path
          () => console.log('Delete Completed') // Completed actions
          );
      }
    });
  }

  isAddMode() {
    return isNaN(this.id);
  }

  ngOnDestroy() {
    this.dbResetSubscription.unsubscribe();
  }

  ngOnInit() {
    componentHandler.upgradeDom();
    this.dbResetSubscription = this.speakerService.onDbReset
      .subscribe(() => this.getSpeaker());

    // Could use a snapshot here, as long as the parameters do not change.
    // This may happen when a component is re-used.
    // this.id = +this.route.snapshot.params['id'];
    this.route
      .params
      .map(params => params['id'])
      .do(id => this.id = +id)
      .subscribe(id => this.getSpeaker());
  }

  save() {
    let speaker = this.speaker = this.entityService.merge(this.speaker, this.editSpeaker);
    if (speaker.id == null) {
      this.speakerService.addSpeaker(speaker)
        .subscribe(s => {
          this.setEditSpeaker(s);
          this.toastService.activate(`Successfully added ${s.name}`);
          this.gotoSpeakers();
        });
      return;
    }
    this.speakerService.updateSpeaker(speaker)
      .subscribe(() => this.toastService.activate(`Successfully saved ${speaker.name}`));
  }

  private getSpeaker() {
    if (this.id === 0) { return; };
    if (this.isAddMode()) {
      this.speaker = <Speaker>{ name: '', twitter: '' };
      this.editSpeaker = this.entityService.clone(this.speaker);
      return;
    }
    this.speakerService.getSpeaker(this.id)
      .subscribe(speaker => this.setEditSpeaker(speaker));
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
