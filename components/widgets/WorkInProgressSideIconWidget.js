import { useTheme } from '@mui/material/styles';
import { useGetAlertSummaryDataQuery } from '../../store/api/alertApi';
import { grey } from '@mui/material/colors';
import SideIconCard from '../optCards/SideIconCard';
import { IconAsset } from '@tabler/icons-react';
import { getRandomArbitrary } from '../../utils/utility-functions';

export const WorkInProgressSideIconWidget = () => {
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
  // const {
  //     data = {},
  //     isLoading,
  //     isSuccess,
  //     isError,
  //     error
  // } = useGetAlertSummaryDataQuery('WDGT_JOBS_LATE', {
  //     pollingInterval: 60 * 1000,
  //     skipPollingIfUnfocused: true
  // });
  const data = {
    level: 'GREEN',
    message: `heading:Work In Progress;quantity: ;value:${getRandomArbitrary(5000, 7000)}`,
  };
  const color = alertLevelColor(data.level); // isLoading ? grey[200] : alertLevelColor(data.level);

  let info = {
    primary: 0,
    secondary: 0,
    secondarySub: '',
  };

  // if (isSuccess) {
  const rows = data.message.split(';');
  const heading = rows[0].split(':');
  const quantity = rows[1].split(':');
  const value = rows[2].split(':');
  info = {
    primary: value[1],
    secondary: quantity[1],
    secondarySub: heading[1],
  };
  // console.log(`alert data: ${JSON.stringify(data)} info: ${JSON.stringify(info)}`);
  // }

  return (
    <SideIconCard
      border
      boxShadow
      isLoading={false}
      iconPrimary={IconAsset}
      variant="currency-quantity"
      primary={info.primary}
      secondary={info.secondary}
      secondarySub={info.secondarySub}
      color={color}
    />
  );
};
