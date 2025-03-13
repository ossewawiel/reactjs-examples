'use client';

import { useTheme } from '@mui/material/styles';
import Link from 'next/link';
import { useIntl } from 'react-intl';
import { useState } from 'react';
import MainCard from '../ui/component/cards/MainCard';
import {
  Box,
  Button,
  Grid,
  IconButton,
  Tab,
  Tabs,
  Tooltip,
} from '@mui/material';
import { gridSpacing } from '../../store/constant';
import PropTypes from 'prop-types';
import * as React from 'react';
import Breadcrumbs from "../../breadcrumbs";

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

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
const OptTabsWrapper = ({ tabsOption = [], tabButtons = [] }) => {
  const theme = useTheme();
  const intl = useIntl();
  const l10n = (val) => intl.formatMessage({ id: val });

  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <MainCard>
        <Grid container >
          {tabButtons.length > 0 && (
            <Grid item xs={12}>
              <Grid container justifyContent="flex-end" spacing={2}>
                {tabButtons.map((button, index) => (
                  <Grid key={index} item>
                    <Button
                      color="primary"
                      startIcon={button.icon}
                      onClick={button.handleClick}
                    >
                      {l10n(button.label)}
                    </Button>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          )}
          <Grid item xs={12}>
            <Tabs
              value={value}
              indicatorColor="primary"
              textColor="primary"
              onChange={handleChange}
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
              {tabsOption.map((tab, index) => (
                <Tab
                  key={index}
                  component={Link}
                  href="#"
                  icon={tab.icon}
                  label={l10n(tab.label)}
                  {...a11yProps(index)}
                />
              ))}
            </Tabs>
            {tabsOption.map((tab, index) => (
              <TabPanel key={index} value={value} index={index}>
                {tab.page}
              </TabPanel>
            ))}
          </Grid>
        </Grid>
      </MainCard>
    </>
  );
};

export default OptTabsWrapper;
