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
    variant: 'number',
    align: 'right',
  }),
  optColumnObject({
    id: 'soType',
    label: 'S/O Type',
    variant: 'api-lookup',
    properties: {
      keyId: 'code',
      valueId: 'name',
      type: 'code-lookup',
      lookupHook: useGetLookupSalesOrderTypeQuery,
    },
  }),
  optColumnObject({
    id: 'orderCode',
    label: 'Order Reference',
    variant: 'text',
  }),
  optColumnObject({
    id: 'webToPrintNum',
    label: 'Web to Print',
    variant: 'number',
    align: 'right',
  }),
  optColumnObject({
    id: 'customer',
    label: 'Customer code',
    variant: 'text',
  }),
  optColumnObject({
    id: 'customerName',
    label: 'Customer name',
    variant: 'text',
  }),
  optColumnObject({
    id: 'deliveryAddress',
    label: 'Delivery Address',
    variant: 'text',
  }),
  optColumnObject({
    id: 'location',
    label: 'Location',
    variant: 'text',
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
  optColumnObject({
    id: 'representative',
    label: 'Representative',
    variant: 'text',
  }),
  optColumnObject({
    id: 'accountType',
    label: 'Account type',
    variant: 'api-lookup',
    properties: {
      keyId: 'name',
      valueId: 'description',
      lookupHook: useGetSalesOrderAccountTypeQuery,
    },
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
        id: 'requiredSearchStatus',
        label: 'S/O Status',
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
      optFilterObject({
        id: 'requiredOrderPattern',
        label: 'Order ref. pattern',
        variant: 'text',
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
