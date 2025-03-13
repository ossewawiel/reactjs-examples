import { Grid, Typography } from '@mui/material';
import { FormattedMessage } from 'react-intl';
import * as React from 'react';
import PropTypes from 'prop-types';

export const InfoCardItem = ({ config: { id, label }, value }) => (
  <Grid item xs={3}>
    <Typography variant="caption">
      <FormattedMessage id={label} />
    </Typography>
    <Typography variant="h6">{value ? value : '-'}</Typography>
  </Grid>
);

InfoCardItem.propTypes = {
  config: PropTypes.shape({
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  }).isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};
