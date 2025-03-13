import { FormattedNumber, useIntl } from 'react-intl';
import { useAuth } from 'src/contexts/jwt-context';
import { TableCell } from '@mui/material';
import * as React from 'react';

export const ConcatenateProperty = ({ config, values }) => {

  const intl = useIntl();
  const { id, emptyDash, properties } = config;
  const { fields } = properties;
  const { details } = useAuth();
  const code = details.currencyCode;
  // console.log(`value - ${value} + code - ${code}`);

  const dataFields = [];
  dataFields.push(...fields.map(item => values[item]));
  const result = dataFields.join(' ');

  return <TableCell key={id} variant="head">{result}</TableCell>;
};
