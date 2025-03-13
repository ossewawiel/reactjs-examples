import { useIntl } from 'react-intl';
import { Avatar, Grid, TableCell, Tooltip, Typography } from '@mui/material';
import * as React from 'react';

const avatarSx = {
  width: 20,
  height: 20,
};

export const LookupTableCell = ({ columnProperties, rowData }) => {
  const intl = useIntl();
  const l10n = (val) => intl.formatMessage({ id: val });
  const { id, align, properties } = columnProperties;
  const { codeMap, display = 'value', codeIconMap } = properties;

  const code = rowData[id];
  const Icon = codeMap && codeMap[code].icon;
  const value = codeMap[code].value;

  if (display === 'value-as-tooltip' || display === 'code-as-tooltip') {
    const valueAsTooltip = display === 'value-as-tooltip';
    return (
      <Tooltip
        title={valueAsTooltip ? value : code}
        slotProps={{
          popper: {
            modifiers: [
              {
                name: 'offset',
                options: {
                  offset: [0, -40],
                },
              },
            ],
          },
        }}
      >
        <TableCell key={id} align={align}>
          <Grid container direction="row" spacing={1} wrap="nowrap">
            {codeIconMap && (
              <Grid item>
                <Avatar
                  sx={{ ...avatarSx, bgcolor: codeIconMap[code].color }}
                  variant="rounded"
                >
                  <Icon sx={{ color: '#fff', fontSize: '0.9rem' }} />
                </Avatar>
              </Grid>
            )}
            <Grid item>
              <Typography noWrap>{valueAsTooltip ? code : value}</Typography>
            </Grid>
          </Grid>
        </TableCell>
      </Tooltip>
    );
  }

  return (
    <TableCell key={id} align={align}>
      <Typography noWrap>{value}</Typography>
    </TableCell>
  );
};
