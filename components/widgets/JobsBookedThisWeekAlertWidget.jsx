import { IconBuildingFactory, IconCalendarCheck } from '@tabler/icons-react';
import AlertWidget, { alertValue } from './AlertWidget';
import { useGetAlertWidgetDataQuery } from '../../store/api/dashboardServerApi';
import { defineMessages, FormattedMessage } from 'react-intl';
import { useAuth } from '../../contexts/jwt-context';
import { LOCALE_CURRENCY } from '../../constants';

const messages = defineMessages({
  jobsBooked: {
    id: 'formatted.x_jobs_booked_this_week',
    defaultMessage: '{value1} jobs booked in this week',
  },
});

export const JobsBookedThisWeekAlertWidget = () => {
  const { details } = useAuth();
  const currencyCode =
    details?.currencyCode || LOCALE_CURRENCY[intl.locale] || 'USD';
  const {
    data = {},
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetAlertWidgetDataQuery('JOBS_BOOKED_THIS_WK', {
    pollingInterval: 60 * 1000,
    skipPollingIfUnfocused: true,
  });

  let info = {
    iconPrimary: IconCalendarCheck,
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
          {...messages.jobsBooked}
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
