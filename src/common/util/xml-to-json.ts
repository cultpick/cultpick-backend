import * as xml2js from 'xml2js';

export async function xmlToJson(xmlData: string): Promise<object[]> {
  const parser = new xml2js.Parser({ explicitArray: false });
  const jsonResult = await parser.parseStringPromise(xmlData);

  return jsonResult.dbs.db || [];
}
