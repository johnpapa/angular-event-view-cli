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
var modal_service_1 = require('./modal.service');
var KEY_ESC = 27;
var ModalComponent = (function () {
    function ModalComponent(modalService) {
        this.defaults = {
            title: 'Confirmation',
            message: 'Do you want to cancel your changes?',
            cancelText: 'Cancel',
            okText: 'OK'
        };
        modalService.activate = this.activate.bind(this);
    }
    ModalComponent.prototype.activate = function (message, title) {
        var _this = this;
        if (message === void 0) { message = this.defaults.message; }
        if (title === void 0) { title = this.defaults.title; }
        this.title = title;
        this.message = message;
        this.okText = this.defaults.okText;
        this.cancelText = this.defaults.cancelText;
        var promise = new Promise(function (resolve, reject) {
            _this.negativeOnClick = function (e) { return resolve(false); };
            _this.positiveOnClick = function (e) { return resolve(true); };
            _this.show();
        });
        return promise;
    };
    ModalComponent.prototype.ngOnInit = function () {
        this.modalElement = document.getElementById('confirmationModal');
        this.cancelButton = document.getElementById('cancelButton');
        this.okButton = document.getElementById('okButton');
    };
    ModalComponent.prototype.show = function () {
        var _this = this;
        document.onkeyup = null;
        if (!this.modalElement || !this.cancelButton || !this.okButton) {
            return;
        }
        this.modalElement.style.opacity = 0;
        this.modalElement.style.zIndex = 9999;
        this.cancelButton.onclick = (function (e) {
            e.preventDefault();
            if (!_this.negativeOnClick(e)) {
                _this.hideDialog();
            }
        });
        this.okButton.onclick = (function (e) {
            e.preventDefault();
            if (!_this.positiveOnClick(e)) {
                _this.hideDialog();
            }
        });
        this.modalElement.onclick = function () {
            _this.hideDialog();
            return _this.negativeOnClick(null);
        };
        document.onkeyup = function (e) {
            if (e.which === KEY_ESC) {
                _this.hideDialog();
                return _this.negativeOnClick(null);
            }
        };
        this.modalElement.style.opacity = 1;
    };
    ModalComponent.prototype.hideDialog = function () {
        var _this = this;
        document.onkeyup = null;
        this.modalElement.style.opacity = 0;
        window.setTimeout(function () { return _this.modalElement.style.zIndex = 0; }, 400);
    };
    ModalComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'ev-modal',
            templateUrl: 'modal.component.html',
            styleUrls: ['modal.component.css']
        }), 
        __metadata('design:paramtypes', [modal_service_1.ModalService])
    ], ModalComponent);
    return ModalComponent;
}());
exports.ModalComponent = ModalComponent;
//# sourceMappingURL=modal.component.js.map