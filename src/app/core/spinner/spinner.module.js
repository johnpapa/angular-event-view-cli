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
var module_import_guard_1 = require('../module-import-guard');
var spinner_component_1 = require('./spinner.component');
var spinner_service_1 = require('./spinner.service');
var SpinnerModule = (function () {
    function SpinnerModule(parentModule) {
        module_import_guard_1.throwIfAlreadyLoaded(parentModule, 'SpinnerModule');
    }
    SpinnerModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule],
            exports: [spinner_component_1.SpinnerComponent],
            declarations: [spinner_component_1.SpinnerComponent],
            providers: [spinner_service_1.SpinnerService]
        }),
        __param(0, core_1.Optional()),
        __param(0, core_1.SkipSelf()), 
        __metadata('design:paramtypes', [SpinnerModule])
    ], SpinnerModule);
    return SpinnerModule;
}());
exports.SpinnerModule = SpinnerModule;
//# sourceMappingURL=spinner.module.js.map