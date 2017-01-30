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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var core_1 = require('@angular/core');
var common_1 = require('@angular/common');
var router_1 = require('@angular/router');
var entity_service_1 = require('./entity.service');
var exception_service_1 = require('./exception.service');
var message_service_1 = require('./message.service');
var nav_component_1 = require('./nav/nav.component');
var module_import_guard_1 = require('./module-import-guard');
var modal_module_1 = require('./modal/modal.module');
var spinner_module_1 = require('./spinner/spinner.module');
var toast_module_1 = require('./toast/toast.module');
// imports: imports the module's exports. which is usually declarables and providers
// in our case the spinner has no providers.
//
// exports: exports modules AND components/directives/pipes that other modules may want to use
var CoreModule = (function () {
    function CoreModule(parentModule) {
        module_import_guard_1.throwIfAlreadyLoaded(parentModule, 'CoreModule');
    }
    CoreModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                router_1.RouterModule,
                modal_module_1.ModalModule, spinner_module_1.SpinnerModule, toast_module_1.ToastModule
            ],
            exports: [modal_module_1.ModalModule, spinner_module_1.SpinnerModule, toast_module_1.ToastModule, nav_component_1.NavComponent],
            declarations: [nav_component_1.NavComponent],
            providers: [entity_service_1.EntityService, exception_service_1.ExceptionService, message_service_1.MessageService]
        }),
        __param(0, core_1.Optional()),
        __param(0, core_1.SkipSelf()), 
        __metadata('design:paramtypes', [CoreModule])
    ], CoreModule);
    return CoreModule;
}());
exports.CoreModule = CoreModule;
//# sourceMappingURL=core.module.js.map