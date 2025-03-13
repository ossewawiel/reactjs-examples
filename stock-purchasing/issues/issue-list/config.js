import { optColumnObject, optFilterObject } from 'src/utils/utility-functions';
import {
  useGetItemClassLookupQuery,
  useGetLocationLookupQuery,
  useGetLookupItemQuery,
} from 'src/store/api/codeLookupApi';
import { useGetMetaItemTypesQuery } from 'src/store/api/commonApi';
import { useGetMetaIssueSearchToQuery } from "../../../../store/api/issueApis/issueSearchApi";


export const columns = [
  optColumnObject({
    id: 'itemCode',
    label: 'Item Code',
  }),
  optColumnObject({
    id: 'whenIssued',
    label: 'Issued at',
    variant: 'date-time',
  }),
  optColumnObject({
    id: 'quantity',
    label: 'Quantity',
    variant: 'number',
    align: 'right',
    properties: {
      decimals: 2,
      dashIfZero: true,
    },
  }),
  optColumnObject({
    id: 'issuedTo',
    label: 'Issued To',
    variant: 'concat',
    properties: {
      items: [
        {
          id: 'issueTo',
          format: (value) => {
            // console.log(`format: value = ${value}`);
            if (value === 'WORK_ORDER') {
              return 'W/O';
            }
            if (value === 'SALES_ORDER') {
              return 'S/O';
            }
            if (value === 'MISCELLANEOUS') {
              return 'Misc';
            }
            if (value === 'RECEIPT') {
              return 'Receipt';
            }

            return value;
          },
        },
        {
          id: 'issueToDescription',
        },
      ],
    },
  }),
  optColumnObject({
    id: 'totalCosts',
    label: 'Total cost',
    variant: 'currency',
    align: 'right',
  }),
  optColumnObject({
    id: 'locationCode',
    label: 'Location',
    variant: 'api-lookup',
    properties: {
      keyId: 'code',
      valueId: 'name',
      display: 'value-as-tooltip',
      lookupHook: useGetLocationLookupQuery,
    },
  }),
  optColumnObject({
    id: 'binReference',
    label: 'Bin',
  }),
  optColumnObject({
    id: 'stockOnHandId',
    label: 'Stock id',
    align: 'right',
  }),
  optColumnObject({
    id: 'note',
    label: 'Note',
  }),
  optColumnObject({
    id: 'createdBy',
    label: 'Created by',
  }),
  optColumnObject({
    id: 'id',
    label: '#',
    align: 'right',
  }),
];

export const filterControls = [
  {
    name: 'Page 1',
    children: [
      optFilterObject({
        id: 'itemType',
        label: 'Item Type',
        variant: 'api-lookup',
        properties: {
          keyId: 'name',
          valueId: 'value',
          hook: useGetMetaItemTypesQuery,
        },
      }),
      optFilterObject({
        id: 'itemCode',
        label: 'Item Code',
        variant: 'autocomplete',
        properties: {
          type: 'code-lookup',
          hook: useGetLookupItemQuery,
        },
      }),
      optFilterObject({
        id: 'classCode',
        label: 'Item Class',
        variant: 'api-lookup',
        properties: {
          keyId: 'code',
          valueId: 'name',
          hook: useGetItemClassLookupQuery,
        },
      }),
      optFilterObject({
        id: 'dateIssued',
        label: 'Issued Between',
        variant: 'date-range',
        properties: {
          idFrom: 'dateIssuedFrom',
          idTo: 'dateIssuedTo',
        },
      }),
      optFilterObject({
        id: 'sourceReceiptId',
        label: 'Source Receipt Id',
        md: 6,
      }),
      optFilterObject({
        id: 'issSearchTo',
        label: 'Issued To',
        md: 6,
        variant: 'api-lookup',
        properties: {
          keyId: 'name',
          valueId: 'value',
          hook: useGetMetaIssueSearchToQuery,
        },
      }),
    ],
  },
];
