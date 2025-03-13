import { TextField } from '@mui/material';
import React from 'react';
import { useIntl } from 'react-intl';
import PropTypes from 'prop-types';

export const TextFormControl = ({
  controlProperties,
  defaultValue = '',
  formik,
}) => {
  const intl = useIntl();
  const l10n = (val) => intl.formatMessage({ id: val });
  const { id, label, disable = null, properties = {} } = controlProperties;

  // console.log(`Text form control: ${JSON.stringify(formik.values)}`);
  const disabled = disable ? disable(formik.values) : false;
  return (
    <TextField
      id={id}
      label={l10n(label)}
      name={id}
      size="small"
      disabled={disabled}
      value={formik.values[id] || ''}
      onBlur={formik.handleBlur}
      error={formik.touched[id] && Boolean(formik.errors[id])}
      helperText={formik.touched[id] && formik.errors[id]}
      onChange={formik.handleChange}
      fullWidth
      placeholder="Add value"
    />
  );
};

TextFormControl.propTypes = {
  controlProperties: PropTypes.shape({
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    disable: PropTypes.func,
    properties: PropTypes.object,
  }).isRequired,
  defaultValue: PropTypes.string,
  formik: PropTypes.shape({
    values: PropTypes.object.isRequired,
    handleChange: PropTypes.func.isRequired,
    handleBlur: PropTypes.func.isRequired,
    touched: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
  }).isRequired,
};
