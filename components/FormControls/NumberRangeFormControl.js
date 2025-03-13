/* eslint-disable react/jsx-no-duplicate-props */
import React from 'react';
import { NumericFormat } from 'react-number-format';
import {
  FormControl,
  FormGroup,
  Grid,
  InputLabel,
  TextField,
} from '@mui/material';
import { Input } from '@mui/base';
import { useIntl } from 'react-intl';

const NumericFormatCustom = React.forwardRef((props, ref) => {
  const {
    onChange,
    value = [null, null],
    labelFrom,
    labelTo,
    idFrom,
    idTo,
    ...other
  } = props;

  const handleChange = (event) => {
    const newValue = value;
    newValue[event.target.name === idFrom ? 0 : 1] =
      event.target.value === null || event.target.value === ''
        ? null
        : parseFloat(event.target.value);
    onChange(newValue);
  };

  return (
    <Grid sx={{ flexGrow: 1 }} container>
      <Grid item md={12}>
        <Grid container justifyContent="flex-start" direction="row" spacing={1}>
          <Grid item md={3}>
            <NumericFormat
              {...other}
              id={idFrom}
              name={idFrom}
              justify="flex-end"
              getInputRef={ref}
              onValueChange={(values) => {
                handleChange({
                  target: {
                    name: idFrom,
                    value: values.value,
                  },
                });
              }}
              prefix={`${labelFrom} `}
              valueIsNumericString
              value={value[0]}
              placeholder={labelFrom}
            />
          </Grid>
          <Grid item md={3}>
            <NumericFormat
              {...other}
              id={idTo}
              name={idTo}
              getInputRef={ref}
              onValueChange={(values) => {
                handleChange({
                  target: {
                    name: idTo,
                    value: values.value,
                  },
                });
              }}
              prefix={`${labelTo} `}
              valueIsNumericString
              value={value[1]}
              placeholder={labelTo}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
});

NumericFormatCustom.displayName = 'NumericFormatCustom';

export const NumberRangeFormControl = ({
  controlProperties,
  defaultValue = '',
  formik,
}) => {
  const intl = useIntl();
  const l10n = (val, options) => intl.formatMessage({ id: val }, options);
  const { id, label, disable = null, properties = {} } = controlProperties;
  const {
    idFrom,
    idTo,
    labelFrom = 'From',
    labelTo = 'to',
    decimals = 0,
    prefix,
    postfix,
    zeroIsEmpty = true,
  } = properties;

  const disabled = disable ? disable(formik.values) : false;
  const valFrom =
    formik.values[idFrom] && formik.values[idFrom] !== 0
      ? formik.values[idFrom]
      : null;
  const valTo =
    formik.values[idTo] && formik.values[idTo] !== 0
      ? formik.values[idTo]
      : null;
  const value = [valFrom, valTo];
  // console.log(`num range control: ${JSON.stringify(disable)}`);
  const handleChange = (values) => {
    formik.setFieldValue(idFrom, values[0]);
    formik.setFieldValue(idTo, values[1]);
  };

  return (
    <TextField
      id={id}
      label={l10n(label)}
      name={id}
      size="small"
      disabled={disabled}
      value={value}
      fullWidth
      onBlur={formik.handleBlur}
      error={formik.touched[id] && Boolean(formik.errors[id])}
      helperText={formik.touched[id] && formik.errors[id]}
      onChange={handleChange}
      inputProps={{ decimalScale: decimals, labelFrom, labelTo, idFrom, idTo }}
      InputProps={{
        inputComponent: NumericFormatCustom,
      }}
      placeholder="Add value"
    />
  );
};
