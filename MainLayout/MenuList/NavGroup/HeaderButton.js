import {
  Avatar,
  Box,
  ButtonBase,
  Chip,
  ClickAwayListener,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { useConfig } from 'src/contexts/ConfigContext';
import { dispatch, useSelector } from 'src/store';
import { useTheme } from '@mui/material/styles';
import { activeID, activeItem, openDrawer } from 'src/store/slices/menu';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import {
  IconChevronDown,
  IconChevronRight,
  IconChevronUp,
} from '@tabler/icons-react';
import Transitions from 'src/components/ui/component/Transitions';
import PopperStyledMini from '../components/PopperStyledMini';
import { useGetMenuMaster } from '../../../../api/menu';
import { FormattedMessage } from 'react-intl';

const HeaderButton = ({
  item,
  parentId,
  items,
  open,
  selected,
  openMini,
  onClickMini,
  onClosePopper,
  anchorEl,
}) => {
  const theme = useTheme();
  const { layout, borderRadius } = useConfig();
  const { menuMaster } = useGetMenuMaster();
  const drawerOpen = menuMaster.isDashboardDrawerOpened;

  const matchesSM = useMediaQuery(theme.breakpoints.down('lg'));
  const iconSelectedColor =
    theme.palette.mode === 'dark' && drawerOpen
      ? 'text.primary'
      : 'secondary.main';
  const textColor = theme.palette.mode === 'dark' ? 'grey.400' : 'text.primary';

  const isSelected = selected === item.id;

  const Icon = item?.icon;
  const itemIcon = item?.icon ? (
    <Icon
      stroke={1.5}
      size={drawerOpen ? '20px' : '24px'}
      style={{ color: theme.palette.primary.main }}
    />
  ) : (
    <FiberManualRecordIcon
      sx={{
        color: isSelected
          ? theme.palette.primary.main
          : theme.palette.text.primary,
        width: isSelected ? 8 : 6,
        height: isSelected ? 8 : 6,
      }}
      fontSize="medium"
    />
  );

  const collapseIcon = drawerOpen ? (
    <IconChevronUp
      stroke={1.5}
      size="16px"
      style={{ marginTop: 'auto', marginBottom: 'auto' }}
    />
  ) : (
    <IconChevronRight
      stroke={1.5}
      size="16px"
      style={{ marginTop: 'auto', marginBottom: 'auto' }}
    />
  );

  const itemHandler = (id) => {
    // console.log(`activeId: ${id}, parentId: ${parentId}`);
    dispatch(activeItem([id]));
    if (matchesSM) dispatch(openDrawer(false));
    dispatch(activeID(parentId));
  };

  return (
    <ListItemButton
      sx={{
        zIndex: 1201,
        borderRadius: `${borderRadius}px`,
        mb: 0.5,
        ...(drawerOpen &&
          (open
            ? theme.palette.mode !== 'dark' && {
                background: theme.palette.primary.main,
                color: '#fff',
                '&:hover': {
                  bgcolor: theme.palette.primary.main,
                },
                '&.Mui-selected': {
                  '&:hover': {
                    bgcolor: theme.palette.primary.main,
                  },
                  bgcolor: theme.palette.primary.main,
                  color: '#fff',
                },
              }
            : theme.palette.mode !== 'dark' && {
                borderStyle: 'solid',
                borderColor: theme.palette.primary.light,
                borderWidth: '1px',
                borderRadius: `${borderRadius}px`,
                color: theme.palette.text.primary,
                '&:hover': {
                  bgcolor: theme.palette.primary[200],
                  color: '#fff',
                },
              })),
        ...(!drawerOpen && {
          pl: 1.25,
          py: 0,
          '&:hover': {
            bgcolor: 'transparent',
          },
          '&.Mui-selected': {
            '&:hover': {
              bgcolor: 'transparent',
            },
            bgcolor: 'transparent',
          },
        }),
      }}
      selected={selected === item.id}
      {...(!drawerOpen && {
        onMouseEnter: onClickMini,
        onMouseLeave: onClosePopper,
      })}
      onClick={onClickMini}
    >
      {!drawerOpen && (
        <ListItemIcon
          sx={{
            minWidth: 36,
            color: isSelected ? iconSelectedColor : textColor,
            borderRadius: `${borderRadius}px`,
            width: 46,
            height: 46,
            alignItems: 'center',
            justifyContent: 'center',
            '&:hover': {
              bgcolor:
                theme.palette.mode === 'dark'
                  ? theme.palette.primary.main + 25
                  : 'primary.light',
            },
            ...(isSelected && {
              bgcolor:
                theme.palette.mode === 'dark'
                  ? theme.palette.primary.main + 25
                  : 'primary.light',
              '&:hover': {
                bgcolor:
                  theme.palette.mode === 'dark'
                    ? theme.palette.primary.main + 30
                    : 'primary.light',
              },
            }),
          }}
        >
          {itemIcon}
        </ListItemIcon>
      )}

      {drawerOpen && (
        <ListItemText
          primary={
            <Typography
              variant="caption"
              sx={{
                fontSize: '0.875rem',
                fontWeight: 500,
                textTransform: 'capitalize',
                marginTop: '10px',
                ...(open
                  ? {
                      color:
                        theme.palette.mode === 'dark'
                          ? theme.palette.primary.main
                          : '#fff',
                    }
                  : {
                      color:
                        theme.palette.mode === 'dark'
                          ? theme.palette.grey[500]
                          : theme.palette.primary.dark,
                    }),
              }}
            >
              <FormattedMessage id={item.title} />
            </Typography>
          }
        />
      )}

      {openMini || open ? (
        collapseIcon
      ) : (
        <IconChevronDown
          stroke={1.5}
          size="16px"
          style={{ marginTop: 'auto', marginBottom: 'auto' }}
        />
      )}

      {!drawerOpen && (
        <PopperStyledMini
          open={openMini}
          anchorEl={anchorEl}
          placement="right-start"
          style={{
            zIndex: 2001,
          }}
          modifiers={[
            {
              name: 'offset',
              options: {
                offset: [-12, 0],
              },
            },
          ]}
        >
          {({ TransitionProps }) => (
            <Transitions in={openMini} {...TransitionProps}>
              <Paper
                sx={{
                  overflow: 'hidden',
                  mt: 1.5,
                  boxShadow: theme.shadows[8],
                  backgroundImage: 'none',
                }}
              >
                <ClickAwayListener onClickAway={onClosePopper}>
                  <Box>{items}</Box>
                </ClickAwayListener>
              </Paper>
            </Transitions>
          )}
        </PopperStyledMini>
      )}
    </ListItemButton>
  );
};

export default HeaderButton;
