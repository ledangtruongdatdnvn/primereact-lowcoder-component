import { eventHandlerControl, jsonControl, jsonExposingStateControl, Section, toJSONObject, toJSONObjectArray, UICompBuilder, withExposingConfigs } from 'lowcoder-sdk';
import AppCalendar from './base';

import { defaultValue, exposingConfigs, staticProps } from './config';

let CalendarCompBase = (function () {
  const childrenMap = {
    staticProps: jsonControl(toJSONObject, staticProps),
    value: jsonExposingStateControl('value', toJSONObjectArray, defaultValue),
    onEvent: eventHandlerControl([
      {
        label: 'onChange',
        value: 'change',
        description: 'Triggers when Calendar is changed.',
      },
    ]),
  };

  return new UICompBuilder(childrenMap, (props: { onEvent: any; value: any; staticProps: any[] | null | undefined }) => {
    const handleChange = (e: any) => {
      props.value.onChange(e.value);
      props.onEvent('change');
    };

    return <AppCalendar {...props.staticProps} value={props.value.value} onChange={handleChange}></AppCalendar>;
  })
    .setPropertyViewFn((children: any) => {
      return (
        <>
          <Section name='Basic'>
            {children.staticProps.propertyView({ label: 'Static Props' })}
            {children.value.propertyView({ label: 'Value' })}
          </Section>
          <Section name='Event'>{children.onEvent.getPropertyView()}</Section>
          <Section name='Description'>
            <ol className='text-sm p-0 m-0 mx-3'>
              <li>Static Props area should contain only static props of Primereact Calendar.</li>
              <li>
                <a href='https://primereact.org/calendar/' target='_blank'>
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

export default withExposingConfigs(CalendarCompBase, exposingConfigs);
