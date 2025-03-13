import { styled, useTheme } from '@mui/material/styles';
import TotalIncomeCard from 'src/components/ui/component/cards/skeletons/TotalIncomeCard';
import {
  Avatar,
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from '@mui/material';
import TableChartOutlinedIcon from '@mui/icons-material/TableChartOutlined';
import { FormattedMessage, FormattedNumber } from 'react-intl';
import React from 'react';
import MainCard from 'src/components/ui/component/cards/MainCard';
import { CircleNotifications, Notifications } from '@mui/icons-material';

const AlertCardWrapper = styled(MainCard)(({ theme }) => ({
  backgroundColor: theme.palette.error.dark,
  color: theme.palette.error.light,
  overflow: 'hidden',
  position: 'relative',
  '&:after': {
    content: '""',
    position: 'absolute',
    width: 210,
    height: 210,
    background: `linear-gradient(210.04deg, ${theme.palette.error.dark} -50.94%, rgba(144, 202, 249, 0) 83.49%)`,
    borderRadius: '50%',
    top: -30,
    right: -180,
  },
  '&:before': {
    content: '""',
    position: 'absolute',
    width: 210,
    height: 210,
    background: `linear-gradient(140.9deg, ${theme.palette.error.dark} -14.02%, rgba(144, 202, 249, 0) 70.50%)`,
    borderRadius: '50%',
    top: -160,
    right: -130,
  },
}));

const WarningCardWrapper = styled(MainCard)(({ theme }) => ({
  backgroundColor: theme.palette.warning.dark,
  color: theme.palette.warning.light,
  overflow: 'hidden',
  position: 'relative',
  '&:after': {
    content: '""',
    position: 'absolute',
    width: 210,
    height: 210,
    background: `linear-gradient(210.04deg, ${theme.palette.warning.dark} -50.94%, rgba(144, 202, 249, 0) 83.49%)`,
    borderRadius: '50%',
    top: -30,
    right: -180,
  },
  '&:before': {
    content: '""',
    position: 'absolute',
    width: 210,
    height: 210,
    background: `linear-gradient(140.9deg, ${theme.palette.warning.dark} -14.02%, rgba(144, 202, 249, 0) 70.50%)`,
    borderRadius: '50%',
    top: -160,
    right: -130,
  },
}));

const SuccessCardWrapper = styled(MainCard)(({ theme }) => ({
  backgroundColor: theme.palette.success.dark,
  color: theme.palette.success.light,
  overflow: 'hidden',
  position: 'relative',
  '&:after': {
    content: '""',
    position: 'absolute',
    width: 210,
    height: 210,
    background: `linear-gradient(210.04deg, ${theme.palette.success.dark} -50.94%, rgba(144, 202, 249, 0) 83.49%)`,
    borderRadius: '50%',
    top: -30,
    right: -180,
  },
  '&:before': {
    content: '""',
    position: 'absolute',
    width: 210,
    height: 210,
    background: `linear-gradient(140.9deg, ${theme.palette.success.dark} -14.02%, rgba(144, 202, 249, 0) 70.50%)`,
    borderRadius: '50%',
    top: -160,
    right: -130,
  },
}));

const CardWrapper = ({ variant, children }) => {
  if (variant === 'YELLOW') {
    return (
      <WarningCardWrapper border={false} content={false}>
        {children}
      </WarningCardWrapper>
    );
  }
  if (variant === 'GREEN') {
    return (
      <SuccessCardWrapper border={false} content={false}>
        {children}
      </SuccessCardWrapper>
    );
  }
  return (
    <AlertCardWrapper border={false} content={false}>
      {children}
    </AlertCardWrapper>
  );
};

const AlertCard = ({ isLoading, header, detail, variant }) => {
  const theme = useTheme();
  const bgColour = () => {
    if (variant === 'GREEN') return theme.palette.success.darker;
    if (variant === 'YELLOW') return theme.palette.warning.darker;

    return theme.palette.error.darker;
  };
  return (
    <>
      {isLoading ? (
        <TotalIncomeCard />
      ) : (
        <Box sx={{ pl: 1, pr: 1 }}>
          <CardWrapper variant={variant} border={false} content={false}>
            <Box sx={{ p: 2 }}>
              <List sx={{ py: 0 }}>
                <ListItem alignItems="center" disableGutters sx={{ py: 0 }}>
                  <ListItemAvatar>
                    <Avatar
                      variant="rounded"
                      sx={{
                        ...theme.typography.commonAvatar,
                        ...theme.typography.largeAvatar,
                        backgroundColor: bgColour(),
                        color: '#fff',
                      }}
                    >
                      <Notifications fontSize="inherit" />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    sx={{
                      py: 0,
                      mt: 0.45,
                      mb: 0.45,
                    }}
                    primary={
                      <Typography
                        variant="subtitle2"
                        sx={{ color: '#fff', mt: 0.25 }}
                      >
                        {detail}
                      </Typography>
                    }
                  />
                </ListItem>
              </List>
            </Box>
          </CardWrapper>
        </Box>
      )}
    </>
  );
};

export default AlertCard;
