import { useTheme } from '@mui/material/styles';
import SubCard from '../../ui/component/cards/SubCard';
import { Grid, List, Typography } from '@mui/material';
import * as React from 'react';
import ActionCardItems from './ActionCardItems';

const ActionCard = ({ isLoading = false, config, values }) => {
  const theme = useTheme();
  const { header, items } = config;
  return (
    <SubCard
      title={
        <Grid container spacing={1} alignItems="center">
          <Grid item xs zeroMinWidth>
            <Typography align="left" variant="subtitle1">
              {header.title}
            </Typography>
            <Typography align="left" variant="subtitle2">
              {header.subtitle}
            </Typography>
          </Grid>
        </Grid>
      }
    >
      <List component="nav" aria-label="main mailbox folders">
        <ActionCardItems items={items} values={values} />
      </List>
    </SubCard>
  );
};

export default ActionCard;
