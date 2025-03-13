import { useTheme } from '@mui/material/styles';
import { Grid, TableCell } from '@mui/material';
import CalendarMonthTwoToneIcon from '@mui/icons-material/CalendarMonthTwoTone';
import {
  defineMessages,
  FormattedDate,
  FormattedTime,
  useIntl,
} from 'react-intl';
import AccessTimeTwoToneIcon from '@mui/icons-material/AccessTimeTwoTone';
import * as React from 'react';

export const OptProofStatusTableCell = ({ column, value, row }) => {
  const theme = useTheme();
  const intl = useIntl();

  const messages = defineMessages({
    cancelled: {
      id: 'Cancelled',
    },
    decidedToday: {
      id: 'Decided today',
    },
    decidedOn: {
      id: 'formatted.decided_on_x',
      defaultMessage: 'Decided on {date}',
    },
    dueToBeDecidedToday: {
      id: 'Due to be decided today',
    },
    dueToBeDecidedOn: {
      id: 'formatted.due_to_be_decided_on_x',
      defaultMessage: 'Due to be decided on {date}',
    },
    issuedToday: {
      id: 'Issued today',
    },
    issuedOn: {
      id: 'formatted.issued_on_x',
      defaultMessage: 'Issued on {date}',
    },
    dueToBeIssuedToday: {
      id: 'Due to be issued today',
    },
    dueToBeIssuedOn: {
      id: 'formatted.due_to_be_issued_on_x',
      defaultMessage: 'Due to be issued on {date}',
    },
  });

  let statusDateText = '...';
  let textColour = theme.palette.text.primary;
  const actualDecisionDate = Date.parse(row.actualDecisionAt);
  const targetDecisionDate = Date.parse(row.targetDecisionAt);
  const actualIssueDate = Date.parse(row.actualIssueAt);
  const targetIssueDate = Date.parse(row.targetIssueAt);

  if (value === 'CANCELLED') {
    statusDateText = intl.formatMessage(messages.cancelled);
  } else if (actualDecisionDate > 0) {
    if (actualDecisionDate === Date.now()) {
      statusDateText = intl.formatMessage(messages.decidedToday);
      textColour = theme.palette.blue.dark;
    } else {
      statusDateText = intl.formatMessage(messages.decidedOn, {
        date: row.actualDecisionAt,
      });
      textColour = theme.palette.error.dark;
    }
  } else if (targetDecisionDate > 0) {
    if (targetDecisionDate === Date.now()) {
      statusDateText = intl.formatMessage(messages.dueToBeDecidedToday);
      textColour = theme.palette.blue.dark;
    } else {
      statusDateText = intl.formatMessage(messages.dueToBeDecidedOn, {
        date: intl.formatDate(row.targetDecisionAt),
      });
      textColour = theme.palette.error.dark;
    }
  } else if (actualIssueDate > 0) {
    if (actualIssueDate === Date.now()) {
      statusDateText = intl.formatMessage(messages.issuedToday);
      textColour = theme.palette.blue.dark;
    } else {
      statusDateText = intl.formatMessage(messages.issuedOn, {
        date: intl.formatDate(row.actualIssueAt),
      });
      textColour = theme.palette.error.dark;
    }
  } else if (targetIssueDate > 0) {
    if (targetIssueDate === Date.now()) {
      statusDateText = intl.formatMessage(messages.dueToBeIssuedToday);
      textColour = theme.palette.blue.dark;
    } else {
      statusDateText = intl.formatMessage(messages.dueToBeIssuedOn, {
        date: intl.formatDate(row.targetIssueAt),
      });
      textColour = theme.palette.error.dark;
    }
  }

  return (
    <TableCell key={column.id} align={column.align} sx={{ color: textColour }}>
      {statusDateText}
    </TableCell>
  );
};
