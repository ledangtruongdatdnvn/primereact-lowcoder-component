import { eventHandlerControl, jsonControl, Section, stringExposingStateControl, toJSONObject, toJSONObjectArray, UICompBuilder, withExposingConfigs } from 'lowcoder-sdk';
import AppRadioButton from './base';
import { commonProps, defaultChecked, exposingConfigs, radioButtons } from './config';
let RadioButtonCompBase = (function () {
  const childrenMap = {
    commonProps: jsonControl(toJSONObject, commonProps),
    radioButtons: jsonControl(toJSONObjectArray, radioButtons),
    checked: stringExposingStateControl('checked', defaultChecked),
    onEvent: eventHandlerControl([
      {
        label: 'onChange',
        value: 'change',
        description: 'Triggers when Radio Button is changed.',
      },
    ]),
  };

  return new UICompBuilder(childrenMap, (props: { onEvent: any; checked: any; commonProps: any[] | null | undefined; radioButtons: any[] }) => {
    const handleChange = (e: any) => {
      props.checked.onChange(e.target.value);
      props.onEvent('change');
    };

    return (
      <div className='flex gap-4 justify-content-center align-items-center'>
        {radioButtons.map((item, index) => (
          <div key={index}>
            <AppRadioButton {...props.commonProps} {...item} checked={props.checked.value === item.value} onChange={handleChange}></AppRadioButton>
          </div>
        ))}
      </div>
    );
  })
    .setPropertyViewFn((children: any) => {
      return (
        <>
          <Section name='Basic'>
            {children.commonProps.propertyView({ label: 'Common Props' })}
            {children.checked.propertyView({ label: 'Checked' })}
            {children.radioButtons.propertyView({ label: 'RadioButtons Props' })}
          </Section>
          <Section name='Event'>{children.onEvent.getPropertyView()}</Section>
          <Section name='Description'>
            <ol className='text-sm p-0 m-0 mx-3'>
              <li>Common Props area should contain only common static props of Primereact RadioButtons.</li>
              <li>
                <a href='https://primereact.org/radiobutton/' target='_blank'>
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

export default withExposingConfigs(RadioButtonCompBase, exposingConfigs);
