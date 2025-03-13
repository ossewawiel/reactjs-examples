import { useTheme } from '@mui/material/styles';
import { Grid, TableCell, Typography } from '@mui/material';
import CalendarMonthTwoToneIcon from '@mui/icons-material/CalendarMonthTwoTone';
import { FormattedDate, FormattedTime } from 'react-intl';
import AccessTimeTwoToneIcon from '@mui/icons-material/AccessTimeTwoTone';
import PropTypes from 'prop-types';
import * as React from 'react';

export const DateTimeTableCell = ({ columnProperties, rowData }) => {
  const theme = useTheme();
  const { id, align, variant, properties } = columnProperties;
  const { isWarningFunc } = properties;
  const value = rowData && rowData[id] ? rowData[id] : '';
  const isWarning = rowData && isWarningFunc ? isWarningFunc(rowData) : false;
  const colour = isWarning
    ? theme.palette.error.dark
    : theme.palette.text.primary;

  if (Date.parse(value) <= 0) {
    return <TableCell key={id} align={align} />;
  }

  return (
    <TableCell key={id} align={align}>
      <Grid container direction="column">
        <Grid item>
          <Grid
            container
            direction="row"
            alignItems="center"
            spacing={1}
            wrap="nowrap"
          >
            <Grid item>
              <CalendarMonthTwoToneIcon
                sx={{ color: colour, fontSize: '0.9rem' }}
              />
            </Grid>
            <Grid item sx={{ color: colour }}>
              <Typography noWrap>
                <FormattedDate
                  value={value}
                  year="numeric"
                  month="short"
                  day="2-digit"
                />
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        {variant === 'date-time' && (
          <Grid item>
            <Grid
              container
              direction="row"
              alignItems="center"
              spacing={1}
              wrap="nowrap"
            >
              <Grid item>
                <AccessTimeTwoToneIcon
                  sx={{ color: colour, fontSize: '0.9rem' }}
                />
              </Grid>
              <Grid item sx={{ color: colour }}>
                <FormattedTime value={value} />
              </Grid>
            </Grid>
          </Grid>
        )}
      </Grid>
    </TableCell>
  );
};
