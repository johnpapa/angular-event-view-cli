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
var core_2 = require('./core');
var page_not_found_component_1 = require('./page-not-found.component');
var preload_strategy_1 = require('./core/preload-strategy');
/***************************************************************
* Lazy Loading to Eager Loading
*
* 1. Add the module and NgModule imports in `app.module.ts`
*
* 2. Remove the lazy load route from `app.routing.ts`
*
* 3. Change the module's default route path from '' to 'pathname'
*****************************************************************/
var routes = [
    { path: '', pathMatch: 'full', redirectTo: 'dashboard', },
    {
        path: 'admin',
        loadChildren: 'app/admin/admin.module#AdminModule',
        canActivate: [core_2.AuthGuard],
        canLoad: [core_2.AuthGuard],
    },
    {
        path: 'dashboard', loadChildren: 'app/dashboard/dashboard.module#DashboardModule',
        data: { preload: true }
    },
    {
        path: 'speakers', loadChildren: 'app/speakers/speakers.module#SpeakersModule',
        data: { preload: true }
    },
    { path: 'sessions', loadChildren: 'app/sessions/sessions.module#SessionsModule' },
    { path: '**', pathMatch: 'full', component: page_not_found_component_1.PageNotFoundComponent },
];
var AppRoutingModule = (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forRoot(routes, { preloadingStrategy: preload_strategy_1.PreloadSelectedModulesList })],
            exports: [router_1.RouterModule],
            providers: [
                core_2.AuthGuard,
                core_2.CanDeactivateGuard,
                preload_strategy_1.PreloadSelectedModulesList,
                core_2.UserProfileService
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], AppRoutingModule);
    return AppRoutingModule;
}());
exports.AppRoutingModule = AppRoutingModule;
//# sourceMappingURL=app-routing.module.js.map