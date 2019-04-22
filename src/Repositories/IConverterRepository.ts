export interface IConverterRepository {
    xmlToJsonAsync(xml: string): Promise<string>
}