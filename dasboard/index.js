'use client';

import { useEffect, useState } from 'react';

// material-ui
import { Grid } from '@mui/material';

// project imports
import TotalOrderLineChartCard from './TotalOrderLineChartCard';
import { gridSpacing } from 'src/store/constant';
import AlertsCarousel from './AlertsCarousel';
import InvoicedWeekMonthCard from './InvoicedWeekMonthCard';
import { useTheme } from '@mui/material/styles';
import {
  EnquiriesRaisedTodaySideIconWidget,
  JobsBookedThisWeekAlertWidget,
  LateJobsAlertWidget,
  OutworkExpenditureLineGraphWidget,
  PredictedMonthlyTurnoverLineGraphWidget,
  ResourceProductivityBarGraphWidget,
  StockLevelsGaugeBarWidget,
  UninvoicedCompleteJobsSideIconWidget,
} from 'src/components/widgets';
import { WorkInProgressSideIconWidget } from 'src/components/widgets/WorkInProgressSideIconWidget';
import InvoicedWeekMonthWidget from '../../../components/widgets/InvoicesWeekMonthWidget';
import { DailyEnquiriesAlertWidget } from '../../../components/widgets/DailyEnquiriesAlertWidget';

const GeneralDashboard = () => {
  const theme = useTheme();
  const [isLoading, setLoading] = useState(false);

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12} sm={12} md={12} lg={12}>
        <AlertsCarousel isLoading={isLoading} />
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12} sm={12} md={12} lg={8}>
            <Grid container spacing={gridSpacing}>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <Grid container spacing={gridSpacing}>
                  <Grid item xs={12} sm={12} md={6} lg={6}>
                    <PredictedMonthlyTurnoverLineGraphWidget />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={6}>
                    <OutworkExpenditureLineGraphWidget />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <Grid container spacing={gridSpacing}>
                  <Grid item xs={12} md={6}>
                    <InvoicedWeekMonthWidget />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TotalOrderLineChartCard isLoading={isLoading} />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={4}>
            <Grid container spacing={gridSpacing}>
              <Grid item sm={6} xs={12} md={6} lg={12}>
                <JobsBookedThisWeekAlertWidget />
              </Grid>
              <Grid item sm={6} xs={12} md={6} lg={12}>
                <LateJobsAlertWidget />
              </Grid>
              <Grid item sm={6} xs={12} md={6} lg={12}>
                <DailyEnquiriesAlertWidget />
              </Grid>
              <Grid item sm={6} xs={12} md={6} lg={12}>
                <UninvoicedCompleteJobsSideIconWidget />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12} sm={12} md={12} lg={6}>
            <ResourceProductivityBarGraphWidget />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={6}>
            <StockLevelsGaugeBarWidget />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default GeneralDashboard;
