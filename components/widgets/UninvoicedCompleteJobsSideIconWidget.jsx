import { defineMessages, FormattedMessage } from 'react-intl';
import { useAuth } from '../../contexts/jwt-context';
import { LOCALE_CURRENCY } from '../../constants';
import { useGetAlertWidgetDataQuery } from '../../store/api/dashboardServerApi';
import { IconBuildingFactory } from '@tabler/icons-react';
import AlertWidget, { alertValue } from './AlertWidget';

const messages = defineMessages({
  completedJobs: {
    id: 'formatted.there_are_x_completed_jobs_with_uninvoiced_charges',
    defaultMessage:
      'There are {value1} completed jobs with uninvoiced charges.',
  },
});

export const UninvoicedCompleteJobsSideIconWidget = () => {
  const { details } = useAuth();
  const currencyCode =
    details?.currencyCode || LOCALE_CURRENCY[intl.locale] || 'USD';
  const {
    data = {},
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetAlertWidgetDataQuery('COMPL_JOBS_NOT_INV', {
    pollingInterval: 60 * 1000,
    skipPollingIfUnfocused: true,
  });

  let info = {
    iconPrimary: IconBuildingFactory,
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
          {...messages.completedJobs}
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
