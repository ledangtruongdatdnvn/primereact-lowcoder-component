import { NameConfig } from 'lowcoder-sdk';

export const commonProps = { tooltip: 'Choose one!' };

export const radioButtons = [
  { name: 'pizza', value: 'Cheese', inputId: 'pizza' },
  { name: 'pizza2', value: 'Cheese2', inputId: 'pizza2' },
  { name: 'pizza3', value: 'Cheese3', inputId: 'pizza3' },
  { name: 'pizza4', value: 'Cheese4', inputId: 'pizza4' },
];

export const defaultChecked = '';

export const exposingConfigs = [new NameConfig('commonProps', 'static props of radiobutton'), new NameConfig('checked', 'checked props of radiobutton')];
