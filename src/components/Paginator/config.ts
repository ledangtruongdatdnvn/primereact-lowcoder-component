import { NameConfig } from 'lowcoder-sdk';
export const staticProps = {
  rowsPerPageOptions: [1, 5, 10, 20],
};

export const exposingConfigs = [
  new NameConfig('staticProps', 'static props of paginator'),
  new NameConfig('first', 'first props of paginator'),
  new NameConfig('rows', 'rows props of paginator'),
  new NameConfig('totalRecords', 'totalRecords props of paginator'),
];
