import { defineMessages, useIntl } from 'react-intl';
import SubCard from '../../ui/component/cards/SubCard';
import {
  Grid,
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from '@mui/material';
import * as React from 'react';
import { gridSpacing } from '../../../store/constant';

function isFloat(value) {
  if (
    typeof value === 'number' &&
    !Number.isNaN(value) &&
    !Number.isInteger(value)
  ) {
    return true;
  }

  return false;
}

export const ProgressRow = ({
  label,
  labelNote,
  value,
  total,
  showDetail,
  isAlarm,
  alarmLabel,
}) => {
  const intl = useIntl();
  const percent =
    total !== 0 ? Number.parseFloat((value / total) * 100).toFixed(0) : 0;
  const parsedValue = isFloat(value)
    ? Number.parseFloat(value).toFixed(2)
    : value;
  const parsedTotal = isFloat(total)
    ? Number.parseFloat(total).toFixed(2)
    : total;
  const alarmMsg = isAlarm && alarmLabel ? alarmLabel : '';
  const translatedLabel = intl.formatMessage({ id: label });
  const messages = defineMessages({
    detailedMessage: {
      id: 'formatted.label_x_of_y_alarm',
      defaultMessage: '{label} ({value} of {total}) {alarmMsg}',
    },
    basicMessage: {
      id: 'formatted.label_alarm',
      defaultMessage: '{label} {alarmMsg}',
    },
  });
  const details = showDetail
    ? intl.formatMessage(messages.detailedMessage, {
        label: translatedLabel,
        value: parsedValue,
        total: parsedTotal,
        alarmMsg,
      })
    : intl.formatMessage(messages.basicMessage, {
        label: translatedLabel,
        alarmMsg,
      });

  return (
    <Grid item xs={12}>
      <Grid container alignItems="center" spacing={1}>
        <Grid item sm zeroMinWidth>
          <Typography variant="body2">{details}</Typography>
        </Grid>
        <Grid item>
          <Typography variant="body2" align="right">
            {`${percent}%`}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <LinearProgress
            variant="determinate"
            value={percent}
            color={isAlarm ? 'secondary' : 'primary'}
            aria-label='"traffic progress"'
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default function OptProgressCard({ children, title }) {
  const intl = useIntl();
  return (
    <SubCard title={intl.formatMessage({ id: title })}>
      <Grid container spacing={gridSpacing}>
        {children}
      </Grid>
    </SubCard>
  );
}
