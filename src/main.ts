import { IConverterRepository } from "./Repositories/IConverterRepository";
import { ConverterService } from "./Services/ConverterService";
import { IDbRepository } from "./Repositories/IDbRepository";
import { DbService } from "./Services/DbService";
import { IFileRepository } from "./Repositories/IFileRepository";
import { FileService } from "./Services/FileService";
import { IMailRepository } from "./Repositories/IMailRepository";
import { MailService } from "./Services/MailService";
import { ICompressionRepository } from "./Repositories/ICompressionRepository";
import { CompressionService } from "./Services/CompressionService";

import container from "./Infrastructure/Installer";
import SERVICE_IDENTIFIER from "./Constants/Identifiers";

import path from 'path';
import uuidv4 from 'uuid';
import dotenv from 'dotenv';

import Email from "./Models/Email";
import EmailProvider from "./Models/EmailProvider";

// Initialise dotenv to allow retrieval of spoofed environment variables (secrets) from .env
dotenv.config();

// Composition root
const fileRepo = container.get<IFileRepository>(SERVICE_IDENTIFIER.IFileRepository);
const fileService = new FileService(fileRepo);
const converterRepo = container.get<IConverterRepository>(SERVICE_IDENTIFIER.IConverterRepository);
const converterService = new ConverterService(converterRepo);
const dbRepo = container.get<IDbRepository>(SERVICE_IDENTIFIER.IDbRepository);
const dbService = new DbService(dbRepo);
const mailRepo = container.get<IMailRepository>(SERVICE_IDENTIFIER.IMailRepository);
const mailService = new MailService(mailRepo);
const compressionRepo = container.get<ICompressionRepository>(SERVICE_IDENTIFIER.ICompressionRepository);
const compressionService = new CompressionService(compressionRepo);

// Creates a DynamoDB table
const createTable = async(params: AWS.DynamoDB.CreateTableInput) => {
    try {
        await dbService.createTableAsync(params).then(() => {
            console.log(`${params.TableName} table created.`);
        });
    } catch(err) {
        console.error(err);
    }   
}

// Retrieves a list of files from a specified path, filters by extension type and returns as array
const getFileList = async(dirPath: string) => {
    try {
        const result = await fileService.getFileListAsync(dirPath);

        const extension = '.xml';
        let targetFiles = result.filter(function(file) {
            return path.extname(file).toLowerCase() === extension;
        });
        console.log("File list retrieved.");

        return targetFiles;
    } catch(err) { 
        console.error(err);
    }
}

// Retrieves content of array of files and returns as array
const getXmlFromFiles = async(fileList: string[]) => {
    try {
        const contentList: string[] = [];
        await Promise.all(fileList.map(async (file) => {
            const contents = await fileService.getFileContentsAsync(path.join(dirPath, file));
            contentList.push(contents);
        }));
        console.log("XML content retrieved from files.");

        return contentList;
    } catch(err) {
        console.error(err);
    }
}

// Parses XML of all array items into JSON and returns as array
const getJsonFromXml = async(xmlList: string[]) => {
    try {
        const jsonList: string[] = [];
        await Promise.all(xmlList.map(async (xml) => {
            const jsonItem = await converterService.xmlToJsonAsync(xml);
            jsonList.push(jsonItem);
        })).then(() => {
            console.log("JSON parsed from XML data.");
        });

        return jsonList;
    } catch(err) {
        console.error(err);
    }
}

// Writes array of BACSDocuments to DynamoDB
const writeDocsToDb = async(jsonList: any[]) => {
    try {
        await Promise.all(jsonList.map(async (doc) => {

            // BACSDocuments lack unique IDs at DynamoDB-required top level - adding one for convenience
            doc.id = uuidv4();

            let itemParams = {
                TableName: "Reports",
                Item: {
                    "id": doc.id,
                    "BACSDocument": doc.BACSDocument
                }
            };

            await dbService.putItemAsync(itemParams).then(() => {
                console.log("BACSDocument written to DynamoDB.");
            })
        }));
    } catch(err) {
        console.error(err);
    }
}

// Retrieves all ReturnedDebitItem objects from array of JSON objects and returns them as an array
const getItemsFromJson = async(jsonList: any) => {
    try {
        const itemList: string[] = [];
        await Promise.all(jsonList.map(async (doc: any) => {
            const record = doc.BACSDocument.Data[0].ARUDD[0].Advice[0].OriginatingAccountRecords[0].OriginatingAccountRecord[0];

            Object.keys(record).forEach((key) => {
                if(key === "ReturnedDebitItem") {
                    itemList.push(...record[key]);
                };
            });
        })).then(() => {
            console.log("ReturnedDebitItems retrieved from JSON data.");
        });

        return itemList;
    } catch(err) {
        console.error(err);
    }
}

// Writes array of ReturnedDebitItem objects to DynamoDB
// Objects are completely typed (rather than passed in whole) to allow DB to distinguish Numbers from Strings
const writeItemsToDb = async(itemList: any[]) => {
    try {
        await Promise.all(itemList.map(async (item) => {
            let itemParams = {
                TableName: "ReturnedDebitItems",
                Item: {
                    "ref": item.$.ref,
                    "transCode": item.$.transCode,
                    "returnCode": item.$.returnCode,
                    "returnDescription": item.$.returnDescription,
                    "originalProcessingDate": item.$.originalProcessingDate,
                    "valueOf": Number(item.$.valueOf),
                    "currency": item.$.currency,
                    "PayerAccount": {
                            "number": Number(item.PayerAccount[0].$.number),
                            "ref": item.PayerAccount[0].$.ref,
                            "name": item.PayerAccount[0].$.name,
                            "sortCode": item.PayerAccount[0].$.sortCode,
                            "bankName": item.PayerAccount[0].$.bankName,
                            "branchName": item.PayerAccount[0].$.branchName,
                    }
                }
            };

            await dbService.putItemAsync(itemParams).then(() => {
                console.log("ReturnedDebitItems written to DynamoDB.");
            });
        }));
    } catch(err) {
        console.error(err);
    }
}

// Initialise mail provider settings
const initMail = (provider: EmailProvider) => {
    try {
        mailService.initTransporter(provider);
        console.log("Mail service initialised.");
    } catch(err) {
        console.error(err);
    }
}

// Sends email
const sendMail = async(mailInfo: Email) => {
    try {
        await mailService.sendMail(mailInfo).then(() => {
            console.log("Confirmation email sent.");
        });
    } catch(err) {
        console.error(err);
    }
}

const addFilesToCompressor = async(fileList: string[], contentList: string[]) => {
    try {
        await Promise.all(fileList.map(async (file) => {
            compressionService.addFileToCompressor(file, contentList[fileList.indexOf(file)]);
        })).then(() => {
            console.log("Files added to compressor.");
        });
    } catch(err) {
        console.error(err);
    }
}

const getCompressed = async() => {
    try {
            return await compressionService.getCompressed();    
    } catch(err) {
        console.error(err);
    }
}

const writeBufferToFile = async(buffer: Buffer, outFile: string) => {
    try {
        await fileService.writeBufferAsync(buffer, outFile).then(() => {
            console.log("Compressed file written to disk.");
        });
    } catch(err) {
        console.error(err);
    }
}

const createDirectory = async(dirPath: string) => {
    try {
        await fileService.createDirectoryAsync(dirPath).then(() => {
            console.log("Directory created.");
        });
    } catch(err) {
        console.error(err);
    }
}

// Directory and file extension of XML files for processing
const dirPath: string = "C:\\Users\\goobe\\Desktop\\XML";
const archiveDir: string = "C:\\Users\\goobe\\Desktop\\XML\\Archive";
const archivePath: string = `C:\\Users\\goobe\\Desktop\\XML\\Archive\\${Date.now()}.zip`;

// DynamoDB parameters for Report table
let reportTableParams = {
    TableName : "Reports",
    KeySchema: [       
        { AttributeName: "id", KeyType: "HASH"},  //Partition key
    ],
    AttributeDefinitions: [       
        { AttributeName: "id", AttributeType: "S" },
    ],
    ProvisionedThroughput: {       
        ReadCapacityUnits: 10, 
        WriteCapacityUnits: 10
    }
};

// DynamoDB parameters for ReturnedDebitItem table
let returnedDebitItemParams = {
    TableName : "ReturnedDebitItems",
    KeySchema: [       
        { AttributeName: "ref", KeyType: "HASH"},  //Partition key
    ],
    AttributeDefinitions: [       
        { AttributeName: "ref", AttributeType: "S" },
    ],
    ProvisionedThroughput: {       
        ReadCapacityUnits: 10, 
        WriteCapacityUnits: 10
    }
};

// Create Report table
createTable(reportTableParams);

// Create ReturnedDebitItems table
createTable(returnedDebitItemParams);

const runner = async() => {
    // Get file names from local storage
    const fileList = await getFileList(dirPath);
    if(fileList && fileList.length > 0) {
        // Get XML content from files
        const contentList = await getXmlFromFiles(fileList);
        if(contentList && contentList.length > 0) {
            // Parse XML content to JSON
            const jsonList = await getJsonFromXml(contentList);
            if(jsonList && jsonList.length > 0) {
                // Write full BACSDocuments to database
                await writeDocsToDb(jsonList);

                // Get ReturnedDebitItems from parsed JSON
                const returnedDebitItemsList = await getItemsFromJson(jsonList);
                if(returnedDebitItemsList && returnedDebitItemsList.length > 0) {
                    // Write ReturnedDebitItems to database
                    await writeItemsToDb(returnedDebitItemsList);

                    // Retrieve 'secret' username/password from .env file
                    let auth = {
                        user: process.env.ZOHO_USERNAME,
                        pass: process.env.ZOHO_PASSWORD
                    }
        
                    // Provider parameters for ZohoMail.
                    let providerInfo = new EmailProvider("smtp.zoho.eu", 465, true, auth);
                    // Initialise mail provider details.
                    initMail(providerInfo);
        
                    // Email parameters for individual email.
                    let mailInfo = new Email('"Dale" <dalecodetesting@zohomail.eu>', "dalecodetesting@zohomail.eu", "Processing complete", "Data has been uploaded to DynamoDB.");
                    // Send email confirming file processing.
                    await sendMail(mailInfo);

                    await createDirectory(archiveDir);
                    await addFilesToCompressor(fileList, contentList);
                    const buffer = await getCompressed();
                    if(buffer) {
                        await writeBufferToFile(buffer, archivePath);
                    }
                }
            } else {
                console.log("A problem occurred while processing XML to JSON.");
            }
        } else {
            console.log("File contents could not be retrieved.");
        }

    } else {
        console.log("No files available to process.");
    }
}

// Run process
runner();