import { eventHandlerControl, jsonControl, numberExposingStateControl, Section, toJSONObject, UICompBuilder, withExposingConfigs } from 'lowcoder-sdk';
import AppInputNumber from './base';
import { defaultValue, exposingConfigs, staticProps } from './config';
let InputNumberCompBase = (function () {
  const childrenMap = {
    staticProps: jsonControl(toJSONObject, staticProps),
    value: numberExposingStateControl('value', defaultValue),
    onEvent: eventHandlerControl([
      {
        label: 'onValueChange',
        value: 'valueChange',
        description: 'Callback to invoke after validation check and value change.',
      },
    ]),
  };

  return new UICompBuilder(childrenMap, (props: { onEvent: any; value: any; staticProps: any[] | null | undefined }) => {
    const handleValueChange = (e: any) => {
      props.value.onChange(e.target.value);
      props.onEvent('valuechange');
    };

    return <AppInputNumber {...props.staticProps} value={props.value.value} onValueChange={handleValueChange}></AppInputNumber>;
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
              <li>Static Props area should contain only static props of Primereact InputNumber.</li>
              <li>
                <a href='https://primereact.org/inputnumber/' target='_blank'>
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

export default withExposingConfigs(InputNumberCompBase, exposingConfigs);
