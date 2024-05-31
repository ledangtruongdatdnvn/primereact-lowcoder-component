import { NameConfig } from 'lowcoder-sdk';
export const staticProps = { placeholder: 'Select Cities', optionLabel: 'name', filter: true };

export const defaultValue = [{ name: 'New York', code: 'NY' }];

export const defaultOptions = [
  { name: 'New York', code: 'NY' },
  { name: 'Rome', code: 'RM' },
  { name: 'London', code: 'LDN' },
  { name: 'Istanbul', code: 'IST' },
  { name: 'Paris', code: 'PRS' },
];

export const exposingConfigs = [
  new NameConfig('staticProps', 'static props of multiselect'),
  new NameConfig('value', 'value props of multiselect'),
  new NameConfig('options', 'options props of multiselect'),
];
