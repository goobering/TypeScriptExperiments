"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var inversify_1 = require("inversify");
var Identifiers_1 = __importDefault(require("../Constants/Identifiers"));
var LocalFileImp_1 = require("../Repositories/LocalFileImp");
var Xml2JsImp_1 = require("../Repositories/Xml2JsImp");
var DynamoDbImp_1 = require("../Repositories/DynamoDbImp");
var NodeMailerImp_1 = require("../Repositories/NodeMailerImp");
var JsZipImp_1 = require("../Repositories/JsZipImp");
var container = new inversify_1.Container();
container.bind(Identifiers_1.default.IFileRepository).to(LocalFileImp_1.LocalFileImp);
container.bind(Identifiers_1.default.IConverterRepository).to(Xml2JsImp_1.Xml2JsImp);
container.bind(Identifiers_1.default.IDbRepository).to(DynamoDbImp_1.DynamoDbImp);
container.bind(Identifiers_1.default.IMailRepository).to(NodeMailerImp_1.NodeMailerImp);
container.bind(Identifiers_1.default.ICompressionRepository).to(JsZipImp_1.JsZipImp);
exports.default = container;
//# sourceMappingURL=Installer.js.map