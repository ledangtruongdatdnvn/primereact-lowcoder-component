import { eventHandlerControl, jsonControl, Section, stringExposingStateControl, toJSONObject, UICompBuilder, withExposingConfigs } from 'lowcoder-sdk';
import AppInputTextarea from './base';
import { defaultValue, exposingConfigs, staticProps } from './config';
let InputTextareaCompBase = (function () {
  const childrenMap = {
    staticProps: jsonControl(toJSONObject, staticProps),
    value: stringExposingStateControl('value', defaultValue),
    onEvent: eventHandlerControl([
      {
        label: 'onChange',
        value: 'change',
        description: 'Triggers when Input Textarea is changed.',
      },
    ]),
  };

  return new UICompBuilder(childrenMap, (props: { onEvent: any; value: any; staticProps: any[] | null | undefined }) => {
    const handleChange = (e: any) => {
      props.value.onChange(e.target.value);
      props.onEvent('change');
    };

    return <AppInputTextarea {...props.staticProps} value={props.value.value} onChange={handleChange}></AppInputTextarea>;
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
              <li>Static Props area should contain only static props of Primereact InputTextarea.</li>
              <li>
                <a href='https://primereact.org/inputtextarea/' target='_blank'>
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

export default withExposingConfigs(InputTextareaCompBase, exposingConfigs);
