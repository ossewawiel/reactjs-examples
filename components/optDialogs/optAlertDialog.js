import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

export function OptAlertDialog({ header, message, isOpen = false }) {
  const theme = useTheme();
  const intl = useIntl();
  const [open, setOpen] = useState(isOpen);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      sx={{ p: 3 }}
    >
      {open && (
        <>
          <DialogTitle id="alert-dialog-title">
            <FormattedMessage id={header} />
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <Typography variant="body2" component="span">
                <FormattedMessage id={message} />
              </Typography>
            </DialogContentText>
          </DialogContent>
          <DialogActions sx={{ pr: 2.5 }}>
            <Button
              variant="contained"
              size="small"
              onClick={handleClose}
              autoFocus
            >
              <FormattedMessage id="Confirm" />
            </Button>
          </DialogActions>
        </>
      )}
    </Dialog>
  );
}
