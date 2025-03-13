import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
  Avatar,
  ButtonBase,
  Chip,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Typography,
  useMediaQuery,
} from '@mui/material';

// project imports
import { useConfig } from 'src/contexts/ConfigContext';

// assets
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import {
  handlerActiveItem,
  handlerDrawerOpen,
  useGetMenuMaster,
} from 'src/api/menu';
import { MenuOrientation } from 'src/config';
import { ThemeMode } from 'src/config';
import listItemButtonStyle from './style';
import { RenderFormattedMessage } from 'src/utils/utility-functions';

// ==============================|| SIDEBAR MENU LIST ITEMS ||============================== //

const NavItem = ({
  item,
  level,
  isParents = false,
  disabled = false,
  setSelectedID,
}) => {
  const theme = useTheme();
  const downMD = useMediaQuery(theme.breakpoints.down('md'));
  const ref = useRef(null);

  const pathname = usePathname();
  const params = useParams();
  const { mode, menuOrientation, borderRadius } = useConfig();

  const { menuMaster } = useGetMenuMaster();
  const openItem = menuMaster.openedItem;
  const drawerOpen = menuMaster.isDashboardDrawerOpened;
  const isHorizontal =
    menuOrientation === MenuOrientation.HORIZONTAL && !downMD;
  const isSelected = openItem === item.id;
  const itemTitle = RenderFormattedMessage({ id: item.title, values: params });
  const [hoverStatus, setHover] = useState(false);

  const beDisabled = item.canDisable && disabled;

  const compareSize = () => {
    const compare =
      ref.current && ref.current.scrollWidth > ref.current.clientWidth;
    setHover(compare);
  };

  useEffect(() => {
    compareSize();
    window.addEventListener('resize', compareSize);
    window.removeEventListener('resize', compareSize);
  }, []);

  const Icon = item?.icon;
  const itemIcon = item?.icon ? (
    <Icon
      stroke={1.5}
      size={drawerOpen ? '20px' : '24px'}
      style={{
        ...(isHorizontal && isParents && { fontSize: 20, stroke: '1.5' }),
      }}
    />
  ) : (
    <FiberManualRecordIcon
      sx={{ width: isSelected ? 8 : 6, height: isSelected ? 8 : 6 }}
      fontSize={level > 0 ? 'inherit' : 'medium'}
    />
  );

  let itemTarget = '_self';
  if (item.target) {
    itemTarget = '_blank';
  }

  const itemHandler = () => {
    if (downMD) handlerDrawerOpen(false);

    if (isParents && setSelectedID) {
      setSelectedID();
    }
  };

  // active menu item on page load
  useEffect(() => {
    if (pathname === item.url) handlerActiveItem(item.id);
    // eslint-disable-next-line
  }, [pathname]);

  const iconSelectedColor =
    mode === ThemeMode.DARK && drawerOpen ? 'text.primary' : 'secondary.main';
  const textColor = mode === ThemeMode.DARK ? 'grey.400' : 'text.primary';

  return (
    <>
      {!isHorizontal ? (
        <ListItemButton
          component={Link}
          href={item.url}
          target={itemTarget}
          disabled={beDisabled}
          disableRipple={!drawerOpen}
          sx={{
            ...listItemButtonStyle({
              theme,
              drawerOpen,
              level,
              borderRadius,
              selectedColor: iconSelectedColor,
            }),
          }}
          selected={isSelected}
          onClick={() => itemHandler()}
        >
          <ButtonBase
            aria-label="theme-icon"
            sx={{ borderRadius: `${borderRadius}px` }}
            disableRipple={drawerOpen}
          >
            <ListItemIcon
              sx={{
                minWidth: level === 1 ? 36 : 18,
                color: isSelected ? iconSelectedColor : 'text.primary',
                ...(!drawerOpen &&
                  level === 1 && {
                    borderRadius: `${borderRadius}px`,
                    width: 46,
                    height: 46,
                    alignItems: 'center',
                    justifyContent: 'center',
                    '&:hover': {
                      bgcolor:
                        mode === ThemeMode.DARK
                          ? alpha(theme.palette.secondary.main, 0.25)
                          : 'secondary.light',
                    },
                    ...(isSelected && {
                      bgcolor:
                        mode === ThemeMode.DARK
                          ? alpha(theme.palette.secondary.main, 0.25)
                          : 'secondary.light',
                      '&:hover': {
                        bgcolor:
                          mode === ThemeMode.DARK
                            ? alpha(theme.palette.secondary.main, 0.3)
                            : 'secondary.light',
                      },
                    }),
                  }),
              }}
            >
              {itemIcon}
            </ListItemIcon>
          </ButtonBase>

          {(drawerOpen || (!drawerOpen && level !== 1)) && (
            <Tooltip title={itemTitle} disableHoverListener={!hoverStatus}>
              <ListItemText
                primary={
                  <Typography
                    ref={ref}
                    noWrap
                    overflow="hidden"
                    textOverflow="ellipsis"
                    variant={isSelected ? 'h5' : 'body1'}
                    color="inherit"
                    width={122}
                  >
                    {itemTitle}
                  </Typography>
                }
                secondary={
                  item.caption && (
                    <Typography
                      variant="caption"
                      sx={{ ...theme.typography.subMenuCaption }}
                      display="block"
                      gutterBottom
                    >
                      {item.caption}
                    </Typography>
                  )
                }
              />
            </Tooltip>
          )}

          {drawerOpen && item.chip && (
            <Chip
              color={item.chip.color}
              variant={item.chip.variant}
              size={item.chip.size}
              label={item.chip.label}
              avatar={item.chip.avatar && <Avatar>{item.chip.avatar}</Avatar>}
            />
          )}
        </ListItemButton>
      ) : (
        <ListItemButton
          component={Link}
          href={item.url}
          target={itemTarget}
          disabled={item.disabled}
          sx={{
            borderRadius: isParents ? `${borderRadius}px` : 0,
            mb: isParents ? 0 : 0.5,
            alignItems: 'flex-start',
            bgcolor: level > 1 ? 'transparent !important' : 'inherit',
            py: 1,
            pl: 2,
            mr: isParents ? 1 : 0,
          }}
          selected={isSelected}
          onClick={() => itemHandler()}
        >
          <ListItemIcon
            sx={{
              my: 'auto',
              minWidth: !item?.icon ? 18 : 36,
            }}
          >
            {itemIcon}
          </ListItemIcon>

          <ListItemText
            primary={
              <Typography variant={isSelected ? 'h5' : 'body1'} color="inherit">
                {itemTitle}
              </Typography>
            }
            secondary={
              item.caption && (
                <Typography
                  variant="caption"
                  sx={{ ...theme.typography.subMenuCaption }}
                  display="block"
                  gutterBottom
                >
                  {item.caption}
                </Typography>
              )
            }
          />

          {item.chip && (
            <Chip
              color={item.chip.color}
              variant={item.chip.variant}
              size={item.chip.size}
              label={item.chip.label}
              avatar={item.chip.avatar && <Avatar>{item.chip.avatar}</Avatar>}
            />
          )}
        </ListItemButton>
      )}
    </>
  );
};

NavItem.propTypes = {
  item: PropTypes.object,
  level: PropTypes.number,
  parentId: PropTypes.string,
};

export default NavItem;
