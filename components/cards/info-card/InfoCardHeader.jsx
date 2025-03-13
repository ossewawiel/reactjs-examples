import { Grid, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';

const mapPlaceholders = (placeholders, values) => {
  const mappedValues = {};
  for (const [placeholder, key] of Object.entries(placeholders)) {
    mappedValues[placeholder] = values[key];
  }
  return mappedValues;
};

const InfoCardHeader = ({ header, values, gridSpacing }) => {
  const Icon = header.icon;
  const formatMessage = (id, defaultMessage, placeholders) => {
    return (
      <FormattedMessage
        id={id}
        defaultMessage={defaultMessage}
        values={mapPlaceholders(placeholders, values)}
      />
    );
  };

  return (
    <>
      <Grid item xs={12}>
        <Grid container direction="row" spacing={gridSpacing}>
          <Grid item>
            <Icon color="primary" sx={{ fontSize: '3rem' }} />
          </Grid>
          <Grid item>
            <Typography variant="h3" component="div">
              {formatMessage(
                header.title.id,
                header.title.defaultMessage,
                header.title.placeholders,
              )}
            </Typography>
            <Typography variant="subtitle1">
              {formatMessage(
                header.subtitle.id,
                header.subtitle.defaultMessage,
                header.subtitle.placeholders,
              )}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      {header.description && (
        <Grid item xs={12}>
          <Typography variant="subtitle2" sx={{ color: 'grey.700' }}>
            {formatMessage(
              header.description.id,
              header.description.defaultMessage,
              header.description.placeholders,
            )}
          </Typography>
        </Grid>
      )}
    </>
  );
};

InfoCardHeader.propTypes = {
  header: PropTypes.shape({
    icon: PropTypes.elementType.isRequired,
    title: PropTypes.shape({
      id: PropTypes.string.isRequired,
      defaultMessage: PropTypes.string.isRequired,
      placeholders: PropTypes.object.isRequired,
    }).isRequired,
    subtitle: PropTypes.shape({
      id: PropTypes.string.isRequired,
      defaultMessage: PropTypes.string.isRequired,
      placeholders: PropTypes.object.isRequired,
    }).isRequired,
    description: PropTypes.shape({
      id: PropTypes.string.isRequired,
      defaultMessage: PropTypes.string,
      placeholders: PropTypes.object.isRequired,
    }),
  }).isRequired,
  values: PropTypes.object.isRequired,
  gridSpacing: PropTypes.number.isRequired,
};

export default InfoCardHeader;
