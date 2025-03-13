import { Grid, Typography } from '@mui/material';
import { FormattedMessage } from 'react-intl';
import * as React from 'react';
import PropTypes from 'prop-types';

export const YesNoInfoCardFooterItem = ({ config: { id, label }, value }) => (
  <Grid item xs={3}>
    <Typography variant="caption">
      <FormattedMessage id={label} />
    </Typography>
    <Typography variant="h6">
      <FormattedMessage id={value ? 'Yes' : 'No'} />
    </Typography>
  </Grid>
);

YesNoInfoCardFooterItem.propTypes = {
  config: PropTypes.shape({
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  }).isRequired,
  value: PropTypes.bool.isRequired,
};
