// material-ui
import { useTheme } from '@mui/material/styles';
import { Avatar, Box, Typography, useMediaQuery } from '@mui/material';

// project imports
import LAYOUT_CONST from 'src/constants';
import { useConfig } from 'src/contexts/ConfigContext';
import LogoSection from '../LogoSection';
import SearchSection from './SearchSection';
import MobileSection from './MobileSection';
import ProfileSection from './ProfileSection';
import LocalizationSection from './LocalizationSection';
import MegaMenuSection from './MegaMenuSection';
import NotificationSection from './NotificationSection';

import { useDispatch, useSelector } from 'src/store';
import { openDrawer } from 'src/store/slices/menu';

// assets
import { IconMenu2 } from '@tabler/icons-react';
import CustomerSection from './CustomerSection';
import AddressSection from './AddressSection';
import { FormattedMessage } from 'react-intl';
import HeaderBanner from './HeaderBanner';
import { handlerDrawerOpen, useGetMenuMaster } from 'src/api/menu';
import { MenuOrientation } from 'src/config';

// ==============================|| MAIN NAVBAR / HEADER ||============================== //

const Header = () => {
  const theme = useTheme();
  const downMD = useMediaQuery(theme.breakpoints.down('md'));

  const { menuOrientation } = useConfig();
  const { menuMaster } = useGetMenuMaster();
  const drawerOpen = menuMaster.isDashboardDrawerOpened;

  const isHorizontal =
    menuOrientation === MenuOrientation.HORIZONTAL && !downMD;

  return (
    <>
      {/* logo & toggler button */}
      <Box sx={{ width: downMD ? 'auto' : 75, display: 'flex' }}>
        {!isHorizontal && (
          <Avatar
            variant="rounded"
            sx={{
              ...theme.typography.commonAvatar,
              ...theme.typography.mediumAvatar,
              overflow: 'hidden',
              transition: 'all .2s ease-in-out',
              background:
                theme.palette.mode === 'dark'
                  ? theme.palette.dark.main
                  : theme.palette.secondary.light,
              color:
                theme.palette.mode === 'dark'
                  ? theme.palette.secondary.main
                  : theme.palette.secondary.dark,
              '&:hover': {
                background:
                  theme.palette.mode === 'dark'
                    ? theme.palette.secondary.main
                    : theme.palette.secondary.dark,
                color:
                  theme.palette.mode === 'dark'
                    ? theme.palette.secondary.light
                    : theme.palette.secondary.light,
              },
            }}
            onClick={() => handlerDrawerOpen(!drawerOpen)}
            color="inherit"
          >
            <IconMenu2 stroke={1.5} size="20px" />
          </Avatar>
        )}
      </Box>

      {/* header */}

      <Box
        component="span"
        sx={{ pl: 2, display: { xs: 'none', md: 'block' }, flexGrow: 1 }}
      >
        <HeaderBanner />
      </Box>
      <Box sx={{ flexGrow: 1 }} />

      {/* notification & profile */}
      <NotificationSection />
      <ProfileSection />

      {/* mobile header */}
      <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
        <MobileSection />
      </Box>
    </>
  );
};

export default Header;
