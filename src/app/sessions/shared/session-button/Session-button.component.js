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
var session_model_1 = require('../session.model');
var SessionButtonComponent = (function () {
    function SessionButtonComponent() {
    }
    SessionButtonComponent.prototype.ngOnInit = function () {
    };
    __decorate([
        core_1.Input(),
        __metadata('design:type', session_model_1.Session)
    ], SessionButtonComponent.prototype, "session", void 0);
    SessionButtonComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'ev-session-button',
            templateUrl: './session-button.component.html',
            styleUrls: ['./session-button.component.css'],
        }),
        __metadata('design:paramtypes', [])
    ], SessionButtonComponent);
    return SessionButtonComponent;
}());
exports.SessionButtonComponent = SessionButtonComponent;
//# sourceMappingURL=Session-button.component.js.map