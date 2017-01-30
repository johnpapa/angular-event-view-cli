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
var http_1 = require('@angular/http');
var core_2 = require('../core');
var speakersUrl = core_2.CONFIG.baseUrls.speakers;
var SpeakerService = (function () {
    function SpeakerService(http, exceptionService, messageService, spinnerService) {
        var _this = this;
        this.http = http;
        this.exceptionService = exceptionService;
        this.messageService = messageService;
        this.spinnerService = spinnerService;
        this.onDbReset = this.messageService.state;
        this.messageService.state.subscribe(function (state) { return _this.getSpeakers(); });
    }
    SpeakerService.prototype.addSpeaker = function (speaker) {
        var _this = this;
        var body = JSON.stringify(speaker);
        this.spinnerService.show();
        return this.http
            .post("" + speakersUrl, body)
            .map(function (res) { return res.json().data; })
            .catch(this.exceptionService.catchBadResponse)
            .finally(function () { return _this.spinnerService.hide(); });
    };
    SpeakerService.prototype.deleteSpeaker = function (speaker) {
        var _this = this;
        this.spinnerService.show();
        return this.http
            .delete(speakersUrl + "/" + speaker.id)
            .map(function (res) { return _this.extractData(res); })
            .catch(this.exceptionService.catchBadResponse)
            .finally(function () { return _this.spinnerService.hide(); });
    };
    SpeakerService.prototype.getSpeakers = function () {
        var _this = this;
        this.spinnerService.show();
        return this.http
            .get(speakersUrl)
            .map(function (res) { return _this.extractData(res); })
            .catch(this.exceptionService.catchBadResponse)
            .finally(function () { return _this.spinnerService.hide(); });
    };
    SpeakerService.prototype.getSpeaker = function (id) {
        var _this = this;
        this.spinnerService.show();
        return this.http
            .get(speakersUrl + "/" + id)
            .map(function (res) { return _this.extractData(res); })
            .catch(this.exceptionService.catchBadResponse)
            .finally(function () { return _this.spinnerService.hide(); });
    };
    SpeakerService.prototype.updateSpeaker = function (speaker) {
        var _this = this;
        var body = JSON.stringify(speaker);
        this.spinnerService.show();
        return this.http
            .put(speakersUrl + "/" + speaker.id, body)
            .map(function (res) { return _this.extractData(res); })
            .catch(this.exceptionService.catchBadResponse)
            .finally(function () { return _this.spinnerService.hide(); });
    };
    SpeakerService.prototype.extractData = function (res) {
        if (res.status < 200 || res.status >= 300) {
            throw new Error('Bad response status: ' + res.status);
        }
        var body = res.json ? res.json() : null;
        return (body && body.data || {});
    };
    SpeakerService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, core_2.ExceptionService, core_2.MessageService, core_2.SpinnerService])
    ], SpeakerService);
    return SpeakerService;
}());
exports.SpeakerService = SpeakerService;
//# sourceMappingURL=speaker.service.js.map