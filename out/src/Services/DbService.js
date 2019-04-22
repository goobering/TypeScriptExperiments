"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DbService = /** @class */ (function () {
    function DbService(repository) {
        this.repository = repository;
    }
    DbService.prototype.createTableAsync = function (params) {
        return this.repository.createTableAsync(params);
    };
    DbService.prototype.putItemAsync = function (params) {
        return this.repository.putItemAsync(params);
    };
    return DbService;
}());
exports.DbService = DbService;
//# sourceMappingURL=DbService.js.map