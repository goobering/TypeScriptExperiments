import { ICompressionRepository } from "../Repositories/ICompressionRepository";

export class CompressionService {
    private repository: ICompressionRepository;

    constructor(repository: ICompressionRepository) {
        this.repository = repository;
    }

    addFileToCompressor(filePath: string, fileContent: string): void {
        return this.repository.addFileToCompressor(filePath, fileContent);
    }

    getCompressed(): Promise<Buffer> {
        return this.repository.getCompressed();
    }
}