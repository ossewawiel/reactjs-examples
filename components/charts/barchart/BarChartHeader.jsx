import { Grid, Typography } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';

const BarChartHeader = ({ isLoading, heading, total }) => (
  <Grid container alignItems="center" justifyContent="space-between">
    <Grid item>
      <Grid container direction="column" spacing={1}>
        <Grid item>
          {isLoading ? (
            <Skeleton width={100} height={30} />
          ) : (
            <Typography variant="subtitle2">{heading}</Typography>
          )}
        </Grid>
        <Grid item>
          {isLoading ? (
            <Skeleton width={60} height={40} />
          ) : (
            <Typography variant="h3">{total}</Typography>
          )}
        </Grid>
      </Grid>
    </Grid>
  </Grid>
);

export default BarChartHeader;
