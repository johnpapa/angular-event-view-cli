"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var models_1 = require('../../models');
var core_2 = require('../../core');
var SpeakerComponent = (function () {
    function SpeakerComponent(entityService, modalService, route, router, speakerService, toastService) {
        this.entityService = entityService;
        this.modalService = modalService;
        this.route = route;
        this.router = router;
        this.speakerService = speakerService;
        this.toastService = toastService;
        this.editSpeaker = {};
    }
    SpeakerComponent.prototype.cancel = function (showToast) {
        if (showToast === void 0) { showToast = true; }
        this.editSpeaker = this.entityService.clone(this.speaker);
        if (showToast) {
            this.toastService.activate("Cancelled changes to " + this.speaker.name);
        }
    };
    SpeakerComponent.prototype.canDeactivate = function () {
        return !this.speaker ||
            !this.isDirty() ||
            this.modalService.activate();
    };
    SpeakerComponent.prototype.delete = function () {
        var _this = this;
        var msg = "Do you want to delete " + this.speaker.name + "?";
        this.modalService.activate(msg).then(function (responseOK) {
            if (responseOK) {
                _this.cancel(false);
                _this.speakerService.deleteSpeaker(_this.speaker)
                    .subscribe(function () {
                    _this.toastService.activate("Deleted " + _this.speaker.name);
                    _this.gotoSpeakers();
                }, function (err) { return _this.handleServiceError('Delete', err); }, // Failure path
                function () { return console.log('Delete Completed'); } // Completed actions
                );
            }
        });
    };
    SpeakerComponent.prototype.isAddMode = function () {
        return isNaN(this.id);
    };
    SpeakerComponent.prototype.ngOnDestroy = function () {
        this.dbResetSubscription.unsubscribe();
    };
    SpeakerComponent.prototype.ngOnInit = function () {
        var _this = this;
        componentHandler.upgradeDom();
        this.dbResetSubscription = this.speakerService.onDbReset
            .subscribe(function () { return _this.getSpeaker(); });
        // Could use a snapshot here, as long as the parameters do not change.
        // This may happen when a component is re-used.
        // this.id = +this.route.snapshot.params['id'];
        this.route
            .params
            .map(function (params) { return params['id']; })
            .do(function (id) { return _this.id = +id; })
            .subscribe(function (id) { return _this.getSpeaker(); });
    };
    SpeakerComponent.prototype.save = function () {
        var _this = this;
        var speaker = this.speaker = this.entityService.merge(this.speaker, this.editSpeaker);
        if (speaker.id == null) {
            this.speakerService.addSpeaker(speaker)
                .subscribe(function (s) {
                _this.setEditSpeaker(s);
                _this.toastService.activate("Successfully added " + s.name);
                _this.gotoSpeakers();
            });
            return;
        }
        this.speakerService.updateSpeaker(speaker)
            .subscribe(function () { return _this.toastService.activate("Successfully saved " + speaker.name); });
    };
    SpeakerComponent.prototype.getSpeaker = function () {
        var _this = this;
        if (this.id === 0) {
            return;
        }
        ;
        if (this.isAddMode()) {
            this.speaker = { name: '', twitter: '' };
            this.editSpeaker = this.entityService.clone(this.speaker);
            return;
        }
        this.speakerService.getSpeaker(this.id)
            .subscribe(function (speaker) { return _this.setEditSpeaker(speaker); });
    };
    SpeakerComponent.prototype.gotoSpeakers = function () {
        this.router.navigate(['/speakers']);
    };
    SpeakerComponent.prototype.handleServiceError = function (op, err) {
        console.error(op + " error: " + (err.message || err));
    };
    SpeakerComponent.prototype.isDirty = function () {
        return this.entityService.propertiesDiffer(this.speaker, this.editSpeaker);
    };
    SpeakerComponent.prototype.setEditSpeaker = function (speaker) {
        if (speaker) {
            this.speaker = speaker;
            this.editSpeaker = this.entityService.clone(this.speaker);
        }
        else {
            this.gotoSpeakers();
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', models_1.Speaker)
    ], SpeakerComponent.prototype, "speaker", void 0);
    SpeakerComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'ev-speaker',
            templateUrl: 'speaker.component.html',
            styleUrls: ['speaker.component.css']
        }), 
        __metadata('design:paramtypes', [core_2.EntityService, core_2.ModalService, router_1.ActivatedRoute, router_1.Router, models_1.SpeakerService, core_2.ToastService])
    ], SpeakerComponent);
    return SpeakerComponent;
}());
exports.SpeakerComponent = SpeakerComponent;
//# sourceMappingURL=speaker.component.js.map