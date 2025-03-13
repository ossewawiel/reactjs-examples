import { Grid, Switch, Typography } from '@mui/material';
import React from 'react';
import { useIntl } from 'react-intl';

export const SwitchFormControl = ({
  controlProperties,
  defaultValue = '',
  formik,
}) => {
  const { id, label, disable = null, invertedColors } = controlProperties;
  const intl = useIntl();
  const l10n = (val) => intl.formatMessage({ id: val });
  const disabled = disable ? disable(formik.values) : false;

  const handleChange = (event) => {
    formik.setFieldValue(id, event.target.checked);
  };

  return (
    <Grid item container alignItems="center" justifyContent="space-between">
      <Grid item>
        <Typography variant="subtitle2">{l10n(label)}</Typography>
      </Grid>
      <Grid item>
        <Switch
          color="primary"
          disabled={disabled}
          checked={formik.values && formik.values[id]}
          onBlur={formik.handleBlur}
          error={formik.touched[id] && Boolean(formik.errors[id])}
          onChange={handleChange}
          name={id}
          size="small"
        />
      </Grid>
    </Grid>
  );
};
