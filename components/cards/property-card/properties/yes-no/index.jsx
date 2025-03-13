import { Grid, TableCell, Typography } from '@mui/material';
import { FormattedMessage, useIntl } from 'react-intl';
import * as React from 'react';
import Chip from '../../../../ui/component/Chip';
import PropTypes from 'prop-types';

export const YesNoProperty = ({ config, value }) => {
  const { formatMessage } = useIntl();
  const { id, label } = config;

  return (
    <TableCell variant="head">
      <Chip
        label={formatMessage({ id: value ? 'Yes' : 'No' })}
        size="small"
        color={value ? 'success' : 'warning'}
      />
    </TableCell>
  );
};

YesNoProperty.propTypes = {
  config: PropTypes.shape({
    id: PropTypes.string,
    label: PropTypes.string,
  }).isRequired,
  value: PropTypes.bool.isRequired,
};
