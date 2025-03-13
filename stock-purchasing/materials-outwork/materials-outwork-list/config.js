import { optColumnObject, optFilterObject } from 'src/utils/utility-functions';
import {
  useGetItemAnalysisLookupQuery,
  useGetItemClassLookupQuery,
  useGetLookupPlAnalysisQuery,
  useGetProductGroupLookupQuery,
  useGetSupplierLookupQuery,
} from 'src/store/api/codeLookupApi';
import { useGetMetaItemTypesQuery } from 'src/store/api/commonApi';

export const columns = [
  optColumnObject({
    id: 'code',
    label: 'Item Code',
    variant: 'text',
  }),
  optColumnObject({
    id: 'description',
    label: 'Description',
    variant: 'concat',
    properties: {
      items: [
        { id: 'description' },
        { id: 'description2' },
        { id: 'description3' },
      ],
      direction: 'column',
    },
  }),
  optColumnObject({
    id: 'custPartNumber',
    label: 'Customer Part Reference',
    variant: 'text',
    align: 'right',
    properties: {
      dashIfEmpty: true,
    },
  }),
  optColumnObject({
    id: 'classCode',
    label: 'Class Code',
    variant: 'text',
  }),
  optColumnObject({
    id: 'unallocatedStock',
    label: 'Unallocated Stock',
    variant: 'number',
    align: 'right',
    properties: {
      dashIfZero: true,
    },
  }),
  optColumnObject({
    id: 'allocatedStock',
    label: 'Allocated Stock',
    variant: 'number',
    align: 'right',
    properties: {
      dashIfZero: true,
    },
  }),
  optColumnObject({
    id: 'quarantinedStock',
    label: 'Quarantined Stock',
    variant: 'number',
    align: 'right',
    properties: {
      dashIfZero: true,
    },
  }),
  optColumnObject({
    id: 'totalStock',
    label: 'Total Stock',
    variant: 'number',
    align: 'right',
    properties: {
      mathFunc: (rowData) =>
        rowData.unallocatedStock +
        rowData.allocatedStock +
        rowData.quarantinedStock,
      dashIfZero: true,
    },
  }),
  optColumnObject({
    id: 'unitCode',
    label: 'Unit',
    variant: 'text',
    properties: {
      dashIfEmpty: true,
    },
  }),
];

export const filterControls = [
  {
    name: 'Page 1',
    children: [
      optFilterObject({
        id: 'activeOnly',
        label: 'Active Only',
        variant: 'yes-no',
        md: 6,
      }),
      optFilterObject({
        id: 'itemTypeSearch',
        label: 'Item Type',
        variant: 'api-lookup',
        md: 6,
        properties: {
          keyId: 'name',
          valueId: 'value',
          allowEmpty: false,
          hook: useGetMetaItemTypesQuery,
        },
      }),
      optFilterObject({
        id: 'classCode',
        label: 'Item Class',
        variant: 'api-lookup',
        md: 6,
        properties: {
          keyId: 'code',
          valueId: 'name',
          hook: useGetItemClassLookupQuery,
        },
      }),
      optFilterObject({
        id: 'productGroupCode',
        label: 'Item Analysis',
        variant: 'api-lookup',
        md: 6,
        properties: {
          keyId: 'code',
          valueId: 'name',
          hook: useGetItemAnalysisLookupQuery,
        },
      }),
      optFilterObject({
        id: 'plAnalysis',
        label: 'P/L Analysis',
        md: 6,
        variant: 'api-lookup',
        properties: {
          keyId: 'code',
          valueId: 'name',
          hook: useGetLookupPlAnalysisQuery,
        },
      }),
      optFilterObject({
        id: 'catalogueProductGroup',
        label: 'Product Group',
        variant: 'api-lookup',
        md: 6,
        properties: {
          keyId: 'code',
          valueId: 'name',
          hook: useGetProductGroupLookupQuery,
        },
      }),
      optFilterObject({
        id: 'itemCodePattern',
        label: 'Item code pattern',
        variant: 'text',
      }),
      optFilterObject({
        id: 'itemNamePattern',
        label: 'Item name pattern',
        variant: 'text',
      }),
      optFilterObject({
        id: 'custPartNumberPattern',
        label: 'Customer part ref.',
        variant: 'text',
      }),
      optFilterObject({
        id: 'supplierCode',
        label: 'Supplier Code',
        variant: 'api-lookup',
        properties: {
          keyId: 'code',
          valueId: 'name',
          hook: useGetSupplierLookupQuery,
        },
      }),
    ],
  },
];
export const searchFields = [
  'code',
  'description',
  'description2',
  'description3',
  'classCode',
  'custPartNumber',
];
