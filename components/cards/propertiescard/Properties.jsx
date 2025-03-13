import { TableCell, TableRow } from '@mui/material';
import { FormattedMessage } from 'react-intl';
import * as React from 'react';
import { ApiLookupProperty } from '../property-card/properties/api-lookup';
import { YesNoProperty } from '../property-card/properties/yes-no';
import { DateTimeProperty } from '../property-card/properties/date-time';
import { TextProperty } from '../property-card/properties/text';
import { NumberProperty } from '../property-card/properties/number';
import { ConcatenatedProperty } from '../property-card/properties/concatenated';
import { JobSourceProperty } from './propertycontrols/JobSourceProperty';
import PropTypes from 'prop-types';
import { CurrencyProperty } from '../property-card/properties/currency';
import { ConcatenateProperty } from "./propertycontrols/ConcatenateProperty";
import { TextBoxProperty } from "./propertycontrols/TextBoxProperty";

const VariantProperty = ({ config, values = {} }) => {
  const { id, variant } = config;
  const value = values[id] || '';

  switch (variant) {
    case 'yes-no':
      return <YesNoProperty config={config} value={value} />;
    case 'date-time':
    case 'date':
    case 'time':
      return <DateTimeProperty config={config} value={value} />;
    case 'api-lookup':
      return <ApiLookupProperty config={config} value={value} />;
    case 'number':
      return <NumberProperty config={config} value={value} />;
    case 'concatenated':
      return <ConcatenatedProperty config={config} values={values} />;
    case 'job-source':
      return <JobSourceProperty config={config} values={values} />;
    case 'currency':
      return <CurrencyProperty config={config} value={value} />;
    case 'concatenate':
      return <ConcatenateProperty config={config} values={values} />;
    case 'text-box':
      return <TextBoxProperty config={config} value={value} />;
    default:
      return <TextProperty config={config} value={value} />;
  }
};

VariantProperty.propTypes = {
  config: PropTypes.shape({
    id: PropTypes.string.isRequired,
    variant: PropTypes.string.isRequired,
  }).isRequired,
  values: PropTypes.objectOf(PropTypes.any).isRequired,
};

const Properties = ({ properties, values = {} }) => {
  return properties.map((prop) => (
    <TableRow key={prop.id}>
      <TableCell variant="head">
        <FormattedMessage id={prop.label} />
      </TableCell>
      <VariantProperty config={prop} values={values} />
    </TableRow>
  ));
};

Properties.propTypes = {
  properties: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      variant: PropTypes.string.isRequired,
    }),
  ).isRequired,
  values: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Properties;
