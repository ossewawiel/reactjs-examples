import { MenuItem, TextField } from '@mui/material';
import React from 'react';
import { useIntl } from 'react-intl';

export const LookupFormControl = ({
  controlProperties,
  defaultValue = '',
  formik,
}) => {
  const intl = useIntl();
  const l10n = (val, options) => intl.formatMessage({ id: val }, options);
  const { id, label, disable = null, properties } = controlProperties;
  const { keyValueList, defaultKey = '', lookupTranslationId } = properties;

  const disabled = disable ? disable(formik.values) : false;

  const selectedValue = () => {
    if (formik.values[id] && formik.values[id] !== 0) return formik.values[id];

    return defaultKey;
  };

  const translatedValue = (option) => {
    if (lookupTranslationId) {
      const translation = l10n(lookupTranslationId, { option: option.key });
      return translation;
    }
    return option.value;
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
    >
      <MenuItem key="" value="">
        ...
      </MenuItem>
      {keyValueList.map((option) => (
        <MenuItem key={option.key} value={option.key}>
          {translatedValue(option)}
        </MenuItem>
      ))}
    </TextField>
  );
};
