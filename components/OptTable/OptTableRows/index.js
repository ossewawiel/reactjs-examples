import { TableCell, TableRow } from '@mui/material';
import * as React from 'react';
import { OptTableRow } from '../OptTableRow';

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

const getComparator = (order, orderBy) =>
  order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

export const OptTableRows = ({
  rowId,
  columns,
  rows,
  order,
  orderBy,
  page,
  rowsPerPage,
  emptyRows,
  onView,
  subTableTitle,
  subTableColumns,
  viewColumn,
  optimusColumn,
}) => (
  <>
    {stableSort(rows, getComparator(order, orderBy))
      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
      .map((row, index) => (
        <OptTableRow
          key={row[rowId]}
          id={row[rowId]}
          subTableHeader={subTableTitle}
          subTableColumns={subTableColumns}
          columns={columns}
          row={row}
          onView={onView}
          viewColumn={viewColumn}
          optimusColumn={optimusColumn}
        />
      ))}
    {emptyRows > 0 && (
      <TableRow
        key="empty-rows"
        style={{
          height: 53 * emptyRows,
        }}
      >
        <TableCell key="empty-cell" colSpan={6} />
      </TableRow>
    )}
  </>
);
