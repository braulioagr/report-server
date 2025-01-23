import type { StyleDictionary, TDocumentDefinitions } from 'pdfmake/interfaces';
import { DateFormater } from 'src/helpers';
import { headerSection } from '.';

interface EmployeeReportValues {
  employerName: string;
  employerPosition: string;
  employeeName: string;
  employeePosition: string;
  employeeStartDate: Date;
  employeeHours: number;
  employeeWorkSchedule: string;
  employerCompany: string;
}

const style: StyleDictionary = {
  header: {
    fontSize: 22,
    bold: true,
    alignment: 'center',
    margin: [0, 60, 0, 20],
  },
  body: {
    alignment: 'justify',
    margin: [0, 0, 0, 70],
  },
  signature: {
    fontSize: 14,
    bold: true,
    //alignment: 'left',
  },
  footer: {
    fontSize: 10,
    italics: true,
    alignment: 'center',
    margin: [0, 0, 0, 20],
  },
};

export const getEmploymentLetterReportById = (
  values: EmployeeReportValues,
): TDocumentDefinitions => {
  const {
    employerName,
    employerPosition,
    employeeName,
    employeePosition,
    employeeStartDate,
    employeeHours,
    employeeWorkSchedule,
    employerCompany,
  } = values;

  const documentDefinition: TDocumentDefinitions = {
    styles: style,
    pageMargins: [40, 60, 40, 60],
    header: headerSection({
      title: 'Constancia de Empleo',
      showLogo: true,
      showDate: true,
    }),
    content: [
      {
        text: 'CONSTANCIA DE EMPLEO',
        style: 'header',
      },
      {
        text: `Yo, ${employerName}, en mi calidad de ${employerPosition} de ${employerCompany}, por medio de la presente certifico que ${employeeName} ha sido empleado en nuestra empresa desde el ${DateFormater.getDDMMYYYY(employeeStartDate)}. \n\n
        Durante su empleo, el Sr./Sra. ${employeeName} ha desempeñado el cargo de ${employeePosition}, demostrando responsabilidad, compromiso y habilidades profesionales en sus labores. \n\n
        La jornada laboral del Sr./ Sra. ${employeeName} es de ${employeeWorkSchedule} horas semanales, con un horario de ${employeeHours}, cumpliendo con las políticas y procedimientos establecidos por la empresa. \n\n
        Esta constancia se expide a solicitud del interesado para los fines que considere conveniente.`,
        style: 'body',
      },
      { text: `Atentamente,`, style: 'signature' },
      { text: `${employerName}`, style: 'signature' },
      { text: `${employerPosition}`, style: 'signature' },
      { text: `${employerCompany}`, style: 'signature' },
      { text: DateFormater.getDDMMYYYY(new Date()), style: 'signature' },
    ],
    footer: {
      text: `Este documento es una constancia de empleo y no representa un compromiso laboral.`,
      alignment: 'center',
      style: 'footer',
    },
  };

  return documentDefinition;
};