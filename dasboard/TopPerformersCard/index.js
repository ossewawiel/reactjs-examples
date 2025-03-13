import { useTheme } from '@mui/material/styles';
import React from 'react';
import SkeletonPopularCard from '../../../../ui-component/cards/Skeleton/PopularCard';
import MainCard from 'src/components/ui/component/cards/MainCard';
import {
  Button,
  CardContent,
  Grid,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { gridSpacing } from 'src/store/constant';
import PropTypes from 'prop-types';
// eslint-disable-next-line import/no-extraneous-dependencies
import {
  IconUserShare,
  IconUserStar,
  IconRun,
  IconShoppingCartDollar,
  IconShoppingCartHeart,
} from '@tabler/icons-react';
import { PerformerGridItem } from 'src/components/PerformerGridItems';

const TopPerformersCard = ({ isLoading }) => {
  const theme = useTheme();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [periodValue, setPeriodValue] = React.useState('week');

  const handleChangePeriod = (event, newValue) => {
    setPeriodValue(newValue);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      {isLoading ? (
        <SkeletonPopularCard />
      ) : (
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
                    <Typography variant="h4">Top performers</Typography>
                  </Grid>
                  <Grid item>
                    <Button
                      disableElevation
                      variant={periodValue ? 'contained' : 'text'}
                      size="small"
                      sx={{ color: 'inherit' }}
                      onClick={(e) => handleChangePeriod(e, true)}
                    >
                      This Week
                    </Button>
                    <Button
                      disableElevation
                      variant={!periodValue ? 'contained' : 'text'}
                      size="small"
                      sx={{ color: 'inherit' }}
                      onClick={(e) => handleChangePeriod(e, false)}
                    >
                      This Month
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Grid container direction="column">
                  <PerformerGridItem
                    icon={IconRun}
                    name="Jane Doe"
                    subject="Top Representative"
                    value1="12345"
                    value2="54321"
                  />
                  <PerformerGridItem
                    icon={IconShoppingCartHeart}
                    name="Labels"
                    subject="Top Selling Product"
                    value1="54321"
                    value2="12345"
                  />
                  <PerformerGridItem
                    icon={IconShoppingCartDollar}
                    name="Gift Cards"
                    subject="Top Profitable Product"
                    value1="23456"
                    value2="65432"
                  />
                  <PerformerGridItem
                    icon={IconUserStar}
                    name="Minute Print"
                    subject="Top Customer"
                    value1="25246"
                    value2="55125"
                  />
                  <PerformerGridItem
                    icon={IconUserShare}
                    name="Jack Sparrow"
                    subject="Top Originator"
                    value1="53678"
                    value2="53254"
                  />
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
        </MainCard>
      )}
    </>
  );
};

TopPerformersCard.propTypes = {
  isLoading: PropTypes.bool,
};

export default TopPerformersCard;
