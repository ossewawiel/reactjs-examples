import { Grid, TextField, Typography } from '@mui/material';
import { useFormikContext } from 'formik';
import { useIntl } from 'react-intl';

export const NumberUpDownFormControl = ({
  controlProperties,
  defaultValue = '',
  formik,
}) => {
  const intl = useIntl();
  const l10n = (val, options) => intl.formatMessage({ id: val }, options);
  const { id, label, disable = null, properties = {} } = controlProperties;
  const { min = null, max = null, rightHandLabel = null } = properties;

  const disabled = disable ? disable(formik.values) : false;

  const value = disabled ? defaultValue : formik.values && formik.values[id];

  return (
    <Grid
      container
      direction="row"
      wrap="nowrap"
      spacing={1}
      alignItems="center"
    >
      <Grid item md={rightHandLabel && 6}>
        <TextField
          id={id}
          label={l10n(label)}
          inputProps={{ min, max }}
          type="number"
          disabled={disabled}
          name={id}
          size="small"
          value={value}
          onBlur={formik.handleBlur}
          error={formik.touched[id] && Boolean(formik.errors[id])}
          helperText={formik.touched[id] && formik.errors[id]}
          onChange={formik.handleChange}
        />
      </Grid>
      {rightHandLabel && rightHandLabel.func && (
        <Grid item md={6}>
          <Typography variant="h6" sx={{ color: disabled ? 'grey' : 'black' }}>
            {rightHandLabel.func(value)}
          </Typography>
        </Grid>
      )}
      {rightHandLabel && rightHandLabel.label && (
        <Grid item md={6}>
          {rightHandLabel.label}
        </Grid>
      )}
    </Grid>
  );
};
