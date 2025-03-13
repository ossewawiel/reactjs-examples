'use client';

import { Divider, Grid } from '@mui/material';
import ErrorIcon from '@mui/icons-material/Error';
import * as React from 'react';
import {
  OptHeaderCard,
  OptHeaderCardItem,
} from '../../../../components/optCards';
import { useIntl } from 'react-intl';
import {
  OptHeaderCardDateTime,
  OptHeaderCardYesNoItem,
} from '../../../../components/optCards/OptHeaderCard';
import { useTheme } from '@mui/material/styles';
import PropertiesCard from '../../../../components/cards/propertiescard';
import { useGetSourceTypeQuery } from '../../../../store/api/jobApis/jobServerApi';
import { useGetSOLIssueStatusQuery } from '../../../../store/api/salesOrderApis/salesOrderServerApi';
import { useGetItemHandlingInfoQuery } from '../../../../store/api/ItemApis/ItemServerApi';
import SubCard from '../../../../ui-component/cards/SubCard';
import {
  ComponentItem,
  ReturnItem,
  SoLineItem,
} from '../../../../ui-component/entity-list-card';
import { useGetItemsListQuery } from '../../../../store/api/ItemApis/itemSearchServerApi';
import {
  useGetLocationLookupQuery,
  useGetSupplierLookupQuery,
} from '../../../../store/api/codeLookupApi';
import InfoCard from '../../../../components/cards/info-card';
import TerminalTwoToneIcon from "@mui/icons-material/TerminalTwoTone";

const infoCardConfig = {
  header: {
    icon: ErrorIcon,
    title: {
      id: 'issueId',
      defaultMessage: 'Issue Id: {issueId}',
      placeholders: {
        issueId: 'issueId',
      },
    },
    subtitle: {
      id: '{salesOrderNumber}',
      defaultMessage: 'S/O Number: {salesOrderNumber}',
      placeholders: {
        salesOrderNumber: 'salesOrderNumber',
      },
    },
  },
  items: [
    {
      id: 'stockOnHandId',
      label: 'Stock Id',
      variant: 'number',
    },
    {
      id: 'itemCode',
      label: 'Item',
      variant: 'api-lookup',
      properties: {
        lookupHook: useGetItemsListQuery,
        keyId: 'code',
        valueId: 'description',
      },
    },
    {
      id: 'supplierCode',
      label: 'Supplier',
      variant: 'api-lookup',
      properties: {
        lookupHook: useGetSupplierLookupQuery,
        keyId: 'code',
        valueId: 'name',
      },
    },
    {
      id: 'locationCode',
      label: 'Location',
      variant: 'api-lookup',
      properties: {
        lookupHook: useGetLocationLookupQuery,
        keyId: 'code',
        valueId: 'name',
      },
    },
    {
      id: 'binReference',
      label: 'Bin',
      variant: 'number',
    },
    {
      id: 'returnedStockOnHandId',
      label: 'Returned Stock Id',
      variant: 'number',
    },
    {
      id: 'receiptId',
      label: 'Receipt',
      variant: 'number',
    },
    {
      id: 'requisitionId',
      label: 'Requisition Id',
      variant: 'number',
    },
    {
      id: 'orderReference',
      label: 'Order No.',
      variant: 'number',
    },
  ],
  footerItems: [
    {
      id: 'whenIssued',
      label: 'Issued',
      variant: 'date-time-by',
      properties: {
        by: 'createdBy',
      },
    },
    {
      id: 'updatedOn',
      label: 'Updated',
      variant: 'date-time-by',
      properties: {
        by: 'updatedBy',
      },
    },
    {
      id: 'deliveryNotePrintedOn',
      label: 'Printed',
      variant: 'date-time-by',
      properties: {
        by: 'deliveryNotePrintedBy',
      },
    },
  ],
};

const propertiesCardConfig = {
  header: 'Properties',
  properties: [
    {
      id: 'salesOrderNumber',
      label: 'Sales Order',
      emptyDash: true,
    },
    {
      id: 'salesOrderLineNumber',
      label: 'Line',
      emptyDash: true,
    },
    {
      id: 'invoiceSectionId',
      label: 'Invoice',
      emptyDash: true,
    },
    {
      id: 'solIssueStatus',
      label: 'Sales Order Status',
      variant: 'api-lookup',
      emptyDash: true,
      properties: {
        valueId: 'value',
        lookupHook: useGetSOLIssueStatusQuery,
        keyId: 'name',
      },
    },
    {
      id: 'deliveryRequirementId',
      label: 'Delivery Req',
      emptyDash: true,
    },
    {
      id: 'pickingListId',
      label: 'Picklist',
      emptyDash: true,
    },
    {
      id: 'manifestId',
      label: 'Manifest',
      emptyDash: true,
    },
    {
      id: 'deliveryNoteId',
      label: 'Delivery',
      emptyDash: true,
    },
  ],
};

const costsCardConfig = {
  header: 'Costs',
  properties: [
    {
      id: 'baseQuantity',
      label: 'Quantity Issued',
      emptyDash: true,
      variant: 'concatenated',
      properties: {
        keys: ['baseQuantity', 'unitCode'],
      },
    },
    {
      id: 'baseQuantityReturned',
      label: 'Quantity Returned',
      emptyDash: true,
      properties: {
        fields: ['baseQuantityReturned', 'unitCode'],
      },
    },
    {
      id: 'baseUnitCost',
      label: 'Issue Cost',
      emptyDash: true,
      variant: 'currency',
    },
    {
      id: 'handling',
      label: 'Handling',
      emptyDash: true,
    },
    {
      id: 'handlingCost',
      label: 'Handling Cost',
      emptyDash: true,
      variant: 'currency',
    },
    {
      id: 'totalCost',
      label: 'Total Cost',
      emptyDash: true,
      variant: 'currency',
    },
    {
      id: 'note',
      label: 'Note',
      emptyDash: true,
    },
  ],
};

// eslint-disable-next-line react/prop-types
const SalesOrderIssueDetailsGeneral = (props) => {
  const isLoading = props.isLoading;
  const issueInfo = props.issueInfo;
  const intl = useIntl();
  const l10n = (val) => intl.formatMessage({ id: val });
  const theme = useTheme();

  const { data: handlingInfo = {} } = useGetItemHandlingInfoQuery({
    itemCode: issueInfo.itemCode,
  });

  const data = { ...issueInfo };
  Object.keys(data).forEach((key) => {
    if (data[key] === 0 || data[key] === '') {
      data[key] = '-';
    }
  });
  console.log(`prop card info - ${JSON.stringify(propertiesCardConfig)}`);


  const componentList = data.componentItemInfoList || [];
  const returnList = data.issueReturnInfoList || [];
  // console.log(`properties - ${JSON.stringify(handlingInfo)}`);
  return (
    <Grid container direction="row" spacing={1}>
      <Grid item md={8}>
        <Grid container direction="column" spacing={1}>
          <Grid item>
            <InfoCard
              values={data}
              config={infoCardConfig}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item>
            <Grid container direction="row" spacing={1}>
              <Grid item md={6}>
                <PropertiesCard
                  config={propertiesCardConfig}
                  values={issueInfo}
                  isLoading={isLoading}
                />
              </Grid>
              <Grid item md={6}>
                <PropertiesCard
                  config={costsCardConfig}
                  values={issueInfo}
                  isLoading={isLoading}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item md={4}>
        <Grid container direction="column" spacing={1}>
          <Grid item>
            <SubCard
              title={intl.formatMessage({ id: 'Component' })}
              sx={{
                background:
                  theme.palette.mode === 'dark'
                    ? theme.palette.dark.main
                    : theme.palette.grey[100],
              }}
            >
              {componentList.map((item) => (
                <ComponentItem data={item} />
              ))}
            </SubCard>
          </Grid>
          <Grid item>
            <SubCard
              title={intl.formatMessage({ id: 'Return' })}
              sx={{
                background:
                  theme.palette.mode === 'dark'
                    ? theme.palette.dark.main
                    : theme.palette.grey[100],
              }}
            >
              {returnList.map((item) => (
                <ReturnItem data={item} />
              ))}
            </SubCard>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default SalesOrderIssueDetailsGeneral;
