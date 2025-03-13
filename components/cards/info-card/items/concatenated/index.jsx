import { FormattedMessage, useIntl } from 'react-intl';
import { Grid, Typography } from '@mui/material';
import * as React from 'react';
import PropTypes from 'prop-types';

export const ConcatenatedInfoCardItem = ({
  config,
  values,
  secondaryValues,
}) => {
  const intl = useIntl();
  const { id, label, properties } = config;
  const { key } = properties;

  console.log(`key fields - ${key}`);
  const propsValue = config.propsValue || false;
  const dataSet = propsValue ? secondaryValues : values || '';

  const dataFields = [];
  dataFields.push(...key.map((item) => dataSet[item]));
  const result = dataFields.join(' ');

  return (
    <Grid item xs={3}>
      <Typography variant="caption">
        <FormattedMessage id={label} />
      </Typography>
      <Typography variant="h6">{result ? result : '-'}</Typography>
    </Grid>
  );
};

ConcatenatedInfoCardItem.propTypes = {
  config: PropTypes.shape({
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    properties: PropTypes.shape({
      key: PropTypes.array.isRequired,
    }).isRequired,
    propsValue: PropTypes.bool,
  }).isRequired,
  values: PropTypes.object.isRequired,
  secondaryValues: PropTypes.object,
};
