import { eventHandlerControl, jsonControl, jsonObjectExposingStateControl, Section, toJSONObject, toJSONObjectArray, UICompBuilder, withExposingConfigs } from 'lowcoder-sdk';
import Dropdown from './base';
import { defaultOptions, defaultValue, exposingConfigs, staticProps } from './config';

let DropdownCompBase = (function () {
  const childrenMap = {
    staticProps: jsonControl(toJSONObject, staticProps),

    value: jsonObjectExposingStateControl('value', defaultValue),
    options: jsonControl(toJSONObjectArray, defaultOptions),
    onEvent: eventHandlerControl([
      {
        label: 'onChange',
        value: 'change',
        description: 'Triggers when Dropdown is selected.',
      },
    ]),
  };

  return new UICompBuilder(childrenMap, (props: { onEvent: any; options: any[]; value: any; staticProps: any[] | null | undefined }) => {
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

export default withExposingConfigs(DropdownCompBase, exposingConfigs);
