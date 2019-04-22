import { IConverterRepository } from "../Repositories/IConverterRepository";

export class ConverterService {
    private repository: IConverterRepository;

    constructor(repository: IConverterRepository) {
        this.repository = repository;
    }

    xmlToJsonAsync(xml: string): Promise<string> {
        return this.repository.xmlToJsonAsync(xml);
    }
}