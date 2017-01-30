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
var toast_service_1 = require('./toast/toast.service');
var user_profile_service_1 = require('./user-profile.service');
var AuthGuard = (function () {
    function AuthGuard(userProfileService, toastService, router) {
        this.userProfileService = userProfileService;
        this.toastService = toastService;
        this.router = router;
        this.deniedMessage = 'Unauthorized access denied';
    }
    AuthGuard.prototype.canLoad = function (route) {
        if (this.userProfileService.isLoggedIn) {
            return true;
        }
        var message = 'Unauthorized access denied';
        var url = "/" + route.path;
        this.router.navigate(['/login'], { queryParams: { redirectTo: url } });
        this.toastService.activate(this.deniedMessage);
        return this.userProfileService.isLoggedIn;
    };
    AuthGuard.prototype.canActivate = function (next, state) {
        if (this.userProfileService.isLoggedIn) {
            return true;
        }
        this.router.navigate(['/login'], { queryParams: { redirectTo: state.url } });
        this.toastService.activate(this.deniedMessage);
        return false;
    };
    AuthGuard.prototype.canActivateChild = function (route, state) {
        return this.canActivate(route, state);
    };
    AuthGuard = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [user_profile_service_1.UserProfileService, toast_service_1.ToastService, router_1.Router])
    ], AuthGuard);
    return AuthGuard;
}());
exports.AuthGuard = AuthGuard;
//# sourceMappingURL=auth-guard.service.js.map