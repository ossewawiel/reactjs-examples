import { useTheme } from '@mui/material/styles';
import * as React from 'react';
import {
  Box,
  Collapse,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import SubCard from '../../ui/component/cards/SubCard';
import { FormattedMessage } from 'react-intl';
import {
  OptAddressTableCell,
  OptColourStatusTableCell,
  OptExpandTableCell,
  OptHeaderValueTableCell,
  OptPhoneTableCell,
  OptProofStatusTableCell,
  OptViewTableCell,
} from '../optTableCells';
import * as PropTypes from 'prop-types';
import {
  OptCodeLookupHeaderValueTableCell,
  OptNameLookupHeaderValueTableCell,
} from '../optTableCells/OptCodeLookupTableCell';
import { isElectron } from '../../../electron/channels';
import { OptOptimusTableCell } from '../optTableCells/OptOptimusTableCell';
import {
  ApiLookupTableCell,
  ConcatTableCell,
  CurrencyTableCell,
  DateTimeTableCell,
  JobStatusAndStateTableCell,
  NumberTableCell,
  TextTableCell,
  TooltipInfoTableCell,
  YesNoTableCell,
} from '../TableCells';
import TotalOrderLineChartCard from '../../../views/dashboard/Default/TotalOrderLineChartCard';
import { ItemLookupTableCell } from '../TableCells/ItemLookupTableCell';

export const OptTableRow = ({
  id,
  columns,
  row,
  subTableColumns,
  subTableHeader,
  viewColumn,
  optimusColumn,
}) => {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const onSetOpen = async (val) => {
    setOpen(val);
  };

  return (
    <>
      <TableRow hover tabIndex={-1} key={row[id]}>
        {subTableColumns && (
          <OptExpandTableCell open={open} onOpen={() => onSetOpen(!open)} />
        )}
        {columns.map((column) => {
          switch (column.variant) {
            case 'address':
              return (
                <OptAddressTableCell
                  key={column.id}
                  column={column}
                  line1={row[column.customProps.line1]}
                  line2={row[column.customProps.line2]}
                  line3={row[column.customProps.line3]}
                  line4={row[column.customProps.line4]}
                  code={row[column.customProps.postalCode]}
                />
              );
            case 'header-value':
              return (
                <OptHeaderValueTableCell
                  key={column.id}
                  column={column}
                  header={row[column.customProps.header]}
                  value={row[column.customProps.value]}
                />
              );
            case 'yes-no':
              return (
                <YesNoTableCell
                  key={column.id}
                  columnProperties={column}
                  rowData={row}
                />
              );
            case 'number':
              return (
                <NumberTableCell
                  key={column.id}
                  columnProperties={column}
                  rowData={row}
                />
              );
            case 'currency':
              return (
                <CurrencyTableCell
                  key={column.id}
                  columnProperties={column}
                  rowData={row}
                />
              );
            case 'date-time':
            case 'date':
              return (
                <DateTimeTableCell
                  key={column.id}
                  columnProperties={column}
                  rowData={row}
                />
              );
            case 'api-lookup':
              return (
                <ApiLookupTableCell
                  key={column.id}
                  columnProperties={column}
                  rowData={row}
                />
              );
            case 'item-lookup':
              return (
                <ItemLookupTableCell
                  key={column.id}
                  columnProperties={column}
                  rowData={row}
                />
              );
            case 'tooltip-info':
              return (
                <TooltipInfoTableCell
                  key={column.id}
                  columnProperties={column}
                  rowData={row}
                />
              );
            case 'name-lookup-header-value':
              return (
                <OptNameLookupHeaderValueTableCell
                  key={column.id}
                  column={column}
                  header={row[column.customProps.header]}
                  value={row[column.customProps.value]}
                />
              );
            case 'code-lookup-header-value':
              return (
                <OptCodeLookupHeaderValueTableCell
                  key={column.id}
                  column={column}
                  header={row[column.customProps.header]}
                  value={row[column.customProps.value]}
                />
              );
            case 'colour-status':
              return (
                <OptColourStatusTableCell
                  key={column.id}
                  columnProperties={column}
                  rowData={row}
                />
              );
            case 'proof-status':
              return (
                <OptProofStatusTableCell
                  key={column.id}
                  column={column}
                  value={row[column.id]}
                  row={row}
                />
              );
            case 'phone':
              return (
                <OptPhoneTableCell
                  key={column.id}
                  column={column}
                  value={row[column.id]}
                />
              );
            case 'concat':
              return (
                <ConcatTableCell
                  key={column.id}
                  columnProperties={column}
                  rowData={row}
                />
              );
            case 'job-status-state':
              return (
                <JobStatusAndStateTableCell
                  key={column.id}
                  columnProperties={column}
                  rowData={row}
                />
              );
            default:
              return (
                <TextTableCell
                  key={column.id}
                  columnProperties={column}
                  rowData={row}
                />
              );
          }
        })}
        {viewColumn && (
          <Box
            sx={{
              height: '100%',
              display: 'flex',
              p: 0,
              m: 0,
              flexDirection: 'column',
              boxShadow: '-2px 0px 4px -1px lightGrey',
              position: 'sticky',
              right: '0px',
              background: 'white',
              opacity: 0.8,
            }}
          >
            <OptViewTableCell
              key="view"
              onView={() =>
                viewColumn.onClick(
                  viewColumn.idFields.map((column) => row[column]),
                )
              }
            />
          </Box>
        )}
        {optimusColumn && isElectron() && (
          // eslint-disable-next-line react/jsx-no-undef
          <Box
            sx={{
              display: 'flex',
              p: 0,
              m: 0,
              flexDirection: 'column',
              boxShadow: '-2px 0px 4px -1px lightGrey',
              position: 'sticky',
              right: '0px',
              background: 'white',
              opacity: 0.8,
            }}
          >
            <OptOptimusTableCell
              key="optimus"
              onOpen={() =>
                optimusColumn.onClick(
                  optimusColumn.idFields.map((column) => row[column]),
                )
              }
            />
          </Box>
        )}
      </TableRow>
      {subTableColumns && (
        <TableRow key="subRow">
          <TableCell
            key="subCell"
            style={{ paddingBottom: 0, paddingTop: 0 }}
            colSpan={6}
          >
            <Collapse in={open} timeout="auto" unmountOnExit>
              {open && (
                <Box sx={{ margin: 1 }}>
                  <TableContainer>
                    <SubCard
                      sx={{
                        bgcolor:
                          theme.palette.mode === 'dark'
                            ? 'dark.800'
                            : 'grey.50',
                        mb: 2,
                      }}
                      title={subTableHeader}
                      content={false}
                    >
                      <Table size="small" aria-label="purchases">
                        <TableHead>
                          <TableRow>
                            {subTableColumns.map((column) => (
                              <TableCell key={column.id} align={column.align}>
                                <FormattedMessage id={column.label} />
                              </TableCell>
                            ))}
                            <TableCell align="center" sx={{ pl: 3 }} />
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {/* <CustomerAddressRows
                                                        subTableColumns={subColumns}
                                                        setCustomer={setCustomer}
                                                        row={row}
                                                        open={open}
                                                        customerCode={row.customerCode}
                                                    /> */}
                        </TableBody>
                      </Table>
                    </SubCard>
                  </TableContainer>
                </Box>
              )}
            </Collapse>
          </TableCell>
        </TableRow>
      )}
    </>
  );
};
