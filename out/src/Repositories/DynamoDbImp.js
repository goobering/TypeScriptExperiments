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
var aws_sdk_1 = __importDefault(require("aws-sdk"));
var AwsDetails_1 = __importDefault(require("../Constants/AwsDetails"));
var DynamoDbImp = /** @class */ (function () {
    function DynamoDbImp() {
        this.region = AwsDetails_1.default.local.region;
        this.endpoint = AwsDetails_1.default.local.endpoint;
        this.serviceConfigOptions = {
            region: this.region,
            endpoint: this.endpoint
        };
        this.dynamodb = new aws_sdk_1.default.DynamoDB(this.serviceConfigOptions);
        this.docClient = new aws_sdk_1.default.DynamoDB.DocumentClient({
            region: this.region,
            endpoint: this.endpoint,
            convertEmptyValues: true
        });
    }
    DynamoDbImp.prototype.createTableAsync = function (params) {
        return this.dynamodb.createTable(params).promise();
    };
    DynamoDbImp.prototype.putItemAsync = function (params) {
        return this.docClient.put(params).promise();
    };
    DynamoDbImp.prototype.scanTableAsync = function (params) {
        return this.docClient.scan(params).promise();
    };
    DynamoDbImp = __decorate([
        inversify_1.injectable()
    ], DynamoDbImp);
    return DynamoDbImp;
}());
exports.DynamoDbImp = DynamoDbImp;
//# sourceMappingURL=DynamoDbImp.js.map