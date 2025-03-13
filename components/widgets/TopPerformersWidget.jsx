import { useTheme } from '@mui/material/styles';
import React from 'react';
import SkeletonPopularCard from '../../ui-component/cards/Skeleton/PopularCard';
import MainCard from '../ui/component/cards/MainCard';
import { Button, CardContent, Grid, Typography } from '@mui/material';
import { gridSpacing } from '../../store/constant';
import { PerformerGridItem } from '../PerformerGridItems';
import {
  IconRun,
  IconShoppingCartDollar,
  IconShoppingCartHeart,
  IconUserShare,
  IconUserStar,
} from '@tabler/icons-react';
import { useGetTopItemForIntervalQuery } from 'src/store/api/dashboardServerApi';
import { FormattedMessage, useIntl } from 'react-intl';

export const TopPerformersWidget = () => {
  const theme = useTheme();
  const intl = useIntl();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [periodValue, setPeriodValue] = React.useState('YEAR');

  const handleChangePeriod = (period) => {
    setPeriodValue(period);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <MainCard
        border
        boxShadow
        content={false}
        sx={{
          '& svg': {
            width: 50,
            height: 50,
            color: theme.palette.secondary.main,
            borderRadius: '14px',
            p: 1.25,
            bgcolor:
              theme.palette.mode === 'dark'
                ? theme.palette.background.default
                : 'primary.light',
          },
        }}
      >
        <CardContent>
          <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
              <Grid
                container
                alignContent="center"
                justifyContent="space-between"
              >
                <Grid item>
                  <Typography variant="h4">
                    <FormattedMessage id="Top performers" />
                  </Typography>
                </Grid>
                <Grid item>
                  <Button
                    disableElevation
                    variant={periodValue === 'QUARTER' ? 'contained' : 'text'}
                    size="small"
                    color="primary"
                    onClick={() => handleChangePeriod('QUARTER')}
                  >
                    <FormattedMessage id="Week" />
                  </Button>
                  <Button
                    disableElevation
                    variant={periodValue === 'YEAR' ? 'contained' : 'text'}
                    size="small"
                    color="primary"
                    onClick={() => handleChangePeriod('YEAR')}
                  >
                    <FormattedMessage id="Month" />
                  </Button>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container direction="column">
                <PerformerGridItem
                  icon={IconRun}
                  subject={intl.formatMessage({ id: 'Top Representative' })}
                  apiQuery={useGetTopItemForIntervalQuery}
                  topItem="REP"
                  interval={periodValue}
                />
                <PerformerGridItem
                  icon={IconShoppingCartHeart}
                  subject={intl.formatMessage({ id: 'Top Selling Product' })}
                  apiQuery={useGetTopItemForIntervalQuery}
                  topItem="SELLING_PRODUCT"
                  interval={periodValue}
                />
                <PerformerGridItem
                  icon={IconShoppingCartDollar}
                  subject={intl.formatMessage({ id: 'Top Profitable Product' })}
                  apiQuery={useGetTopItemForIntervalQuery}
                  topItem="PROFITABLE_PRODUCT"
                  interval={periodValue}
                />
                <PerformerGridItem
                  icon={IconUserStar}
                  subject={intl.formatMessage({ id: 'Top Customer' })}
                  apiQuery={useGetTopItemForIntervalQuery}
                  topItem="CUSTOMER"
                  interval={periodValue}
                />
                <PerformerGridItem
                  icon={IconUserShare}
                  subject={intl.formatMessage({ id: 'Top Originator' })}
                  apiQuery={useGetTopItemForIntervalQuery}
                  topItem="ORIGINATOR"
                  interval={periodValue}
                />
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </MainCard>
    </>
  );
};
