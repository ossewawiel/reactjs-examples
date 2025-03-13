import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from '@mui/material';
import * as React from 'react';
import {
  FormattedDate,
  FormattedMessage,
  FormattedNumber,
  useIntl,
} from 'react-intl';
import Chip from '../../ui/component/Chip';
import SubCard from '../../ui/component/cards/SubCard';
import { useAuth } from 'src/contexts/jwt-context';
import { LOCALE_CURRENCY } from '../../../constants';

const CodeLookupValueCell = ({ value, useName, query, showCode }) => {
  const intl = useIntl();
  // console.log(`value - ${value}`);
  const { data: response = [], isSuccess, isError, error } = query();
  let val = '...';
  if (isSuccess) {
    const tmp = response.filter((item) => item.name === value);
    // console.log(`lookup stuff - ${value}, ${JSON.stringify(tmp)}, ${JSON.stringify(response)}, ${useName}, ${showCode}`);
    val = useName ? intl.formatMessage({ id: tmp[0].value }) : tmp[0].value;
    val = showCode ? `${val} (${value})` : val;
  }

  return <TableCell variant="head">{`${val}`}</TableCell>;
};

const CodeLookupLabelCell = ({
  valueLabel,
  value,
  useName,
  query,
  showCode,
}) => {
  const intl = useIntl();
  // console.log(`value - ${value}`);
  const { data: response = [], isSuccess, isError, error } = query();
  let val = '...';
  if (isSuccess) {
    const tmp = response.filter((item) => item.name === valueLabel);
    val = useName ? intl.formatMessage({ id: tmp[0].value }) : tmp[0].value;
    val = showCode ? `${val} (${valueLabel})` : val;
  }

  return <TableCell variant="head">{`${val} ${value}`}</TableCell>;
};

const ValueCell = ({
  value,
  valueLabel,
  variant,
  decimals,
  emptyDash,
  query,
  code,
  showCode,
  useName,
}) => {
  const intl = useIntl();
  // console.log(`valuecell value: ${value}, code: ${code}, showCode: ${showCode}`);
  switch (variant) {
    case 'date':
      return (
        <TableCell variant="head">
          {value === '1900-01-01' ? (
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
      );
    case 'decimal':
      return (
        <TableCell variant="head">
          <FormattedNumber
            value={value}
            maximumFractionDigits={decimals || 2}
            minimumFractionDigits={decimals || 2}
          />
        </TableCell>
      );
    case 'yes-no':
      return (
        <TableCell variant="head ">
          {value ? (
            <Chip
              label={intl.formatMessage({ id: 'Yes' })}
              size="small"
              chipcolor="success"
            />
          ) : (
            <Chip
              label={intl.formatMessage({ id: 'No' })}
              size="small"
              chipcolor="orange"
            />
          )}
        </TableCell>
      );
    case 'code-lookup':
      // console.log(`value - ${value}`);
      return (
        <CodeLookupValueCell value={value} query={query} showCode={showCode} />
      );
    case 'label-lookup':
      return (
        <CodeLookupLabelCell
          valueLabel={valueLabel}
          value={value}
          query={query}
          showCode={showCode}
          useName={useName}
        />
      );
    case 'meta-lookup':
      return (
        <CodeLookupValueCell
          value={value}
          query={query}
          useName
          showCode={showCode}
        />
      );
    case 'value-code':
      return (
        <TableCell variant="head">
          {value} ({code})
        </TableCell>
      );
    default:
      return (
        <TableCell variant="head">{emptyDash ? value || '-' : value}</TableCell>
      );
  }
};
export const LabelValueRow = ({
  label,
  value,
  variant,
  decimals,
  emptyDash,
  query,
  code,
  showCode = false,
}) => (
  <TableRow>
    <TableCell variant="head">
      <FormattedMessage id={label} />
    </TableCell>
    <ValueCell
      variant={variant}
      value={value}
      decimals={decimals}
      emptyDash
      query={query}
      code={code}
      showCode={showCode}
    />
  </TableRow>
);

export const CodeLabelRow = ({
  label,
  valueLabel,
  value,
  variant,
  decimals,
  emptyDash,
  query,
  code,
  showCode = false,
  useName,
}) => (
  <TableRow>
    <TableCell variant="head">
      <FormattedMessage id={label} />
    </TableCell>
    <ValueCell
      variant={variant}
      value={value}
      valueLabel={valueLabel}
      emptyDash
      query={query}
      useName={useName}
    />
  </TableRow>
);

export const ValueRow = ({ value }) => (
  <TableRow>
    <TableCell variant="body">{value || '-'}</TableCell>
  </TableRow>
);

export const CurrencyRow = ({ label, value }) => {
  const intl = useIntl();
  const { currencyInfo } = useAuth();
  // console.log(`Currency info code: ${JSON.stringify(currencyInfo.currentData.currencyCode)}`);
  const code = currencyInfo.currentData.currencyCode;

  const number = (
    <FormattedNumber
      value={value}
      style="currency"
      currency={code || LOCALE_CURRENCY[intl.locale] || 'USD'}
    />
  );
  return <LabelValueRow label={label} value={number} />;
};

export default function OptInfoCard({ children, title }) {
  const intl = useIntl();
  return (
    <SubCard title={intl.formatMessage({ id: title })}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TableContainer>
            <Table
              sx={{
                '& td': {
                  borderBottom: 'none',
                },
              }}
              size="small"
            >
              <TableBody>{children}</TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </SubCard>
  );
}
