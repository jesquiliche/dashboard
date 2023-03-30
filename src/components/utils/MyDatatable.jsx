import React from 'react';
import DataTable from 'react-data-table-component';

const MyDataTable = ({ title,columns, data, paginationPerPage }) => {
  const paginationOptions = {
    rowsPerPageText: 'Filas por página',
    rangeSeparatorText: 'de',
    noRowsPerPage: true,
    selectAllRowsItem: true,
    selectAllRowsItemText: 'Todos',
  };

  const paginationRowsPerPageOptions = [5,10, 25, 50];

  return (
    <DataTable
      title={title}
      columns={columns}
      data={data}
      pagination={true}
      striped={true}
      highlightOnHover={true}
      pointerOnHover={true}
      paginationComponentOptions={paginationOptions}
      paginationRowsPerPageOptions={paginationRowsPerPageOptions}
      paginationPerPage={5}
    />
  );
};

export default MyDataTable;
