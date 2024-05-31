import { eventHandlerControl, jsonControl, NameConfig, Section, stringExposingStateControl, toJSONObject, toJSONObjectArray, UICompBuilder, withExposingConfigs } from 'lowcoder-sdk';
import { RadioButton } from 'primereact/radiobutton';

const defCommonProps = { tooltip: 'Choose one!' };
const defRadioButtons = [
  { name: 'pizza', value: 'Cheese', inputId: 'pizza' },
  { name: 'pizza2', value: 'Cheese2', inputId: 'pizza2' },
  { name: 'pizza3', value: 'Cheese3', inputId: 'pizza3' },
  { name: 'pizza4', value: 'Cheese4', inputId: 'pizza4' },
];
const defChecked = '';

let RadioButtonCompBase = (function () {
  const childrenMap = {
    commonProps: jsonControl(toJSONObject, defCommonProps),
    radioButtons: jsonControl(toJSONObjectArray, defRadioButtons),
    checked: stringExposingStateControl('checked', defChecked),
    onEvent: eventHandlerControl([
      {
        label: 'onChange',
        value: 'change',
        description: 'Triggers when Radio Button is changed.',
      },
    ]),
  };

  return new UICompBuilder(childrenMap, (props: any) => {
    const handleChange = (e: any) => {
      props.checked.onChange(e.target.value);
      props.onEvent('change');
    };

    return (
      <div className='flex gap-4 justify-content-center align-items-center'>
        {props.radioButtons.map((item: any, index: number) => (
          <div key={index}>
            <RadioButton {...props.commonProps} {...item} checked={props.checked.value === item.value} onChange={handleChange}></RadioButton>
            <label htmlFor={item.inputId} className='ml-2'>
              {item.name}
            </label>
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

const exposingConfigs = [new NameConfig('commonProps'), new NameConfig('checked')];
export default withExposingConfigs(RadioButtonCompBase, exposingConfigs);
