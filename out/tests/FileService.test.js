"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var FileService_1 = require("../src/Services/FileService");
var Installer_1 = __importDefault(require("../src/Infrastructure/Installer"));
var Identifiers_1 = __importDefault(require("../src/Constants/Identifiers"));
var path_1 = __importDefault(require("path"));
var fileRepo = Installer_1.default.get(Identifiers_1.default.IFileRepository);
var fileService = new FileService_1.FileService(fileRepo);
describe('getFileListAsync tests', function () {
    var fileDir = "./tests/testFiles";
    var failingDir = "./tests/fail";
    var emptyDir = "";
    var expectedFiles = ["testFile1.txt", "testFile2.txt", "testFile3.txt"];
    it('Should asynchronously return an array of file names from a path', function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fileService.getFileListAsync(fileDir).then(function (result) {
                        expect(result).toEqual(expectedFiles);
                    })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    }); });
    // Not *at all* easy testing Error messages in Node/Jest. I tried most of these: https://github.com/facebook/jest/issues/3601
    it('Should throw an ENOENT exception if passed an empty path', function () { return __awaiter(_this, void 0, void 0, function () {
        var promise;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    promise = fileService.getFileListAsync(emptyDir);
                    return [4 /*yield*/, expect(promise).rejects.toMatchObject({
                            message: "ENOENT: no such file or directory, scandir ''"
                        })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('Should throw an ENOENT exception if passed a non-existing path', function () { return __awaiter(_this, void 0, void 0, function () {
        var promise;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    promise = fileService.getFileListAsync(failingDir);
                    return [4 /*yield*/, expect(promise).rejects.toMatchObject({
                            message: "ENOENT: no such file or directory, scandir '" + path_1.default.resolve(failingDir) + "'"
                        })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
});
describe('getFileContentsAsync tests', function () {
    var testFileDir = "./tests/testFiles";
    var testFileName = "testFile1.txt";
    var failingDir = "./tests/fail";
    var emptyDir = "";
    var emptyFileName = "";
    var expectedString = "Test value 1";
    it('Should asynchronously return the contents of a file as a string', function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fileService.getFileContentsAsync(path_1.default.join(testFileDir, testFileName)).then(function (result) {
                        expect(result).toEqual(expectedString);
                    })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('Should throw an EISDIR exception if passed an empty path', function () { return __awaiter(_this, void 0, void 0, function () {
        var promise;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    promise = fileService.getFileContentsAsync(path_1.default.join(emptyDir, emptyFileName));
                    return [4 /*yield*/, expect(promise).rejects.toMatchObject({
                            message: "EISDIR: illegal operation on a directory, read"
                        })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('Should throw an ENOENT exception if passed a non-existing path', function () { return __awaiter(_this, void 0, void 0, function () {
        var promise;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    promise = fileService.getFileContentsAsync(path_1.default.join(failingDir, testFileName));
                    return [4 /*yield*/, expect(promise).rejects.toMatchObject({
                            message: "ENOENT: no such file or directory, open '" + path_1.default.join(path_1.default.resolve(failingDir), testFileName) + "'"
                        })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=FileService.test.js.map