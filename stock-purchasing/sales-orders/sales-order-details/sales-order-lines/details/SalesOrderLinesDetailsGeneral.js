import { Divider, Grid, Table, TableBody, TableContainer, Typography } from "@mui/material";

import * as React from 'react';
import {
  OptHeaderCard,
  OptHeaderCardItem,
} from '../../../../../../components/optCards';
import { useIntl } from 'react-intl';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import {
  OptHeaderCardDateTime,
  OptHeaderCurrencyCard,
} from '../../../../../../components/optCards/OptHeaderCard';

import { useGetCustomerAddressDetailInfoQuery } from '../../../../../../store/api/commonApi';
import ListCard, {
  AddressListItem,
  EmailListItem,
  PhoneListItem,
} from '../../../../../../ui-component/list-card';
import { SoLineDelReqItem, StandardCardTable } from "../../../../../../ui-component/entity-list-card";
import SubCard from '../../../../../../ui-component/cards/SubCard';
import { useTheme } from '@mui/material/styles';
import {
  useGetCustomerOwnedQuery,
  useGetSalesOrderLineStatusQuery, useGetSOLIssueStatusQuery
} from '../../../../../../store/api/salesOrderApis/salesOrderServerApi';

import PropertiesCard from '../../../../../../components/cards/propertiescard';
import ErrorIcon from '@mui/icons-material/Error';
import { useGetItemsListQuery } from '../../../../../../store/api/ItemApis/itemSearchServerApi';
import {
  useGetLocationLookupQuery,
  useGetLookupRepresentativesQuery,
  useGetSupplierLookupQuery,
} from '../../../../../../store/api/codeLookupApi';
import InfoCard from '../../../../../../components/cards/info-card';
import OptInfoCard from "../../../../../../components/optCards/OptInfoCard";

const infoCardConfig = {
  header: {
    icon: ErrorIcon,
    title: {
      id: 'salesOrderLineNumber',
      defaultMessage: 'S/O Line : {salesOrderNumber}/{salesOrderLineNumber}',
      placeholders: {
        salesOrderNumber: 'salesOrderNumber',
        salesOrderLineNumber: 'salesOrderLineNumber',
      },
    },
    subtitle: {
      id: '{solStatus}',
      defaultMessage: 'Status: {solStatus}',
      placeholders: {
        solStatus: 'solStatus',
      },
    },
  },
  items: [
    {
      id: 'itemCode',
      label: 'Item',
      propsValue: true,
      variant: 'api-lookup',
      properties: {
        lookupHook: useGetItemsListQuery,
        keyId: 'code',
        valueId: 'description',
      },
    },
    {
      id: 'qtyRequired',
      label: 'Ordered Quantity',
      variant: 'concatenated',
      propsValue: true,
      properties: {
        key: ['qtyRequired', 'unitCode'],
      },
    },
    {
      id: 'callOff',
      label: 'Call-off',
      variant: 'api-lookup',
      propsValue: true,
      properties: {
        lookupHook: useGetCustomerOwnedQuery,
        keyId: 'name',
        valueId: 'value',
      },
    },
    {
      id: 'price',
      label: 'Price',
      propsValue: true,
      variant: 'currency',
    },
    {
      id: 'totalCost',
      label: 'Total',
      variant: 'currency',
      propsValue: true,
    },
    {
      id: 'taxCode',
      label: 'Tax',
      propsValue: true,
    },
    {
      id: 'whenRequired',
      label: 'Delivery Date',
      variant: 'date-time',
      propsValue: true,
    },
    {
      id: 'deliveryContactName',
      label: 'Customer part/ref',
      propsValue: true,
    },
    {
      id: 'note',
      label: 'Note',
      propsValue: true,
    },
    {
      id: 'deliveryRep',
      label: 'Representative',
      propsValue: true,
      variant: 'api-lookup',
      properties: {
        lookupHook: useGetLookupRepresentativesQuery,
        keyId: 'code',
        valueId: 'name',
      },
    },
  ],
  footerItems: [
    {
      id: 'deliveryRep',
      label: 'Representative',
      variant: 'api-lookup',
      propsValue: true,
      properties: {
        lookupHook: useGetLookupRepresentativesQuery,
        keyId: 'code',
        valueId: 'name',
      },
    },
    {
      id: 'deliveryIsCollection',
      label: 'Customer to Collect',
      propsValue: true,
      variant: 'yes-no',
    },
    {
      id: 'deliveryCanPartDeliver',
      label: 'Part Deliveries',
      propsValue: true,
      variant: 'yes-no',
    },
  ],
};

const DetailsCardConfig = {
  header: 'Details',
  properties: [
    {
      id: 'standardPrice',
      label: 'Standard Price',
      variant: 'currency',
      emptyDash: true,
    },
    {
      id: 'baseRequired',
      label: 'To Order',
      emptyDash: true,
    },
    {
      id: 'baseRequired',
      label: 'Linked Outstanding',
      emptyDash: true,
    },
    {
      id: 'baseOnOrder',
      label: 'On Back Order',
      emptyDash: true,
    },
    {
      id: 'baseAllocated',
      label: 'Allocated',
      emptyDash: true,
    },
    {
      id: 'baseCalledOff',
      label: 'Called off',
      emptyDash: true,
    },
    {
      id: 'basePicked',
      label: 'Picked',
      emptyDash: true,
    },
    {
      id: 'baseDelivered',
      label: 'Delivered',
      emptyDash: true,
    },
  ],
};

const ItemsCardConfig = {
  header: 'Notes',
  properties: [
    {
      id: 'text',
      label: 'Notes',
      variant: 'text-box',
    }
  ],
};

// eslint-disable-next-line react/prop-types
const SalesOrderLineDetailsGeneral = (props) => {
  const lineInfo = props.lineInfo;
  const isLoading = props.isLoading;
  const intl = useIntl();
  const l10n = (val) => intl.formatMessage({ id: val });
  const theme = useTheme();

  const data = { ...lineInfo };
  Object.keys(data).forEach((key) => {
    if (data[key] === 0 || data[key] === '') {
      data[key] = '-';
    }
  });

  const propsData = { ...lineInfo.props };
  Object.keys(propsData).forEach((key) => {
    if (propsData[key] === 0 || propsData[key] === '') {
      propsData[key] = '-';
    }
  });

  const { data: invAddress = {} } = useGetCustomerAddressDetailInfoQuery({
    cuCode: lineInfo.props.customerCode,
    addrNo: lineInfo.props.invoiceAddress,
  });

  const { data: delAddress = {} } = useGetCustomerAddressDetailInfoQuery({
    cuCode: lineInfo.props.customerCode,
    addrNo: lineInfo.props.deliveryAddress,
  });
  console.log(`soinfo - ${JSON.stringify(data.props)}`);

  const {
    data: soLineDetails = [],
    isSuccess,
    isError,
    error,
  } = useGetSalesOrderLineStatusQuery();
  let val = '...';
  if (isSuccess) {
    const tmp = soLineDetails.filter((obj) => obj.name === data.solStatus);
    val = tmp[0].value;
  }

  const delReqs = data.deliveryRequirements;
  return (
    <Grid container direction="row" spacing={1}>
      <Grid item md={8}>
        <Grid container direction="column" spacing={1}>
          <Grid item>
            <InfoCard values={data} config={infoCardConfig} secondaryValues={data.props} />
          </Grid>
          <Grid item>
            <Grid container direction="row" spacing={1}>
              <Grid item md={6}>
                <PropertiesCard
                  config={DetailsCardConfig}
                  values={data.additionalInfo}
                  isLoading={isLoading}
                />
              </Grid>
              <Grid item md={6}>
                <SubCard title={intl.formatMessage({ id: 'Notes' })}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TableContainer>
                        <Table
                          sx={{
                            '& td': {
                              borderBottom: 'none',
                            },
                          }}
                          size="small"
                        >
                          <TableBody>{data.props.text}</TableBody>
                        </Table>
                      </TableContainer>
                    </Grid>
                  </Grid>
                </SubCard>
              </Grid>
              {/*<Grid item md={6}>*/}
              {/*  <PropertiesCard*/}
              {/*    config={costsCardConfig}*/}
              {/*    values={issueInfo}*/}
              {/*    isLoading={isLoading}*/}
              {/*  />*/}
              {/*</Grid>*/}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item md={4}>
        <Grid container direction={'row'} spacing={1}>
          <Grid item>
            <SubCard
              title={intl.formatMessage({ id: 'Delivery requirements' })}
              sx={{
                background:
                  theme.palette.mode === 'dark'
                    ? theme.palette.dark.main
                    : theme.palette.grey[100],
              }}
            >
              {delReqs.map((item) => (
                <SoLineDelReqItem data={item} />
              ))}
            </SubCard>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default SalesOrderLineDetailsGeneral;
