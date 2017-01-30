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
var core_2 = require('../../core');
var session_model_1 = require('../shared/session.model');
var session_service_1 = require('../shared/session.service');
var SessionComponent = (function () {
    function SessionComponent(entityService, modalService, route, router, sessionService, toastService) {
        this.entityService = entityService;
        this.modalService = modalService;
        this.route = route;
        this.router = router;
        this.sessionService = sessionService;
        this.toastService = toastService;
        this.editSession = {};
    }
    SessionComponent.prototype.cancel = function (showToast) {
        if (showToast === void 0) { showToast = true; }
        this.editSession = this.entityService.clone(this.session);
        if (showToast) {
            this.toastService.activate("Cancelled changes to " + this.session.name);
        }
    };
    SessionComponent.prototype.canDeactivate = function () {
        return !this.session ||
            !this.isDirty() ||
            this.modalService.activate();
    };
    SessionComponent.prototype.delete = function () {
        var _this = this;
        var msg = "Do you want to delete the " + this.session.name + "?";
        this.modalService.activate(msg).then(function (responseOK) {
            if (responseOK) {
                _this.cancel(false);
                _this.sessionService.deleteSession(_this.session)
                    .subscribe(function () {
                    _this.toastService.activate("Deleted " + _this.session.name);
                    _this.gotoSessions();
                }, function (err) { return _this.handleServiceError('Delete', err); }, // Failure path
                function () { return console.log('Delete Completed'); } // Completed actions
                );
            }
        });
    };
    SessionComponent.prototype.isAddMode = function () { return isNaN(this.id); };
    SessionComponent.prototype.ngOnDestroy = function () {
        this.dbResetSubscription.unsubscribe();
    };
    SessionComponent.prototype.ngOnInit = function () {
        var _this = this;
        componentHandler.upgradeDom();
        this.dbResetSubscription =
            this.sessionService.onDbReset.subscribe(function () { return _this.getSession(); });
        // ** Could use a snapshot here, as long as the parameters do not change.
        // ** This may happen when a component is re-used, such as fwd/back.
        // this.id = +this.route.snapshot.params['id'];
        //
        // ** We could use a subscription to get the parameter, too.
        // ** The ActivatedRoute gets unsubscribed
        // this.route
        //   .params
        //   .map(params => params['id'])
        //   .do(id => this.id = +id)
        //   .subscribe(id => this.getSession());
        //
        // ** Instead we will use a Resolve(r)
        this.route.data.subscribe(function (data) {
            _this.setEditSession(data.session);
            _this.id = _this.session.id;
        });
    };
    SessionComponent.prototype.save = function () {
        var _this = this;
        var session = this.session =
            this.entityService.merge(this.session, this.editSession);
        if (session.id == null) {
            this.sessionService.addSession(session).subscribe(function (s) {
                _this.setEditSession(s);
                _this.toastService.activate("Successfully added " + s.name);
                _this.gotoSessions();
            });
            return;
        }
        this.sessionService.updateSession(this.session)
            .subscribe(function () { return _this.toastService.activate("Successfully saved " + _this.session.name); });
    };
    SessionComponent.prototype.getSession = function () {
        var _this = this;
        if (this.id === 0) {
            return;
        }
        ;
        if (this.isAddMode()) {
            this.session = { name: '', level: '' };
            this.editSession = this.entityService.clone(this.session);
            return;
        }
        this.sessionService.getSession(this.id).subscribe(function (session) { return _this.setEditSession(session); });
    };
    SessionComponent.prototype.gotoSessions = function () {
        this.router.navigate(['/sessions']);
    };
    SessionComponent.prototype.handleServiceError = function (op, err) {
        console.error(op + " error: " + (err.message || err));
    };
    SessionComponent.prototype.isDirty = function () {
        return this.entityService.propertiesDiffer(this.session, this.editSession);
    };
    SessionComponent.prototype.setEditSession = function (session) {
        if (session) {
            this.session = session;
            this.editSession = this.entityService.clone(this.session);
        }
        else {
            this.gotoSessions();
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', session_model_1.Session)
    ], SessionComponent.prototype, "session", void 0);
    SessionComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'ev-session',
            templateUrl: 'session.component.html',
            styleUrls: ['session.component.css']
        }), 
        __metadata('design:paramtypes', [core_2.EntityService, core_2.ModalService, router_1.ActivatedRoute, router_1.Router, session_service_1.SessionService, core_2.ToastService])
    ], SessionComponent);
    return SessionComponent;
}());
exports.SessionComponent = SessionComponent;
//# sourceMappingURL=session.component.js.map