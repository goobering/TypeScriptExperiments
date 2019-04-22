"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ConverterService = /** @class */ (function () {
    function ConverterService(repository) {
        this.repository = repository;
    }
    ConverterService.prototype.xmlToJsonAsync = function (xml) {
        return this.repository.xmlToJsonAsync(xml);
    };
    return ConverterService;
}());
exports.ConverterService = ConverterService;
//# sourceMappingURL=ConverterService.js.map