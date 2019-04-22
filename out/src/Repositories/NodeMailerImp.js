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
var nodemailer_1 = __importDefault(require("nodemailer"));
var NodeMailerImp = /** @class */ (function () {
    function NodeMailerImp() {
    }
    NodeMailerImp.prototype.initTransporter = function (provider) {
        this.transporter = nodemailer_1.default.createTransport({
            host: provider.host,
            // No idea why I have to recast this to a Number - causing problems otherwise
            port: Number(provider.port),
            secure: provider.secure,
            auth: {
                user: provider.auth.user,
                pass: provider.auth.pass
            }
        });
    };
    NodeMailerImp.prototype.sendMail = function (mailOptions) {
        var _this = this;
        if (!this.transporter) {
            throw new Error("The transporter has not been initialized.");
        }
        return new Promise(function (resolve, reject) {
            _this.transporter.sendMail(mailOptions, function (err, data) {
                if (err) {
                    return reject(err);
                }
                else {
                    return resolve(data);
                }
            });
        });
    };
    NodeMailerImp = __decorate([
        inversify_1.injectable()
    ], NodeMailerImp);
    return NodeMailerImp;
}());
exports.NodeMailerImp = NodeMailerImp;
//# sourceMappingURL=NodeMailerImp.js.map