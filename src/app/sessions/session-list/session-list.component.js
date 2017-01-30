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
var filter_text_component_1 = require('../../shared/filter-text/filter-text.component');
var filter_text_service_1 = require('../../shared/filter-text/filter-text.service');
var session_service_1 = require('../shared/session.service');
var SessionListComponent = (function () {
    function SessionListComponent(filterService, sessionService) {
        this.filterService = filterService;
        this.sessionService = sessionService;
        this.filteredSessions = this.sessions;
    }
    SessionListComponent.prototype.filterChanged = function (searchText) {
        this.filteredSessions = this.filterService.filter(searchText, ['id', 'name', 'level'], this.sessions);
    };
    SessionListComponent.prototype.getSessions = function () {
        var _this = this;
        this.sessions = [];
        this.sessionService.getSessions()
            .subscribe(function (sessions) {
            _this.sessions = _this.filteredSessions = sessions;
            _this.filterComponent.clear();
        }, function (error) {
            console.log('error occurred here');
            console.log(error);
        }, function () {
            console.log('session retrieval completed');
        });
    };
    SessionListComponent.prototype.ngOnDestroy = function () {
        this.dbResetSubscription.unsubscribe();
    };
    SessionListComponent.prototype.ngOnInit = function () {
        var _this = this;
        componentHandler.upgradeDom();
        this.getSessions();
        this.dbResetSubscription = this.sessionService.onDbReset
            .subscribe(function () { return _this.getSessions(); });
    };
    SessionListComponent.prototype.trackBySessions = function (index, session) {
        return session.id;
    };
    __decorate([
        core_1.ViewChild(filter_text_component_1.FilterTextComponent), 
        __metadata('design:type', filter_text_component_1.FilterTextComponent)
    ], SessionListComponent.prototype, "filterComponent", void 0);
    SessionListComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'ev-session-list',
            templateUrl: 'session-list.component.html',
            styleUrls: ['session-list.component.css']
        }), 
        __metadata('design:paramtypes', [filter_text_service_1.FilterTextService, session_service_1.SessionService])
    ], SessionListComponent);
    return SessionListComponent;
}());
exports.SessionListComponent = SessionListComponent;
//# sourceMappingURL=session-list.component.js.map