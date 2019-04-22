import { IDbRepository } from "../Repositories/IDbRepository";
import { PromiseResult } from "aws-sdk/lib/request";

export class DbService {
    private repository: IDbRepository;

    constructor(repository: IDbRepository) {
        this.repository = repository;
    }

    createTableAsync(params: AWS.DynamoDB.CreateTableInput): Promise<PromiseResult<AWS.DynamoDB.CreateTableOutput, AWS.AWSError>> {
        return this.repository.createTableAsync(params);
    }

    putItemAsync(params: any): Promise<PromiseResult<AWS.DynamoDB.PutItemOutput, AWS.AWSError>> {
        return this.repository.putItemAsync(params);
    }
}