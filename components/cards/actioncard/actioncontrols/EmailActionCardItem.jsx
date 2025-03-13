import {
  ListItemButton,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  Typography,
} from '@mui/material';
import Link from 'next/link';
import MailTwoToneIcon from '@mui/icons-material/MailTwoTone';
import { FormattedMessage } from 'react-intl';
import * as React from 'react';

export const EmailActionCardItem = ({ config, value }) => (
  <ListItemButton component={Link} href={`mailto:${value}`}>
    <ListItemIcon>
      <MailTwoToneIcon sx={{ fontSize: '1.3rem' }} />
    </ListItemIcon>
    <ListItemText
      primary={
        <Typography variant="subtitle1">
          <FormattedMessage id="Email" />
        </Typography>
      }
    />
    <ListItemSecondaryAction>
      <Typography variant="subtitle2" align="right">
        {value}
      </Typography>
    </ListItemSecondaryAction>
  </ListItemButton>
);
