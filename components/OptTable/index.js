import { useTheme } from '@mui/material/styles';
import { useIntl } from 'react-intl';
import { useState } from 'react';
import * as React from 'react';
import MainCard from '../ui/component/cards/MainCard';
import {
  CardContent,
  Grid,
  IconButton,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  TextField,
  Tooltip,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FileCopyIcon from '@mui/icons-material/FileCopyTwoTone';
import PrintIcon from '@mui/icons-material/PrintTwoTone';
import FilterListIcon from '@mui/icons-material/FilterListTwoTone';
import GetAppIcon from '@mui/icons-material/GetAppTwoTone';
import OptMainTableHead from './OptMainTableHead';
import OptTableFilter from './OptTableFilter';
import { OptTableRows } from './OptTableRows';
import exportToExcel from '../../utils/excel-export';
import { filterControls } from '../../views/dataflex/invoices/config';
import { isElectron } from '../../electron/channels';
import { AddCircleTwoTone } from '@mui/icons-material';
import Skeleton from '@mui/material/Skeleton';
import Breadcrumbs from '../../breadcrumbs';

const OptTable = ({
  title,
  titleIcon,
  rowId,
  data,
  searchParams,
  filterParams,
  addParams,
  loadingMask,
  mainColumns,
  subColums,
  viewColumn,
  optimusColumn,
  initialOrderBy,
  canPrint = false,
  exportParams,
  isLoading = false,
}) => {
  const theme = useTheme();
  const intl = useIntl();

  const [open, setOpen] = useState(false);
  const [rows, setRows] = useState(data);
  const [search, setSearch] = React.useState('');
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState(initialOrderBy);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  // console.log(`Filter params: ${JSON.stringify(filterParams.filterControls)}`);
  React.useEffect(() => {
    setRows(data);
  }, [data]);

  const handleClickOpenDialog = () => {
    if (!open) setOpen(true);
  };
  const handleCloseDialog = () => {
    if (open) setOpen(false);
  };

  const handleSearch = (event) => {
    const newString = event?.target.value;
    setSearch(newString || '');

    if (newString) {
      const newRows = rows.filter((row) => {
        let matches = true;
        let containsQuery = false;

        searchParams.searchFields.forEach((field) => {
          if (
            row[field]
              ?.toString()
              .toLowerCase()
              .includes(newString.toString().toLowerCase())
          ) {
            containsQuery = true;
          }
        });

        if (!containsQuery) {
          matches = false;
        }
        return matches;
      });
      setRows(newRows);
    } else {
      setRows(data);
    }
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleExport = () => {
    exportToExcel(rows, exportParams.fileName);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleAdd = () => {
    addParams.onAdd();
  };

  const handleFiltering = (values) => {
    filterParams.onFiltering(values);
    handleCloseDialog();
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event?.target.value, 10));
    setPage(0);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;
  const l10n = (val) => intl.formatMessage({ id: val });

  return (
    <>
      <MainCard
        variant="list-view"
        title={title}
        titleIcon={titleIcon}
        content={false}
      >
        <CardContent>
          <Grid
            container
            justifyContent="space-between"
            alignItems="center"
            spacing={2}
          >
            <Grid item xs={12} sm={6}>
              {searchParams && (
                <TextField
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon fontSize="small" />
                      </InputAdornment>
                    ),
                  }}
                  onChange={handleSearch}
                  placeholder={l10n(searchParams.searchLabel)}
                  value={search}
                  size="small"
                />
              )}
            </Grid>
            <Grid item xs={12} sm={6} sx={{ textAlign: 'right' }}>
              {exportParams && (
                <Tooltip title={l10n('Export to Excel')}>
                  <IconButton size="large" onClick={handleExport}>
                    <GetAppIcon />
                  </IconButton>
                </Tooltip>
              )}
              {canPrint && (
                <Tooltip title={l10n('Print')}>
                  <IconButton size="large">
                    <PrintIcon />
                  </IconButton>
                </Tooltip>
              )}
              {addParams && (
                <Tooltip title={l10n(addParams.addLabel)}>
                  <IconButton size="large" onClick={handleAdd}>
                    <AddCircleTwoTone />
                  </IconButton>
                </Tooltip>
              )}
              {filterParams && (
                <>
                  <Tooltip title={l10n('Filter')}>
                    <IconButton size="large" onClick={handleClickOpenDialog}>
                      <FilterListIcon />
                    </IconButton>
                  </Tooltip>

                  <OptTableFilter
                    title={filterParams.filterTitle ?? 'Filter'}
                    filterControls={filterParams.filterControls}
                    open={open}
                    handleCloseDialog={handleCloseDialog}
                    doFiltering={handleFiltering}
                    defaultParameters={filterParams.defaultParameters}
                  />
                </>
              )}
            </Grid>
          </Grid>
        </CardContent>
        <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
            <OptMainTableHead
              theme={theme}
              columns={mainColumns}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
              hasSubTables={subColums !== undefined}
              hasViewColumn={viewColumn !== undefined}
              hasOptimusColumn={isElectron() && optimusColumn !== undefined}
            />
            <TableBody>
              {isLoading &&
                Array.from(new Array(5)).map((_, index) => (
                  <TableRow key={index}>
                    {mainColumns.map((column, colIndex) => (
                      <TableCell key={colIndex}>
                        <Skeleton variant="rectangular" height={20} />
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              {!isLoading && rows.length === 0 && (
                <TableRow>
                  <TableCell colSpan={mainColumns.length}>No Records</TableCell>
                </TableRow>
              )}
              {!isLoading && rows.length > 0 && (
                <OptTableRows
                  rowId={rowId}
                  order={order}
                  orderBy={orderBy}
                  page={page}
                  rowsPerPage={rowsPerPage}
                  emptyRows={emptyRows}
                  columns={mainColumns}
                  rows={rows}
                  viewColumn={viewColumn}
                  optimusColumn={optimusColumn}
                />
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          labelRowsPerPage={l10n('Rows per page:')}
          labelDisplayedRows={(page) =>
            `${page.from}-${page.to === -1 ? page.count : page.to} ${l10n('of')} ${page.count}`
          }
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </MainCard>
    </>
  );
};
export default OptTable;
