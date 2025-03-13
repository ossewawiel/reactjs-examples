import { Grid, Typography } from '@mui/material';
import { FormattedMessage } from 'react-intl';
import * as React from 'react';
import PropTypes from 'prop-types';

export const InfoCardFooterItem = ({ config: { id, label }, value }) => (
  <Grid item>
    <Typography align="center" variant="subtitle2">
      <FormattedMessage id={label} />
    </Typography>
    <Typography align="center" variant="h3">
      {value}
    </Typography>
  </Grid>
);

InfoCardFooterItem.propTypes = {
  config: PropTypes.shape({
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  }).isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};
