import "reflect-metadata";
import { Container } from "inversify";
import SERVICE_IDENTIFIER from "../Constants/Identifiers";
import { IFileRepository } from "../Repositories/IFileRepository";
import { LocalFileImp } from "../Repositories/LocalFileImp";
import { IConverterRepository } from "../Repositories/IConverterRepository";
import { Xml2JsImp } from "../Repositories/Xml2JsImp";
import { IDbRepository } from "../Repositories/IDbRepository";
import { DynamoDbImp } from "../Repositories/DynamoDbImp";
import { IMailRepository } from "../Repositories/IMailRepository";
import { NodeMailerImp } from "../Repositories/NodeMailerImp";
import { ICompressionRepository } from "../Repositories/ICompressionRepository";
import { JsZipImp } from "../Repositories/JsZipImp";

let container = new Container();
container.bind<IFileRepository>(SERVICE_IDENTIFIER.IFileRepository).to(LocalFileImp);
container.bind<IConverterRepository>(SERVICE_IDENTIFIER.IConverterRepository).to(Xml2JsImp);
container.bind<IDbRepository>(SERVICE_IDENTIFIER.IDbRepository).to(DynamoDbImp);
container.bind<IMailRepository>(SERVICE_IDENTIFIER.IMailRepository).to(NodeMailerImp);
container.bind<ICompressionRepository>(SERVICE_IDENTIFIER.ICompressionRepository).to(JsZipImp);

export default container;