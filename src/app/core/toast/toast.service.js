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
var Subject_1 = require('rxjs/Subject');
var ToastService = (function () {
    function ToastService(prior) {
        this.toastSubject = new Subject_1.Subject();
        this.toastState = this.toastSubject.asObservable();
        if (prior) {
            console.log('toast service already exists');
            return prior;
        }
        else {
            console.log('created toast service');
        }
    }
    ToastService.prototype.activate = function (message) {
        this.toastSubject.next({ message: message });
    };
    ToastService = __decorate([
        core_1.Injectable(),
        __param(0, core_1.Optional()),
        __param(0, core_1.SkipSelf()), 
        __metadata('design:paramtypes', [ToastService])
    ], ToastService);
    return ToastService;
}());
exports.ToastService = ToastService;
//# sourceMappingURL=toast.service.js.map