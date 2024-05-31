import { NameConfig } from 'lowcoder-sdk';
export const staticProps = { align: 'alternate' };

export const defaultValue = [
  { status: 'Ordered', date: '15/10/2020 10:30', icon: 'pi pi-shopping-cart', color: '#9C27B0' },
  { status: 'Processing', date: '15/10/2020 14:00', icon: 'pi pi-cog', color: '#673AB7' },
  { status: 'Shipped', date: '15/10/2020 16:15', icon: 'pi pi-shopping-cart', color: '#FF9800' },
  { status: 'Delivered', date: '16/10/2020 10:00', icon: 'pi pi-check', color: '#607D8B' },
];

export const exposingConfigs = [
  new NameConfig('staticProps', 'static props of timeline'),
  new NameConfig('value', 'value props of timeline'),
  new NameConfig('content', 'content props of timeline'),
  new NameConfig('subContent', 'sub-content props of timeline'),
  new NameConfig('icon', 'icon props of timeline'),
];
