import {
  eventHandlerControl,
  jsonControl,
  NameConfig,
  numberExposingStateControl,
  Section,
  toJSONObject,
  toJSONObjectArray,
  UICompBuilder,
  withExposingConfigs,
  stringExposingStateControl,
  jsonObjectExposingStateControl,
} from 'lowcoder-sdk';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';

const defStaticProps = {
  stripedRows: true,
  paginator: true,
  rowHover: true,
  responsiveLayout: 'scroll',
  lazy: true,
  rowsPerPageOptions: [1, 5, 10, 20],
};

const defButtonGroups = [
  {
    type: 'view',
    hiddenFieldCondition: '',
    hiddenValueCondition: null,
    styleClass: 'bg-green-100',
    iconClass: 'pi pi-eye text-green-500',
  },
  {
    type: 'edit',
    hiddenFieldCondition: '',
    hiddenValueCondition: null,
    styleClass: 'bg-blue-100',
    iconClass: 'pi pi-pencil text-blue-500',
  },
  {
    type: 'delete',
    hiddenFieldCondition: '',
    hiddenValueCondition: null,
    styleClass: 'bg-red-100',
    iconClass: 'pi pi-trash text-red-500',
  },
];

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
    actionsColumnLabel: stringExposingStateControl('actionsColumnLabel', 'Actions'),
    selectedButtonType: stringExposingStateControl('selectedButtonType', 'paging'),
    selectedRow: jsonObjectExposingStateControl('selectedRow', {}),
    buttonGroups: jsonControl(toJSONObjectArray, defButtonGroups),
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
    const handleChange = (event: any) => {
      if ((event.rows !== props.rows || event.first !== props.first) && typeof event.first == 'number' && typeof event.rows == 'number') {
        props.rows.onChange(event.rows);
        props.first.onChange(event.first);
      }
      props.selectedButtonType.onChange('paging');
      props.onEvent('change');
    };

    const handleClick = (event: any, rowData: any, type: string) => {
      props.selectedButtonType.onChange(type);
      props.selectedRow.onChange(rowData);
      props.onEvent('change');
    };

    const bodyTemplate = (rowData) => {
      return (
        <div className='flex justify-content-center align-items-center gap-2'>
          {props.buttonGroups.map((item: any, index: any) => {
            return (
              <Button
                key={index}
                icon={item.iconClass}
                className={item.styleClass}
                visible={!(rowData[item.hiddenFieldCondition] === item.hiddenValueCondition)}
                onClick={(event) => handleClick(event, rowData, item.type)}
              />
            );
          })}
        </div>
      );
    };

    return (
      <DataTable {...props.staticProps} value={props.value} first={props.first.value} rows={props.rows.value} totalRecords={props.totalRecords.value} onPage={(event) => handleChange(event)}>
        {props.columns.map((column, index) => (
          <Column key={index} field={column.field} header={column.header}></Column>
        ))}
        {props.buttonGroups && props.buttonGroups.length > 0 && <Column header={props.actionsColumnLabel.value} align='center' body={bodyTemplate}></Column>}
      </DataTable>
    );
  })
    .setPropertyViewFn((children: any) => {
      return (
        <>
          {JSON.stringify(children.staticProps.midValue)}
          <Section name='Basic'>
            {children.staticProps.propertyView({ label: 'Props' })}
            {children.value.propertyView({ label: 'Value' })}
            {children.actionsColumnLabel.propertyView({ label: 'Actions Column Label' })}
            {children.buttonGroups.propertyView({ label: 'Button Groups' })}
            {children.columns.propertyView({ label: 'Columns' })}
            {children.first.propertyView({ label: 'First' })}
            {children.rows.propertyView({ label: 'Rows' })}
            {children.totalRecords.propertyView({ label: 'Total Records' })}
          </Section>
          <Section name='Interaction'>{children.onEvent.getPropertyView()}</Section>
          <Section name='Description'>
            <ol className='text-sm p-0 m-0 mx-3'>
              <li>Static Props area should contain only static props of Primereact DataTable.</li>
              <li>The Total Records Properties only work with a lazy table.</li>
              <li>The Actions Column appears only when the length of Button Groups is greater than 0.</li>
              <li>'hiddenFieldCondition' and 'hiddenValueCondition' are used for controlling the visibility of the action button.</li>
              <li>
                'selectedRow' and 'selectedButtonType' are exposed states, used for event checking. Paging buttons will have a 'paging' type, while other buttons will have their own predefined types
                in Button Groups.
              </li>
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

const exposingConfigs = [
  new NameConfig('staticProps'),
  new NameConfig('value'),
  new NameConfig('columns'),
  new NameConfig('first'),
  new NameConfig('rows'),
  new NameConfig('totalRecords'),
  new NameConfig('selectedRow'),
  new NameConfig('selectedButtonType'),
];
export default withExposingConfigs(TableCompBase, exposingConfigs);
