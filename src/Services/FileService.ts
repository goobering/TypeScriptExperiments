import { IFileRepository } from "../Repositories/IFileRepository";

export class FileService {
    private repository: IFileRepository;

    constructor(repository: IFileRepository) {
        this.repository = repository;
    }

    getFileListAsync(dirPath: string): Promise<string[]> {
        return this.repository.getFileListAsync(dirPath);
    }

    getFileContentsAsync(filePath: string): Promise<string> {
        return this.repository.getFileContentsAsync(filePath);
    }

    writeBufferAsync(buffer: Buffer, outFile: string): Promise<any> {
        return this.repository.writeBufferAsync(buffer, outFile);
    }
    
    createDirectoryAsync(dirPath: string): Promise<any> {
        return this.repository.createDirectoryAsync(dirPath);
    }
}