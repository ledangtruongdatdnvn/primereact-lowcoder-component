import { eventHandlerControl, jsonControl, NameConfig, Section, stringExposingStateControl, toJSONObject, UICompBuilder, withExposingConfigs, booleanExposingStateControl } from 'lowcoder-sdk';
import { Password } from 'primereact/password';
import LabelWrapper from '../../../components/common/LabelWrapper';
const defStaticProps = {
  tooltip: 'Enter a password',
  inputStyle: {
    width: '100%',
  },
  style: {
    width: '100%',
  },
};
const defValue = '';

let PasswordCompBase = (function () {
  const childrenMap = {
    staticProps: jsonControl(toJSONObject, defStaticProps),
    value: stringExposingStateControl('value', defValue),
    label: stringExposingStateControl('label', ''),
    error: stringExposingStateControl('error', ''),
    caption: stringExposingStateControl('caption', ''),
    showCaption: booleanExposingStateControl('showCaption', false),
    required: booleanExposingStateControl('required', false),
    onEvent: eventHandlerControl([
      {
        label: 'onChange',
        value: 'change',
        description: 'Triggers when Password is changed.',
      },
    ]),
  };

  return new UICompBuilder(childrenMap, (props: any) => {
    const handleChange = (e: any) => {
      props.value.onChange(e.target.value);
      props.onEvent('change');
    };

    return (
      <div style={{ padding: '5px' }}>
        <LabelWrapper label={props.label.value} required={props.required.value} error={props.error.value} caption={props.caption.value} showCaption={props.showCaption.value}>
          <Password {...props.staticProps} value={props.value.value} onChange={handleChange} invalid={props.error.value.length > 0}></Password>
        </LabelWrapper>
      </div>
    );
  })
    .setPropertyViewFn((children: any) => {
      return (
        <>
          <Section name='Basic'>
            {children.staticProps.propertyView({ label: 'Static Props' })}
            {children.value.propertyView({ label: 'Value' })}
          </Section>
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
              <li>Static Props area should contain only static props of Primereact Password.</li>
              <li>
                <a href='https://primereact.org/password/' target='_blank'>
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

const exposingConfigs = [
  new NameConfig('staticProps'),
  new NameConfig('value'),
  new NameConfig('label'),
  new NameConfig('error'),
  new NameConfig('caption'),
  new NameConfig('showCaption'),
  new NameConfig('required'),
];
export default withExposingConfigs(PasswordCompBase, exposingConfigs);
