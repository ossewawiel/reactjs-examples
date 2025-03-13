// material-ui
import { useTheme, styled } from '@mui/material/styles';
import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';

// assets
import { Notifications } from '@mui/icons-material';
import { useState } from 'react';
import { useConfig } from 'src/contexts/ConfigContext';
import { useNavigate } from 'react-router-dom';

const NotificationList = ({ alerts, onClick }) => {
  const theme = useTheme();
  const { borderRadius, locale, navType, onChangeMenuType, onChangeLocale } =
    useConfig();
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const alertColor = (type) => {
    if (type === 'GREEN') {
      return theme.palette.success.dark;
    }
    if (type === 'YELLOW') {
      return theme.palette.warning.dark;
    }

    return theme.palette.error.dark;
  };

  return (
    <Box sx={{ p: 2, pt: 0 }}>
      <List
        sx={{
          width: '100%',
          maxWidth: 370,
          py: 0,
          borderRadius: '10px',
          [theme.breakpoints.down('md')]: {
            maxWidth: 300,
          },
          '& .MuiListItemSecondaryAction-root': {
            top: 22,
          },
          '& .MuiDivider-root': {
            my: 0,
          },
          '& .list-container': {
            pl: 7,
          },
        }}
      >
        {alerts.map((alert, index) => (
          <ListItemButton
            key={alert.name}
            sx={{ borderRadius: `${borderRadius}px` }}
            selected={selectedIndex === index}
            onClick={() => onClick(alert.name)}
          >
            <ListItemIcon sx={{ color: alertColor(alert.level) }}>
              <Notifications stroke={1.5} size="20px" />
            </ListItemIcon>
            <ListItemText
              secondary={
                <Typography variant="subtitle2">{alert.message}</Typography>
              }
            />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
};

export default NotificationList;
