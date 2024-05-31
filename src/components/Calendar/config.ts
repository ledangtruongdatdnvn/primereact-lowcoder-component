import { NameConfig } from 'lowcoder-sdk';

export const staticProps = { placeholder: 'Choose date(s)', selectionMode: 'range', hideOnRangeSelection: true };

export const defaultValue = [];

export const exposingConfigs = [new NameConfig('staticProps', 'static props of calendar'), new NameConfig('value', 'value props of calendar')];
