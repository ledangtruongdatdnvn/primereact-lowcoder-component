import {
  eventHandlerControl,
  hiddenPropertyView,
  jsonControl,
  NameConfig,
  NameConfigHidden,
  Section,
  stringExposingStateControl,
  toJSONObject,
  UICompBuilder,
  withExposingConfigs,
} from 'lowcoder-sdk';
import { Checkbox } from 'primereact/checkbox';

const defStaticProps = {};

const defChecked = '';

let CheckboxCompBase = (function () {
  const childrenMap = {
    staticProps: jsonControl(toJSONObject, defStaticProps),
    checked: stringExposingStateControl('checked', defChecked),
    label: stringExposingStateControl('label', ''),
    inputId: stringExposingStateControl('label', ''),
    onEvent: eventHandlerControl([
      {
        label: 'onChange',
        value: 'change',
        description: 'Triggers when Checkbox is changed.',
      },
    ]),
  };

  return new UICompBuilder(childrenMap, (props: any) => {
    const handleChange = (e: any) => {
      props.checked.onChange(e.checked);
      props.onEvent('change');
    };

    return (
      <div className='flex justify-content-center align-items-center'>
        <Checkbox
          inputId={props.inputId.value}
          onChange={handleChange}
          checked={props.checked.value}
        ></Checkbox>
        <label htmlFor={props.inputId.value} className='ml-2'>
          {props.label.value}
        </label>
      </div>
    );
  })
    .setPropertyViewFn((children: any) => {
      return (
        <>
          <Section name='Basic'>
            {children.checked.propertyView({ label: 'Checked' })}
            {children.label.propertyView({ label: 'Label' })}
            {children.inputId.propertyView({ label: 'Input ID' })}
          </Section>
          <Section name='Interaction'>{hiddenPropertyView(children)}</Section>
          <Section name='Event'>{children.onEvent.getPropertyView()}</Section>
          <Section name='Description'>
            <ol className='text-sm p-0 m-0 mx-3'>
              <li>
                Common Props area should contain only common static props of Primereact Checkbox.
              </li>
              <li>
                <a href='https://primereact.org/checkbox/' target='_blank'>
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

const exposingConfigs = [new NameConfig('checked'), new NameConfig('label'), NameConfigHidden];
export default withExposingConfigs(CheckboxCompBase, exposingConfigs);
