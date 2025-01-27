import {
  Content,
  StyleDictionary,
  TDocumentDefinitions,
} from 'pdfmake/interfaces';
import { CurrencyFormatter, DateFormatter } from 'src/helpers';
import { footerSection } from '.';

const logo: Content = {
  image: 'src/assets/tucan-banner.png',
  width: 100,
  height: 30,
  margin: [10, 20],
};

const styles: StyleDictionary = {
  header: {
    fontSize: 20,
    bold: true,
    margin: [0, 20, 0, 0],
  },
  subHeader: {
    fontSize: 16,
    bold: true,
    margin: [0, 20, 0, 0],
  },
};

export interface CompleteOrder {
  order_id: number;
  customer_id: number;
  order_date: Date;
  customers: Customers;
  order_details: OrderDetail[];
}

export interface Customers {
  customer_id: number;
  customer_name: string;
  contact_name: string;
  address: string;
  city: string;
  postal_code: string;
  country: string;
}

export interface OrderDetail {
  order_detail_id: number;
  order_id: number;
  product_id: number;
  quantity: number;
  products: Products;
}

export interface Products {
  product_id: number;
  product_name: string;
  category_id: number;
  unit: string;
  price: string;
}

interface ReportValues {
  title?: string;
  subTitle?: string;
  data: CompleteOrder;
}

export const orderByIdReport = (value: ReportValues): TDocumentDefinitions => {
  const { data } = value;
  const { customers, order_details } = data;
  const subTotal = order_details.reduce(
    (acc, orderDetail) =>
      acc + orderDetail.quantity * +orderDetail.products.price,
    0,
  );
  return {
    header: logo,
    footer: footerSection,
    styles: styles,
    pageMargins: [40, 60, 40, 60],
    content: [
      // Headers
      {
        text: 'Tucan Code',
        style: 'header',
      },
      // Address and billing
      {
        columns: [
          {
            text: `15 Montgomery Str, Suite 100, \nOttawa ON K2Y 9X1, CANADA \nBN: 12783671823 \nhttps://tucancode.com`,
          },
          {
            text: [
              { text: `Recibo No#: ${data.order_id} \n`, bold: true },
              `Fecha del recibo: ${DateFormatter.getDDMMYYYY(data.order_date)} \nPagar antes de: ${DateFormatter.getDDMMYYYY(new Date())}\n`,
            ],
            alignment: 'right',
          },
        ],
      },
      // QR
      { qr: 'https://tucancode.com', fit: 75, alignment: 'right' },
      // Client Address
      {
        text: [
          { text: `Cobrar a: \n`, style: 'subHeader' },
          `Razón Social: ${customers.customer_name} \nContacto: ${customers.contact_name} \n${customers.address}, ${customers.country}`,
        ],
      },
      // Table
      {
        layout: 'headerLineOnly',
        margin: [0, 20],
        table: {
          headerRows: 1,
          widths: [50, '*', 'auto', 'auto', 'auto'],
          body: [
            ['Id', 'Description', 'Qty', 'Price', 'Total'],
            ...order_details.map((orderDetail: OrderDetail) => {
              return [
                orderDetail.order_detail_id.toString(),
                orderDetail.products.product_name,
                orderDetail.quantity.toString(),
                {
                  text: CurrencyFormatter.format(+orderDetail.products.price),
                  alignment: 'right',
                },
                {
                  text: CurrencyFormatter.format(
                    orderDetail.quantity * +orderDetail.products.price,
                  ),
                  alignment: 'right',
                },
              ];
            }),
          ],
        },
      },
      // Line break
      '\n\n',
      {
        columns: [
          { width: '*', text: '' },
          {
            width: 'auto',
            layout: 'noBorders',
            table: {
              headerRows: 1,
              widths: ['auto', 'auto'],
              body: [
                [
                  'Subtotal',
                  {
                    text: CurrencyFormatter.format(subTotal),
                    alignment: 'right',
                  },
                ],
                [
                  { text: 'Total', bold: true },
                  {
                    text: CurrencyFormatter.format(subTotal * 1.16),
                    alignment: 'right',
                    bold: true,
                  },
                ],
              ],
            },
          },
        ],
      },
    ],
  };
};
