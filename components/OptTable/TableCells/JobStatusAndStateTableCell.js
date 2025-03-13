import { Avatar, Grid, TableCell, Tooltip } from '@mui/material';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import WatchLaterOutlinedIcon from '@mui/icons-material/WatchLaterOutlined';
import CopyrightOutlinedIcon from '@mui/icons-material/CopyrightOutlined';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import FlagOutlinedIcon from '@mui/icons-material/FlagOutlined';
import {
  blue,
  cyan,
  green,
  grey,
  pink,
  purple,
  red,
  yellow,
} from '@mui/material/colors';
import { useIntl } from 'react-intl';

const jobStatus = ({
  statusCode,
  stateCode,
  isActive,
  isLocked,
  lastTransactionDate,
}) => {
  if (isLocked)
    return {
      colour: blue[500],
      code: 'LOCKED',
      description: 'Locked',
    };

  if (stateCode === 'RESERVED')
    return {
      colour: grey[500],
      code: 'RESERVED',
      description: 'Reserved',
    };

  if (stateCode === 'SUSPENDED')
    return {
      colour: pink[500],
      code: 'SUSPENDED',
      description: 'Suspended',
    };

  if (statusCode === 'COMPLETE') {
    if (isActive)
      return {
        colour: cyan[500],
        code: 'COMPLETE_ACTIVE',
        description: 'Completed but Currently Active',
      };

    return {
      colour: blue[500],
      code: 'COMPLETE',
      description: 'Completed',
    };
  }

  if (statusCode === 'CANCELLED') {
    if (isActive)
      return {
        colour: red[500],
        code: 'CANCELLED_ACTIVE',
        description: 'Cancelled but Currently Active',
      };

    return {
      colour: red[500],
      code: 'CANCELLED',
      description: 'Cancelled',
    };
  }

  if (isActive)
    return {
      colour: yellow[500],
      code: 'ACTIVE',
      description: 'Currently Active',
    };

  if (lastTransactionDate)
    return {
      colour: green[500],
      code: 'IN_PROGRESS',
      description: 'In Progress',
    };

  return {
    colour: pink[500],
    code: 'NOT_STARTED',
    description: 'Not Started',
  };
};

const jobState = ({
  isActive,
  waitingForProofs,
  waitingForMaterials,
  waitingForOutwork,
}) => ({
  active: {
    colour: isActive ? green[500] : grey[100],
    state: isActive,
    description: 'The job is currently in production',
  },
  proofs: {
    colour: waitingForProofs ? purple[500] : grey[100],
    state: waitingForProofs,
    description: 'The job is waiting on proofs',
  },
  materials: {
    colour: waitingForMaterials ? purple[500] : grey[100],
    state: waitingForMaterials,
    description: 'The job is waiting on materials',
  },
  outwork: {
    colour: waitingForOutwork ? purple[500] : grey[100],
    state: waitingForOutwork,
    description: 'The job is waiting on outwork',
  },
});

export const JobStatusAndStateTableCell = ({ columnProperties, rowData }) => {
  const intl = useIntl();
  const l10n = (val, options) => intl.formatMessage({ id: val }, options);
  const { id, align, properties } = columnProperties;
  const avatarSx = {
    width: 20,
    height: 20,
  };

  const status = jobStatus({
    statusCode: rowData.status,
    stateCode: rowData.state,
    isActive: rowData.activeNow,
    isLocked: rowData.locked,
    lastTransactionDate: rowData.lastTransaction,
  });

  const state = jobState({
    isActive: rowData.activeNow,
    waitingForProofs: rowData.waitingForProofs !== 'NONE',
    waitingForMaterials: rowData.waitingForMaterials !== 'NONE',
    waitingForOutwork: rowData.waitingForOutwork !== 'NONE',
  });

  return (
    <TableCell key={id} align={align}>
      <Grid container direction="row" spacing="3px" wrap="nowrap">
        <Grid item sx={{ pr: 1 }}>
          <Tooltip
            title={l10n('formatted.job_status', { option: status.code })}
          >
            <Avatar
              sx={{ ...avatarSx, bgcolor: status.colour }}
              variant="rounded"
            >
              <SettingsOutlinedIcon
                sx={{ color: '#fff', fontSize: '0.9rem' }}
              />
            </Avatar>
          </Tooltip>
        </Grid>
        <Grid item>
          <Tooltip
            title={l10n(state.active.description)}
            disableHoverListener={!state.active.state}
          >
            <Avatar
              sx={{ ...avatarSx, bgcolor: state.active.colour }}
              variant="rounded"
            >
              <WatchLaterOutlinedIcon
                sx={{ color: '#fff', fontSize: '0.9rem' }}
              />
            </Avatar>
          </Tooltip>
        </Grid>
        <Grid item>
          <Tooltip
            title={l10n(state.proofs.description)}
            disableHoverListener={!state.proofs.state}
          >
            <Avatar
              sx={{ ...avatarSx, bgcolor: state.proofs.colour }}
              variant="rounded"
            >
              <CopyrightOutlinedIcon
                sx={{ color: '#fff', fontSize: '0.9rem' }}
              />
            </Avatar>
          </Tooltip>
        </Grid>
        <Grid item>
          <Tooltip
            title={l10n(state.materials.description)}
            disableHoverListener={!state.materials.state}
          >
            <Avatar
              sx={{ ...avatarSx, bgcolor: state.materials.colour }}
              variant="rounded"
            >
              <Inventory2OutlinedIcon
                sx={{ color: '#fff', fontSize: '0.9rem' }}
              />
            </Avatar>
          </Tooltip>
        </Grid>
        <Grid item>
          <Tooltip
            title={l10n(state.outwork.description)}
            disableHoverListener={!state.outwork.state}
          >
            <Avatar
              sx={{ ...avatarSx, bgcolor: state.outwork.colour }}
              variant="rounded"
            >
              <FlagOutlinedIcon sx={{ color: '#fff', fontSize: '0.9rem' }} />
            </Avatar>
          </Tooltip>
        </Grid>
      </Grid>
    </TableCell>
  );
};
