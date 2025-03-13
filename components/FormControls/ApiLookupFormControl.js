import { MenuItem, TextField } from '@mui/material';
import React from 'react';
import { useIntl } from 'react-intl';
import PropTypes from 'prop-types';

export const ApiLookupFormControl = ({
  controlProperties,
  defaultValue = '',
  formik,
}) => {
  const intl = useIntl();
  const l10n = (val, options) => intl.formatMessage({ id: val }, options);
  const { id, label, disable = null, properties } = controlProperties;
  const {
    keyId,
    valueId,
    allowEmpty = true,
    hook,
    getHookParams,
    hide = null,
    list,
    lookupTranslationId,
  } = properties;
  const {
    data = [],
    isLoading,
    isSuccess,
    isError,
    error,
  } = hook(getHookParams ? getHookParams(formik.values) : null);
  const disabled = disable ? disable(formik.values) : false;
  // console.log(` api calls : ${JSON.stringify(hidden)}`);
  const selectedValue = () => {
    if (
      !disabled &&
      formik.values[id] &&
      formik.values[id] !== 0 &&
      data.length
    )
      return formik.values[id];
    if (!disabled && data.length && defaultValue) return defaultValue;
    return '';
  };

  const translatedValue = (option) => {
    if (lookupTranslationId) {
      return l10n(lookupTranslationId, { option: option[keyId] });
    }
    return option[valueId];
  };

  return (
    <TextField
      id={id}
      select
      disabled={disabled}
      value={selectedValue()}
      name={id}
      label={l10n(label)}
      size="small"
      fullWidth
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      error={formik.touched[id] && Boolean(formik.errors[id])}
      helperText={formik.touched[id] && formik.errors[id]}
      // sx={{ display: !hidden ? 'block' : 'none', maxHeight: !hidden ? 'inherit' : 0, width: !hidden ? 'inherit' : 0 }}
    >
      {allowEmpty && (
        <MenuItem key="" value="">
          ...
        </MenuItem>
      )}
      {data.map((option) => (
        <MenuItem key={option[keyId]} value={option[keyId]}>
          {list
            ? `${option[keyId]} - ${translatedValue(option)}`
            : `${translatedValue(option)}`}
        </MenuItem>
      ))}
    </TextField>
  );
};

// Generate PropTypes
ApiLookupFormControl.propTypes = {
  controlProperties: PropTypes.shape({
    id: PropTypes.string,
    label: PropTypes.string,
    disable: PropTypes.func,
    properties: PropTypes.shape({
      keyId: PropTypes.string,
      valueId: PropTypes.string,
      allowEmpty: PropTypes.bool,
      hook: PropTypes.func,
      getHookParams: PropTypes.func,
      hide: PropTypes.func,
      list: PropTypes.bool,
      lookupTranslationId: PropTypes.string,
    }),
  }),
  defaultValue: PropTypes.string,
  formik: PropTypes.object,
};
