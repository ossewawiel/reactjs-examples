import {
  Grid,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import * as React from 'react';
import { FormattedDate } from 'react-intl';

export const StandardTableCard = ({ tableHeader, xAxisHeaders, rows }) => {
  const data = Object.entries(rows).map(([key, values]) => ({
    name: key,
    values,
  }));
  console.log(`Data: ${JSON.stringify(data)}`);
  return (
    <TableContainer>
      {xAxisHeaders ? (
        <TableHead>
          <TableRow>
            <TableCell align="center">
              {!tableHeader ? ' ' : tableHeader}
            </TableCell>
            {xAxisHeaders.map((item, index) => (
              <TableCell key={index} align="center">
                {item}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
      ) : null}
      <TableBody>
        {data.map((row, index) => (
          <TableRow key={index}>
            <TableCell align="center">{row.name}</TableCell>
            {row.values.map((value, id) => (
              <TableCell key={id} align="center">
                {value === 0 || null ? '-' : value}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </TableContainer>
  );
};

export const StandardDateTableCard = ({ tableHeader, xAxisHeaders, rows }) => {
  const data = Object.entries(rows).map(([key, values]) => ({
    name: key,
    values,
  }));
  console.log(`Data: ${JSON.stringify(data)}`);
  return (
    <TableContainer>
      {xAxisHeaders ? (
        <TableHead>
          <TableRow>
            <TableCell align="center">
              {!tableHeader ? ' ' : tableHeader}
            </TableCell>
            {xAxisHeaders.map((item, index) => (
              <TableCell key={index} align="center">
                {item}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
      ) : null}
      <TableBody>
        {data.map((row, index) => (
          <TableRow key={index}>
            <TableCell align="center">{row.name}</TableCell>
            {row.values.map((value, id) => (
              <TableCell key={id} align="center">
                {value === '1900-01-01' || value === '1900-01-01T00:00:00' ? (
                  '-'
                ) : (
                  <FormattedDate
                    value={new Date(value)}
                    year="numeric"
                    month="long"
                    day="2-digit"
                  />
                )}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </TableContainer>
  );
};
