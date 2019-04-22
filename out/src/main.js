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
var ConverterService_1 = require("./Services/ConverterService");
var DbService_1 = require("./Services/DbService");
var FileService_1 = require("./Services/FileService");
var MailService_1 = require("./Services/MailService");
var CompressionService_1 = require("./Services/CompressionService");
var Installer_1 = __importDefault(require("./Infrastructure/Installer"));
var Identifiers_1 = __importDefault(require("./Constants/Identifiers"));
var path_1 = __importDefault(require("path"));
var uuid_1 = __importDefault(require("uuid"));
var dotenv_1 = __importDefault(require("dotenv"));
var Email_1 = __importDefault(require("./Models/Email"));
var EmailProvider_1 = __importDefault(require("./Models/EmailProvider"));
// Initialise dotenv to allow retrieval of spoofed environment variables (secrets) from .env
dotenv_1.default.config();
// Composition root
var fileRepo = Installer_1.default.get(Identifiers_1.default.IFileRepository);
var fileService = new FileService_1.FileService(fileRepo);
var converterRepo = Installer_1.default.get(Identifiers_1.default.IConverterRepository);
var converterService = new ConverterService_1.ConverterService(converterRepo);
var dbRepo = Installer_1.default.get(Identifiers_1.default.IDbRepository);
var dbService = new DbService_1.DbService(dbRepo);
var mailRepo = Installer_1.default.get(Identifiers_1.default.IMailRepository);
var mailService = new MailService_1.MailService(mailRepo);
var compressionRepo = Installer_1.default.get(Identifiers_1.default.ICompressionRepository);
var compressionService = new CompressionService_1.CompressionService(compressionRepo);
// Creates a DynamoDB table
var createTable = function (params) { return __awaiter(_this, void 0, void 0, function () {
    var err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, dbService.createTableAsync(params).then(function () {
                        console.log(params.TableName + " table created.");
                    })];
            case 1:
                _a.sent();
                return [3 /*break*/, 3];
            case 2:
                err_1 = _a.sent();
                console.error(err_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
// Retrieves a list of files from a specified path, filters by extension type and returns as array
var getFileList = function (dirPath) { return __awaiter(_this, void 0, void 0, function () {
    var result, extension_1, targetFiles, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, fileService.getFileListAsync(dirPath)];
            case 1:
                result = _a.sent();
                extension_1 = '.xml';
                targetFiles = result.filter(function (file) {
                    return path_1.default.extname(file).toLowerCase() === extension_1;
                });
                console.log("File list retrieved.");
                return [2 /*return*/, targetFiles];
            case 2:
                err_2 = _a.sent();
                console.error(err_2);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
// Retrieves content of array of files and returns as array
var getXmlFromFiles = function (fileList) { return __awaiter(_this, void 0, void 0, function () {
    var contentList_1, err_3;
    var _this = this;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                contentList_1 = [];
                return [4 /*yield*/, Promise.all(fileList.map(function (file) { return __awaiter(_this, void 0, void 0, function () {
                        var contents;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, fileService.getFileContentsAsync(path_1.default.join(dirPath, file))];
                                case 1:
                                    contents = _a.sent();
                                    contentList_1.push(contents);
                                    return [2 /*return*/];
                            }
                        });
                    }); }))];
            case 1:
                _a.sent();
                console.log("XML content retrieved from files.");
                return [2 /*return*/, contentList_1];
            case 2:
                err_3 = _a.sent();
                console.error(err_3);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
// Parses XML of all array items into JSON and returns as array
var getJsonFromXml = function (xmlList) { return __awaiter(_this, void 0, void 0, function () {
    var jsonList_1, err_4;
    var _this = this;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                jsonList_1 = [];
                return [4 /*yield*/, Promise.all(xmlList.map(function (xml) { return __awaiter(_this, void 0, void 0, function () {
                        var jsonItem;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, converterService.xmlToJsonAsync(xml)];
                                case 1:
                                    jsonItem = _a.sent();
                                    jsonList_1.push(jsonItem);
                                    return [2 /*return*/];
                            }
                        });
                    }); })).then(function () {
                        console.log("JSON parsed from XML data.");
                    })];
            case 1:
                _a.sent();
                return [2 /*return*/, jsonList_1];
            case 2:
                err_4 = _a.sent();
                console.error(err_4);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
// Writes array of BACSDocuments to DynamoDB
var writeDocsToDb = function (jsonList) { return __awaiter(_this, void 0, void 0, function () {
    var err_5;
    var _this = this;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, Promise.all(jsonList.map(function (doc) { return __awaiter(_this, void 0, void 0, function () {
                        var itemParams;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    // BACSDocuments lack unique IDs at DynamoDB-required top level - adding one for convenience
                                    doc.id = uuid_1.default();
                                    itemParams = {
                                        TableName: "Reports",
                                        Item: {
                                            "id": doc.id,
                                            "BACSDocument": doc.BACSDocument
                                        }
                                    };
                                    return [4 /*yield*/, dbService.putItemAsync(itemParams).then(function () {
                                            console.log("BACSDocument written to DynamoDB.");
                                        })];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); }))];
            case 1:
                _a.sent();
                return [3 /*break*/, 3];
            case 2:
                err_5 = _a.sent();
                console.error(err_5);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
// Retrieves all ReturnedDebitItem objects from array of JSON objects and returns them as an array
var getItemsFromJson = function (jsonList) { return __awaiter(_this, void 0, void 0, function () {
    var itemList_1, err_6;
    var _this = this;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                itemList_1 = [];
                return [4 /*yield*/, Promise.all(jsonList.map(function (doc) { return __awaiter(_this, void 0, void 0, function () {
                        var record;
                        return __generator(this, function (_a) {
                            record = doc.BACSDocument.Data[0].ARUDD[0].Advice[0].OriginatingAccountRecords[0].OriginatingAccountRecord[0];
                            Object.keys(record).forEach(function (key) {
                                if (key === "ReturnedDebitItem") {
                                    itemList_1.push.apply(itemList_1, record[key]);
                                }
                                ;
                            });
                            return [2 /*return*/];
                        });
                    }); })).then(function () {
                        console.log("ReturnedDebitItems retrieved from JSON data.");
                    })];
            case 1:
                _a.sent();
                return [2 /*return*/, itemList_1];
            case 2:
                err_6 = _a.sent();
                console.error(err_6);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
// Writes array of ReturnedDebitItem objects to DynamoDB
// Objects are completely typed (rather than passed in whole) to allow DB to distinguish Numbers from Strings
var writeItemsToDb = function (itemList) { return __awaiter(_this, void 0, void 0, function () {
    var err_7;
    var _this = this;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, Promise.all(itemList.map(function (item) { return __awaiter(_this, void 0, void 0, function () {
                        var itemParams;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    itemParams = {
                                        TableName: "ReturnedDebitItems",
                                        Item: {
                                            "ref": item.$.ref,
                                            "transCode": item.$.transCode,
                                            "returnCode": item.$.returnCode,
                                            "returnDescription": item.$.returnDescription,
                                            "originalProcessingDate": item.$.originalProcessingDate,
                                            "valueOf": Number(item.$.valueOf),
                                            "currency": item.$.currency,
                                            "PayerAccount": {
                                                "number": Number(item.PayerAccount[0].$.number),
                                                "ref": item.PayerAccount[0].$.ref,
                                                "name": item.PayerAccount[0].$.name,
                                                "sortCode": item.PayerAccount[0].$.sortCode,
                                                "bankName": item.PayerAccount[0].$.bankName,
                                                "branchName": item.PayerAccount[0].$.branchName,
                                            }
                                        }
                                    };
                                    return [4 /*yield*/, dbService.putItemAsync(itemParams).then(function () {
                                            console.log("ReturnedDebitItems written to DynamoDB.");
                                        })];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); }))];
            case 1:
                _a.sent();
                return [3 /*break*/, 3];
            case 2:
                err_7 = _a.sent();
                console.error(err_7);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
// Initialise mail provider settings
var initMail = function (provider) {
    try {
        mailService.initTransporter(provider);
        console.log("Mail service initialised.");
    }
    catch (err) {
        console.error(err);
    }
};
// Sends email
var sendMail = function (mailInfo) { return __awaiter(_this, void 0, void 0, function () {
    var err_8;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, mailService.sendMail(mailInfo).then(function () {
                        console.log("Confirmation email sent.");
                    })];
            case 1:
                _a.sent();
                return [3 /*break*/, 3];
            case 2:
                err_8 = _a.sent();
                console.error(err_8);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var addFilesToCompressor = function (fileList, contentList) { return __awaiter(_this, void 0, void 0, function () {
    var err_9;
    var _this = this;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, Promise.all(fileList.map(function (file) { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            compressionService.addFileToCompressor(file, contentList[fileList.indexOf(file)]);
                            return [2 /*return*/];
                        });
                    }); })).then(function () {
                        console.log("Files added to compressor.");
                    })];
            case 1:
                _a.sent();
                return [3 /*break*/, 3];
            case 2:
                err_9 = _a.sent();
                console.error(err_9);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var getCompressed = function () { return __awaiter(_this, void 0, void 0, function () {
    var err_10;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, compressionService.getCompressed()];
            case 1: return [2 /*return*/, _a.sent()];
            case 2:
                err_10 = _a.sent();
                console.error(err_10);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var writeBufferToFile = function (buffer, outFile) { return __awaiter(_this, void 0, void 0, function () {
    var err_11;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, fileService.writeBufferAsync(buffer, outFile).then(function () {
                        console.log("Compressed file written to disk.");
                    })];
            case 1:
                _a.sent();
                return [3 /*break*/, 3];
            case 2:
                err_11 = _a.sent();
                console.error(err_11);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var createDirectory = function (dirPath) { return __awaiter(_this, void 0, void 0, function () {
    var err_12;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, fileService.createDirectoryAsync(dirPath).then(function () {
                        console.log("Directory created.");
                    })];
            case 1:
                _a.sent();
                return [3 /*break*/, 3];
            case 2:
                err_12 = _a.sent();
                console.error(err_12);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
// Directory and file extension of XML files for processing
var dirPath = "C:\\Users\\goobe\\Desktop\\XML";
var archiveDir = "C:\\Users\\goobe\\Desktop\\XML\\Archive";
var archivePath = "C:\\Users\\goobe\\Desktop\\XML\\Archive\\" + Date.now() + ".zip";
// DynamoDB parameters for Report table
var reportTableParams = {
    TableName: "Reports",
    KeySchema: [
        { AttributeName: "id", KeyType: "HASH" },
    ],
    AttributeDefinitions: [
        { AttributeName: "id", AttributeType: "S" },
    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 10,
        WriteCapacityUnits: 10
    }
};
// DynamoDB parameters for ReturnedDebitItem table
var returnedDebitItemParams = {
    TableName: "ReturnedDebitItems",
    KeySchema: [
        { AttributeName: "ref", KeyType: "HASH" },
    ],
    AttributeDefinitions: [
        { AttributeName: "ref", AttributeType: "S" },
    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 10,
        WriteCapacityUnits: 10
    }
};
// Create Report table
createTable(reportTableParams);
// Create ReturnedDebitItems table
createTable(returnedDebitItemParams);
var runner = function () { return __awaiter(_this, void 0, void 0, function () {
    var fileList, contentList, jsonList, returnedDebitItemsList, auth, providerInfo, mailInfo, buffer;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, getFileList(dirPath)];
            case 1:
                fileList = _a.sent();
                if (!(fileList && fileList.length > 0)) return [3 /*break*/, 17];
                return [4 /*yield*/, getXmlFromFiles(fileList)];
            case 2:
                contentList = _a.sent();
                if (!(contentList && contentList.length > 0)) return [3 /*break*/, 15];
                return [4 /*yield*/, getJsonFromXml(contentList)];
            case 3:
                jsonList = _a.sent();
                if (!(jsonList && jsonList.length > 0)) return [3 /*break*/, 13];
                // Write full BACSDocuments to database
                return [4 /*yield*/, writeDocsToDb(jsonList)];
            case 4:
                // Write full BACSDocuments to database
                _a.sent();
                return [4 /*yield*/, getItemsFromJson(jsonList)];
            case 5:
                returnedDebitItemsList = _a.sent();
                if (!(returnedDebitItemsList && returnedDebitItemsList.length > 0)) return [3 /*break*/, 12];
                // Write ReturnedDebitItems to database
                return [4 /*yield*/, writeItemsToDb(returnedDebitItemsList)];
            case 6:
                // Write ReturnedDebitItems to database
                _a.sent();
                auth = {
                    user: process.env.ZOHO_USERNAME,
                    pass: process.env.ZOHO_PASSWORD
                };
                providerInfo = new EmailProvider_1.default("smtp.zoho.eu", 465, true, auth);
                // Initialise mail provider details.
                initMail(providerInfo);
                mailInfo = new Email_1.default('"Dale" <dalecodetesting@zohomail.eu>', "dalecodetesting@zohomail.eu", "Processing complete", "Data has been uploaded to DynamoDB.");
                // Send email confirming file processing.
                return [4 /*yield*/, sendMail(mailInfo)];
            case 7:
                // Send email confirming file processing.
                _a.sent();
                return [4 /*yield*/, createDirectory(archiveDir)];
            case 8:
                _a.sent();
                return [4 /*yield*/, addFilesToCompressor(fileList, contentList)];
            case 9:
                _a.sent();
                return [4 /*yield*/, getCompressed()];
            case 10:
                buffer = _a.sent();
                if (!buffer) return [3 /*break*/, 12];
                return [4 /*yield*/, writeBufferToFile(buffer, archivePath)];
            case 11:
                _a.sent();
                _a.label = 12;
            case 12: return [3 /*break*/, 14];
            case 13:
                console.log("A problem occurred while processing XML to JSON.");
                _a.label = 14;
            case 14: return [3 /*break*/, 16];
            case 15:
                console.log("File contents could not be retrieved.");
                _a.label = 16;
            case 16: return [3 /*break*/, 18];
            case 17:
                console.log("No files available to process.");
                _a.label = 18;
            case 18: return [2 /*return*/];
        }
    });
}); };
// Run process
runner();
//# sourceMappingURL=main.js.map