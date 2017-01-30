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
var speaker_button_component_1 = require('./shared/speaker-button/speaker-button.component');
var sort_speakers_pipe_1 = require('./shared/sort-speakers.pipe');
var speakers_routing_module_1 = require('./speakers-routing.module');
var shared_module_1 = require('../shared/shared.module');
var SpeakersModule = (function () {
    function SpeakersModule() {
    }
    SpeakersModule = __decorate([
        core_1.NgModule({
            imports: [shared_module_1.SharedModule, speakers_routing_module_1.SpeakersRoutingModule],
            declarations: [speaker_button_component_1.SpeakerButtonComponent, sort_speakers_pipe_1.SortSpeakersPipe, speakers_routing_module_1.routedComponents]
        }), 
        __metadata('design:paramtypes', [])
    ], SpeakersModule);
    return SpeakersModule;
}());
exports.SpeakersModule = SpeakersModule;
//# sourceMappingURL=speakers.module.js.map