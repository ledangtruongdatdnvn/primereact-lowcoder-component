import {
  dropdownControl,
  Section,
  StringControl,
  stringExposingStateControl,
  TacoMarkDown,
  UICompBuilder,
  withDefault,
  withExposingConfigs
} from 'lowcoder-sdk';
import AppLabel from './base';
import { defaultLabel, exposingConfigs, typeOptions } from './config';
import './index.css';

let LabelCompBase = (function () {
  const childrenMap = {
    text: stringExposingStateControl('text', '### 👋 Hello Friends, '),
    type: dropdownControl(typeOptions, 'markdown'),
    label: withDefault(StringControl, defaultLabel),
  };

  return new UICompBuilder(childrenMap, (props: { label: any; type: any; text: any }) => {
    const value = props.text.value;
    return <AppLabel label={props.label}>{props.type === 'markdown' ? <TacoMarkDown>{value}</TacoMarkDown> : value}</AppLabel>;
  })
    .setPropertyViewFn((children: any) => {
      return (
        <>
          <Section name='Basic'>
            {children.label.propertyView({ label: 'Label' })}
            {children.type.propertyView({
              label: 'Type',
              tooltip: 'Markdown Supports Most HTML Tags and Attributes. iframe, Script, and Other Tags Are Disabled for Security Reasons.',
              radioButton: true,
            })}
            {children.text.propertyView({ label: 'Content' })}
          </Section>
          <Section name='Description'>
            <ol className='text-sm p-0 m-0 mx-3'>
              <li>Content can be markdown or text.</li>
            </ol>
          </Section>
        </>
      );
    })
    .build();
})();

export default withExposingConfigs(LabelCompBase, exposingConfigs);
