import EmailProvider from "../Models/EmailProvider";
import Email from "../Models/Email";

export interface IMailRepository {
    initTransporter(provider: EmailProvider): void;
    sendMail(mailOptions: Email): Promise<any>;
}