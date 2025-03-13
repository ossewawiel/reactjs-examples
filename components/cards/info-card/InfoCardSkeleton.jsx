import { Grid, Skeleton } from '@mui/material';
import PropTypes from 'prop-types';

const InfoCardSkeleton = ({ gridSpacing, hasImage }) => {
  return (
    <>
      <Grid item xs={12}>
        <Skeleton variant="rectangular" height={50} />
      </Grid>
      <Grid item xs={12}>
        <Skeleton variant="text" />
        <Skeleton variant="text" />
      </Grid>
      {hasImage && (
        <Grid item xs={4}>
          <Skeleton variant="rectangular" height={150} />
        </Grid>
      )}
      <Grid item xs={hasImage ? 8 : 12}>
        <Grid container spacing={gridSpacing}>
          {[...Array(3)].map((_, index) => (
            <Grid item xs={12} key={index}>
              <Skeleton variant="text" />
              <Skeleton variant="text" />
            </Grid>
          ))}
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container justifyContent="center" spacing={1}>
          {[...Array(3)].map((_, index) => (
            <Grid item xs={12} key={index}>
              <Skeleton variant="text" />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </>
  );
};

InfoCardSkeleton.propTypes = {
  gridSpacing: PropTypes.number.isRequired,
  hasImage: PropTypes.bool.isRequired,
};

export default InfoCardSkeleton;
