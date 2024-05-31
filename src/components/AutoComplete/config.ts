import { NameConfig } from 'lowcoder-sdk';
export const staticProps = { placeholder: 'Enter a country name', field: 'name' };
export const defaultValue = '';

export const defaultSuggestions = [
  { name: 'United Kingdom', code: 'UK' },
  { name: 'United States', code: 'USA' },
];

export const exposingConfigs = [
  new NameConfig('staticProps', 'static props of inputtext'),
  new NameConfig('value', 'value props of inputtext'),
  new NameConfig('suggestions', 'suggestions props of inputtext'),
];
