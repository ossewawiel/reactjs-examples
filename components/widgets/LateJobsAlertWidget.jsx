import { useGetAlertSummaryDataQuery } from '../../store/api/alertApi';
import SideIconCard from '../optCards/SideIconCard';
import {
  IconAsset,
  IconBuildingFactory,
  IconCalendarClock,
} from '@tabler/icons-react';
import { blue, grey } from '@mui/material/colors';
import { useTheme } from '@mui/material/styles';
import AlertWidget, { alertValue } from './AlertWidget';
import { defineMessages, FormattedMessage } from 'react-intl';
import { useAuth } from '../../contexts/jwt-context';
import { LOCALE_CURRENCY } from '../../constants';
import { useGetAlertWidgetDataQuery } from '../../store/api/dashboardServerApi';

const messages = defineMessages({
  lateJobs: {
    id: 'formatted.there_are_x_late_jobs',
    defaultMessage: 'There are {value1} late jobs',
  },
});

export const LateJobsAlertWidget = () => {
  const { details } = useAuth();
  const currencyCode =
    details?.currencyCode || LOCALE_CURRENCY[intl.locale] || 'USD';
  const {
    data = {},
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetAlertWidgetDataQuery('JOBS_LATE', {
    pollingInterval: 60 * 1000,
    skipPollingIfUnfocused: true,
  });

  let info = {
    iconPrimary: IconCalendarClock,
  };

  if (isSuccess) {
    // console.log(`Jobs booked this week: ${JSON.stringify(data)}`);
    info = {
      ...info,
      level: data.severity,
      primary: data.alertValues[0]
        ? alertValue(data.alertValues[0], currencyCode)
        : 0,
      secondary: (
        <FormattedMessage
          {...messages.lateJobs}
          values={{
            value1: data.alertValues[1]
              ? alertValue(data.alertValues[1], currencyCode)
              : 0,
          }}
        />
      ),
    };
  }

  return (
    <AlertWidget
      border
      boxShadow
      isLoading={isLoading}
      isError={isError}
      error={error}
      info={info}
    />
  );
};
