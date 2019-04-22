import "reflect-metadata";
import { IDbRepository } from "./IDbRepository";
import { injectable } from "inversify";
import AWS from 'aws-sdk';
import { ServiceConfigurationOptions } from 'aws-sdk/lib/service';
import CONFIG from "../Constants/AwsDetails";
import { PromiseResult } from "aws-sdk/lib/request";

@injectable()
export class DynamoDbImp implements IDbRepository {
    region: string = CONFIG.local.region;
    endpoint: string = CONFIG.local.endpoint;

    serviceConfigOptions: ServiceConfigurationOptions = {
        region: this.region,
        endpoint: this.endpoint
    };

    dynamodb: AWS.DynamoDB = new AWS.DynamoDB(this.serviceConfigOptions);

    docClient = new AWS.DynamoDB.DocumentClient( {
        region: this.region,
        endpoint: this.endpoint,
        convertEmptyValues: true
    });

    createTableAsync(params: AWS.DynamoDB.CreateTableInput): Promise<PromiseResult<AWS.DynamoDB.CreateTableOutput, AWS.AWSError>> {
        return this.dynamodb.createTable(params).promise();
    }

    putItemAsync(params: any): Promise<PromiseResult<AWS.DynamoDB.PutItemOutput, AWS.AWSError>> {
        return this.docClient.put(params).promise();
    }

    scanTableAsync(params: AWS.DynamoDB.DocumentClient.ScanInput): Promise<PromiseResult<AWS.DynamoDB.DocumentClient.ScanOutput, AWS.AWSError>> {
        return this.docClient.scan(params).promise();
    }
}