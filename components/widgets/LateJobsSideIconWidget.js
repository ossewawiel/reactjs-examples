import { useGetAlertSummaryDataQuery } from '../../store/api/alertApi';
import SideIconCard from '../optCards/SideIconCard';
import { IconAsset } from '@tabler/icons';
import { blue, grey } from '@mui/material/colors';
import { useTheme } from '@mui/material/styles';

export const LateJobsSideIconWidget = () => {
  const theme = useTheme();
  const alertLevelColor = (level) => {
    switch (level) {
      case 'YELLOW':
        return theme.palette.warning.main;
      case 'RED':
        return theme.palette.error.main;
      default:
        return theme.palette.success.main;
    }
  };
  const {
    data = {},
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetAlertSummaryDataQuery('WDGT_JOBS_LATE', {
    pollingInterval: 60 * 1000,
    skipPollingIfUnfocused: true,
  });
  const color = isLoading ? grey[200] : alertLevelColor(data.level);

  let info = {
    primary: 0,
    secondary: '0',
    secondarySub: '',
  };

  if (isSuccess) {
    const rows = data.message.split(';');
    const heading = rows[0].split(':');
    const quantity = rows[1].split(':');
    const value = rows[2].split(':');
    info = {
      primary: value[1] || '',
      secondary: quantity[1] || '',
      secondarySub: heading[1] || '',
    };
  }

  return (
    <SideIconCard
      border
      boxShadow
      isLoading={isLoading}
      iconPrimary={IconAsset}
      variant="currency-quantity"
      primary={info.primary}
      secondary={info.secondary}
      secondarySub={info.secondarySub}
      color={color}
    />
  );
};
