import "reflect-metadata";
import { IConverterRepository } from "./IConverterRepository";
import { injectable } from "inversify";
import { parseString } from "xml2js";
import util from 'util';

@injectable()
export class Xml2JsImp implements IConverterRepository {
    
    // Asynchronously converts XML to JSON
    xmlToJsonAsync(xml: string): Promise<string> {
        const xmlToJsonAsync = util.promisify(parseString);

        return xmlToJsonAsync(xml)
            .then((result: any) => {
                return result;
            })
            .catch((err: Error) => {
                throw err;
            });
    }
}