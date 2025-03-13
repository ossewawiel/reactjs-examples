import {
  Divider,
  Grid,
} from '@mui/material';

import * as React from 'react';
import {
  OptHeaderCard,
  OptHeaderCardItem,
} from '../../../../components/optCards';
import { useIntl } from 'react-intl';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import {
  OptHeaderCardDateTime,
  OptHeaderCardYesNoItem
} from '../../../../components/optCards/OptHeaderCard';

import { useGetCustomerLookupQuery } from '../../../../store/api/codeLookupApi';
import {
  useGetCustomerAddressDetailInfoQuery
} from '../../../../store/api/commonApi';
import ListCard, {
  AddressListItem,
  EmailListItem,
  PhoneListItem,
} from '../../../../ui-component/list-card';
import { SoLineItem } from '../../../../ui-component/entity-list-card';
import SubCard from '../../../../ui-component/cards/SubCard';
import { useTheme } from '@mui/material/styles';

// eslint-disable-next-line react/prop-types
const SalesOrderDetailsGeneral = ({ soInfo }) => {
  const intl = useIntl();
  const l10n = (val) => intl.formatMessage({ id: val });
  const theme = useTheme();
  const soLines = soInfo.lines;

  const data = { ...soInfo };
  Object.keys(data).forEach((key) => {
    if (data[key] === 0 || data[key] === '') {
      data[key] = '-';
    }
  });

  const propsData = { ...soInfo.props };
  Object.keys(propsData).forEach((key) => {
    if (propsData[key] === 0 || propsData[key] === '') {
      propsData[key] = '-';
    }
  });

  const {
    data: response = [],
    isSuccess,
    isError,
    error,
  } = useGetCustomerLookupQuery();
  let val = '...';
  if (isSuccess) {
    const tmp = response.filter((obj) => obj.code === data.props.customerCode);
    val = tmp[0].name;
  }

  const { data: invAddress = {} } = useGetCustomerAddressDetailInfoQuery({
    cuCode: soInfo.props.customerCode,
    addrNo: soInfo.props.invoiceAddress,
  });

  const { data: delAddress = {} } = useGetCustomerAddressDetailInfoQuery({
    cuCode: soInfo.props.customerCode,
    addrNo: soInfo.props.deliveryAddress,
  });

  return (
    <Grid container direction="row" spacing={1}>
      <Grid item md={8}>
        <Grid container direction="column" spacing={1}>
          <Grid item>
            <OptHeaderCard
              icon={
                <AttachMoneyIcon color="primary" sx={{ fontSize: '3rem' }} />
              }
              title={`S/O number - ${data.soNumber}`}
              subtitle={`Customer: ${data.props.customerCode}(${val}) `}
            >
              <OptHeaderCardItem
                label="Web-to-print number"
                value={data.webToPrintNum}
              />
              <OptHeaderCardYesNoItem
                label="S/O cash account"
                value={data.copiedFromHdrNumber}
              />
              <OptHeaderCardItem
                label="Currency"
                value={propsData.currencyCode}
              />
              <OptHeaderCardItem
                label="Order reference"
                value={data.props.orderReference}
              />
              <OptHeaderCardDateTime
                label="Date Raised"
                value={data.props.raised}
              />
              <OptHeaderCardItem
                label="S/O type"
                value={propsData.soType}
              />
              <OptHeaderCardItem
                label="Clerk"
                value={data.props.clerkCode}
              />
            </OptHeaderCard>
          </Grid>
          <Grid item>
            <Grid container direction="row" spacing={1}>
              <Grid item md={6}>
                <ListCard
                  title={l10n('Delivery Address')}
                  subtitle={`${delAddress.contact || ''}`}
                >
                  <AddressListItem
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
                </ListCard>
              </Grid>
              <Grid item md={6}>
                <ListCard
                  title={l10n('Invoice Address')}
                  subtitle={`${invAddress.contact || ''}`}
                >
                  <AddressListItem
                    line1={invAddress.addressLine1}
                    line2={invAddress.addressLine2}
                    line3={invAddress.addressLine3}
                    line4={invAddress.addressLine4}
                    code={invAddress.postcode}
                  />
                  <Divider />
                  <EmailListItem value={invAddress.emailAddress} />
                  <Divider />
                  <PhoneListItem value={invAddress.telephoneNumber} />
                </ListCard>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item md={4}>
        <SubCard
          title={intl.formatMessage({ id: 'Sales order Lines' })}
          sx={{
            background:
              theme.palette.mode === 'dark'
                ? theme.palette.dark.main
                : theme.palette.grey[100]
          }}
        >
          {soLines.map((item) => (
            <SoLineItem data={item} />
          ))}
        </SubCard>
      </Grid>
    </Grid>
  );
};

export default SalesOrderDetailsGeneral;
