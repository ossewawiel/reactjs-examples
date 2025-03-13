import { useIntl } from "react-intl";
import { TableCell } from "@mui/material";
import * as React from "react";
import PropTypes from "prop-types";

export const JobSourceProperty = ({ config, values = {} }) => {
  const { formatMessage } = useIntl();
  const { properties } = config;
  const { lookupHook, lookupKey, valueKey } = properties;

  const { data: response = [], isSuccess, isError, error } = lookupHook();

  if (isError) {
    console.error('Error fetching data:', error);
    return <TableCell variant="head">Error loading data</TableCell>;
  }

  if (!isSuccess) {
    return <TableCell variant="head">...</TableCell>;
  }

  const value = values[valueKey];
  const matchingItem = response.find((item) => item.name === values[lookupKey]);

  let label = matchingItem ? formatMessage({ id: matchingItem.value }) : '...';

  return <TableCell variant="head">{`${label} ${value}`}</TableCell>;
};

JobSourceProperty.propTypes = {
  config: PropTypes.shape({
    properties: PropTypes.shape({
      lookupHook: PropTypes.func.isRequired,
      lookupKey: PropTypes.string.isRequired,
      valueKey: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  values: PropTypes.objectOf(PropTypes.string).isRequired,
};
