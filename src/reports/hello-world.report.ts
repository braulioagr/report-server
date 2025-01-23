import type { TDocumentDefinitions } from 'pdfmake/interfaces';

export interface HelloWorldReportOptions {
  name: string;
}

export const getHelloWorldReport = (
  options: HelloWorldReportOptions,
): TDocumentDefinitions => {
  const { name } = options;
  const documentDefinition: TDocumentDefinitions = {
    content: [`Hola ${name}`],
  };

  return documentDefinition;
};
