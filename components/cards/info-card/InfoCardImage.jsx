import { Card, CardMedia, Grid } from '@mui/material';
import PropTypes from 'prop-types';

const InfoCardImage = ({ image }) => (
  <Grid item xs={4}>
    <Card>
      <CardMedia
        component="img"
        sx={{ height: '210px', width: '100%' }}
        image={image}
        alt="Info Card Image"
      />
    </Card>
  </Grid>
);

InfoCardImage.propTypes = {
  image: PropTypes.string.isRequired,
};

export default InfoCardImage;
