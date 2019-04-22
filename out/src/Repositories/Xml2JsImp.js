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
var xml2js_1 = require("xml2js");
var util_1 = __importDefault(require("util"));
var Xml2JsImp = /** @class */ (function () {
    function Xml2JsImp() {
    }
    // Asynchronously converts XML to JSON
    Xml2JsImp.prototype.xmlToJsonAsync = function (xml) {
        var xmlToJsonAsync = util_1.default.promisify(xml2js_1.parseString);
        return xmlToJsonAsync(xml)
            .then(function (result) {
            return result;
        })
            .catch(function (err) {
            throw err;
        });
    };
    Xml2JsImp = __decorate([
        inversify_1.injectable()
    ], Xml2JsImp);
    return Xml2JsImp;
}());
exports.Xml2JsImp = Xml2JsImp;
//# sourceMappingURL=Xml2JsImp.js.map