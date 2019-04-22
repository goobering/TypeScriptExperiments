import { ConverterService } from '../src/Services/ConverterService';
import { IConverterRepository } from '../src/Repositories/IConverterRepository';
import container from "../src/Infrastructure/Installer";
import SERVICE_IDENTIFIER from "../src/Constants/Identifiers";

const converterRepo = container.get<IConverterRepository>(SERVICE_IDENTIFIER.IConverterRepository);
const converterService = new ConverterService(converterRepo);

describe('ConverterService tests', () => {
  
  it('Should asynchronously return JSON from XML - simple', async () => {
    await converterService.xmlToJsonAsync("<item></item>").then(result => {
        expect(result).toEqual({"item": ""});
    });
  });

  it('Should asynchronously return JSON from XML - with attributes', async () => {
    await converterService.xmlToJsonAsync(`<item attribute="1"></item>`).then(result => {
        expect(result).toEqual({"item": {"$": {"attribute": "1"}}});
    });
  });

  it('Should asynchronously return JSON from XML - with nested objects', async () => {
    await converterService.xmlToJsonAsync(`<item><item2></item2></item>`).then(result => {
        expect(result).toEqual({"item": {"item2": [""]}});
    });
  });

  it('Should asynchronously return JSON from XML - with deeper nested objects', async () => {
    await converterService.xmlToJsonAsync(`<item><item2><item3></item3></item2></item>`).then(result => {
        expect(result).toEqual({"item": {"item2": [ {"item3": [""] }  ] } } );
    });
  });

  it('Should throw an exception when converting completely invalid XML', async () => {
    try {
      await converterService.xmlToJsonAsync("Not XML");
    } catch (e) {
      console.dir(e);
      expect(e).toEqual(new Error("Non-whitespace before first tag.\nLine: 0\nColumn: 1\nChar: N"));
    }
  });

  it('Should throw an exception when converting partially invalid XML', async () => {
    try {
      await converterService.xmlToJsonAsync("<item>Not XML</item>");
    } catch (e) {
      console.dir(e);
      expect(e).toEqual(new Error("Non-whitespace before first tag.\nLine: 0\nColumn: 1\nChar: N"));
    }
  });

  it('Should throw an exception when converting empty XML', async () => {
    try {
      await converterService.xmlToJsonAsync("");
    } catch (e) {
      console.dir(e);
      expect(e).toEqual(new Error("Non-whitespace before first tag.\nLine: 0\nColumn: 1\nChar: N"));
    }
  });

});