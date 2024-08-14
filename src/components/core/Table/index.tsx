import {
  BoolControl,
  eventHandlerControl,
  hiddenPropertyView,
  jsonControl,
  jsonObjectExposingStateControl,
  NameConfig,
  NameConfigHidden,
  numberExposingStateControl,
  Section,
  stringExposingStateControl,
  toJSONObject,
  toJSONObjectArray,
  UICompBuilder,
  withDefault,
  withExposingConfigs,
} from 'lowcoder-sdk';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { useEffect } from 'react';

const defStaticProps = {
  id: 'my-table-id',
  stripedRows: true,
  paginator: true,
  rowHover: true,
  responsiveLayout: 'scroll',
  lazy: true,
  rowsPerPageOptions: [10, 20],
  pageLinkSize: 3,
  scrollHeight: '400px',
  paginatorTemplate: 'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown',
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

const CarService = {
  brands: ['Vapid', 'Carson', 'Kitano', 'Dabver', 'Ibex', 'Morello', 'Akira', 'Titan', 'Dover', 'Norma'],

  colors: ['Black', 'White', 'Red', 'Blue', 'Silver', 'Green', 'Yellow'],

  generateCar(id: any) {
    return {
      id,
      vin: this.generateVin(),
      brand: this.generateBrand(),
      color: this.generateColor(),
      year: this.generateYear(),
    };
  },

  generateVin() {
    let text = '';
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < 5; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
  },

  generateBrand() {
    return this.brands[Math.floor(Math.random() * Math.floor(10))];
  },

  generateColor() {
    return this.colors[Math.floor(Math.random() * Math.floor(7))];
  },

  generateYear() {
    return 2000 + Math.floor(Math.random() * Math.floor(19));
  },
};

const defValue = Array.from({ length: 20 }).map((_, i) => CarService.generateCar(i + 1));

const defColumns = [
  {
    header: 'Id',
    field: 'id',
    align: 'center',
  },
  {
    header: 'Vin',
    field: 'vin',
    align: 'center',
  },
  {
    header: 'Year',
    field: 'year',
    align: 'center',
  },
  {
    header: 'Brand',
    field: 'brand',
    align: 'left',
  },
  {
    header: 'Color',
    field: 'color',
    align: 'left',
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
    totalRecords: numberExposingStateControl('totalRecords', 100),
    mobile: withDefault(BoolControl, true),
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

    const bodyTemplate = (rowData: any) => {
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

    useEffect(() => {
      if (props.mobile) {
        const tableElement = document.getElementById(props.staticProps.id);
        if (tableElement) {
          const wrapperElement = tableElement.getElementsByClassName('p-datatable-wrapper')[0];
          const eventHandler = (event: Event) => {
            const myDiv = event.target as HTMLDivElement;
            const x = myDiv.offsetHeight + myDiv.scrollTop;
            const y = myDiv.scrollHeight;
            const z = x - y;
            if (z >= 0) {
              if (props.totalRecords.value - (props.first.value + props.rows.value) > 0) {
                props.first.onChange(props.first.value + props.rows.value);
              }
              props.selectedButtonType.onChange('mobile-paging');
              props.onEvent('change');
            }
          };
          wrapperElement?.addEventListener('scroll', eventHandler);
          return () => {
            wrapperElement?.removeEventListener('scroll', eventHandler);
          };
        }
      }
    }, [props.first.value]);

    return (
      <DataTable
        {...props.staticProps}
        paginator={!props.mobile && props.staticProps.paginator}
        value={props.value}
        first={props.first.value}
        rows={props.rows.value}
        totalRecords={props.totalRecords.value}
        onPage={(event) => handleChange(event)}
        scrollable={props.mobile}
      >
        {props.columns.map((column: any, index: any) => (
          <Column key={index} field={column.field} header={column.header} align={column.align}></Column>
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
            {children.mobile.propertyView({ label: 'Mobile' })}
            {children.value.propertyView({ label: 'Value' })}
            {children.actionsColumnLabel.propertyView({ label: 'Actions Column Label' })}
            {children.buttonGroups.propertyView({ label: 'Button Groups' })}
            {children.columns.propertyView({ label: 'Columns' })}
            {children.first.propertyView({ label: 'First' })}
            {children.rows.propertyView({ label: 'Rows' })}
            {children.totalRecords.propertyView({ label: 'Total Records' })}
          </Section>
          <Section name='Interaction'>{hiddenPropertyView(children)}</Section>
          <Section name='Event'>{children.onEvent.getPropertyView()}</Section>
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
  new NameConfig('mobile'),
  new NameConfig('totalRecords'),
  new NameConfig('selectedRow'),
  new NameConfig('selectedButtonType'),
  NameConfigHidden,
];
export default withExposingConfigs(TableCompBase, exposingConfigs);
