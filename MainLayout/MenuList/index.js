import { memo, useEffect, useLayoutEffect, useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Typography, useMediaQuery } from '@mui/material';

// project imports
import menuItem from 'src/menu-items';
import NavGroup from './NavGroup';
import { useConfig } from 'src/contexts/ConfigContext';

import LAYOUT_CONST from 'src/constants';
import { HORIZONTAL_MAX_ITEM, MenuOrientation } from 'src/config';
import NavItem from './NavItem';
import { arrayMatchAll } from 'src/utils/utility-functions';
import { useAuth } from 'src/contexts/jwt-context';
import { useGetMenu, useGetMenuMaster } from '../../../api/menu';

// ==============================|| SIDEBAR MENU LIST ||============================== //

const MenuList = () => {
  const theme = useTheme();
  const auth = useAuth();
  const downMD = useMediaQuery(theme.breakpoints.down('md'));

  const { menuOrientation } = useConfig();
  const { menuLoading } = useGetMenu();
  const { menuMaster } = useGetMenuMaster();
  const drawerOpen = menuMaster.isDashboardDrawerOpened;

  const isHorizontal =
    menuOrientation === MenuOrientation.HORIZONTAL && !downMD;
  const [selectedID, setSelectedID] = useState('');
  const [menuItems, setMenuItems] = useState({ items: [] });

  useLayoutEffect(() => {
    const isFound = menuItem.items.some((element) => {
      if (element.id === 'group-widget') {
        return true;
      }
      return false;
    });
    setMenuItems({ items: [...menuItem.items] });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // last menu-item to show in horizontal menu bar
  const lastItem = isHorizontal ? HORIZONTAL_MAX_ITEM : null;

  let lastItemIndex = menuItems.items.length - 1;
  let remItems = [];
  let lastItemId;

  if (lastItem && lastItem < menuItem.items.length) {
    lastItemId = menuItem.items[lastItem - 1].id;
    lastItemIndex = lastItem - 1;
    remItems = menuItem.items
      .slice(lastItem - 1, menuItem.items.length)
      .map((item) => ({
        title: item.title,
        elements: item.children,
        icon: item.icon,
        ...(item.url && {
          url: item.url,
        }),
      }));
  }

  const navItems = menuItem.items.slice(0, lastItemIndex + 1).map((item) => {
    // do permissions check
    if (
      !arrayMatchAll({
        searchArray: auth.details.authorisations || [],
        matchArray: item.permissions || [],
      })
    )
      return null;

    switch (item.type) {
      case 'group':
        return (
          <NavGroup
            key={item.id}
            item={item}
            lastItem={lastItem}
            remItems={remItems}
            lastItemId={lastItemId}
            selectedID={selectedID}
            setSelectedID={setSelectedID}
          />
        );
      case 'item':
        return (
          <NavItem
            key={item.id}
            item={item}
            level={1}
            parentId="root"
            lastItemId={lastItemId}
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

  return <>{navItems}</>;
};

export default memo(MenuList);
