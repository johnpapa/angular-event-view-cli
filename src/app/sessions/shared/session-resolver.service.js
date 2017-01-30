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
var session_model_1 = require('./session.model');
var session_service_1 = require('./session.service');
var SessionResolver = (function () {
    function SessionResolver(sessionService, router) {
        this.sessionService = sessionService;
        this.router = router;
    }
    SessionResolver.prototype.resolve = function (route, state) {
        var _this = this;
        var id = +route.params['id'];
        return this.sessionService.getSession(id)
            .map(function (session) {
            if (session) {
                return session;
            }
            // Return a new object, because we're going to create a new one
            return new session_model_1.Session();
            // We could throw an error here and catch it
            // and route back to the speaker list
            // let msg = `session id ${id} not found`;
            // console.log(msg);
            // throw new Error(msg)
        })
            .catch(function (error) {
            console.log(error + ". Heading back to session list");
            _this.router.navigate(['/sessions']);
            return Observable_1.Observable.of(null);
        });
    };
    SessionResolver = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [session_service_1.SessionService, router_1.Router])
    ], SessionResolver);
    return SessionResolver;
}());
exports.SessionResolver = SessionResolver;
//# sourceMappingURL=session-resolver.service.js.map