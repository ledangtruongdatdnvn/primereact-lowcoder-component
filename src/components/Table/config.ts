import { NameConfig } from 'lowcoder-sdk';
export const staticProps = {
  stripedRows: true,
  paginator: true,
  rowHover: true,
  responsiveLayout: 'scroll',
  lazy: false,
  rowsPerPageOptions: [1, 5, 10, 20],
  tableStyle: { minWidth: '20rem' },
};

export const defaultValue = [
  {
    id: 'code-1',
    name: 'row 1',
    category: 'important',
    quantity: 1,
  },
  {
    id: 'code-2',
    name: 'row 2',
    category: 'very important',
    quantity: 2,
  },
  {
    id: 'code-3',
    name: 'row 3',
    category: 'important',
    quantity: 3,
  },
  {
    id: 'code-4',
    name: 'row 4',
    category: 'less important',
    quantity: 4,
  },
];

export const columns = [
  { header: 'Column 1', field: 'id' },
  {
    header: 'Column 2',
    field: 'name',
  },
];

export const exposingConfigs = [
  new NameConfig('staticProps', 'static props of datatable'),
  new NameConfig('value', 'value props of datatable'),
  new NameConfig('columns', 'columns props of datatable'),
  new NameConfig('first', 'first props of datatable'),
  new NameConfig('rows', 'rows props of datatable'),
  new NameConfig('totalRecords', 'totalRecords props of datatable'),
];
