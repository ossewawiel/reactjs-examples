import { gridSpacing } from '../../../../store/constant';
import { Grid, Typography } from '@mui/material';
import OptInfoCard from '../../../../components/optCards/OptInfoCard';
import * as React from 'react';
import PropTypes from 'prop-types';

const SalesOrderDetailsText = ({ text }) => (
  <Grid container spacing={gridSpacing}>
    <Grid item xs={12}>
      <OptInfoCard title="Text">
        <Typography paragraph display="block">
          {text}
        </Typography>
      </OptInfoCard>
    </Grid>
  </Grid>
);

export default SalesOrderDetailsText;
