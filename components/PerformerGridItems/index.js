import { Grid, Typography, useMediaQuery } from '@mui/material';
import { FormattedNumber } from 'react-intl';
import React from 'react';
import { useTheme } from '@mui/material/styles';

export const PerformerGridItem = ({
  icon,
  subject,
  apiQuery,
  topItem,
  interval,
}) => {
  const theme = useTheme();
  const matchDownXs = useMediaQuery(theme.breakpoints.down('sm'));
  const blockSX = {
    p: 2.5,
    borderBottom: '1px solid ',
    borderBottomColor:
      theme.palette.mode === 'dark'
        ? theme.palette.dark.main
        : theme.palette.grey[200],
  };

  const {
    data = {},
    isLoading,
    isSuccess,
    isError,
    error,
  } = apiQuery({ topItem, interval });

  const Icon = icon;

  console.log(data, error, isLoading);

  if (isLoading)
    return (
      <Grid item xs={12} sm={6} sx={blockSX}>
        <Typography variant="h5">Loading...</Typography>
      </Grid>
    );

  const itemName = data.value1?.value.string || '';
  const itemValue = data.value2?.value.decimal || 0;

  return (
    <Grid item xs={12} sm={6} sx={blockSX}>
      <Grid
        container
        alignItems="center"
        spacing={1}
        justifyContent={matchDownXs ? 'space-between' : 'center'}
      >
        <Grid item>
          <Icon stroke={1.5} />
        </Grid>
        <Grid item sm zeroMinWidth>
          <Typography variant="h5" align="left">
            {itemName}
          </Typography>
          <Typography variant="subtitle2" align="left">
            {subject}
          </Typography>
        </Grid>
        <Grid>
          <FormattedNumber value={itemValue} style="currency" currency="GBP" />
        </Grid>
      </Grid>
    </Grid>
  );
};
