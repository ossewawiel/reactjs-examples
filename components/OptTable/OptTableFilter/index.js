import { useTheme } from '@mui/material/styles';
import { FormattedMessage, useIntl } from 'react-intl';
import { useFormik } from 'formik';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Slide,
  Tab,
  Tabs,
} from '@mui/material';
import { gridSpacing } from '../../../store/constant';
import AnimateButton from '../../ui/component/AnimateButton';
import PropTypes from 'prop-types';
import React, { forwardRef, useState } from 'react';
import { SelectNumberValueDataFormControl } from '../../optFormControls';
import { DateFormControl } from '../../optFormControls/DateFormControl';
import { AutocompleteFormControl } from '../../FormControls/AutocompleteFormControl';
import {
  ApiLookupFormControl,
  DateRangeFormControl,
  LookupFormControl,
  NumberFormControl,
  NumberRangeFormControl,
  NumberUpDownFormControl,
  SwitchFormControl,
  TextFormControl,
} from '../../FormControls';

function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 0 }}>{children}</Box>}
    </div>
  );
}

const GridItem = ({ children, md }) =>
  md ? (
    <Grid item md={md} xs={12}>
      {children}
    </Grid>
  ) : (
    <Grid item xs={12}>
      {children}
    </Grid>
  );

const OptTableFilterControl = ({
  controlProperties,
  onDisableControls,
  id,
  idFrom,
  idTo,
  label,
  variant,
  formik,
  defaultValue,
  array,
  hook,
  columns,
  searchColumn,
  hookParams,
  // eslint-disable-next-line consistent-return
}) => {
  // console.log(`OptTableFilterControl: ${id} ${label} ${variant} ${JSON.stringify(hookParams)}`);
  const intl = useIntl();
  const l10n = (val) => intl.formatMessage({ id: val });
  const { hideFunc } = controlProperties;

  // console.log(`OptTableFilterControl: ${JSON.stringify(formik.values)}`);
  switch (variant) {
    case 'lookup':
      return (
        <LookupFormControl
          controlProperties={controlProperties}
          formik={formik}
          defaultValue={defaultValue}
        />
      );
    case 'api-lookup':
      return (
        <ApiLookupFormControl
          controlProperties={controlProperties}
          formik={formik}
          defaultValue={defaultValue}
        />
      );
    case 'autocomplete':
      return (
        <AutocompleteFormControl
          controlProperties={controlProperties}
          formik={formik}
          defaultValue={defaultValue}
        />
      );
    case 'number-up-down':
      return (
        <NumberUpDownFormControl
          controlProperties={controlProperties}
          formik={formik}
          defaultValue={defaultValue}
        />
      );
    case 'value-lookup':
      return (
        <SelectNumberValueDataFormControl
          id={id}
          label={l10n(label)}
          formik={formik}
          defaultValue={defaultValue}
          hook={hook}
          hookParams={hookParams}
        />
      );
    case 'yes-no':
      return (
        <SwitchFormControl
          controlProperties={controlProperties}
          formik={formik}
          defaultValue={defaultValue}
        />
      );
    case 'date':
      return (
        <DateFormControl
          id={id}
          label={l10n(label)}
          formik={formik}
          defaultValue={defaultValue}
        />
      );
    case 'date-range':
      return (
        <DateRangeFormControl
          controlProperties={controlProperties}
          formik={formik}
          defaultValue={defaultValue}
        />
      );
    case 'number':
      return (
        <NumberFormControl
          controlProperties={controlProperties}
          formik={formik}
          defaultValue={defaultValue}
        />
      );
    case 'number-range':
      return (
        <NumberRangeFormControl
          controlProperties={controlProperties}
          formik={formik}
          defaultValue={defaultValue}
        />
      );
    default:
      return (
        <TextFormControl
          controlProperties={controlProperties}
          formik={formik}
          defaultValue={defaultValue}
        />
      );
  }
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const Transition = forwardRef((props, ref) => (
  <Slide direction="left" ref={ref} {...props} />
));
Transition.displayName = 'Transition';

const OptTableFilter = ({
  filterControls,
  title,
  open,
  handleCloseDialog,
  doFiltering,
  defaultParameters,
}) => {
  const intl = useIntl();
  const theme = useTheme();
  const l10n = (val) => intl.formatMessage({ id: val });

  const [controls, setControls] = useState(filterControls);
  const [tabValue, setTabValue] = useState(0);

  // console.log(`Controls => ${JSON.stringify(controls)}`);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const formik = useFormik({
    initialValues: defaultParameters,
    onSubmit: (values) => {
      if (values) {
        doFiltering(values);
      }
    },
  });

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleCloseDialog}
      sx={{
        '&>div:nth-of-type(3)': {
          justifyContent: 'flex-end',
          '&>div': {
            m: 0,
            borderRadius: '0px',
            maxWidth: 450,
            maxHeight: '100%',
          },
        },
      }}
    >
      {open && (
        <form onSubmit={formik.handleSubmit}>
          <DialogTitle>
            <FormattedMessage id={title} />
          </DialogTitle>
          <DialogContent>
            {controls.length === 1 ? (
              <Grid container spacing={gridSpacing} sx={{ mt: 0.25 }}>
                {/* eslint-disable-next-line array-callback-return,consistent-return */}
                {controls[0].children.map((item) => {
                  const { hideFunc } = item;
                  const hidden = hideFunc ? hideFunc(formik.values) : false;
                  if (!hidden) {
                    return (
                      <GridItem key={item.id} md={item.md}>
                        <OptTableFilterControl
                          controlProperties={item}
                          id={item.id}
                          label={item.label}
                          variant={item.variant}
                          defaultValue={
                            defaultParameters && defaultParameters[item.id]
                          }
                          formik={formik}
                        />
                      </GridItem>
                    );
                  }
                })}
              </Grid>
            ) : (
              <Grid container>
                <Grid item xs={12}>
                  <Tabs
                    value={tabValue}
                    indicatorColor="primary"
                    textColor="primary"
                    onChange={handleTabChange}
                    aria-label="simple tabs example"
                    variant="scrollable"
                    sx={{
                      mb: 3,
                      '& a': {
                        minHeight: 'auto',
                        minWidth: 10,
                        py: 1.5,
                        px: 1,
                        mr: 2.25,
                        color: theme.palette.grey[600],
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                      },
                      '& a.Mui-selected': {
                        color: theme.palette.primary.main,
                      },
                      '& .MuiTabs-indicator': {
                        bottom: 2,
                      },
                      '& a > svg': {
                        marginBottom: '0px !important',
                        mr: 1.25,
                      },
                    }}
                  >
                    {filterControls.map((tab, index) => (
                      <Tab
                        key={index}
                        label={l10n(tab.name)}
                        {...a11yProps(index)}
                      />
                    ))}
                  </Tabs>
                  {controls.map((tab, index) => (
                    <TabPanel key={index} value={tabValue} index={index}>
                      <Grid container spacing={gridSpacing} sx={{ mt: 0.25 }}>
                        {/* eslint-disable-next-line array-callback-return,consistent-return */}
                        {tab.children.map((item) => {
                          const { hideFunc } = item;
                          const hidden = hideFunc
                            ? hideFunc(formik.values)
                            : false;
                          if (!hidden) {
                            return (
                              <GridItem key={item.id} md={item.md}>
                                <OptTableFilterControl
                                  controlProperties={item}
                                  id={item.id}
                                  label={item.label}
                                  variant={item.variant}
                                  defaultValue={
                                    defaultParameters &&
                                    defaultParameters[item.id]
                                  }
                                  formik={formik}
                                />
                              </GridItem>
                            );
                          }
                        })}
                      </Grid>
                    </TabPanel>
                  ))}
                </Grid>
              </Grid>
            )}
          </DialogContent>
          <DialogActions>
            <AnimateButton>
              <Button type="submit" variant="contained">
                <FormattedMessage id="Filter" />
              </Button>
            </AnimateButton>
            <Button
              type="reset"
              variant="text"
              color="error"
              onClick={formik.handleReset}
            >
              <FormattedMessage id="Reset" />
            </Button>
          </DialogActions>
        </form>
      )}
    </Dialog>
  );
};

OptTableFilter.propTypes = {
  open: PropTypes.bool,
  handleCloseDialog: PropTypes.func,
};

export default OptTableFilter;
