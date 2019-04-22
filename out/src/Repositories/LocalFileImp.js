"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var inversify_1 = require("inversify");
var fs_1 = require("fs");
var LocalFileImp = /** @class */ (function () {
    function LocalFileImp() {
    }
    // Asynchronously returns a list of files in directory dirPath, with extension ext
    LocalFileImp.prototype.getFileListAsync = function (dirPath) {
        return fs_1.promises.readdir(dirPath, 'utf8');
    };
    // Asynchronously returns the contents of the file at filePath as a string
    LocalFileImp.prototype.getFileContentsAsync = function (filePath) {
        return fs_1.promises.readFile(filePath, 'utf8');
    };
    // Asynchronously writes a buffer to the specified path on disk
    LocalFileImp.prototype.writeBufferAsync = function (buffer, outFile) {
        return fs_1.promises.writeFile(outFile, buffer);
    };
    // Asynchronously creates a directory at the specified path on disk
    LocalFileImp.prototype.createDirectoryAsync = function (dirPath) {
        return fs_1.promises.mkdir(dirPath);
    };
    LocalFileImp = __decorate([
        inversify_1.injectable()
    ], LocalFileImp);
    return LocalFileImp;
}());
exports.LocalFileImp = LocalFileImp;
;
//# sourceMappingURL=LocalFileImp.js.map