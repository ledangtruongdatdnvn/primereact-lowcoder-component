import { eventHandlerControl, jsonControl, numberExposingStateControl, Section, toJSONObject, UICompBuilder, withExposingConfigs } from 'lowcoder-sdk';

// Import the CSS file
import AppPaginator from './base';
import { exposingConfigs, staticProps } from './config';

let PaginatorCompBase = (function () {
  const childrenMap = {
    staticProps: jsonControl(toJSONObject, staticProps),
    first: numberExposingStateControl('first', 0),
    rows: numberExposingStateControl('rows', 10),
    totalRecords: numberExposingStateControl('totalRecords', 40),
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
      if ((event.rows !== props.rows.value || event.first !== props.first.value) && typeof event.first == 'number' && typeof event.rows == 'number') {
        props.rows.onChange(event.rows);
        props.first.onChange(event.first);
      }
      props.onEvent('change');
    };

    return <AppPaginator {...props.staticProps} first={props.first.value} rows={props.rows.value} totalRecords={props.totalRecords.value} onPageChange={handlePageChange}></AppPaginator>;
  })
    .setPropertyViewFn((children: any) => {
      return (
        <>
          <Section name='Basic'>
            {children.staticProps.propertyView({ label: 'Props' })}
            {children.first.propertyView({ label: 'First' })}
            {children.rows.propertyView({ label: 'Rows' })}
            {children.totalRecords.propertyView({ label: 'Total Records' })}
          </Section>
          <Section name='Interaction'>{children.onEvent.getPropertyView()}</Section>
          <Section name='Description'>
            <ol className='text-sm p-0 m-0 mx-3'>
              <li>Static Props area should contain only static props of Primereact Paginator.</li>
              <li>
                <a href='https://primereact.org/paginator/' target='_blank'>
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

export default withExposingConfigs(PaginatorCompBase, exposingConfigs);
