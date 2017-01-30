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
var speaker_list_component_1 = require('./speaker-list/speaker-list.component');
var speaker_component_1 = require('./speaker/speaker.component');
var speakers_component_1 = require('./speakers.component');
var core_2 = require('../core');
var routes = [
    {
        path: '',
        component: speakers_component_1.SpeakersComponent,
        children: [
            { path: '', component: speaker_list_component_1.SpeakerListComponent },
            {
                path: ':id',
                component: speaker_component_1.SpeakerComponent,
                canDeactivate: [core_2.CanDeactivateGuard]
            },
        ]
    },
];
var SpeakersRoutingModule = (function () {
    function SpeakersRoutingModule() {
    }
    SpeakersRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forChild(routes)],
            exports: [router_1.RouterModule],
        }), 
        __metadata('design:paramtypes', [])
    ], SpeakersRoutingModule);
    return SpeakersRoutingModule;
}());
exports.SpeakersRoutingModule = SpeakersRoutingModule;
// This works too ... but let's be explicit, above
// export const SpeakersRoutingModule = RouterModule.forChild(routes);
exports.routedComponents = [speakers_component_1.SpeakersComponent, speaker_list_component_1.SpeakerListComponent, speaker_component_1.SpeakerComponent];
//# sourceMappingURL=speakers-routing.module.js.map