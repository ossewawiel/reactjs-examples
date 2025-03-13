import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
  Box,
  Chip,
  ClickAwayListener,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Popper,
  Stack,
  Switch,
  Tooltip,
  Typography,
  useMediaQuery,
} from '@mui/material';

// third-party
import { FormattedMessage, useIntl } from 'react-intl';
import PerfectScrollbar from 'react-perfect-scrollbar';

// project imports
import MainCard from 'src/components/ui/component/cards/MainCard';
import Transitions from 'src/components/ui/component/Transitions';
import { useAuth } from 'src/contexts/jwt-context';

// assets
import { IconLanguage, IconLogout, IconSettings } from '@tabler/icons-react';
import { useConfig } from 'src/contexts/ConfigContext';
import { ArrowRight, Language } from '@mui/icons-material';
import AccountCircleTwoToneIcon from '@mui/icons-material/AccountCircleTwoTone';

// ==============================|| PROFILE MENU ||============================== //

const ProfileSection = () => {
  const theme = useTheme();
  const { borderRadius, locale, navType, onChangeMenuType, onChangeLocale } =
    useConfig();
  const router = useRouter();
  const { doLogout, user, details } = useAuth();
  const intl = useIntl();
  // console.log(`Locale: ${locale}`);
  const languageNames = new Intl.DisplayNames([locale], { type: 'language' });
  const l10n = (val) => intl.formatMessage({ id: val });
  const matchesXs = useMediaQuery(theme.breakpoints.down('md'));

  const [sdm, setSdm] = useState(true);
  const [value, setValue] = useState('');
  const [notification, setNotification] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const [open, setOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);
  const [themeMoodDark, setThemeMoodDark] = useState(navType === 'dark');
  const [language, setLanguage] = useState(locale);
  /**
   * anchorRef is used on different components and specifying one type leads to other components throwing an error
   * */
  const anchorRef = useRef(null);

  const handleLogout = async () => {
    try {
      await doLogout();
    } catch (err) {
      console.error(err);
    }
  };

  const generateGreetings = () => {
    const now = new Date();
    const hour = now.getHours();

    let shift = '';
    if (hour >= 4 && hour <= 11) {
      shift += l10n('Good morning');
    } else if (hour >= 12 && hour <= 16) {
      shift += l10n('Good afternoon');
    } else if (hour >= 17 && hour <= 20) {
      shift += l10n('Good evening');
    } else if (hour >= 21 || hour <= 3) {
      shift += l10n('Good night');
    }

    return l10n(shift);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const handleLanguageClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setLanguageOpen(false);
  };

  const handleListItemClick = (event, index, route = '') => {
    setSelectedIndex(index);
    handleClose(event);

    if (route && route !== '') {
      router.push(route);
    }
  };

  const handleLanguageListItemClick = (event, lng) => {
    console.log(`attempt local change to ${lng}`);
    onChangeLocale(lng);
    setLanguage(lng);
    setLanguageOpen(false);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleLanguageToggle = () => {
    setLanguageOpen((prevLanguageOpen) => !prevLanguageOpen);
  };

  const handleTheme = (event) => {
    const isDark = event.target.checked;
    setThemeMoodDark(isDark);
    onChangeMenuType(isDark ? 'dark' : 'light');
  };

  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  const company = `${details.compName} (${details.dbName})`;

  return (
    <>
      <Chip
        sx={{
          height: '48px',
          alignItems: 'center',
          borderRadius: '27px',
          transition: 'all .2s ease-in-out',
          borderColor:
            theme.palette.mode === 'dark'
              ? theme.palette.dark.main
              : theme.palette.primary.light,
          backgroundColor:
            theme.palette.mode === 'dark'
              ? theme.palette.dark.main
              : theme.palette.primary.light,
          '&[aria-controls="menu-list-grow"], &:hover': {
            borderColor: theme.palette.primary.main,
            background: `${theme.palette.primary.main}!important`,
            color: theme.palette.primary.light,
            '& svg': {
              stroke: theme.palette.primary.light,
            },
          },
          '& .MuiChip-label': {
            lineHeight: 0,
          },
        }}
        icon={
          <AccountCircleTwoToneIcon
            fontSize="large"
            color={theme.palette.primary.main}
          />
        }
        label={
          <IconSettings
            stroke={1.5}
            size="24px"
            color={theme.palette.primary.main}
          />
        }
        variant="outlined"
        ref={anchorRef}
        aria-controls={open ? 'menu-list-grow' : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
        color="primary"
      />

      <Popper
        placement="bottom"
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        modifiers={[
          {
            name: 'offset',
            options: {
              offset: [0, 14],
            },
          },
        ]}
      >
        {({ TransitionProps }) => (
          <ClickAwayListener onClickAway={handleClose}>
            <Transitions in={open} {...TransitionProps}>
              <Paper>
                {open && (
                  <MainCard
                    border={false}
                    elevation={16}
                    content={false}
                    boxShadow
                    shadow={theme.shadows[16]}
                  >
                    <Box sx={{ p: 2, pb: 0 }}>
                      <Stack>
                        <Stack
                          direction="row"
                          spacing={0.5}
                          alignItems="center"
                        >
                          <Typography variant="h4">
                            {generateGreetings()}
                          </Typography>
                          <Typography
                            component="span"
                            variant="h4"
                            sx={{ fontWeight: 400 }}
                          >
                            {details?.name}
                          </Typography>
                        </Stack>
                        <Typography variant="subtitle2">{company}</Typography>
                      </Stack>
                    </Box>
                    <PerfectScrollbar
                      style={{
                        height: '100%',
                        maxHeight: 'calc(100vh - 250px)',
                        overflowX: 'hidden',
                      }}
                    >
                      <Box sx={{ p: 2, pt: 0 }}>
                        <List
                          component="nav"
                          sx={{
                            width: '100%',
                            maxWidth: 350,
                            minWidth: 300,
                            backgroundColor: theme.palette.background.paper,
                            borderRadius: '10px',
                            [theme.breakpoints.down('md')]: {
                              minWidth: '100%',
                            },
                            '& .MuiListItemButton-root': {
                              mt: 0.5,
                            },
                          }}
                        >
                          <ListItem>
                            <ListItemIcon>
                              <IconSettings stroke={1.5} size="20px" />
                            </ListItemIcon>
                            <ListItemText
                              id="switch-list-label-theme"
                              primary={
                                <Typography variant="body2">
                                  <FormattedMessage id="Theme mood" />
                                </Typography>
                              }
                            />
                            <Switch
                              edge="end"
                              onChange={handleTheme}
                              checked={themeMoodDark}
                              inputProps={{ 'aria-label': 'controlled' }}
                            />
                          </ListItem>
                          <ListItem>
                            <ListItemIcon>
                              <IconLanguage stroke={1.5} size="20px" />
                            </ListItemIcon>
                            <ListItemText
                              id="button-list-label-theme"
                              primary={
                                <Typography variant="body2">
                                  <FormattedMessage id="Language" />
                                </Typography>
                              }
                            />
                            <ListItemText
                              id="button-list-label-theme"
                              primary={
                                <Typography
                                  color={theme.palette.primary.main}
                                  variant="body2"
                                >
                                  {languageNames.of(locale)}
                                </Typography>
                              }
                            />
                            <Tooltip title={l10n('Select preferred language')}>
                              <IconButton
                                size="medium"
                                onClick={handleLanguageToggle}
                                sx={{
                                  '& svg': {
                                    transition: '0.2s',
                                    transform: 'translateX(0) rotate(0)',
                                  },
                                  '&:hover, &:focus': {
                                    bgcolor: 'unset',
                                    '& svg:first-of-type': {
                                      transform:
                                        'translateX(-6px) rotate(-20deg)',
                                    },
                                    '& svg:last-of-type': {
                                      right: 0,
                                      opacity: 1,
                                    },
                                  },
                                  '&:after': {
                                    content: '""',
                                    position: 'absolute',
                                    height: '80%',
                                    display: 'block',
                                    left: 0,
                                    width: '1px',
                                    bgcolor: 'divider',
                                  },
                                }}
                              >
                                <Language />
                                <ArrowRight
                                  sx={{
                                    position: 'absolute',
                                    right: 0,
                                    opacity: 0,
                                  }}
                                />
                              </IconButton>
                            </Tooltip>
                          </ListItem>
                          <ListItemButton
                            sx={{ borderRadius: `${borderRadius}px` }}
                            selected={selectedIndex === 4}
                            onClick={handleLogout}
                          >
                            <ListItemIcon>
                              <IconLogout stroke={1.5} size="20px" />
                            </ListItemIcon>
                            <ListItemText
                              primary={
                                <Typography variant="body2">
                                  <FormattedMessage id="Logout" />
                                </Typography>
                              }
                            />
                          </ListItemButton>
                        </List>
                      </Box>
                    </PerfectScrollbar>
                  </MainCard>
                )}
              </Paper>
            </Transitions>
          </ClickAwayListener>
        )}
      </Popper>

      <Popper
        placement={matchesXs ? 'bottom-start' : 'bottom'}
        open={languageOpen}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        modifiers={[
          {
            name: 'offset',
            options: {
              offset: [matchesXs ? 0 : 0, 20],
            },
          },
        ]}
      >
        {({ TransitionProps }) => (
          <ClickAwayListener onClickAway={handleLanguageClose}>
            <Transitions
              position={matchesXs ? 'top-left' : 'top'}
              in={open}
              {...TransitionProps}
            >
              <Paper elevation={16}>
                {open && (
                  <List
                    component="nav"
                    sx={{
                      width: '100%',
                      minWidth: 200,
                      maxWidth: 280,
                      bgcolor: theme.palette.background.paper,
                      borderRadius: `${borderRadius}px`,
                      [theme.breakpoints.down('md')]: {
                        maxWidth: 250,
                      },
                    }}
                  >
                    <ListItemButton
                      selected={language === 'de'}
                      onClick={(event) =>
                        handleLanguageListItemClick(event, 'de')
                      }
                    >
                      <ListItemText
                        primary={
                          <Grid container>
                            <Typography color="textPrimary">Deutsch</Typography>
                            <Typography
                              variant="caption"
                              color="textSecondary"
                              sx={{ ml: '8px' }}
                            >
                              (German)
                            </Typography>
                          </Grid>
                        }
                      />
                    </ListItemButton>
                    <ListItemButton
                      selected={language === 'es'}
                      onClick={(event) =>
                        handleLanguageListItemClick(event, 'es')
                      }
                    >
                      <ListItemText
                        primary={
                          <Grid container>
                            <Typography color="textPrimary">español</Typography>
                            <Typography
                              variant="caption"
                              color="textSecondary"
                              sx={{ ml: '8px' }}
                            >
                              (Spanish)
                            </Typography>
                          </Grid>
                        }
                      />
                    </ListItemButton>
                    <ListItemButton
                      selected={language === 'en'}
                      onClick={(event) =>
                        handleLanguageListItemClick(event, 'en')
                      }
                    >
                      <ListItemText
                        primary={
                          <Grid container>
                            <Typography color="textPrimary">English</Typography>
                            <Typography
                              variant="caption"
                              color="textSecondary"
                              sx={{ ml: '8px' }}
                            >
                              (UK)
                            </Typography>
                          </Grid>
                        }
                      />
                    </ListItemButton>
                    <ListItemButton
                      selected={language === 'fr'}
                      onClick={(event) =>
                        handleLanguageListItemClick(event, 'fr')
                      }
                    >
                      <ListItemText
                        primary={
                          <Grid container>
                            <Typography color="textPrimary">
                              français
                            </Typography>
                            <Typography
                              variant="caption"
                              color="textSecondary"
                              sx={{ ml: '8px' }}
                            >
                              (French)
                            </Typography>
                          </Grid>
                        }
                      />
                    </ListItemButton>
                    <ListItemButton
                      selected={language === 'nl'}
                      onClick={(event) =>
                        handleLanguageListItemClick(event, 'nl')
                      }
                    >
                      <ListItemText
                        primary={
                          <Grid container>
                            <Typography color="textPrimary">
                              Nederlands
                            </Typography>
                            <Typography
                              variant="caption"
                              color="textSecondary"
                              sx={{ ml: '8px' }}
                            >
                              (Dutch)
                            </Typography>
                          </Grid>
                        }
                      />
                    </ListItemButton>
                    <ListItemButton
                      selected={language === 'zh'}
                      onClick={(event) =>
                        handleLanguageListItemClick(event, 'zh')
                      }
                    >
                      <ListItemText
                        primary={
                          <Grid container>
                            <Typography color="textPrimary">中国人</Typography>
                            <Typography
                              variant="caption"
                              color="textSecondary"
                              sx={{ ml: '8px' }}
                            >
                              (Chinese)
                            </Typography>
                          </Grid>
                        }
                      />
                    </ListItemButton>
                  </List>
                )}
              </Paper>
            </Transitions>
          </ClickAwayListener>
        )}
      </Popper>
    </>
  );
};

export default ProfileSection;
