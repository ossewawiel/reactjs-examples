'use client';

import React, { useMemo, useEffect } from 'react';
import { Outlet } from 'react-router-dom';

// material-ui
import { styled, useTheme } from '@mui/material/styles';
import {
  AppBar,
  Box,
  Container,
  CssBaseline,
  Toolbar,
  useMediaQuery,
} from '@mui/material';

// project imports

import Customization from '../Customization';
import Header from './Header';
import HorizontalBar from './HorizontalBar';
import Sidebar from './Sidebar';
import navigation from 'src/menu-items';
import LAYOUT_CONST from 'src/constants';
import { MenuOrientation } from 'src/config';
import { useConfig } from 'src/contexts/ConfigContext';
import { drawerWidth } from 'src/store/constant';
import Loader from 'src/components/ui/component/Loader';
import { openDrawer } from 'src/store/slices/menu';
import { dispatch, useDispatch, useSelector } from 'src/store';

// assets
import { IconChevronRight } from '@tabler/icons-react';
import { handlerDrawerOpen, useGetMenuMaster } from '../../api/menu';
import MainContentStyled from './MainContentStyled';
import Breadcrumbsx from "../../components/Breadcrumbsx";
import Breadcrumbs from "../../breadcrumbs";

// styles
const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open, layout }) => ({
    ...theme.typography.mainContent,
    ...(!open && {
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.shorter + 200,
      }),
      [theme.breakpoints.up('md')]: {
        marginLeft:
          layout === LAYOUT_CONST.VERTICAL_LAYOUT
            ? -(drawerWidth - 72)
            : '20px',
        width: `calc(100% - ${drawerWidth}px)`,
        marginTop: layout === 'horizontal' ? 135 : 88,
      },
      [theme.breakpoints.down('md')]: {
        marginLeft: '20px',
        width: `calc(100% - ${drawerWidth}px)`,
        padding: '16px',
        marginTop: 88,
      },
      [theme.breakpoints.down('sm')]: {
        marginLeft: '10px',
        width: `calc(100% - ${drawerWidth}px)`,
        padding: '16px',
        marginRight: '10px',
        marginTop: 88,
      },
    }),
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.shorter + 200,
      }),
      marginLeft: layout === 'horizontal' ? '20px' : 0,
      marginTop: layout === 'horizontal' ? 135 : 88,
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
      width: `calc(100% - ${drawerWidth}px)`,
      [theme.breakpoints.up('md')]: {
        marginTop: layout === 'horizontal' ? 135 : 88,
      },
      [theme.breakpoints.down('md')]: {
        marginLeft: '20px',
        marginTop: 88,
      },
      [theme.breakpoints.down('sm')]: {
        marginLeft: '10px',
        marginTop: 88,
      },
    }),
  }),
);

// ==============================|| MAIN LAYOUT ||============================== //

const MainLayout = ({ children }) => {
  const theme = useTheme();

  const matchDownMd = useMediaQuery(theme.breakpoints.down('md'));
  const { menuMaster, menuMasterLoading } = useGetMenuMaster();
  const downMD = useMediaQuery(theme.breakpoints.down('md'));
  const drawerOpen = menuMaster?.isDashboardDrawerOpened;
  const { borderRadius, container, miniDrawer, menuOrientation } = useConfig();

  useEffect(() => {
    handlerDrawerOpen(!miniDrawer);
  }, [miniDrawer]);

  useEffect(() => {
    // eslint-disable-next-line
    downMD && handlerDrawerOpen(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [downMD]);

  const isHorizontal =
    menuOrientation === MenuOrientation.HORIZONTAL && !downMD;

  // horizontal menu-list bar : drawer
  const menu = useMemo(
    () => (isHorizontal ? <HorizontalBar /> : <Sidebar />),
    [isHorizontal],
  );

  if (menuMasterLoading) return <Loader />;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      {/* header */}
      <AppBar
        enableColorOnDark
        position="fixed"
        color="inherit"
        elevation={0}
        sx={{ bgcolor: 'background.default' }}
      >
        <Toolbar sx={{ p: isHorizontal ? 1.25 : 2 }}>
          <Header />
        </Toolbar>
      </AppBar>

      {/* menu / drawer */}
      {menu}

      {/* main content */}
      <MainContentStyled
        {...{ borderRadius, menuOrientation, open: drawerOpen, theme }}
      >
        <Container
          maxWidth={container ? 'lg' : false}
          {...(!container && { sx: { px: { xs: 0 } } })}
        >
          {/* breadcrumb */}
          <Breadcrumbs />
          {children}
        </Container>
      </MainContentStyled>
    </Box>
  );
};

export default MainLayout;
