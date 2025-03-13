import { styled, useTheme } from '@mui/material/styles';
import { Box, IconButton, useMediaQuery } from '@mui/material';
import { Carousel } from 'react-responsive-carousel';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';
import PropTypes from 'prop-types';
import TotalIncomeDarkCard from '../TotalIncomeDarkCard';
import MainCard from 'src/components/ui/component/cards/MainCard';
import AlertCard from './AlertCard';
import { useGetAlertDataQuery } from 'src/store/api/alertApi';

const CardWrapper = styled(MainCard)(({ theme }) => ({
  overflow: 'hidden',
  position: 'relative',
  '&:after': {
    content: '""',
    position: 'absolute',
    width: 210,
    height: 210,
    background: `linear-gradient(210.04deg, ${theme.palette.warning.dark} -50.94%, rgba(144, 202, 249, 0) 83.49%)`,
    borderRadius: '50%',
    top: -30,
    right: -180,
  },
  '&:before': {
    content: '""',
    position: 'absolute',
    width: 210,
    height: 210,
    background: `linear-gradient(140.9deg, ${theme.palette.warning.dark} -14.02%, rgba(144, 202, 249, 0) 70.50%)`,
    borderRadius: '50%',
    top: -160,
    right: -130,
  },
}));

function CarouselNextArrow({ onClickHandler }) {
  const theme = useTheme();

  return (
    <IconButton
      onClick={onClickHandler}
      sx={{
        position: 'absolute',
        zIndex: 2,
        top: 'calc(50% - 30px)',
        cursor: 'pointer',
        opacity: 0.5,
        background: `${theme.palette.background.paper} !important`,
        width: { xs: '30px !important', xl: '50px !important' },
        height: { xs: '30px !important', xl: '50px !important' },
        boxShadow: '0px 24px 38px rgba(9, 15, 37, 0.07)',
        '&:after': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          transform: 'scale(9)',
        },
        svg: {
          height: { md: 20, lg: 40, xl: '40px' },
          width: { md: 20, lg: 40, xl: '40px' },
        },
        right: { xs: '10px', md: '10px', lg: '10px', xl: '10px' },
      }}
    >
      <IconChevronRight
        fontSize={25}
        color={theme.palette.grey[900]}
        aria-label="click to slide change left side"
      />
    </IconButton>
  );
}

CarouselNextArrow.propTypes = {
  onClickHandler: PropTypes.func,
};

function CarouselPrevArrow({ onClickHandler }) {
  const theme = useTheme();
  return (
    <IconButton
      onClick={onClickHandler}
      sx={{
        position: 'absolute',
        zIndex: 2,
        top: 'calc(50% - 30px)',
        cursor: 'pointer',
        opacity: 0.5,
        background: `${theme.palette.background.paper} !important`,
        width: { xs: '30px !important', xl: '50px !important' },
        height: { xs: '30px !important', xl: '50px !important' },
        boxShadow: '0px 24px 38px rgba(9, 15, 37, 0.07)',
        '&:after': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          transform: 'scale(9)',
        },
        svg: {
          height: { md: 20, lg: 40, xl: '40px' },
          width: { md: 20, lg: 40, xl: '40px' },
        },
        left: { xs: '10px', md: '10px', lg: '10px', xl: '10px' },
      }}
    >
      <IconChevronLeft
        fontSize={25}
        color={theme.palette.grey[900]}
        aria-label="click to slide change right side"
      />
    </IconButton>
  );
}

CarouselPrevArrow.propTypes = {
  onClickHandler: PropTypes.func,
};

const AlertItem = () => {
  const theme = useTheme();

  return (
    <Box sx={{ pl: 1, pr: 1 }}>
      <TotalIncomeDarkCard />
    </Box>
  );
};

const AlertsCarousel = () => {
  const theme = useTheme();
  const matchUpSM = useMediaQuery(theme.breakpoints.down('md'));

  const {
    data: alerts = [],
    isSuccess,
    isError,
    error,
  } = useGetAlertDataQuery();

  if (isSuccess) {
    // console.log(`addresses: ${JSON.stringify(addresses)}`);
  } else if (isError) {
    console.log(`Exception loading Alert Data: ${JSON.stringify(error)}`);
  }

  return (
    <CardWrapper border boxShadow content={false}>
      <Box sx={{ p: 2 }}>
        <Carousel
          showArrows
          showThumbs={false}
          showStatus={false}
          centerMode={!matchUpSM}
          centerSlidePercentage={40}
          infiniteLoop
          autoFocus
          emulateTouch
          swipeable
          autoPlay
          interval={10000}
          renderArrowPrev={(onClickHandler, hasPrev, label) =>
            hasPrev && (
              <CarouselPrevArrow
                onClickHandler={onClickHandler}
                hasPrev={hasPrev}
                label={label}
              />
            )
          }
          renderArrowNext={(onClickHandler, hasNext, label) =>
            hasNext && (
              <CarouselNextArrow
                onClickHandler={onClickHandler}
                hasNext={hasNext}
                label={label}
              />
            )
          }
        >
          {alerts.map((alert, index) => (
            <AlertCard
              key={index}
              header={alert.name}
              detail={alert.message}
              variant={alert.level}
            />
          ))}
        </Carousel>
      </Box>
    </CardWrapper>
  );
};

export default AlertsCarousel;
