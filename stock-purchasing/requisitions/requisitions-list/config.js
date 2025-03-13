import { optColumnObject, optFilterObject } from 'src/utils/utility-functions';
import {
  useGetCustomerLookupQuery,
  useGetDepartmentLookupQuery,
  useGetItemClassLookupQuery,
  useGetSupplierLookupQuery,
  useGetUserLookupQuery,
  useGetActivityLookupQuery,
} from 'src/store/api/codeLookupApi';
import { useGetItemsListQuery } from 'src/store/api/ItemApis/itemSearchServerApi';
import {
  useGetRequisitionsSearchTypeQuery,
  useGetRequisitionsStatusTypeQuery,
} from 'src/store/api/reqSearchServerApi';
import { useGetMetaItemTypesQuery } from 'src/store/api/commonApi';

export const columns = [
  optColumnObject({
    id: 'itemCode',
    label: 'Item Code',
    variant: 'item-lookup',
    properties: {
      keyId: 'description',
      valueId: 'code',
      display: 'desc-as-tooltip',
      lookupHook: useGetItemsListQuery,
    },
  }),
  optColumnObject({
    id: 'qtyRequired',
    label: `Qty req'd`,
    variant: 'number',
    align: 'right',
    properties: {
      dashIfZero: 'true',
      decimals: 2,
    },
  }),
  optColumnObject({
    id: 'unitCode',
    label: 'Unit',
    variant: 'text',
  }),
  optColumnObject({
    id: 'whenRaised',
    label: 'Raised',
    variant: 'date-time',
  }),
  optColumnObject({
    id: 'reqForDescription',
    label: 'For',
    variant: 'text',
  }),
  // optColumnObject({
  // }),
  // optColumnObject({
  // }),
  optColumnObject({
    id: 'isFulfilled',
    label: 'Fulfilled',
    variant: 'yes-no',
  }),
  optColumnObject({
    id: 'whenRequired',
    label: `When req'd`,
    variant: 'date-time',
  }),
  optColumnObject({
    id: 'qtyToOrder',
    label: 'To order',
    variant: 'number',
    align: 'right',
    properties: {
      dashIfZero: 'true',
      decimals: 2,
    },
  }),
  optColumnObject({
    id: 'qtyOnOrder',
    label: 'On order',
    variant: 'number',
    align: 'right',
    properties: {
      dashIfZero: 'true',
      decimals: 2,
    },
  }),
  optColumnObject({
    id: 'qtyAllocated',
    label: 'Allocated',
    variant: 'number',
    align: 'right',
    properties: {
      dashIfZero: 'true',
      decimals: 2,
    },
  }),
  optColumnObject({
    id: 'qtyCommitted',
    label: 'Committed',
    variant: 'number',
    align: 'right',
    properties: {
      dashIfZero: 'true',
      decimals: 2,
    },
  }),
  optColumnObject({
    id: 'value',
    label: 'Value',
    variant: 'number',
    align: 'right',
    properties: {
      dashIfZero: 'true',
      decimals: 2,
    },
  }),
  optColumnObject({
    id: 'creator',
    label: 'Created by',
    variant: 'text',
    properties: {
      dashIfEmpty: 'true',
    },
  }),
  optColumnObject({
    id: 'id',
    label: 'Id',
    variant: 'text',
  }),
];

export const filterControls = [
  {
    name: 'Page 1',
    children: [
      optFilterObject({
        id: 'status',
        label: 'Status',
        variant: 'api-lookup',
        md: 6,
        properties: {
          keyId: 'name',
          valueId: 'value',
          allowEmpty: false,
          hook: useGetRequisitionsStatusTypeQuery,
        },
      }),
      optFilterObject({
        id: 'itemTypeSearch',
        label: 'Item type',
        variant: 'api-lookup',
        md: 6,
        properties: {
          keyId: 'name',
          valueId: 'value',
          allowEmpty: false,
          hook: useGetMetaItemTypesQuery,
          hideFunc: (values) => values.classCode !== 'INK',
        },
      }),
      optFilterObject({
        id: 'itemCode',
        label: 'Item code',
        variant: 'autocomplete',
        properties: {
          type: 'item-lookup',
          showCode: false,
          hook: useGetItemsListQuery,
        },
      }),
      optFilterObject({
        id: 'classCode',
        label: 'Item class code',
        variant: 'api-lookup',
        md: 6,
        properties: {
          keyId: 'code',
          valueId: 'name',
          allowEmpty: false,
          hook: useGetItemClassLookupQuery,
        },
      }),
      optFilterObject({
        id: 'supplierCode',
        label: 'Supplier',
        variant: 'api-lookup',
        md: 6,
        properties: {
          keyId: 'code',
          valueId: 'name',
          allowEmpty: false,
          hook: useGetSupplierLookupQuery,
        },
      }),
      optFilterObject({
        id: 'deliverToThirdParty',
        label: 'Deliver to 3rd party',
        variant: 'yes-no',
      }),
      optFilterObject({
        id: 'raisedDates',
        label: 'Raised between',
        variant: 'date-range',
        properties: {
          idFrom: 'dateRaisedFrom',
          idTo: 'dateRaisedTo',
        },
      }),
      optFilterObject({
        id: 'requiredDates',
        label: 'Required between',
        variant: 'date-range',
        properties: {
          idFrom: 'dateRequiredFrom',
          idTo: 'dateRequiredTo',
        },
      }),
      optFilterObject({
        id: 'creator',
        label: 'Created by',
        variant: 'api-lookup',
        properties: {
          keyId: 'code',
          valueId: 'name',
          allowEmpty: false,
          hook: useGetUserLookupQuery,
        },
      }),
    ],
  },
  {
    name: 'Page 2',
    children: [
      optFilterObject({
        id: 'estimatedValues',
        label: 'Estimated Values between',
        variant: 'number-range',
        properties: {
          idFrom: 'minValue',
          idTo: 'maxValue',
          decimals: 2,
        },
      }),
      optFilterObject({
        id: 'requiredValues',
        label: 'Required quantity between',
        disable: (values) => values.classCode === '' && values.itemCode === '',
        variant: 'number-range',
        properties: {
          idFrom: 'minQtyRequired',
          idTo: 'maxQtyRequired',
          decimals: 2,
        },
      }),
      optFilterObject({
        id: 'onOrdersValue',
        label: 'On order quantity between',
        variant: 'number-range',
        disable: (values) => values.classCode === '' && values.itemCode === '',
        properties: {
          idFrom: 'minQtyOnOrder',
          idTo: 'maxQtyOnOrder',
          decimals: 2,
        },
      }),
      optFilterObject({
        id: 'notePattern',
        label: 'Note pattern',
        variant: 'text',
      }),
      optFilterObject({
        id: 'reqTypeSearch',
        label: 'Requisitions for',
        variant: 'api-lookup',
        properties: {
          keyId: 'name',
          valueId: 'value',
          allowEmpty: false,
          hook: useGetRequisitionsSearchTypeQuery,
        },
      }),
      optFilterObject({
        id: 'custCode',
        label: 'Customer',
        hide: 'true',
        variant: 'autocomplete',
        hideFunc: (values) => values.reqTypeSearch !== 'CUST',
        properties: {
          type: 'code-lookup',
          hook: useGetCustomerLookupQuery,
          dependentField: 'reqTypeSearch',
          dependentValue: 'CUST',
        },
      }),
      optFilterObject({
        id: 'jobNumber',
        label: 'Job Number',
        variant: 'number',
        hideFunc: (values) => values.reqTypeSearch !== 'JOB',
      }),
      optFilterObject({
        id: 'woNumber',
        label: 'Works order Number',
        variant: 'number',
        hideFunc: (values) => values.reqTypeSearch !== 'WO',
      }),
      optFilterObject({
        id: 'activity',
        label: 'Activity',
        variant: 'api-lookup',
        hideFunc: (values) => values.reqTypeSearch !== 'WO',
        properties: {
          keyId: 'code',
          valueId: 'name',
          display: 'value-as-tooltip',
          hook: useGetActivityLookupQuery,
        },
      }),
      optFilterObject({
        id: 'department',
        label: 'Department',
        variant: 'api-lookup',
        hideFunc: (values) => values.reqTypeSearch !== 'DEPT',
        properties: {
          keyId: 'number',
          valueId: 'name',
          hook: useGetDepartmentLookupQuery,
        },
      }),
      optFilterObject({
        id: 'soNumber',
        label: 'Sales order Number',
        variant: 'number',
        hideFunc: (values) => values.reqTypeSearch !== 'SALES_ORDER',
      }),
    ],
  },
];
export const searchFields = ['id', 'itemCode', 'unitCode', 'reqForDescription'];
