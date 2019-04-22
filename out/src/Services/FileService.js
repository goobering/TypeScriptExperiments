"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var FileService = /** @class */ (function () {
    function FileService(repository) {
        this.repository = repository;
    }
    FileService.prototype.getFileListAsync = function (dirPath) {
        return this.repository.getFileListAsync(dirPath);
    };
    FileService.prototype.getFileContentsAsync = function (filePath) {
        return this.repository.getFileContentsAsync(filePath);
    };
    FileService.prototype.writeBufferAsync = function (buffer, outFile) {
        return this.repository.writeBufferAsync(buffer, outFile);
    };
    FileService.prototype.createDirectoryAsync = function (dirPath) {
        return this.repository.createDirectoryAsync(dirPath);
    };
    return FileService;
}());
exports.FileService = FileService;
//# sourceMappingURL=FileService.js.map