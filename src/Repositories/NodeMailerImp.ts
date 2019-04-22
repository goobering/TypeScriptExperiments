import "reflect-metadata";
import { IMailRepository } from "./IMailRepository";
import { injectable } from "inversify";
import nodeMailer from 'nodemailer';
import Email from "../Models/Email";
import EmailProvider from "../Models/EmailProvider";

@injectable()
export class NodeMailerImp implements IMailRepository {

    transporter: any;
    
    initTransporter(provider: EmailProvider): void {
        this.transporter = nodeMailer.createTransport({
            host: provider.host,
            // No idea why I have to recast this to a Number - causing problems otherwise
            port: Number(provider.port),
            secure: provider.secure, 
            auth: {
                user: provider.auth.user,
                pass: provider.auth.pass
            }
        });  
    }

    sendMail(mailOptions: Email): Promise<any> {
        if(!this.transporter) {
            throw new Error("The transporter has not been initialized.");
        }

        return new Promise((resolve, reject) => {
            this.transporter.sendMail(mailOptions, (err: any, data: any) => {
                if (err) {
                    return reject(err);
                } else {
                    return resolve(data);
                }
            });
        });
    }

}