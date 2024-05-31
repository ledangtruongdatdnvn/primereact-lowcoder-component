import { eventHandlerControl, jsonControl, jsonExposingStateControl, NameConfig, Section, toJSONObject, toJSONObjectArray, UICompBuilder, withExposingConfigs } from 'lowcoder-sdk';
import { MultiSelect } from 'primereact/multiselect';

const defStaticProps = { placeholder: 'Select Cities', optionLabel: 'name', filter: true };
const defValue = [{ name: 'New York', code: 'NY' }];
const defOptions = [
  { name: 'New York', code: 'NY' },
  { name: 'Rome', code: 'RM' },
  { name: 'London', code: 'LDN' },
  { name: 'Istanbul', code: 'IST' },
  { name: 'Paris', code: 'PRS' },
];

let MultiSelectCompBase = (function () {
  const childrenMap = {
    staticProps: jsonControl(toJSONObject, defStaticProps),
    value: jsonExposingStateControl('value', toJSONObjectArray, defValue),
    options: jsonControl(toJSONObjectArray, defOptions),
    onEvent: eventHandlerControl([
      {
        label: 'onChange',
        value: 'change',
        description: 'Triggers when MultiSelect is selected.',
      },
    ]),
  };

  return new UICompBuilder(childrenMap, (props: any) => {
    const handleChange = (e: any) => {
      props.value.onChange(e.target.value);
      props.onEvent('change');
    };

    return <MultiSelect {...props.staticProps} value={props.value.value} options={props.options} onChange={handleChange}></MultiSelect>;
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
              <li>Static Props area should contain only static props of Primereact MultiSelect.</li>
              <li>
                <a href='https://primereact.org/multiselect/' target='_blank'>
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
export default withExposingConfigs(MultiSelectCompBase, exposingConfigs);
