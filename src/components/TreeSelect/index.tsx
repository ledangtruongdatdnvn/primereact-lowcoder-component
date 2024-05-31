import { eventHandlerControl, jsonControl, NameConfig, Section, stringExposingStateControl, toJSONObject, toJSONObjectArray, UICompBuilder, withExposingConfigs } from 'lowcoder-sdk';

import { TreeSelect } from 'primereact/treeselect';
const defStaticProps = { placeholder: 'Select one' };
const defValue = '0-0';
const defOptions = [
  {
    key: '0',
    label: 'Documents',
    data: 'Documents Folder',
    icon: 'pi pi-fw pi-inbox',
    children: [
      {
        key: '0-0',
        label: 'Work',
        data: 'Work Folder',
        icon: 'pi pi-fw pi-cog',
        children: [
          { key: '0-0-0', label: 'Expenses.doc', icon: 'pi pi-fw pi-file', data: 'Expenses Document' },
          { key: '0-0-1', label: 'Resume.doc', icon: 'pi pi-fw pi-file', data: 'Resume Document' },
        ],
      },
      {
        key: '0-1',
        label: 'Home',
        data: 'Home Folder',
        icon: 'pi pi-fw pi-home',
        children: [{ key: '0-1-0', label: 'Invoices.txt', icon: 'pi pi-fw pi-file', data: 'Invoices for this month' }],
      },
    ],
  },
];

let TreeSelectCompBase = (function () {
  const childrenMap = {
    staticProps: jsonControl(toJSONObject, defStaticProps),
    value: stringExposingStateControl('value', defValue),
    options: jsonControl(toJSONObjectArray, defOptions),
    onEvent: eventHandlerControl([
      {
        label: 'onChange',
        value: 'change',
        description: 'Triggers when TreeSelect is selected.',
      },
    ]),
  };

  return new UICompBuilder(childrenMap, (props: any) => {
    const handleChange = (e: any) => {
      props.value.onChange(e.value);
      props.onEvent('change');
    };

    return <TreeSelect {...props.staticProps} value={props.value.value} options={props.options} onChange={handleChange}></TreeSelect>;
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
              <li>Static Props area should contain only static props of Primereact TreeSelect.</li>
              <li>
                <a href='https://primereact.org/treeselect/' target='_blank'>
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

const exposingConfigs = [new NameConfig('staticProps'), new NameConfig('value'), new NameConfig('options')];
export default withExposingConfigs(TreeSelectCompBase, exposingConfigs);
