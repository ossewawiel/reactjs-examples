import {
  Box,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
} from '@mui/material';
import { FormattedMessage } from 'react-intl';
import { visuallyHidden } from '@mui/utils';
import PropTypes from 'prop-types';
import * as React from 'react';

const OptMainTableHead = ({
  columns,
  order,
  orderBy,
  onRequestSort,
  hasSubTables,
  hasViewColumn,
  hasOptimusColumn,
  hasEditColumn,
}) => {
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };
  return (
    <TableHead>
      <TableRow>
        {hasSubTables && <TableCell sx={{ pl: 3 }} />}
        {columns.map((column) => (
          <TableCell
            key={column.id}
            align={column.align}
            padding={column.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === column.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === column.id}
              direction={orderBy === column.id ? order : 'asc'}
              onClick={createSortHandler(column.id)}
            >
              <FormattedMessage id={column.label} />
              {orderBy === column.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
        {hasViewColumn && (
          <TableCell
            sx={{
              pl: 3,
              position: 'sticky',
              right: 0,
              boxShadow: '-5px 2px grey',
            }}
          />
        )}
        {hasOptimusColumn && <TableCell sx={{ pl: 3 }} />}
        {hasEditColumn && <TableCell sx={{ pl: 3 }} />}
      </TableRow>
    </TableHead>
  );
};

OptMainTableHead.propTypes = {
  columns: PropTypes.array.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
};

export default OptMainTableHead;
