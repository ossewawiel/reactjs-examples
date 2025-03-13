import { useTheme } from '@mui/material/styles';
import { FormattedNumber } from 'react-intl';
import { Card, Grid, Typography, useMediaQuery } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';
import PropTypes from 'prop-types';

export const alertValue = (value, currencyCode) => {
  if (value.valueType === 'CURRENCY') {
    return (
      <FormattedNumber
        value={value.value.decimal}
        style="currency"
        currency={currencyCode}
      />
    );
  } else if (value.valueType === 'NUMBER') {
    return <FormattedNumber value={value.value.integer} />;
  }
  return 'Unknown value';
};

const AlertWidgetSkeleton = () => (
  <>
    <Grid item xs={12}>
      <Typography variant="h4" sx={{ ml: 2 }}>
        <Skeleton width="120px" />
      </Typography>
    </Grid>
    <Grid item xs={12}>
      <Typography variant="subtitle2" align="left" sx={{ ml: 2 }}>
        <Skeleton width="200px" />
      </Typography>
    </Grid>
  </>
);

const AlertWidgetError = ({ error }) => (
  <Grid item xs={12}>
    <Typography variant="h4" sx={{ ml: 2 }}>
      Error: {error.message}
    </Typography>
  </Grid>
);

const AlertWidgetContent = ({ info, theme, matchDownXs }) => (
  <>
    <Grid item xs={12}>
      <Typography
        variant="h4"
        sx={{ color: info.bgcolor ? '#fff' : '', ml: 2 }}
      >
        {info.primary}
      </Typography>
    </Grid>
    <Grid item xs={12}>
      <Typography
        variant="subtitle2"
        align="left"
        sx={{ color: info.bgcolor ? '#fff' : 'grey.700', ml: 2 }}
      >
        {info.secondary}
      </Typography>
    </Grid>
  </>
);

const AlertWidget = (props) => {
  const { border, boxShadow, isLoading, isError, error, info } = props;
  const theme = useTheme();
  const matchDownXs = useMediaQuery(theme.breakpoints.down('sm'));

  const IconPrimary = info.iconPrimary;
  const primaryIcon = info.iconPrimary !== undefined ? <IconPrimary /> : null;

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

  return (
    <Card
      sx={{
        border: border ? '1px solid' : 'none',
        borderColor:
          theme.palette.mode === 'dark'
            ? theme.palette.background.default
            : theme.palette.grey[300] + 98,
        bgcolor: info.bgcolor || '',
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
        <Grid
          item
          xs={3}
          sx={{ background: alertLevelColor(info.level), py: 3, px: 0 }}
        >
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
            {isError ? (
              <AlertWidgetError error={error} />
            ) : isLoading ? (
              <AlertWidgetSkeleton />
            ) : (
              <AlertWidgetContent
                info={info}
                theme={theme}
                matchDownXs={matchDownXs}
              />
            )}
          </Grid>
        </Grid>
      </Grid>
    </Card>
  );
};

AlertWidget.propTypes = {
  border: PropTypes.bool,
  boxShadow: PropTypes.bool,
  isLoading: PropTypes.bool,
  isError: PropTypes.bool,
  error: PropTypes.object,
  info: PropTypes.shape({
    iconPrimary: PropTypes.elementType,
    primary: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    secondary: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    secondarySub: PropTypes.string,
    level: PropTypes.string,
    bgcolor: PropTypes.string,
  }).isRequired,
};

export default AlertWidget;
