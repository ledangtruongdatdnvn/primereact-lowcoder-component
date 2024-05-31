import { eventHandlerControl, jsonControl, numberExposingStateControl, Section, toJSONObject, toJSONObjectArray, UICompBuilder, withExposingConfigs } from 'lowcoder-sdk';
// Import the CSS file
import AppTable from './base';
import { columns, defaultValue, exposingConfigs, staticProps } from './config';

let TableCompBase = (function () {
  const childrenMap = {
    staticProps: jsonControl(toJSONObject, staticProps),
    value: jsonControl(toJSONObjectArray, defaultValue),
    columns: jsonControl(toJSONObjectArray, columns),
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

  return new UICompBuilder(childrenMap, (props: { value: any; staticProps: any | null | undefined; columns: any[]; rows: any; first: any; totalRecords: any; onEvent: any }) => {
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

export default withExposingConfigs(TableCompBase, exposingConfigs);
