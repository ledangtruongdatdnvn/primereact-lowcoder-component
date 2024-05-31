import { eventHandlerControl, jsonControl, jsonExposingStateControl, Section, toJSONObject, toJSONObjectArray, UICompBuilder, withExposingConfigs } from 'lowcoder-sdk';
import AppMultiSelect from './base';
import { defaultOptions, defaultValue, exposingConfigs, staticProps } from './config';
let MultiSelectCompBase = (function () {
  const childrenMap = {
    staticProps: jsonControl(toJSONObject, staticProps),
    value: jsonExposingStateControl('value', toJSONObjectArray, defaultValue),
    options: jsonControl(toJSONObjectArray, defaultOptions),
    onEvent: eventHandlerControl([
      {
        label: 'onChange',
        value: 'change',
        description: 'Triggers when MultiSelect is selected.',
      },
    ]),
  };

  return new UICompBuilder(childrenMap, (props: { onEvent: any; options: any[]; value: any; staticProps: any[] | null | undefined }) => {
    const handleChange = (e: any) => {
      props.value.onChange(e.target.value);
      props.onEvent('change');
    };

    return <AppMultiSelect {...props.staticProps} value={props.value.value} options={props.options} onChange={handleChange}></AppMultiSelect>;
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

export default withExposingConfigs(MultiSelectCompBase, exposingConfigs);
