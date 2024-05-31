import { booleanExposingStateControl, eventHandlerControl, jsonControl, Section, toJSONObject, UICompBuilder, withExposingConfigs } from 'lowcoder-sdk';
import AppInputSwitch from './base';
import { defaultChecked, exposingConfigs, staticProps } from './config';

let InputSwitchCompBase = (function () {
  const childrenMap = {
    staticProps: jsonControl(toJSONObject, staticProps),
    checked: booleanExposingStateControl('checked', defaultChecked),
    onEvent: eventHandlerControl([
      {
        label: 'onChange',
        value: 'change',
        description: 'Triggers when Input Switch is changed.',
      },
    ]),
  };

  return new UICompBuilder(childrenMap, (props: { onEvent: any; checked: any; staticProps: any[] | null | undefined }) => {
    const handleChange = (e: any) => {
      props.checked.onChange(e.target.value);
      props.onEvent('change');
    };

    return <AppInputSwitch {...props.staticProps} checked={props.checked.value} onChange={handleChange}></AppInputSwitch>;
  })
    .setPropertyViewFn((children: any) => {
      return (
        <>
          <Section name='Basic'>
            {children.staticProps.propertyView({ label: 'Static Props' })}
            {children.checked.propertyView({ label: 'Checked' })}
          </Section>
          <Section name='Event'>{children.onEvent.getPropertyView()}</Section>
          <Section name='Description'>
            <ol className='text-sm p-0 m-0 mx-3'>
              <li>Static Props area should contain only static props of Primereact InputSwitch.</li>
              <li>
                <a href='https://primereact.org/inputswitch/' target='_blank'>
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

export default withExposingConfigs(InputSwitchCompBase, exposingConfigs);
