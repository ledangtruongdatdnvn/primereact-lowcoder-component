import { NameConfig } from 'lowcoder-sdk';
export const typeOptions = [
  {
    label: 'Markdown',
    value: 'markdown',
  },
  {
    label: 'Text',
    value: 'text',
  },
] as const;
export const defaultLabel = 'My Label';
export const exposingConfigs = [new NameConfig('text', 'Children of label')];
