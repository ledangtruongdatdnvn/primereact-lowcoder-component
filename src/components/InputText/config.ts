import { NameConfig } from 'lowcoder-sdk';
export const staticProps = { placeholder: 'Enter a name' };
export const defaultValue = '';
export const exposingConfigs = [new NameConfig('staticProps', 'static props of inputtext'), new NameConfig('value', 'value props of inputtext')];
