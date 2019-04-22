"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var inversify_1 = require("inversify");
var jszip_1 = __importDefault(require("jszip"));
var JsZipImp = /** @class */ (function () {
    function JsZipImp() {
        this.zipper = new jszip_1.default();
    }
    JsZipImp.prototype.addFileToCompressor = function (filePath, fileContent) {
        this.zipper.file(filePath, fileContent);
    };
    JsZipImp.prototype.getCompressed = function () {
        return this.zipper.generateAsync({ type: "nodebuffer" });
    };
    JsZipImp.prototype.resetCompressor = function () {
        this.zipper = new jszip_1.default();
    };
    JsZipImp = __decorate([
        inversify_1.injectable()
    ], JsZipImp);
    return JsZipImp;
}());
exports.JsZipImp = JsZipImp;
//# sourceMappingURL=JsZipImp.js.map