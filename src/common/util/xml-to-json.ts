import * as xml2js from 'xml2js';

export async function xmlToJson(xmlData: string): Promise<object> {
  const parser = new xml2js.Parser({ explicitArray: false });
  const jsonResult = await parser.parseStringPromise(xmlData);

  const db = jsonResult.dbs?.db;

  return db;
}

export async function xmlToJsonList(xmlData: string): Promise<object[]> {
  const parser = new xml2js.Parser({ explicitArray: false });
  const jsonResult = await parser.parseStringPromise(xmlData);

  const db = jsonResult.dbs?.db;

  return Array.isArray(db) ? db : db ? [db] : [];
}
