import PropTypes from 'prop-types';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Card, Grid, Typography, useMediaQuery } from '@mui/material';
import { FormattedNumber, useIntl } from 'react-intl';
import Skeleton from '@mui/material/Skeleton';

// =============================|| SIDE ICON CARD ||============================= //

const SideIconCard = ({
  iconPrimary,
  primary,
  secondary,
  secondarySub,
  border,
  boxShadow,
  variant,
  color,
  bgcolor,
  isLoading,
}) => {
  const theme = useTheme();
  const intl = useIntl();
  const matchDownXs = useMediaQuery(theme.breakpoints.down('sm'));

  const IconPrimary = iconPrimary;
  const primaryIcon = iconPrimary !== undefined ? <IconPrimary /> : null;
  let primaryValue = primary;
  if (variant === 'currency-quantity') {
    primaryValue = (
      <FormattedNumber value={primary} style="currency" currency="GBP" />
    );
  }

  return (
    <Card
      sx={{
        border: border ? '1px solid' : 'none',
        borderColor:
          theme.palette.mode === 'dark'
            ? theme.palette.background.default
            : theme.palette.grey[300] + 98,
        bgcolor: bgcolor || '',
        position: 'relative',
        ':hover': {
          // eslint-disable-next-line no-nested-ternary
          boxShadow: boxShadow
            ? theme.palette.mode === 'dark'
              ? '0 2px 14px 0 rgb(33 150 243 / 10%)'
              : '0 2px 14px 0 rgb(32 40 45 / 35%)'
            : 'inherit',
        },
      }}
    >
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item xs={3} sx={{ background: color, py: 3, px: 0 }}>
          <Typography
            variant="h5"
            sx={{
              textAlign: 'center',
              color: '#fff',
              '& > svg': {
                width: 32,
                height: 32,
              },
            }}
            align="center"
          >
            {primaryIcon}
          </Typography>
        </Grid>
        <Grid item xs={9}>
          <Grid
            container
            direction="column"
            justifyContent="space-between"
            spacing={1}
            alignItems={matchDownXs ? 'center' : 'flex-start'}
          >
            <Grid item sm={12}>
              <Typography
                variant="h4"
                sx={{ color: bgcolor ? '#fff' : '', ml: 2 }}
              >
                {isLoading ? <Skeleton width="120px" /> : primaryValue}
              </Typography>
            </Grid>
            <Grid item sm={12}>
              <Typography
                variant="subtitle2"
                align="left"
                sx={{ color: bgcolor ? '#fff' : 'grey.700', ml: 2 }}
              >
                {isLoading ? '' : secondary}{' '}
                <span>
                  {isLoading ? <Skeleton width="200px" /> : secondarySub}
                </span>{' '}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Card>
  );
};

SideIconCard.propTypes = {
  iconPrimary: PropTypes.object,
  primary: PropTypes.string,
  secondary: PropTypes.string,
  secondarySub: PropTypes.string,
  color: PropTypes.string,
  bgcolor: PropTypes.string,
};

export default SideIconCard;
