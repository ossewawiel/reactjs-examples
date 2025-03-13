import { useTheme } from "@mui/material/styles";
import SubCard from "../../ui/component/cards/SubCard";
import {
  Grid,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow
} from "@mui/material";
import * as React from "react";
import { useIntl } from "react-intl";
import Properties from "./Properties";
import PropTypes from "prop-types";

const PropertiesCard = ({ isLoading, config, values }) => {
  const theme = useTheme();
  console.log(`config - ${JSON.stringify(config)}`);
  const { formatMessage } = useIntl();
  const { header, properties } = config;

  return (
    <SubCard title={formatMessage({ id: header })}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TableContainer>
            <Table
              sx={{
                "& td": {
                  borderBottom: "none"
                }
              }}
              size="small"
            >
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={2}>
                      <Skeleton variant="text" />
                      <Skeleton variant="text" />
                      <Skeleton variant="text" />
                    </TableCell>
                  </TableRow>
                ) : (
                  <Properties properties={properties} values={values} />
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </SubCard>
  );
};

PropertiesCard.propTypes = {
  isLoading: PropTypes.bool,
  config: PropTypes.shape({
    header: PropTypes.string.isRequired,
    properties: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        variant: PropTypes.string.isRequired
      })
    ).isRequired
  }).isRequired,
  values: PropTypes.objectOf(PropTypes.any).isRequired
};

PropertiesCard.defaultProps = {
  isLoading: false,
  values: {}
};

export default PropertiesCard;
