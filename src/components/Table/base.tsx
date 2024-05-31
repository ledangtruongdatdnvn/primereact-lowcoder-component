import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';

const AppTable = ({
  tableProps,
  columnProps,
  onPage,
  first,
  rows,
  totalRecords,
  value,
}: {
  tableProps: any;
  columnProps: any[];
  onPage: Function;
  first: number;
  rows: number;
  totalRecords: number;
  value: any[];
}) => {
  return (
    <DataTable {...tableProps} value={value} first={first} rows={rows} totalRecords={totalRecords} onPage={(event) => onPage(event)}>
      {columnProps.map((column, index) => (
        <Column key={index} field={column.field} header={column.header}></Column>
      ))}
    </DataTable>
  );
};

export default AppTable;
