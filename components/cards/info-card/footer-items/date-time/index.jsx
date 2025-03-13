import { Grid, Typography } from '@mui/material';
import { FormattedDate, FormattedMessage, FormattedNumber, FormattedTime } from "react-intl";
import * as React from 'react';
import PropTypes from 'prop-types';
import AccessTimeTwoToneIcon from '@mui/icons-material/AccessTimeTwoTone';
import CalendarMonthTwoToneIcon from '@mui/icons-material/CalendarMonthTwoTone';

export const DateTimeInfoCardFooterItem = ({
  config: { id, label, properties },
  value,
}) => {
  return (
    <Grid item xs={3}>
      <Typography variant="caption">
        <FormattedMessage id={label} />
      </Typography>
      <Typography variant="h6">
        <Grid container direction="column">
          <Grid item>
            <Grid container direction="row" alignItems="center" spacing={1}>
              <Grid item>
                <CalendarMonthTwoToneIcon sx={{ fontSize: '0.9rem' }} />
              </Grid>
              <Grid item>
                <FormattedDate
                  value={value}
                  year="numeric"
                  month="short"
                  day="2-digit"
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Grid container direction="row" alignItems="center" spacing={1}>
              <Grid item>
                <AccessTimeTwoToneIcon sx={{ fontSize: '0.9rem' }} />
              </Grid>
              <Grid item>
                <FormattedTime value={value} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Typography>
    </Grid>
  );
};

DateTimeInfoCardFooterItem.propTypes = {
  config: PropTypes.shape({
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    properties: PropTypes.shape({
      decimals: PropTypes.number,
    }),
  }).isRequired,
  value: PropTypes.number.isRequired,
};
