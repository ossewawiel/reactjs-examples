/* eslint-disable react/jsx-no-duplicate-props */
import { TextField } from '@mui/material';
import React from 'react';
import { NumericFormat } from 'react-number-format';
import { useIntl } from 'react-intl';

const NumericFormatCustom = React.forwardRef((props, ref) => {
  const { onChange, ...other } = props;

  return (
    <NumericFormat
      {...other}
      getInputRef={ref}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      valueIsNumericString
    />
  );
});
NumericFormatCustom.displayName = 'NumericFormatCustom';

export const NumberFormControl = ({
  controlProperties,
  defaultValue = '',
  formik,
}) => {
  const intl = useIntl();
  const l10n = (val, options) => intl.formatMessage({ id: val }, options);
  const { id, label, disable = null, properties = {} } = controlProperties;
  const {
    decimals = 0,
    prefix,
    postfix,
    hide = null,
    zeroIsEmpty = true,
  } = properties;

  // const hidden = hide ? hide(formik.values) : false;
  const disabled = disable ? disable(formik.values) : false;
  const value =
    formik.values[id] === 0 && zeroIsEmpty ? null : formik.values[id];

  return (
    <TextField
      id={id}
      label={l10n(label)}
      name={id}
      size="small"
      disabled={disabled}
      // sx={{ display: !hidden ? 'show' : 'none' }}
      value={value}
      onBlur={formik.handleBlur}
      error={formik.touched[id] && Boolean(formik.errors[id])}
      helperText={formik.touched[id] && formik.errors[id]}
      onChange={formik.handleChange}
      inputProps={{ decimalScale: decimals, prefix, postfix }}
      InputProps={{
        inputComponent: NumericFormatCustom,
      }}
      fullWidth
      placeholder="Add value"
    />
  );
};
