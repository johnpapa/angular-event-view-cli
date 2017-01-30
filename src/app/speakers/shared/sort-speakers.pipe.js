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
var SortSpeakersPipe = (function () {
    function SortSpeakersPipe() {
    }
    SortSpeakersPipe.prototype.transform = function (value, args) {
        if (!value || !value.sort) {
            return value;
        }
        return value.sort(function (a, b) {
            if (a.name < b.name) {
                return -1;
            }
            if (a.name > b.name) {
                return 1;
            }
            return 0;
        });
    };
    SortSpeakersPipe = __decorate([
        core_1.Pipe({ name: 'sortSpeakers' }), 
        __metadata('design:paramtypes', [])
    ], SortSpeakersPipe);
    return SortSpeakersPipe;
}());
exports.SortSpeakersPipe = SortSpeakersPipe;
//# sourceMappingURL=sort-speakers.pipe.js.map