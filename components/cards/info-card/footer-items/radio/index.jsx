import { Grid, Typography } from '@mui/material';
import { FormattedMessage } from 'react-intl';
import {
  RadioButtonCheckedTwoTone,
  RadioButtonUncheckedTwoTone,
} from '@mui/icons-material';
import * as React from 'react';
import PropTypes from 'prop-types';

const iconStyle = { fontSize: '1.3rem' }

export const RadioInfoCardFooterItem = ({ config: { id, label }, value }) => (
  <Grid item>
    <Typography align="center" variant="subtitle1">
      <FormattedMessage id={label} />
    </Typography>
    <Typography align="center" variant="subtitle2">
      {value ? (
        <RadioButtonCheckedTwoTone sx={iconStyle} />
      ) : (
        <RadioButtonUncheckedTwoTone sx={iconStyle} />
      )}
    </Typography>
  </Grid>
);

RadioInfoCardFooterItem.propTypes = {
  config: PropTypes.shape({
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  }).isRequired,
  value: PropTypes.bool.isRequired,
};
