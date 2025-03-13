import { Grid, Table, TableBody, TableCell, TableContainer } from "@mui/material";
import { FormattedDate, FormattedTime, useIntl } from "react-intl";
import * as React from 'react';
import PropTypes from 'prop-types';
import SubCard from '../../../ui/component/cards/SubCard';

export const TextBoxProperty = ({ config, value = '' }) => {
  const { id, label } = config;
  const intl = useIntl();
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TableContainer>
          <Table
            sx={{
              '& td': {
                borderBottom: 'none',
              },
            }}
            size="small"
          >
            <TableBody>{value}</TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
};

TextBoxProperty.propTypes = {
  config: PropTypes.shape({
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired
  }).isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
};
