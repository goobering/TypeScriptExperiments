export interface IFileRepository {
    getFileListAsync(dirPath: string): Promise<string[]>;
    getFileContentsAsync(filePath: string): Promise<string>;
    writeBufferAsync(buffer: Buffer, outFile: string): Promise<any>;
    createDirectoryAsync(dirPath: string): Promise<any>;
}