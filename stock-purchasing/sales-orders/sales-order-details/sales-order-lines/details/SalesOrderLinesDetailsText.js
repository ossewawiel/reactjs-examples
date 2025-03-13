import { gridSpacing } from '../../../../../../store/constant';
import { Grid, Typography } from '@mui/material';
import OptInfoCard from '../../../../../../components/optCards/OptInfoCard';
import * as React from 'react';
import PropTypes from 'prop-types';

const SalesOrderLinesDetailsText = ({ text }) => (
  <Grid container spacing={gridSpacing}>
    {/*<Grid item>*/}
    {/*  <Grid container direction="row" spacing={1}>*/}
    {/*    <Grid item md={6}>*/}
    {/*      <ListCard*/}
    {/*        title={l10n('Delivery Address')}*/}
    {/*        subtitle={`${delAddress.contact || ''}`}*/}
    {/*      >*/}
    {/*        <AddressListItem*/}
    {/*          line1={delAddress.addressLine1}*/}
    {/*          line2={delAddress.addressLine2}*/}
    {/*          line3={delAddress.addressLine3}*/}
    {/*          line4={delAddress.addressLine4}*/}
    {/*          code={delAddress.postcode}*/}
    {/*        />*/}
    {/*        <Divider />*/}
    {/*        <EmailListItem value={delAddress.emailAddress} />*/}
    {/*        <Divider />*/}
    {/*        <PhoneListItem value={delAddress.telephoneNumber} />*/}
    {/*      </ListCard>*/}
    {/*    </Grid>*/}
    {/*    <Grid item md={6}>*/}
    {/*      <ListCard*/}
    {/*        title={l10n('Invoice Address')}*/}
    {/*        subtitle={`${invAddress.contact || ''}`}*/}
    {/*      >*/}
    {/*        <AddressListItem*/}
    {/*          line1={invAddress.addressLine1}*/}
    {/*          line2={invAddress.addressLine2}*/}
    {/*          line3={invAddress.addressLine3}*/}
    {/*          line4={invAddress.addressLine4}*/}
    {/*          code={invAddress.postcode}*/}
    {/*        />*/}
    {/*        <Divider />*/}
    {/*        <EmailListItem value={invAddress.emailAddress} />*/}
    {/*        <Divider />*/}
    {/*        <PhoneListItem value={invAddress.telephoneNumber} />*/}
    {/*      </ListCard>*/}
    {/*    </Grid>*/}
    {/*  </Grid>*/}
    {/*</Grid>*/}
  </Grid>
);

export default SalesOrderLinesDetailsText;
