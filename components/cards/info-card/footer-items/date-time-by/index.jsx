import { Grid, Typography } from '@mui/material';
import {
  FormattedDate,
  FormattedMessage,
  FormattedTime,
} from 'react-intl';
import * as React from 'react';
import PropTypes from 'prop-types';
import AccessTimeTwoToneIcon from '@mui/icons-material/AccessTimeTwoTone';
import CalendarMonthTwoToneIcon from '@mui/icons-material/CalendarMonthTwoTone';

export const DateTimeByInfoCardFooterItem = ({
  config: { id, label, properties },
  values,
}) => {
  const value = values[id] || '';
  const by = values[properties.by];

  return value === '1900-01-01' || value === '1900-01-01T00:00:00' ? (
    <Grid item xs={3} alignItems={'center'}>
      <Typography variant="caption">
        <FormattedMessage id={label} />
      </Typography>
      <Typography variant="h6">
        <Grid container direction="column">
          <Grid item>
            <Typography>-</Typography>
          </Grid>
        </Grid>
      </Typography>
    </Grid>
  ) : (
    <Grid item xs={3}>
      <Typography variant="h6">
        <Grid container direction={'column'} alignItems={'center'}>
          <Grid item>
            <Typography variant="caption">
              <FormattedMessage id={label} />
            </Typography>
          </Grid>
          <Grid item>
            <Grid container direction="row" spacing={1} alignItems={'center'}>
              <Grid item>
                <Grid container direction={'column'}>
                  <Grid item>
                    <Grid
                      container
                      direction="row"
                      alignItems="center"
                      spacing={1}
                    >
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
                    <Grid
                      container
                      direction="row"
                      alignItems="center"
                      spacing={1}
                    >
                      <Grid item>
                        <AccessTimeTwoToneIcon sx={{ fontSize: '0.9rem' }} />
                      </Grid>
                      <Grid item>
                        <FormattedTime value={value} />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Grid container direction={'row'} spacing={1}>
                  <Grid item>
                    <Typography variant="caption">
                      <FormattedMessage id={'By'} />
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="h6">{by}</Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Typography>
    </Grid>
  );
};

DateTimeByInfoCardFooterItem.propTypes = {
  config: PropTypes.shape({
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    properties: PropTypes.shape({
      decimals: PropTypes.number,
    }),
  }).isRequired,
  values: PropTypes.array.isRequired,
};
