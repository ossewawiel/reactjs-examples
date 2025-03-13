import { Grid, Typography } from '@mui/material';
import { FormattedDate, FormattedMessage, FormattedTime } from 'react-intl';
import CalendarMonthTwoToneIcon from '@mui/icons-material/CalendarMonthTwoTone';
import AccessTimeTwoToneIcon from '@mui/icons-material/AccessTimeTwoTone';
import * as React from 'react';
import PropTypes from 'prop-types';

const DateTimeItem = ({ icon: Icon, children }) => (
  <Grid container direction="row" alignItems="center" spacing={1}>
    <Grid item>
      <Icon sx={{ fontSize: '0.9rem' }} />
    </Grid>
    <Grid item>{children}</Grid>
  </Grid>
);

DateTimeItem.propTypes = {
  icon: PropTypes.elementType.isRequired,
  children: PropTypes.node.isRequired,
};

export const DateTimeInfoCardItem = ({ config, value }) => {
  const { id, label } = config;
  return (
    <Grid item xs={3}>
      <Typography variant="caption">
        <FormattedMessage id={label} />
      </Typography>
      <Typography variant="h6">
        <Grid container direction="column">
          <Grid item>
            <DateTimeItem icon={CalendarMonthTwoToneIcon}>
              <FormattedDate
                value={value}
                year="numeric"
                month="short"
                day="2-digit"
              />
            </DateTimeItem>
          </Grid>
          <Grid item>
            <DateTimeItem icon={AccessTimeTwoToneIcon}>
              <FormattedTime value={value} />
            </DateTimeItem>
          </Grid>
        </Grid>
      </Typography>
    </Grid>
  );
};

DateTimeInfoCardItem.propTypes = {
  config: PropTypes.shape({
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  }).isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)])
    .isRequired,
};
