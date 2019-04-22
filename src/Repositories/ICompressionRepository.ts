import jsZip from 'jszip';

export interface ICompressionRepository {
    addFileToCompressor(filePath: string, fileContent: string): void;
    getCompressed(): Promise<Buffer>;
    resetCompressor(): void;
}