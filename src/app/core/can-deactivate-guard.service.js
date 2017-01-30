"use strict";
var Observable_1 = require('rxjs/Observable');
var CanDeactivateGuard = (function () {
    function CanDeactivateGuard() {
    }
    CanDeactivateGuard.prototype.canDeactivate = function (component) {
        // run the function for canDeactivate and if its a promise or a boolean we handle it either way
        // if (component.canDeactivate) {
        //   let deactivate = component.canDeactivate();
        //   return this.toObservable(deactivate);
        // } else {
        //   return true;
        // }
        return component.canDeactivate ?
            this.toObservable(component.canDeactivate()) : true;
    };
    CanDeactivateGuard.prototype.toObservable = function (deactivate) {
        var p = Promise.resolve(deactivate);
        var o = Observable_1.Observable.fromPromise(p);
        return o;
    };
    return CanDeactivateGuard;
}());
exports.CanDeactivateGuard = CanDeactivateGuard;
//# sourceMappingURL=can-deactivate-guard.service.js.map