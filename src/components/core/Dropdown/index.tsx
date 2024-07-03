import {
  booleanExposingStateControl,
  eventHandlerControl,
  hiddenPropertyView,
  jsonControl,
  jsonObjectExposingStateControl,
  NameConfig,
  NameConfigHidden,
  Section,
  stringExposingStateControl,
  toJSONObject,
  toJSONObjectArray,
  UICompBuilder,
  withExposingConfigs,
} from 'lowcoder-sdk';
import { Dropdown } from 'primereact/dropdown';
import LabelWrapper from '../../../components/common/LabelWrapper';

const defStaticProps = {
  placeholder: 'Select a City',
  optionLabel: 'name',
  style: {
    width: '100%',
  },
};

const defValue = { name: 'New York', code: 'NY' };

const defOptions = [
  { name: 'New York', code: 'NY' },
  { name: 'Rome', code: 'RM' },
  {
    name: 'London',
    code: 'LDN',
  },
  { name: 'Istanbul', code: 'IST' },
  { name: 'Paris', code: 'PRS' },
];

let DropdownCompBase = (function () {
  const childrenMap = {
    staticProps: jsonControl(toJSONObject, defStaticProps),
    value: jsonObjectExposingStateControl('value', defValue),
    label: stringExposingStateControl('label', ''),
    error: stringExposingStateControl('error', ''),
    caption: stringExposingStateControl('caption', ''),
    showCaption: booleanExposingStateControl('showCaption', false),
    required: booleanExposingStateControl('required', false),
    options: jsonControl(toJSONObjectArray, defOptions),
    onEvent: eventHandlerControl([
      {
        label: 'onChange',
        value: 'change',
        description: 'Triggers when Dropdown is selected.',
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
          <Dropdown {...props.staticProps} value={props.value.value} options={props.options} onChange={handleChange} invalid={props.error.value.length > 0}></Dropdown>
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
            {children.options.propertyView({ label: 'Options' })}
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
              <li>Static Props area should contain only static props of Primereact Dropdown.</li>
              <li>
                <a href='https://primereact.org/dropdown/' target='_blank'>
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
  new NameConfig('options'),
  new NameConfig('label'),
  new NameConfig('error'),
  new NameConfig('caption'),
  new NameConfig('showCaption'),
  new NameConfig('required'),
  NameConfigHidden,
];

export default withExposingConfigs(DropdownCompBase, exposingConfigs);
