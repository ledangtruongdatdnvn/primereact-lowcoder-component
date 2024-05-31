import { eventHandlerControl, jsonControl, jsonObjectExposingStateControl, Section, toJSONObject, toJSONObjectArray, UICompBuilder, withExposingConfigs } from 'lowcoder-sdk';
import { Dropdown } from 'primereact/dropdown';

import { NameConfig } from 'lowcoder-sdk';
const defStaticProps = { placeholder: 'Select a City', optionLabel: 'name' };

const defValue = { name: 'New York', code: 'NY' };

const defOptions = [
  { name: 'New York', code: 'NY' },
  { name: 'Rome', code: 'RM' },
  { name: 'London', code: 'LDN' },
  { name: 'Istanbul', code: 'IST' },
  { name: 'Paris', code: 'PRS' },
];

let DropdownCompBase = (function () {
  const childrenMap = {
    staticProps: jsonControl(toJSONObject, defStaticProps),
    value: jsonObjectExposingStateControl('value', defValue),
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

    return <Dropdown {...props.staticProps} value={props.value.value} options={props.options} onChange={handleChange}></Dropdown>;
  })
    .setPropertyViewFn((children: any) => {
      return (
        <>
          <Section name='Basic'>
            {children.staticProps.propertyView({ label: 'Static Props' })}
            {children.value.propertyView({ label: 'Value' })}
            {children.options.propertyView({ label: 'Options' })}
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

const exposingConfigs = [new NameConfig('staticProps'), new NameConfig('value'), new NameConfig('options')];

export default withExposingConfigs(DropdownCompBase, exposingConfigs);
