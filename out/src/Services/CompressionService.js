"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CompressionService = /** @class */ (function () {
    function CompressionService(repository) {
        this.repository = repository;
    }
    CompressionService.prototype.addFileToCompressor = function (filePath, fileContent) {
        return this.repository.addFileToCompressor(filePath, fileContent);
    };
    CompressionService.prototype.getCompressed = function () {
        return this.repository.getCompressed();
    };
    return CompressionService;
}());
exports.CompressionService = CompressionService;
//# sourceMappingURL=CompressionService.js.map