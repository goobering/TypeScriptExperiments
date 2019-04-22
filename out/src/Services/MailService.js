"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MailService = /** @class */ (function () {
    function MailService(repository) {
        this.repository = repository;
    }
    MailService.prototype.initTransporter = function (provider) {
        return this.repository.initTransporter(provider);
    };
    MailService.prototype.sendMail = function (mailOptions) {
        return this.repository.sendMail(mailOptions);
    };
    return MailService;
}());
exports.MailService = MailService;
//# sourceMappingURL=MailService.js.map