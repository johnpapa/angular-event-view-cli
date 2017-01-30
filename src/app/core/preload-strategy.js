"use strict";
var of_1 = require('rxjs/observable/of');
var PreloadSelectedModulesList = (function () {
    function PreloadSelectedModulesList() {
    }
    PreloadSelectedModulesList.prototype.preload = function (route, load) {
        return route.data && route.data['preload'] ? load() : of_1.of(null);
    };
    return PreloadSelectedModulesList;
}());
exports.PreloadSelectedModulesList = PreloadSelectedModulesList;
//# sourceMappingURL=preload-strategy.js.map