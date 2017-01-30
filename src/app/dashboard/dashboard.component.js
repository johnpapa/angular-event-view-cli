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
var Observable_1 = require('rxjs/Observable');
var models_1 = require('../models');
var core_2 = require('../core');
var DashboardComponent = (function () {
    function DashboardComponent(route, speakerService, router, toastService) {
        this.route = route;
        this.speakerService = speakerService;
        this.router = router;
        this.toastService = toastService;
    }
    DashboardComponent.prototype.getSpeakers = function () {
        var _this = this;
        this.speakers = this.speakerService.getSpeakers()
            .do(function () { return _this.toastService.activate('Got speakers for the dashboard'); })
            .catch(function (e) {
            _this.toastService.activate("" + e);
            return Observable_1.Observable.of([]);
        });
    };
    DashboardComponent.prototype.gotoDetail = function (speaker) {
        var link = ['/speakers', speaker.id];
        this.router.navigate(link);
    };
    DashboardComponent.prototype.ngOnDestroy = function () {
        this.dbResetSubscription.unsubscribe();
    };
    DashboardComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.data.subscribe(function (data) {
            _this.title = data.title;
        });
        this.getSpeakers();
        this.dbResetSubscription = this.speakerService.onDbReset
            .subscribe(function () { return _this.getSpeakers(); });
    };
    DashboardComponent.prototype.trackBySpeakers = function (index, speaker) {
        return speaker.id;
    };
    DashboardComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'ev-dashboard',
            templateUrl: 'dashboard.component.html',
            styleUrls: ['dashboard.component.css']
        }), 
        __metadata('design:paramtypes', [router_1.ActivatedRoute, models_1.SpeakerService, router_1.Router, core_2.ToastService])
    ], DashboardComponent);
    return DashboardComponent;
}());
exports.DashboardComponent = DashboardComponent;
//# sourceMappingURL=dashboard.component.js.map