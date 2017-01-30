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
var spinner_service_1 = require('./spinner.service');
var SpinnerComponent = (function () {
    function SpinnerComponent(spinnerService) {
        this.spinnerService = spinnerService;
        this.visible = false;
    }
    SpinnerComponent.prototype.ngOnInit = function () {
        var _this = this;
        componentHandler.upgradeDom();
        this.spinnerStateChanged = this.spinnerService.spinnerState
            .subscribe(function (state) { return _this.visible = state.show; });
    };
    SpinnerComponent.prototype.ngOnDestroy = function () {
        this.spinnerStateChanged.unsubscribe();
    };
    SpinnerComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'ev-spinner',
            templateUrl: 'spinner.component.html',
            styleUrls: ['spinner.component.css']
        }), 
        __metadata('design:paramtypes', [spinner_service_1.SpinnerService])
    ], SpinnerComponent);
    return SpinnerComponent;
}());
exports.SpinnerComponent = SpinnerComponent;
//# sourceMappingURL=spinner.component.js.map