import { optColumnObject, optFilterObject } from 'src/utils/utility-functions';
import {
  useGetBuyerLookupQuery,
  useGetDepartmentLookupQuery,
  useGetItemClassLookupQuery,
  useGetSupplierLookupQuery,
} from 'src/store/api/codeLookupApi';
import {
  useGetPoStatusQuery,
  useGetPurchaseOrderStatusTypeQuery,
} from 'src/store/api/purchaseOrderApis/purchaseOrderSearchServer';
import { useGetItemListQuery } from 'src/store/api/ItemApis/itemSearchServerApi';
import {
  useGetJobSearchListQuery,
  useGetWorkOrdersSearchListQuery,
} from 'src/store/api/jobApis/jobSearchServerApi';

export const columns = [
  optColumnObject({
    id: 'orderNum',
    label: 'Order Number',
    align: 'right',
  }),
  optColumnObject({
    id: 'status',
    label: 'Status',
    variant: 'api-lookup',
    properties: {
      keyId: 'name',
      valueId: 'value',
      display: 'value-as-tooltip',
      lookupHook: useGetPoStatusQuery,
    },
  }),
  optColumnObject({
    id: 'poType',
    label: 'Type',
    variant: 'text',
  }),
  optColumnObject({
    id: 'raisedAt',
    label: 'Raised',
    variant: 'date-time',
  }),
  optColumnObject({
    id: 'supplierCode',
    label: 'Supplier',
    variant: 'api-lookup',
    properties: {
      keyId: 'code',
      valueId: 'name',
      display: 'value-as-tooltip',
      lookupHook: useGetSupplierLookupQuery,
    },
  }),
  optColumnObject({
    id: 'value',
    label: 'Value',
    variant: 'number',
    align: 'right',
    properties: {
      decimals: 2,
    },
  }),
  optColumnObject({
    id: 'hasUnconfirmedRecs',
    label: 'Unconfirmed prices for receipts',
    variant: 'yes-no',
    invertedColors: true,
  }),
  optColumnObject({
    id: 'buyerCode',
    label: 'Buyer',
    variant: 'api-lookup',
    properties: {
      keyId: 'code',
      valueId: 'name',
      display: 'value-as-tooltip',
      lookupHook: useGetBuyerLookupQuery,
    },
  }),
  optColumnObject({
    id: 'lastReceipt',
    label: 'Last Receipt',
    variant: 'date-time',
  }),
  optColumnObject({
    id: 'approvedBy',
    label: 'Approved By',
    variant: 'text',
    properties: {
      dashIfEmpty: 'true',
    },
  }),
  optColumnObject({
    id: 'approvedAt',
    label: 'Approved At',
    variant: 'date-time',
  }),
  optColumnObject({
    id: 'printedAt',
    label: 'Printed At',
    variant: 'date-time',
  }),
  optColumnObject({
    id: 'emailedBy',
    label: 'Emailed By',
    variant: 'text',
    properties: {
      dashIfEmpty: 'true',
    },
  }),
  optColumnObject({
    id: 'emailedAt',
    label: 'Emailed At',
    variant: 'date-time',
  }),
];

export const filterControls = [
  {
    name: 'Page 1',
    children: [
      optFilterObject({
        id: 'status',
        label: 'Order Status',
        variant: 'api-lookup',
        md: 6,
        properties: {
          keyId: 'name',
          valueId: 'value',
          allowEmpty: false,
          hook: useGetPoStatusQuery,
        },
      }),
      optFilterObject({
        id: 'poType',
        label: 'Type',
        variant: 'api-lookup',
        md: 6,
        properties: {
          keyId: 'name',
          valueId: 'value',
          allowEmpty: false,
          hook: useGetPurchaseOrderStatusTypeQuery,
        },
      }),
      optFilterObject({
        id: 'buyerCode',
        label: 'Buyer',
        variant: 'api-lookup',
        md: 6,
        properties: {
          keyId: 'code',
          valueId: 'name',
          hook: useGetBuyerLookupQuery,
        },
      }),
      optFilterObject({
        id: 'supplier',
        label: 'Supplier',
        variant: 'api-lookup',
        md: 6,
        properties: {
          keyId: 'code',
          valueId: 'name',
          hook: useGetSupplierLookupQuery,
        },
      }),
      optFilterObject({
        id: 'itemCode',
        label: 'Item',
        variant: 'autocomplete',
        properties: {
          type: 'code-lookup',
          showCode: true,
          hook: useGetItemListQuery,
        },
      }),
      optFilterObject({
        id: 'itemClassCode',
        label: 'Item Class',
        variant: 'api-lookup',
        properties: {
          keyId: 'code',
          valueId: 'name',
          hook: useGetItemClassLookupQuery,
        },
      }),
      optFilterObject({
        id: 'raisedDates',
        label: 'Raised between',
        variant: 'date-range',
        properties: {
          idFrom: 'earliestRaisedAt',
          idTo: 'latestRaisedAt',
        },
      }),
      optFilterObject({
        id: 'minValue',
        label: 'Minimum order value',
        variant: 'number',
        md: 6,
      }),
      optFilterObject({
        id: 'maxValue',
        label: 'Maximum order value',
        variant: 'number',
        md: 6,
      }),
      optFilterObject({
        id: 'approvedBy',
        label: 'Approved By',
        variant: 'text',
      }),
      optFilterObject({
        id: 'approvedDates',
        label: 'Approved between',
        variant: 'date-range',
        properties: {
          idFrom: 'earliestApprovedAt',
          idTo: 'latestApprovedAt',
        },
      }),
      optFilterObject({
        id: 'canBeApprovedBy',
        label: 'Can be approved by',
        variant: 'text',
      }),
      optFilterObject({
        id: 'jobNumber',
        label: 'Job Number',
        variant: 'api-lookup',
        properties: {
          keyId: 'number',
          valueId: 'title1',
          hook: useGetJobSearchListQuery,
          list: true,
        },
      }),
      optFilterObject({
        id: 'woNumber',
        label: 'Works Order Number',
        variant: 'api-lookup',
        properties: {
          keyId: 'number',
          valueId: 'title1',
          hook: useGetWorkOrdersSearchListQuery,
          list: true,
        },
      }),
      optFilterObject({
        id: 'department',
        label: 'Department',
        variant: 'api-lookup',
        md: 6,
        disable: (values) => values.activity,
        properties: {
          keyId: 'number',
          valueId: 'name',
          hook: useGetDepartmentLookupQuery,
        },
      }),
    ],
  },
];
export const searchFields = ['orderNum'];
