import { eventHandlerControl, jsonControl, NameConfig, numberExposingStateControl, Section, toJSONObject, toJSONObjectArray, UICompBuilder, withExposingConfigs } from 'lowcoder-sdk';
import AppTable from './base';

const defStaticProps = {
  stripedRows: true,
  paginator: true,
  rowHover: true,
  responsiveLayout: 'scroll',
  lazy: false,
  rowsPerPageOptions: [1, 5, 10, 20],

};

const defValue = [
  {
    id: 'code-1',
    name: 'row 1',
    category: 'important',
    quantity: 1,
  },
  {
    id: 'code-2',
    name: 'row 2',
    category: 'very important',
    quantity: 2,
  },
  {
    id: 'code-3',
    name: 'row 3',
    category: 'important',
    quantity: 3,
  },
  {
    id: 'code-4',
    name: 'row 4',
    category: 'less important',
    quantity: 4,
  },
];

const defColumns = [
  { header: 'Column 1', field: 'id' },
  {
    header: 'Column 2',
    field: 'name',
  },
];

let TableCompBase = (function () {
  const childrenMap = {
    staticProps: jsonControl(toJSONObject, defStaticProps),
    value: jsonControl(toJSONObjectArray, defValue),
    columns: jsonControl(toJSONObjectArray, defColumns),
    first: numberExposingStateControl('first', 0),
    rows: numberExposingStateControl('rows', 10),
    totalRecords: numberExposingStateControl('totalRecords', 4),
    onEvent: eventHandlerControl([
      {
        label: 'onChange',
        value: 'change',
        description: 'Callback to invoke on pagination.',
      },
    ]),
  };

  return new UICompBuilder(childrenMap, (props: any) => {
    const handlePageChange = (event: any) => {
      if ((event.rows !== props.rows || event.first !== props.first) && typeof event.first == 'number' && typeof event.rows == 'number') {
        props.rows.onChange(event.rows);
        props.first.onChange(event.first);
      }
      props.onEvent('change');
    };

    return (
      <AppTable
        tableProps={props.staticProps}
        columnProps={props.columns}
        value={props.value}
        first={props.first.value}
        rows={props.rows.value}
        totalRecords={props.totalRecords.value}
        onPage={handlePageChange}
      ></AppTable>
    );
  })
    .setPropertyViewFn((children: any) => {
      return (
        <>
          <Section name='Basic'>
            {children.staticProps.propertyView({ label: 'Props' })}
            {children.value.propertyView({ label: 'Value' })}
            {children.columns.propertyView({ label: 'Columns' })}
            {children.first.propertyView({ label: 'First' })}
            {children.rows.propertyView({ label: 'Rows' })}
            {children.totalRecords.propertyView({ label: 'Total Records' })}
          </Section>
          <Section name='Interaction'>{children.onEvent.getPropertyView()}</Section>
          <Section name='Description'>
            <ol className='text-sm p-0 m-0 mx-3'>
              <li>Static Props area should contain only static props of Primereact DataTable.</li>
              <li>
                <a href='https://primereact.org/datatable/' target='_blank'>
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

const exposingConfigs = [new NameConfig('staticProps'), new NameConfig('value'), new NameConfig('columns'), new NameConfig('first'), new NameConfig('rows'), new NameConfig('totalRecords')];
export default withExposingConfigs(TableCompBase, exposingConfigs);
