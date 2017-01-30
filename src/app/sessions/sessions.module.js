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
var Session_button_component_1 = require('./shared/session-button/Session-button.component');
var sessions_routing_module_1 = require('./sessions-routing.module');
var shared_module_1 = require('../shared/shared.module');
var session_service_1 = require('./shared/session.service');
var SessionsModule = (function () {
    function SessionsModule() {
    }
    SessionsModule = __decorate([
        core_1.NgModule({
            imports: [sessions_routing_module_1.SessionsRoutingModule, shared_module_1.SharedModule],
            declarations: [Session_button_component_1.SessionButtonComponent, sessions_routing_module_1.routedComponents],
            // We can put this in the component or we can do it in the module.
            // In the module, everyone gets it everywhere.
            providers: [session_service_1.SessionService]
        }), 
        __metadata('design:paramtypes', [])
    ], SessionsModule);
    return SessionsModule;
}());
exports.SessionsModule = SessionsModule;
// avoids having to lazy load with loadChildren: "app/sessions/session.module#SessionModule"
//# sourceMappingURL=sessions.module.js.map