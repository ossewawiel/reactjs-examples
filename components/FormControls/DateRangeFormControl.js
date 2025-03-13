import * as React from 'react';
import { useIntl } from 'react-intl';
import { LocalizationProvider } from '@mui/x-date-pickers-pro';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import { SingleInputDateRangeField } from '@mui/x-date-pickers-pro/SingleInputDateRangeField';
import dayjs from 'dayjs';
import 'dayjs/locale/de';
import 'dayjs/locale/fr';
import 'dayjs/locale/es';
import 'dayjs/locale/nl';
import { CalendarMonth } from '@mui/icons-material';
import { forwardRef, useCallback } from 'react';

export const DateRangeFormControl = ({
  controlProperties,
  defaultValue = '',
  formik,
}) => {
  const intl = useIntl();
  const l10n = (val, options) => intl.formatMessage({ id: val }, options);
  const { id, label, disable = null, properties } = controlProperties;
  const { type = 'date-time', idFrom, idTo } = properties;

  const disabled = disable ? disable(formik.values) : false;
  const NULL_DATE_ISO =
    type === 'date-time' ? '1900-01-01T00:00:00' : '1900-01-01';

  const shortCuts = [
    {
      label: l10n('Today'),
      getValue: () => {
        const today = dayjs();
        return [today.startOf('day'), today.endOf('day')];
      },
    },
    {
      label: l10n('Yesterday'),
      getValue: () => {
        const today = dayjs();
        const yesterday = today.subtract(1, 'day');
        return [yesterday.startOf('day'), yesterday.endOf('day')];
      },
    },
    {
      label: l10n('formatted.last_x_days', { days: 7 }),
      getValue: () => {
        const today = dayjs();
        return [today.subtract(7, 'day'), today.endOf('day')];
      },
    },
    {
      label: l10n('formatted.last_x_days', { days: 14 }),
      getValue: () => {
        const today = dayjs();
        return [today.subtract(14, 'day'), today.endOf('day')];
      },
    },
    {
      label: l10n('formatted.last_x_days', { days: 30 }),
      getValue: () => {
        const today = dayjs();
        return [today.subtract(30, 'day'), today.endOf('day')];
      },
    },
  ];

  const fromValue =
    formik.values[idFrom] && formik.values[idFrom] !== NULL_DATE_ISO
      ? dayjs(formik.values[idFrom])
      : null;
  const toValue =
    formik.values[idTo] && formik.values[idTo] !== NULL_DATE_ISO
      ? dayjs(formik.values[idTo])
      : null;
  const currentValue = [fromValue, toValue];
  // console.log(`null iso date: ${NULL_DATE_ISO}`);
  // console.log(
  //     `${id} current values: ${JSON.stringify(currentValue)} from ${JSON.stringify(formik.values[idFrom])} to ${JSON.stringify(
  //         formik.values[idTo]
  //     )}`
  // );

  const handleChange = useCallback(
    (value) => {
      // console.log(`${id} new values: ${JSON.stringify(value)}`);
      const from = value[0] !== null ? value[0].toISOString() : NULL_DATE_ISO;
      const to = value[1] !== null ? value[1].toISOString() : NULL_DATE_ISO;
      // console.log(`${id} new values: from ${JSON.stringify(from)} to ${JSON.stringify(to)}`);
      formik.setValues({ ...formik.values, [idFrom]: from, [idTo]: to });
      // formik.setFieldValue(idFrom, from);
      // formik.setFieldValue(idTo, to);
    },
    [formik, NULL_DATE_ISO, idFrom, idTo],
  );

  const WrappedSingleInputDateRangeField = forwardRef((props, ref) => (
    <SingleInputDateRangeField size="small" clearable {...props} ref={ref} />
  ));
  WrappedSingleInputDateRangeField.displayName = 'SingleInputDateRangeField';

  WrappedSingleInputDateRangeField.fieldType = 'single-input';

  return (
    <LocalizationProvider
      dateAdapter={AdapterDayjs}
      adapterLocale={intl.locale}
    >
      <DateRangePicker
        sx={{ width: 1 }}
        value={currentValue}
        onChange={handleChange}
        label={l10n(label)}
        disabled={disabled}
        slots={{ field: WrappedSingleInputDateRangeField }}
        slotProps={{
          shortcuts: { items: shortCuts },
          textField: { InputProps: { endAdornment: <CalendarMonth /> } },
        }}
        name="allowedRange"
      />
    </LocalizationProvider>
  );
};
