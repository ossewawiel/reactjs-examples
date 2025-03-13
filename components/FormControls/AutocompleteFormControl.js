import {
  Autocomplete,
  Box,
  Grid,
  MenuItem,
  TextField,
  Tooltip,
} from '@mui/material';
import WarningAmberOutlinedIcon from '@mui/icons-material/WarningAmberOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import PanToolOutlinedIcon from '@mui/icons-material/PanToolOutlined';
import NotInterestedOutlinedIcon from '@mui/icons-material/NotInterestedOutlined';
import React, { useState } from 'react';
import { useIntl } from 'react-intl';

const codeLookupIcon = (type, comment) => {
  const Icon = function () {
    switch (type) {
      case 'INFO':
        return <InfoOutlinedIcon color="info" fontSize="16px" />;
      case 'WARNING':
        return <WarningAmberOutlinedIcon color="warning" fontSize="16px" />;
      case 'DISCONTINUED':
        return <NotInterestedOutlinedIcon color="error" fontSize="16px" />;
      case 'ONHOLD':
        return <PanToolOutlinedIcon color="error" fontSize="16px" />;
      default:
        return null;
    }
  };

  if (Icon)
    return (
      <Tooltip title={comment}>
        <Icon />
      </Tooltip>
    );

  return '';
};

export const AutocompleteFormControl = ({
  controlProperties,
  defaultValue = '',
  formik,
}) => {
  const intl = useIntl();
  const l10n = (val) => intl.formatMessage({ id: val });
  const { id, label, disable = null, properties } = controlProperties;
  const {
    type = '',
    showCode = false,
    hook = null,
    hide = null,
    extraField,
  } = properties;
  const { data = [], isLoading, isSuccess, isError, error } = hook();
  const [inputValue, setInputValue] = useState('');

  const disabled = disable ? disable(formik.values) : false;
  // console.log(`Found value: ${JSON.stringify(extraField)}`);
  const selectedValue = () => {
    if (
      !disabled &&
      formik.values[id] &&
      formik.values[id] !== 0 &&
      data.length
    )
      return formik.values[id];

    return null;
  };

  const selectedInputValue = () => {
    if (formik.values[id] && formik.values[id] !== 0 && data.length) {
      const foundVal = data.find((item) => item.code === formik.values[id]);
      // console.log(`Found value: ${JSON.stringify(foundVal)}`);
      if (foundVal) {
        return showCode
          ? `(${formik.values[id]}) ${foundVal.description}`
          : foundVal.name;
      }

      return '';
    }

    return '';
  };

  const getList = ({ props, option }) => {
    if (type === 'code-lookup') {
      return (
        <Box component="li" {...props}>
          <Grid container direction="row" spacing={1}>
            <Grid md={3} item>
              {option.code}
            </Grid>
            <Grid md={1} item>
              {codeLookupIcon(option.commentType, option.comment)}
            </Grid>
            <Grid item>{option.name}</Grid>
          </Grid>
        </Box>
      );
    }
    if (type === 'item-lookup') {
      return (
        <Box component="li" {...props}>
          <Grid container direction="row" spacing={1}>
            <Grid md={12} item>
              {`${option.code} - ${option.description}`}
            </Grid>
            <Grid md={1} item>
              {codeLookupIcon(option.commentType, option.comment)}
            </Grid>
            <Grid item>{option.name}</Grid>
          </Grid>
        </Box>
      );
    }
    return data;
  };

  const getLabel = (option) => {
    if (type === 'code-lookup') {
      // console.log(`Auto complete option: ${JSON.stringify(option)}`);
      return option.name || option;
    }
    if (type === 'item-lookup') {
      // console.log(`Auto complete option: ${JSON.stringify(option)}`);
      return option.description || option;
    }
    return option;
  };

  const handleChange = (event, value, reason) => {
    // console.log(`handleChange: ${id} - ${JSON.stringify(value)} - ${reason}`);
    const valueToSet = value ? value.code : null;
    formik.setFieldValue(id, valueToSet);
  };

  return (
    <Autocomplete
      id={id}
      value={selectedInputValue()}
      inputValue={inputValue}
      autoHighlight
      disabled={disabled}
      name={id}
      options={data}
      isOptionEqualToValue={(option, value) => option.code === value}
      getOptionLabel={(option) => getLabel(option)}
      renderOption={(props, option) => getList({ props, option })}
      size="small"
      fullWidth
      onChange={(event, value, reason) => handleChange(event, value, reason)}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      onBlur={formik.handleBlur}
      error={formik.touched[id] && Boolean(formik.errors[id])}
      renderInput={(params) => <TextField {...params} label={l10n(label)} />}
    />
  );
};
