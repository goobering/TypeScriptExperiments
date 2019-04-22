import { PromiseResult } from "aws-sdk/lib/request";

export interface IDbRepository {
    createTableAsync(params: AWS.DynamoDB.CreateTableInput): Promise<PromiseResult<AWS.DynamoDB.CreateTableOutput, AWS.AWSError>>;
    putItemAsync(params: any): Promise<PromiseResult<AWS.DynamoDB.PutItemOutput, AWS.AWSError>>;
}