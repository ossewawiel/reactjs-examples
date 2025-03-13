import { Avatar, Grid, TableCell, Tooltip, Typography } from '@mui/material';
import * as React from 'react';
import { useIntl } from 'react-intl';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';

const avatarSx = {
  width: 20,
  height: 20,
};

export const ApiLookupTableCell = ({ columnProperties, rowData }) => {
  const intl = useIntl();
  const l10n = (val, options) => intl.formatMessage({ id: val }, options);
  const { id, align, properties } = columnProperties;
  const {
    lookupHook,
    lookupTranslationId,
    translateValue = false,
    keyId,
    valueId,
    display = 'value',
    codeIconMap,
  } = properties;
  // console.log(`api lookup data: ${JSON.stringify(columnProperties)} + ${JSON.stringify(rowData[id])}`);
  const { data: response = [], isSuccess, isError, error } = lookupHook();
  // console.log(`response data: ${JSON.stringify(response)}`);

  const translatedValue = (option) => {
    if (lookupTranslationId) {
      const translation = l10n(lookupTranslationId, { option: option[keyId] });
      return translation;
    }
    return option[valueId];
  };

  const code = rowData[id];
  const Icon = codeIconMap && codeIconMap[code].icon;
  let value = rowData[id];
  if (isSuccess) {
    let tmp = [];
    try {
      tmp = response.filter((item) => item[keyId] && item[keyId] === code);
      value = tmp.length ? translatedValue(tmp[0]) : code;
      // console.log(`api value : ${JSON.stringify(response)}`);
    } catch (err) {
      // console.log('Error in ApiLookupTableCell: ', err);
      // console.log(`data: ${JSON.stringify(rowData[id])}`);
      // console.log(`tmp: ${value} => ${JSON.stringify(tmp)}`);
      // console.log(`response: ${JSON.stringify(response)}`);
    }
  }

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
