import { useTheme } from '@mui/material/styles';
import { Card, Grid } from '@mui/material';
import * as React from 'react';
import * as PropTypes from 'prop-types';
import InfoCardFooterItems from './InfoCardFooterItems';
import InfoCardImage from './InfoCardImage';
import InfoCardSkeleton from './InfoCardSkeleton';
import InfoCardHeader from './InfoCardHeader';
import InfoCardItems from './InfoCardItems';

const InfoCard = ({ isLoading = false, config, values, secondaryValues }) => {
  const theme = useTheme();
  const { header, items, footerItems, image, layout } = config;
  const gridSpacing = layout.gridSpacing || 3;
  return (
    <Card
      sx={{
        p: 2,
        background:
          theme.palette.mode === 'dark'
            ? theme.palette.dark.main
            : theme.palette.grey[50],
        border:
          theme.palette.mode === 'dark'
            ? '1px solid transparent'
            : `1px solid${theme.palette.grey[100]}`,
        '&:hover': {
          borderColor: theme.palette.primary.main,
        },
      }}
    >
      <Grid container spacing={gridSpacing}>
        {isLoading ? (
          <InfoCardSkeleton gridSpacing={gridSpacing} hasImage={!!image} />
        ) : (
          <>
            <InfoCardHeader header={header} values={values} gridSpacing={gridSpacing} />
            <Grid item xs={image ? 8 : 12}>
              <InfoCardItems
                items={items}
                values={values}
                gridSpacing={gridSpacing}
                secondaryValues={secondaryValues}
              />
            </Grid>
            {image && <InfoCardImage image={image} />}
            <Grid item xs={12}>
              <InfoCardFooterItems
                footerItems={footerItems}
                values={values}
                secondaryValues={secondaryValues}
              />
            </Grid>
          </>
        )}
      </Grid>
    </Card>
  );
};

InfoCard.propTypes = {
  config: PropTypes.shape({
    header: PropTypes.shape({
      icon: PropTypes.node,
      title: PropTypes.string,
      subtitle: PropTypes.string,
      description: PropTypes.string,
    }).isRequired,
    items: PropTypes.arrayOf(PropTypes.object).isRequired,
    footerItems: PropTypes.arrayOf(PropTypes.object).isRequired,
    image: PropTypes.string,
    layout: PropTypes.shape({
      gridSpacing: PropTypes.number,
    }).isRequired,
  }).isRequired,
  values: PropTypes.object.isRequired,
  secondaryValues: PropTypes.object,
  isLoading: PropTypes.bool,
};

export default InfoCard;
