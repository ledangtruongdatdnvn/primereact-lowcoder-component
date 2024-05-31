import { NameConfig } from 'lowcoder-sdk';
export const staticProps = {
  label: 'button',
  raised: false,
  tooltip: 'tooltip',
  icon: 'pi pi-cog',
  iconPos: 'left',
  size: 'small',
  badge: '',
  rounded: false,
  severity: 'success',
};

export const exposingConfigs = [
  new NameConfig('staticProps', 'static props of button'),
  new NameConfig('visible', 'visibility of button'),
  new NameConfig('loading', 'loading status of button'),
  new NameConfig('disabled', 'disabled status of button'),
];
