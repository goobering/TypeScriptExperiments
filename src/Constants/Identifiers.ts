const SERVICE_IDENTIFIER = {
    IFileRepository: Symbol("LocalFileImp"),
    IConverterRepository: Symbol("Xml2JsImp"),
    IDbRepository: Symbol("DynamoDbImp"),
    IMailRepository: Symbol("NodeMailerImp"),
    ICompressionRepository: Symbol("JsZipImp"),
};

export default SERVICE_IDENTIFIER;