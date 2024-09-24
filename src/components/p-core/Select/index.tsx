import _ from 'lodash';
import {
  booleanExposingStateControl,
  eventHandlerControl,
  hiddenPropertyView,
  jsonObjectExposingStateControl,
  migrateOldData,
  NameConfig,
  NameConfigHidden,
  Section,
  stringExposingStateControl,
  UICompBuilder,
  withExposingConfigs,
} from 'lowcoder-sdk';
import { Dropdown } from 'primereact/dropdown';
import LabelWrapper from '../../../components/common/LabelWrapper';

const defProps = {
  placeholder: 'Select a City',
  optionLabel: 'name',
  style: {
    width: '100%',
  },
  showClear: true,
  value: { name: 'New York', code: 'NY' },
  options: [
    { name: 'New York', code: 'NY' },
    { name: 'Rome', code: 'RM' },
    {
      name: 'London',
      code: 'LDN',
    },
    { name: 'Istanbul', code: 'IST' },
    { name: 'Paris', code: 'PRS' },
  ],
};

let SelectCompBase = (function () {
  const childrenMap = {
    props: jsonObjectExposingStateControl('props', defProps),
    label: stringExposingStateControl('label', ''),
    error: stringExposingStateControl('error', ''),
    caption: stringExposingStateControl('caption', ''),
    showCaption: booleanExposingStateControl('showCaption', false),
    required: booleanExposingStateControl('required', false),
    onEvent: eventHandlerControl([
      {
        label: 'onChange',
        value: 'change',
        description: 'Triggers when Select is selected.',
      },
    ]),
  };

  return new UICompBuilder(childrenMap, (props: any) => {
    const handleChange = (e: any) => {
      props.props.onChange({ ...props.props.value, value: e.target.value });
      props.onEvent('change');
    };

    return (
      <LabelWrapper
        label={props.label.value}
        required={props.required.value}
        error={props.error.value}
        caption={props.caption.value}
        showCaption={props.showCaption.value}
      >
        <Dropdown
          {..._.merge({}, { style: { width: '100%' } })}
          {...props.props.value}
          onChange={handleChange}
          invalid={props.error.value.length > 0}
        ></Dropdown>
      </LabelWrapper>
    );
  })
    .setPropertyViewFn((children: any) => {
      return (
        <>
          <Section name='Basic'>{children.props.propertyView({ label: 'Props' })}</Section>
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
              <li>Static Props area should contain only static props of Primereact Select.</li>
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
  new NameConfig('props'),
  new NameConfig('label'),
  new NameConfig('error'),
  new NameConfig('caption'),
  new NameConfig('showCaption'),
  new NameConfig('required'),
  NameConfigHidden,
];

// separate defaultValue and value for old components
export function fixOldInputCompData(oldData: any) {
  if (!oldData) return oldData;
  if (Boolean(oldData.value) && !Boolean(oldData.defaultValue)) {
    const value = oldData.value;
    return {
      ...oldData,
      defaultValue: value,
      value: '',
    };
  }
  return oldData;
}

const SelectComp = migrateOldData(SelectCompBase, fixOldInputCompData);

export default withExposingConfigs(SelectComp, exposingConfigs);
