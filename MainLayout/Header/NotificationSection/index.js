import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
  Avatar,
  Box,
  Chip,
  ClickAwayListener,
  Grid,
  Paper,
  Popper,
  Stack,
  Typography,
  useMediaQuery,
} from '@mui/material';

// third-party
import PerfectScrollbar from 'react-perfect-scrollbar';

// project imports
import MainCard from 'src/components/ui/component/cards/MainCard';
import Transitions from 'src/components/ui/component/Transitions';
import NotificationList from './NotificationList';

// assets
import { IconBell } from '@tabler/icons-react';
import { useGetAlertDataQuery } from 'src/store/api/alertApi';
import { FormattedMessage } from 'react-intl';

// notification status options
const status = [
  {
    value: 'all',
    label: 'All Notifications',
  },
  {
    value: 'new',
    label: 'New',
  },
  {
    value: 'unread',
    label: 'Unread',
  },
  {
    value: 'other',
    label: 'Other',
  },
];

// ==============================|| NOTIFICATION ||============================== //

const NotificationSection = () => {
  const theme = useTheme();
  const router = useRouter();
  const matchesXs = useMediaQuery(theme.breakpoints.down('md'));

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');

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

  /**
   * anchorRef is used on different componets and specifying one type leads to other components throwing an error
   * */
  const anchorRef = useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const handleClick = (alertCode) => {
    router.push(`/information-centre/dynamic-alert-list/${alertCode}`);
    setOpen(false);
  };

  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }
    prevOpen.current = open;
  }, [open]);

  const handleChange = (event) => setValue(event?.target.value);

  return (
    <>
      <Box
        sx={{
          ml: 2,
          mr: 3,
          [theme.breakpoints.down('md')]: {
            mr: 2,
          },
        }}
      >
        <Avatar
          variant="rounded"
          sx={{
            ...theme.typography.commonAvatar,
            ...theme.typography.mediumAvatar,
            transition: 'all .2s ease-in-out',
            background:
              theme.palette.mode === 'dark'
                ? theme.palette.dark.main
                : theme.palette.secondary.light,
            color:
              theme.palette.mode === 'dark'
                ? theme.palette.warning.dark
                : theme.palette.secondary.dark,
            '&[aria-controls="menu-list-grow"],&:hover': {
              background:
                theme.palette.mode === 'dark'
                  ? theme.palette.warning.dark
                  : theme.palette.secondary.dark,
              color:
                theme.palette.mode === 'dark'
                  ? theme.palette.grey[800]
                  : theme.palette.secondary.light,
            },
          }}
          ref={anchorRef}
          aria-controls={open ? 'menu-list-grow' : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
          color="inherit"
        >
          <IconBell stroke={1.5} size="20px" />
        </Avatar>
      </Box>

      <Popper
        placement={matchesXs ? 'bottom' : 'bottom-end'}
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        modifiers={[
          {
            name: 'offset',
            options: {
              offset: [matchesXs ? 5 : 0, 20],
            },
          },
        ]}
      >
        {({ TransitionProps }) => (
          <ClickAwayListener onClickAway={handleClose}>
            <Transitions
              position={matchesXs ? 'top' : 'top-right'}
              in={open}
              {...TransitionProps}
            >
              <Paper>
                {open && (
                  <MainCard
                    border={false}
                    elevation={16}
                    content={false}
                    boxShadow
                    shadow={theme.shadows[16]}
                  >
                    <Grid container direction="column" spacing={2}>
                      <Grid item xs={12}>
                        <Grid
                          container
                          alignItems="center"
                          justifyContent="space-between"
                          sx={{ pt: 2, px: 2 }}
                        >
                          <Grid item>
                            <Stack direction="row" spacing={2}>
                              <Typography variant="subtitle1">
                                <FormattedMessage id="All Notifications" />
                              </Typography>
                              <Chip
                                size="small"
                                label={alerts.length}
                                sx={{
                                  color: theme.palette.background.default,
                                  bgcolor: theme.palette.warning.dark,
                                }}
                              />
                            </Stack>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={12}>
                        <PerfectScrollbar
                          style={{
                            height: '100%',
                            maxHeight: 'calc(100vh - 205px)',
                            overflowX: 'hidden',
                          }}
                        >
                          <NotificationList
                            alerts={alerts}
                            onClick={handleClick}
                          />
                        </PerfectScrollbar>
                      </Grid>
                    </Grid>
                  </MainCard>
                )}
              </Paper>
            </Transitions>
          </ClickAwayListener>
        )}
      </Popper>
    </>
  );
};

export default NotificationSection;
