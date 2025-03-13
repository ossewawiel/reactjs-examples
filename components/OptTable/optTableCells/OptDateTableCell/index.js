import { Grid, TableCell, Typography } from '@mui/material';
import * as React from 'react';
import { FormattedDate, FormattedTime } from 'react-intl';
import PropTypes from 'prop-types';
import CalendarMonthTwoToneIcon from '@mui/icons-material/CalendarMonthTwoTone';
import AccessTimeTwoToneIcon from '@mui/icons-material/AccessTimeTwoTone';
import { useTheme } from '@mui/material/styles';

export const OptDateTimeTableCell = ({ column, value, row, customProps }) => {
  const theme = useTheme();
  const isWarning = customProps ? customProps.isWarningFunction(row) : false;
  const colour = isWarning
    ? theme.palette.error.dark
    : theme.palette.text.primary;

  if (Date.parse(value) <= 0) {
    return (
      <TableCell key={column.id} align={column.align}>
        -
      </TableCell>
    );
  }

  return (
    <TableCell key={column.id} align={column.align}>
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
        {column.variant === 'date-time' && (
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

OptDateTimeTableCell.propTypes = {
  column: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    variant: PropTypes.oneOf(['date-time', 'date']).isRequired,
    label: PropTypes.string,
    align: PropTypes.oneOf(['left', 'right', 'center']).isRequired,
    customProps: PropTypes.object,
  }),
  value: PropTypes.string.isRequired,
};
