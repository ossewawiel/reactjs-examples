import { Divider, Grid, Typography } from '@mui/material';
import { gridSpacing } from '../../../../store/constant';

import * as React from 'react';
import {
  OptHeaderCard,
  OptHeaderCardItem,
} from '../../../../components/optCards';
import { defineMessages, useIntl } from 'react-intl';
import FactoryTwoToneIcon from '@mui/icons-material/FactoryTwoTone';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import {
  CodeLookupWithCodeHeaderItem,
  NameLookupHeaderItem,
  NameLookupWithCodeHeaderItem,
  OptHeaderCardDateTime,
  OptHeaderCardNameLookupItem,
  NameLookupItem,
} from '../../../../components/optCards/OptHeaderCard';
import ShopIcon from '@mui/icons-material/Shop';
import OptInfoCard, {
  CodeLabelRow,
  LabelValueRow,
} from '../../../../components/optCards/OptInfoCard';
import { useGetCustomerLookupQuery } from '../../../../store/api/codeLookupApi';
import ListCard, {
  AddressListItem,
  EmailListItem,
  MobileListItem,
  PhoneListItem,
} from '../../../../ui-component/list-card';
import { useGetCustomerAddressDetailInfoQuery } from '../../../../store/api/commonApi';
import { useGetPurchaseOrderStatusTypeQuery } from '../../../../store/api/purchaseOrderApis/purchaseOrderSearchServer';

const PurchaseOrderDetailsGeneral = ({ poInfo }) => {
  const intl = useIntl();
  const l10n = (val) => intl.formatMessage({ id: val });

  const data = { ...poInfo };
  Object.keys(data).forEach((key) => {
    if (data[key] === 0 || data[key] === '') {
      data[key] = '-';
    }
  });

  const {
    data: delAddress = {},
    delIsLoading,
    delIsSuccess,
    delIsError,
    delError,
  } = useGetCustomerAddressDetailInfoQuery({
    cuCode: data.deliverCompanyCode,
    addrNo: data.delAddressNumber,
  });

  const messages = defineMessages({
    proofAlarmPlural: {
      id: 'formatted.x_proofs_overdue',
      defaultMessage:
        '{count, plural, =0 {no proofs overdue} one {# proof overdue} other {# proofs overdue}}',
    },
  });

  const {
    data: response = [],
    isSuccess,
    isError,
    error,
  } = useGetPurchaseOrderStatusTypeQuery();
  let val = '...';
  if (isSuccess) {
    const tmp = response.filter((obj) => obj.name === data.status);
    // const tmp = response.filter((item) => item[useName ? 'name' : 'value'] === value);
    // console.log(`name lookup stuff ${JSON.stringify(tmp)} ${JSON.stringify(response)}`);
    val = tmp[0].value;
  }

  // const proofsAlarmMessage = intl.formatMessage(messages.proofAlarmPlural, { count: enquiryInfo.lateProofCount });

  return (
    <Grid container direction="row" spacing={1}>
      <Grid item md={8}>
        <Grid container direction="column" spacing={1}>
          <Grid item>
            <OptHeaderCard
              icon={<ShopIcon color="primary" sx={{ fontSize: '3rem' }} />}
              title={`Purchase order - ${data.number}`}
              subtitle={`Status - ${val}`}
            >
              <OptHeaderCardItem label="Supplier" value={data.supplierCode} />
              <OptHeaderCardItem label="Value" value={data.value} />
              <OptHeaderCardItem label="Updated by" value={data.updatedBy} />
              {/* <OptHeaderCardItem label="Deliver to 3rd party?" value={propsData.quoteAddressNumber} /> */}
              <OptHeaderCardItem label="Contact" value={data.contact} />
              <OptHeaderCardItem label="Buyer" value={data.buyerCode} />
              <OptHeaderCardDateTime
                label="Updated at"
                value={data.updatedAt}
              />
              <OptHeaderCardItem label="Telephone" value={data.telephone} />
              <OptHeaderCardDateTime label="Raised" value={data.raisedAt} />
              <OptHeaderCardItem label="Approved by" value={data.approvedBy} />
              <OptHeaderCardItem label="Email" value={data.email} />
              <OptHeaderCardDateTime label="Printed" value={data.printedAt} />
              <OptHeaderCardDateTime
                label="Approved at"
                value={data.approvedAt}
              />
              <OptHeaderCardItem label="Reference" value={data.reference} />
              <OptHeaderCardItem label="Type" value={data.poType} />
            </OptHeaderCard>
          </Grid>
        </Grid>
      </Grid>
      <Grid item md={4}>
        <ListCard
          title={l10n('Delivery Address')}
          subtitle={`${delAddress.contact || ''}`}
        >
          <AddressListItem
            name={delAddress.addressName}
            line1={delAddress.addressLine1}
            line2={delAddress.addressLine2}
            line3={delAddress.addressLine3}
            line4={delAddress.addressLine4}
            code={delAddress.postcode}
          />
          <Divider />
          <EmailListItem value={delAddress.emailAddress} />
          <Divider />
          <PhoneListItem value={delAddress.telephoneNumber} />
          <Divider />
          <MobileListItem value={delAddress.mobileNumber} />
        </ListCard>
      </Grid>
    </Grid>
  );
};

export default PurchaseOrderDetailsGeneral;
