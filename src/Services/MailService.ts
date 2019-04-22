import { IMailRepository } from "../Repositories/IMailRepository";
import EmailProvider from "../Models/EmailProvider";
import Email from "../Models/Email";

export class MailService {
    private repository: IMailRepository;

    constructor(repository: IMailRepository) {
        this.repository = repository;
    }

    initTransporter(provider: EmailProvider): void {
        return this.repository.initTransporter(provider);
    }

    sendMail(mailOptions: Email): Promise<any> {
        return this.repository.sendMail(mailOptions);
    }
}