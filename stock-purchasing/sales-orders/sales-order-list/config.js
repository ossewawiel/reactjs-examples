import { optColumnObject, optFilterObject } from 'src/utils/utility-functions';
import {
  useGetCustomerLookupQuery,
  useGetLocationLookupQuery,
  useGetLookupRepresentativesQuery,
  useGetLookupSalesOrderTypeQuery,
  useGetLookupSellerTypeQuery,
} from 'src/store/api/codeLookupApi';
import {
  useGetSalesOrderAccountTypeQuery,
  useGetSalesOrderSearchStatusQuery,
  useGetSalesOrderStatusTypeQuery,
} from 'src/store/api/salesOrderApis/salesOrderSearchServerApi';

export const columns = [
  optColumnObject({
    id: 'number',
    label: 'Sales Order',
    align: 'right',
  }),
  optColumnObject({
    id: 'soType',
    label: 'Sales Order Type',
    properties: {
      dashIfEmpty: 'true',
    },
  }),
  optColumnObject({
    id: 'webToPrintNum',
    label: 'Web to Print',
    align: 'right',
  }),
  optColumnObject({
    id: 'customer',
    label: 'Customer code',
    variant: 'text',
  }),
  optColumnObject({
    id: 'orderCode',
    label: 'Order reference',
    variant: 'text',
    properties: {
      dashIfEmpty: 'true',
    },
  }),
  optColumnObject({
    id: 'status',
    label: 'Status',
    variant: 'colour-status',
    properties: {
      keyId: 'name',
      valueId: 'value',
      lookupHook: useGetSalesOrderStatusTypeQuery,
      customProps: {
        NOT_DEL: 'orange',
        PART_DEL: 'grey',
        FULL_DEL: 'blue',
        FULL_INV: 'green',
        CANCELLED: 'red',
      },
    },
  }),
  optColumnObject({
    id: 'dateRaised',
    label: 'Date raised',
    variant: 'date-time',
  }),
  optColumnObject({
    id: 'clerk',
    label: 'Clerk',
    variant: 'text',
  }),
];

export const filterControls = [
  {
    name: 'Page 1',
    children: [
      optFilterObject({
        id: 'requiredCustomer',
        label: 'Customer',
        variant: 'autocomplete',
        properties: {
          type: 'code-lookup',
          hook: useGetCustomerLookupQuery,
        },
      }),
      optFilterObject({
        id: 'requiredOrderPattern',
        label: 'Order ref. pattern',
        variant: 'text',
      }),
      optFilterObject({
        id: 'requiredSoType',
        label: 'S/O type',
        variant: 'api-lookup',
        properties: {
          keyId: 'code',
          valueId: 'name',
          allowEmpty: false,
          hook: useGetLookupSalesOrderTypeQuery,
        },
      }),
      optFilterObject({
        id: 'requiredRep',
        label: 'Representative',
        variant: 'api-lookup',
        md: 6,
        properties: {
          keyId: 'code',
          valueId: 'name',
          hook: useGetLookupRepresentativesQuery,
        },
      }),
      optFilterObject({
        id: 'requiredClerk',
        label: 'Clerk',
        variant: 'api-lookup',
        md: 6,
        properties: {
          keyId: 'code',
          valueId: 'name',
          hook: useGetLookupSellerTypeQuery,
        },
      }),
      optColumnObject({
        id: 'requiredLocation',
        label: 'Location',
        variant: 'api-lookup',
        properties: {
          keyId: 'code',
          valueId: 'name',
          display: 'value-as-tooltip',
          hook: useGetLocationLookupQuery,
        },
      }),
      optFilterObject({
        id: 'raisedDates',
        label: 'Raised between',
        variant: 'date-range',
        properties: {
          idFrom: 'earliestRaisedDate',
          idTo: 'latestRaisedDate',
        },
      }),
      optFilterObject({
        id: 'requiredSearchStatus',
        label: 'Status',
        variant: 'api-lookup',
        properties: {
          keyId: 'name',
          valueId: 'value',
          allowEmpty: false,
          hook: useGetSalesOrderSearchStatusQuery,
        },
      }),
      optFilterObject({
        id: 'requiredAccountType',
        label: 'Type of account',
        variant: 'api-lookup',
        properties: {
          keyId: 'name',
          valueId: 'value',
          allowEmpty: false,
          hook: useGetSalesOrderAccountTypeQuery,
        },
      }),
    ],
  },
];
export const searchFields = [
  'number',
  'soType',
  'customer',
  'orderCode',
  'clerk',
];
