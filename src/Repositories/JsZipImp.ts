import "reflect-metadata";
import { ICompressionRepository } from "./ICompressionRepository";
import { injectable } from "inversify";
import jsZip from 'jszip';
import util from 'util';

@injectable()
export class JsZipImp implements ICompressionRepository {
    zipper: jsZip = new jsZip();
    
    addFileToCompressor(filePath: string, fileContent: string): void {
        this.zipper.file(filePath, fileContent);
    }

    getCompressed(): Promise<Buffer> {
        return this.zipper.generateAsync({type: "nodebuffer"});
    }

    resetCompressor(): void {
        this.zipper = new jsZip();
    }
}