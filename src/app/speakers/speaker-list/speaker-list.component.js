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
var models_1 = require('../../models');
var filter_text_component_1 = require('../../shared/filter-text/filter-text.component');
var filter_text_service_1 = require('../../shared/filter-text/filter-text.service');
var SpeakerListComponent = (function () {
    function SpeakerListComponent(speakerService, filterService) {
        this.speakerService = speakerService;
        this.filterService = filterService;
        this.speakers = [];
        this.filteredSpeakers = this.speakers;
    }
    SpeakerListComponent.prototype.filterChanged = function (searchText) {
        this.filteredSpeakers = this.filterService.filter(searchText, ['id', 'name', 'twitter'], this.speakers);
    };
    SpeakerListComponent.prototype.getSpeakers = function () {
        var _this = this;
        this.speakers = [];
        this.speakerService.getSpeakers()
            .subscribe(function (speakers) {
            _this.speakers = _this.filteredSpeakers = speakers;
            // this.filterComponent.clear();
        });
    };
    SpeakerListComponent.prototype.ngOnDestroy = function () {
        this.dbResetSubscription.unsubscribe();
    };
    SpeakerListComponent.prototype.ngOnInit = function () {
        var _this = this;
        componentHandler.upgradeDom();
        this.getSpeakers();
        this.dbResetSubscription = this.speakerService.onDbReset
            .subscribe(function () { return _this.getSpeakers(); });
    };
    SpeakerListComponent.prototype.trackBySpeakers = function (index, speaker) {
        return speaker.id;
    };
    __decorate([
        core_1.ViewChild(filter_text_component_1.FilterTextComponent), 
        __metadata('design:type', filter_text_component_1.FilterTextComponent)
    ], SpeakerListComponent.prototype, "filterComponent", void 0);
    SpeakerListComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'ev-speaker-list',
            templateUrl: 'speaker-list.component.html',
            styleUrls: ['speaker-list.component.css'],
        }), 
        __metadata('design:paramtypes', [models_1.SpeakerService, filter_text_service_1.FilterTextService])
    ], SpeakerListComponent);
    return SpeakerListComponent;
}());
exports.SpeakerListComponent = SpeakerListComponent;
//# sourceMappingURL=speaker-list.component.js.map