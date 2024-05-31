import { NameConfig } from 'lowcoder-sdk';
export const staticProps = { placeholder: 'Enter a number', min: 1, max: 10 };
export const defaultValue = 1;
export const exposingConfigs = [new NameConfig('staticProps', 'static props of inputnumber'), new NameConfig('value', 'value props of inputnumber')];
