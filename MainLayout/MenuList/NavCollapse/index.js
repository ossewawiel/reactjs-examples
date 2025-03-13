import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';

// material-ui
import { styled, useTheme } from '@mui/material/styles';
import {
  Box,
  ClickAwayListener,
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Typography,
  useMediaQuery,
} from '@mui/material';

// project imports
import NavItem from '../NavItem';
import Transitions from 'src/components/ui/component/Transitions';

import { handlerActiveItem, useGetMenuMaster } from 'src/api/menu';
import { MenuOrientation, ThemeMode } from 'src/config';
import { useConfig } from 'src/contexts/ConfigContext';

// assets
import {
  IconChevronDown,
  IconChevronRight,
  IconChevronUp,
} from '@tabler/icons-react';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import PopperStyled from '../components/PopperStyled';
import PopperStyledMini from '../components/PopperStyledMini';
import navCollapseButtonStyle from './style';
import { FormattedMessage } from 'react-intl';

// ==============================|| SIDEBAR MENU LIST COLLAPSE ITEMS ||============================== //

const NavCollapse = ({ menu, level, parentId }) => {
  const theme = useTheme();
  const downMD = useMediaQuery(theme.breakpoints.down('md'));
  const ref = useRef(null);

  const { mode, menuOrientation, borderRadius } = useConfig();
  const { menuMaster } = useGetMenuMaster();
  const drawerOpen = menuMaster.isDashboardDrawerOpened;
  const isHorizontal =
    menuOrientation === MenuOrientation.HORIZONTAL && !downMD;

  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClickMini = (event) => {
    setAnchorEl(null);
    if (drawerOpen) {
      setOpen(!open);
      setSelected(!selected ? menu.id : null);
    } else {
      setAnchorEl(event?.currentTarget);
    }
  };

  const handleHover = (event) => {
    setAnchorEl(event?.currentTarget);
  };

  const handleClosePopper = () => {
    setOpen(false);
    setSelected(null);
    setAnchorEl(null);
  };

  const openMini = Boolean(anchorEl);
  const pathname = usePathname();

  const checkOpenForParent = (child, id) => {
    child.forEach((item) => {
      if (item.url === pathname) {
        setOpen(true);
        setSelected(id);
      }
    });
  };

  // menu collapse for sub-levels
  useEffect(() => {
    setOpen(false);
    // eslint-disable-next-line
    openMini ? setAnchorEl(null) : setSelected(null);
    if (menu.children) {
      menu.children.forEach((item) => {
        if (item.children?.length) {
          checkOpenForParent(item.children, menu.id);
        }
        if (item.url === pathname) {
          setSelected(menu.id);
          setOpen(true);
        }
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, menu.children]);

  const [hoverStatus, setHover] = useState(false);

  const compareSize = () => {
    const compare =
      ref.current && ref.current.scrollWidth > ref.current.clientWidth;
    setHover(compare);
  };

  useEffect(() => {
    if (menu.url === pathname) {
      handlerActiveItem(menu.id);
      setSelected(menu.id);
      setAnchorEl(null);
      setOpen(true);
    }
  }, [pathname, menu]);

  // menu collapse & item
  const menus = menu.children?.map((item) => {
    switch (item.type) {
      case 'collapse':
        return (
          <NavCollapse
            key={item.id}
            menu={item}
            level={level + 1}
            parentId={parentId}
          />
        );
      case 'item':
        return (
          <NavItem
            key={item.id}
            item={item}
            level={level + 1}
            parentId={parentId}
          />
        );
      default:
        return (
          <Typography key={item.id} variant="h6" color="error" align="center">
            Menu Items Error
          </Typography>
        );
    }
  });

  const isSelected = selected === menu.id;

  const Icon = menu.icon;
  const menuIcon = menu.icon ? (
    <Icon
      strokeWidth={1.5}
      size={drawerOpen ? '20px' : '24px'}
      style={{
        color: isSelected
          ? theme.palette.secondary.main
          : theme.palette.text.primary,
      }}
    />
  ) : (
    <FiberManualRecordIcon
      sx={{
        color: isSelected
          ? theme.palette.secondary.main
          : theme.palette.text.primary,
        width: isSelected ? 8 : 6,
        height: isSelected ? 8 : 6,
      }}
      fontSize={level > 0 ? 'inherit' : 'medium'}
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

  const textColor = theme.palette.mode === 'dark' ? 'grey.400' : 'text.primary';
  const iconSelectedColor =
    theme.palette.mode === 'dark' && drawerOpen
      ? 'text.primary'
      : 'secondary.main';

  const popperId = openMini ? `collapse-pop-${menu.id}` : undefined;

  return (
    <>
      {!isHorizontal ? (
        <>
          <ListItemButton
            sx={{
              ...navCollapseButtonStyle({
                theme,
                drawerOpen,
                level,
                borderRadius,
                selectedColor: iconSelectedColor,
              }),
            }}
            selected={isSelected}
            {...(!drawerOpen && {
              onMouseEnter: handleClickMini,
              onMouseLeave: handleClosePopper,
            })}
            onClick={handleClickMini}
          >
            {menuIcon && (
              <ListItemIcon
                sx={{
                  minWidth: level < 2 ? 36 : 18,
                  color: isSelected ? iconSelectedColor : textColor,
                  ...(!drawerOpen &&
                    level < 2 && {
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
                      ...(isSelected && {
                        bgcolor:
                          theme.palette.mode === 'dark'
                            ? theme.palette.secondary.main + 25
                            : 'secondary.light',
                        '&:hover': {
                          bgcolor:
                            theme.palette.mode === 'dark'
                              ? theme.palette.secondary.main + 30
                              : 'secondary.light',
                        },
                      }),
                    }),
                }}
              >
                {menuIcon}
              </ListItemIcon>
            )}
            {(drawerOpen || (!drawerOpen && level >= 2)) && (
              <ListItemText
                primary={
                  <Typography
                    variant={selected === menu.id ? 'h5' : 'body1'}
                    color="inherit"
                    sx={{ my: 'auto' }}
                  >
                    <FormattedMessage id={menu.title} />
                  </Typography>
                }
                secondary={
                  menu.caption && (
                    <Typography
                      variant="caption"
                      sx={{ ...theme.typography.subMenuCaption }}
                      display="block"
                      gutterBottom
                    >
                      {menu.caption}
                    </Typography>
                  )
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
                      <ClickAwayListener onClickAway={handleClosePopper}>
                        <Box>{menus}</Box>
                      </ClickAwayListener>
                    </Paper>
                  </Transitions>
                )}
              </PopperStyledMini>
            )}
          </ListItemButton>
          {drawerOpen && (
            <Collapse in={open} timeout="auto" unmountOnExit>
              {open && (
                <List
                  component="div"
                  disablePadding
                  sx={{
                    position: 'relative',
                    '&:after': {
                      content: "''",
                      position: 'absolute',
                      left: '32px',
                      top: 0,
                      height: '100%',
                      width: '1px',
                      opacity: theme.palette.mode === 'dark' ? 0.2 : 1,
                      background:
                        theme.palette.mode === 'dark'
                          ? theme.palette.dark.light
                          : theme.palette.primary.light,
                    },
                  }}
                >
                  {menus}
                </List>
              )}
            </Collapse>
          )}
        </>
      ) : (
        <ListItemButton
          id={`boundary-${popperId}`}
          disableRipple
          selected={selected === menu.id}
          onMouseEnter={handleHover}
          onMouseLeave={handleClosePopper}
          onClick={handleHover}
          aria-describedby={popperId}
        >
          {menuIcon && (
            <ListItemIcon sx={{ my: 'auto', minWidth: !menu.icon ? 18 : 36 }}>
              {menuIcon}
            </ListItemIcon>
          )}
          <ListItemText
            primary={
              <Typography
                variant={selected === menu.id ? 'h5' : 'body1'}
                color="inherit"
                sx={{ my: 'auto' }}
              >
                <FormattedMessage id={menu.title} />
              </Typography>
            }
          />
          {openMini ? (
            <IconChevronRight stroke={1.5} size="16px" />
          ) : (
            <IconChevronDown stroke={1.5} size="16px" />
          )}

          {anchorEl && (
            <PopperStyled
              id={popperId}
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
                    offset: [-10, 0],
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
                      py: 0.5,
                      boxShadow: theme.shadows[8],
                      backgroundImage: 'none',
                    }}
                  >
                    <ClickAwayListener onClickAway={handleClosePopper}>
                      <Box>{menus}</Box>
                    </ClickAwayListener>
                  </Paper>
                </Transitions>
              )}
            </PopperStyled>
          )}
        </ListItemButton>
      )}
    </>
  );
};

NavCollapse.propTypes = {
  menu: PropTypes.object,
  level: PropTypes.number,
  parentId: PropTypes.string,
};

export default NavCollapse;
