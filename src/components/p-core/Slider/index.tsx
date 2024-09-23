import {
  booleanExposingStateControl,
  eventHandlerControl,
  hiddenPropertyView,
  jsonControl,
  NameConfig,
  NameConfigHidden,
  numberExposingStateControl,
  Section,
  stringExposingStateControl,
  toJSONObject,
  UICompBuilder,
  withExposingConfigs,
} from 'lowcoder-sdk';
import LabelWrapper from '../../../components/common/LabelWrapper';

import { Slider } from 'primereact/slider';

export const defStaticProps = {};

let SliderCompBase = (function () {
  const childrenMap = {
    staticProps: jsonControl(toJSONObject, defStaticProps),
    value: numberExposingStateControl('value', 0),
    label: stringExposingStateControl('label', ''),
    error: stringExposingStateControl('error', ''),
    caption: stringExposingStateControl('caption', ''),
    showCaption: booleanExposingStateControl('showCaption', false),
    required: booleanExposingStateControl('required', false),
    onEvent: eventHandlerControl([
      {
        label: 'onChange',
        value: 'change',
        description: 'Triggers when Slider is changed.',
      },
    ]),
  };

  return new UICompBuilder(childrenMap, (props: any) => {
    return (
      <LabelWrapper
        label={props.label.value}
        required={props.required.value}
        error={props.error.value}
        caption={props.caption.value}
        showCaption={props.showCaption.value}
      >
        <Slider value={props.value.value} onChange={(e) => props.value.onChange(e.value)} />
      </LabelWrapper>
    );
  })
    .setPropertyViewFn((children: any) => {
      return (
        <>
          <Section name='Basic'>
            {children.staticProps.propertyView({ label: 'Static Props' })}
            {children.value.propertyView({ label: 'Value' })}
          </Section>
          <Section name='Interaction'>{hiddenPropertyView(children)}</Section>
          <Section name='Form'>
            {children.label.propertyView({ label: 'Label' })}
            {children.error.propertyView({ label: 'Error' })}
            {children.caption.propertyView({ label: 'Caption' })}
            {children.showCaption.propertyView({ label: 'Show caption' })}
            {children.required.propertyView({ label: 'Required' })}
          </Section>
          <Section name='Event'>{children.onEvent.getPropertyView()}</Section>
          <Section name='Description'>
            <ol className='text-sm p-0 m-0 mx-3'>
              <li>Static Props area should contain only static props of Primereact Slider.</li>
              <li>
                <a href='https://primereact.org/slider/' target='_blank'>
                  More information
                </a>
              </li>
            </ol>
          </Section>
        </>
      );
    })
    .build();
})();
export const exposingConfigs = [
  new NameConfig('staticProps'),
  new NameConfig('value'),
  new NameConfig('label'),
  new NameConfig('error'),
  new NameConfig('caption'),
  new NameConfig('showCaption'),
  new NameConfig('required'),
  NameConfigHidden,
];

export default withExposingConfigs(SliderCompBase, exposingConfigs);
