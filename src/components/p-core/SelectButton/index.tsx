import {
  eventHandlerControl,
  hiddenPropertyView,
  jsonControl,
  jsonValueExposingStateControl,
  NameConfig,
  NameConfigHidden,
  Section,
  toJSONObject,
  UICompBuilder,
  withExposingConfigs,
  ArrayControl,
  withDefault
} from 'lowcoder-sdk';

import { SelectButton } from 'primereact/selectbutton';

export const defStaticProps = { optionLabel: 'name' };

export const defOptions = "[\n" +
  "        { name: 'Option 1', value: 1 },\n" +
  "        { name: 'Option 2', value: 2 },\n" +
  "        { name: 'Option 3', value: 3 }\n" +
  "    ]";

let SelectButtonCompBase = (function () {
  const childrenMap = {
    staticProps: jsonControl(toJSONObject, defStaticProps),
    options:  withDefault(ArrayControl, defOptions),
    value: jsonValueExposingStateControl('value', null),
    onEvent: eventHandlerControl([
      {
        label: 'onChange',
        value: 'change',
        description: 'Triggers when SelectButton is changed.',
      },
    ]),
  };

  return new UICompBuilder(childrenMap, (props: any) => {
    return (
      <SelectButton
        value={props.value.value}
        onChange={(e) => props.value.onChange(e.value)}
        options={props.options }
        {...props.staticProps}
      />
    );
  })
    .setPropertyViewFn((children: any) => {
      return (
        <>
          <Section name='Basic'>
            {children.staticProps.propertyView({ label: 'Static Props' })}
            {children.value.propertyView({ label: 'Value' })}
            {children.options.propertyView({ label: 'Options' })}
          </Section>
          <Section name='Interaction'>{hiddenPropertyView(children)}</Section>

          <Section name='Event'>{children.onEvent.getPropertyView()}</Section>
          <Section name='Description'>
            <ol className='text-sm p-0 m-0 mx-3'>
              <li>
                Static Props area should contain only static props of Primereact SelectButton.
              </li>
              <li>
                <a href='https://primereact.org/selectbutton/' target='_blank'>
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
export const exposingConfigs = [
  new NameConfig('staticProps'),
  new NameConfig('value'),
  NameConfigHidden,
];

export default withExposingConfigs(SelectButtonCompBase, exposingConfigs);
