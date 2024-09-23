import {
  arrayObjectExposingStateControl,
  eventHandlerControl,
  hiddenPropertyView,
  jsonControl,
  jsonObjectExposingStateControl,
  NameConfig,
  NameConfigHidden,
  Section,
  toJSONObject,
  UICompBuilder,
  withExposingConfigs,
} from 'lowcoder-sdk';

import { ListBox } from 'primereact/listbox';

export const defStaticProps = { optionLabel: 'name' };

export const defOptions = [
  { name: 'New York', code: 'NY' },
  { name: 'Rome', code: 'RM' },
  { name: 'London', code: 'LDN' },
  { name: 'Istanbul', code: 'IST' },
  { name: 'Paris', code: 'PRS' },
];

let ListBoxCompBase = (function () {
  const childrenMap = {
    staticProps: jsonControl(toJSONObject, defStaticProps),
    options: arrayObjectExposingStateControl('options', defOptions),
    value: jsonObjectExposingStateControl('value', null),
    onEvent: eventHandlerControl([
      {
        label: 'onChange',
        value: 'change',
        description: 'Triggers when ListBox is changed.',
      },
    ]),
  };

  return new UICompBuilder(childrenMap, (props: any) => {
    return (
      <ListBox
        value={props.value.value}
        onChange={(e) => props.value.onChange(e.value)}
        options={props.options.value}
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
          </Section>
          <Section name='Interaction'>{hiddenPropertyView(children)}</Section>

          <Section name='Event'>{children.onEvent.getPropertyView()}</Section>
          <Section name='Description'>
            <ol className='text-sm p-0 m-0 mx-3'>
              <li>Static Props area should contain only static props of Primereact ListBox.</li>
              <li>
                <a href='https://primereact.org/listbox/' target='_blank'>
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

export default withExposingConfigs(ListBoxCompBase, exposingConfigs);
