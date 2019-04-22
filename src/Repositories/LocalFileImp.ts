import "reflect-metadata";
import { IFileRepository } from "./IFileRepository";
import { injectable } from "inversify";
import { promises as fs } from 'fs';
import util from 'util';
import path from 'path';
import {promises} from 'fs';

@injectable()
export class LocalFileImp implements IFileRepository {

    // Asynchronously returns a list of files in directory dirPath, with extension ext
    getFileListAsync(dirPath: string): Promise<string[]> {
        return fs.readdir(dirPath, 'utf8');
    }

    // Asynchronously returns the contents of the file at filePath as a string
    getFileContentsAsync(filePath: string): Promise<string> {
        return fs.readFile(filePath, 'utf8');    
    }

    // Asynchronously writes a buffer to the specified path on disk
    writeBufferAsync(buffer: Buffer, outFile: string): Promise<any> {
        return fs.writeFile(outFile, buffer);
    }

    // Asynchronously creates a directory at the specified path on disk
    createDirectoryAsync(dirPath: string): Promise<any> {
        return fs.mkdir(dirPath);
    }
    
};