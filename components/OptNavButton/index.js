import { useTheme } from '@mui/material/styles';
import {
  Avatar,
  Button,
  ButtonBase,
  Chip,
  Icon,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { useDispatch, useSelector } from '../../store';
import { Link, useLocation } from 'react-router-dom';
import { useConfig } from 'src/contexts/ConfigContext';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { forwardRef, useEffect } from 'react';
import { activeID, activeItem, openDrawer } from '../../store/slices/menu';
import LAYOUT_CONST from '../../constants';
import PropTypes from 'prop-types';

const OptNavButton = ({ label, icon, onClick }) => {
  const theme = useTheme();
  const matchesSM = useMediaQuery(theme.breakpoints.down('lg'));
  const matchDownMd = useMediaQuery(theme.breakpoints.down('md'));

  const dispatch = useDispatch();
  const { layout, borderRadius } = useConfig();

  const itemIcon = icon ? (
    <Icon
      stroke={1.5}
      size="20px"
      style={{ color: theme.palette.secondary.main }}
    />
  ) : (
    <FiberManualRecordIcon
      sx={{
        color: theme.palette.secondary.main,
        width: 8,
        height: 8,
      }}
      fontSize="medium"
    />
  );

  // eslint-disable-next-line react/display-name
  const listItemProps = {
    component: forwardRef((props, ref) => <Link ref={ref} {...props} />),
  };
  const textColor = theme.palette.mode === 'dark' ? 'grey.400' : 'text.primary';

  return (
    <>
      <Button
        {...listItemProps}
        disabled={false}
        sx={{
          zIndex: 1201,
          borderRadius: `${borderRadius}px`,
          mb: 0.5,
          pl: 1.25,
          ...(theme.palette.mode !== 'dark' && {
            '&:hover': {
              background: theme.palette.secondary.light,
            },
          }),
        }}
        onClick={onClick}
      >
        <ButtonBase
          sx={{ borderRadius: `${borderRadius}px` }}
          aria-label="pages icon"
        >
          <ListItemIcon
            sx={{
              minWidth: 36,
              color: textColor,
              borderRadius: `${borderRadius}px`,
              width: 46,
              height: 46,
              alignItems: 'center',
              justifyContent: 'center',
              '&:hover': {
                bgcolor:
                  theme.palette.mode === 'dark'
                    ? theme.palette.secondary.main + 25
                    : 'secondary.light',
              },
            }}
          >
            {icon}
          </ListItemIcon>
        </ButtonBase>
        <Typography variant="body1" color="inherit">
          {label}
        </Typography>
      </Button>
    </>
  );
};

OptNavButton.propTypes = {
  item: PropTypes.object,
  level: PropTypes.number,
  parentId: PropTypes.string,
};

export default OptNavButton;
