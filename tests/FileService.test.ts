import { FileService } from '../src/Services/FileService';
import { IFileRepository } from '../src/Repositories/IFileRepository';
import container from "../src/Infrastructure/Installer";
import SERVICE_IDENTIFIER from "../src/Constants/Identifiers";

import path from 'path';

const fileRepo = container.get<IFileRepository>(SERVICE_IDENTIFIER.IFileRepository);
const fileService = new FileService(fileRepo);

describe('getFileListAsync tests', () => {
    const fileDir = "./tests/testFiles";
    const failingDir = "./tests/fail";
    const emptyDir = "";
    const expectedFiles = ["testFile1.txt", "testFile2.txt", "testFile3.txt"];

    it('Should asynchronously return an array of file names from a path', async () => {
        return await fileService.getFileListAsync(fileDir).then(result => {
            expect(result).toEqual(expectedFiles);
        });
      });

    // Not *at all* easy testing Error messages in Node/Jest. I tried most of these: https://github.com/facebook/jest/issues/3601
    it('Should throw an ENOENT exception if passed an empty path', async () => {
        const promise = fileService.getFileListAsync(emptyDir);

        await expect(promise).rejects.toMatchObject({
            message: "ENOENT: no such file or directory, scandir ''"
        });
    });

    it('Should throw an ENOENT exception if passed a non-existing path', async () => {
        const promise = fileService.getFileListAsync(failingDir);

        await expect(promise).rejects.toMatchObject({
            message: `ENOENT: no such file or directory, scandir '${path.resolve(failingDir)}'`
        });
    });
});

describe('getFileContentsAsync tests', () => {
    const testFileDir = "./tests/testFiles";
    const testFileName = "testFile1.txt";
    const failingDir = "./tests/fail";
    const emptyDir = "";
    const emptyFileName = "";
    const expectedString = "Test value 1";

    it('Should asynchronously return the contents of a file as a string', async () => {
        await fileService.getFileContentsAsync(path.join(testFileDir, testFileName)).then(result => {
            expect(result).toEqual(expectedString);
        });
      });

    it('Should throw an EISDIR exception if passed an empty path', async () => {
        const promise = fileService.getFileContentsAsync(path.join(emptyDir, emptyFileName));

        await expect(promise).rejects.toMatchObject({
            message: "EISDIR: illegal operation on a directory, read"
        });
    });

    it('Should throw an ENOENT exception if passed a non-existing path', async () => {
        const promise = fileService.getFileContentsAsync(path.join(failingDir, testFileName));

        await expect(promise).rejects.toMatchObject({
            message: `ENOENT: no such file or directory, open '${path.join(path.resolve(failingDir), testFileName)}'`
        });
    });
});