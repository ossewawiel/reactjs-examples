import { defineMessages, FormattedMessage } from 'react-intl';
import { useAuth } from '../../contexts/jwt-context';
import { LOCALE_CURRENCY } from '../../constants';
import { useGetAlertWidgetDataQuery } from '../../store/api/dashboardServerApi';
import { IconBuildingFactory, IconCalculator } from '@tabler/icons-react';
import AlertWidget, { alertValue } from './AlertWidget';

const messages = defineMessages({
  jobsBooked: {
    id: 'formatted.x_quotes_already_raised_in_the_last_day',
    defaultMessage: '{value1} quotes already raised in the last day',
  },
});

export const DailyEnquiriesAlertWidget = () => {
  const { details } = useAuth();
  const currencyCode =
    details?.currencyCode || LOCALE_CURRENCY[intl.locale] || 'USD';
  const {
    data = {},
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetAlertWidgetDataQuery('QUOT_AV_LASTDAY', {
    pollingInterval: 60 * 1000,
    skipPollingIfUnfocused: true,
  });

  let info = {
    iconPrimary: IconCalculator,
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
