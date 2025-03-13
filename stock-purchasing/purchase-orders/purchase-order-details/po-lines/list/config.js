import { optColumnObject } from '../../../../../../utils/utility-functions';
import { useGetPolStatusQuery } from '../../../../../../store/api/purchaseOrderApis/purchaseOrderLineSearchServerApi';
import {
  useGetItemAnalysisLookupQuery,
  useGetProductGroupLookupQuery,
} from '../../../../../../store/api/codeLookupApi';
import { purchaseOrderLineSearchServer } from '../../../../../../store/api/purchaseOrderApis/purchaseOrderLineSearchServerApi';

export const columns = [
  optColumnObject({
    id: 'line',
    label: 'Line',
    variant: 'number',
  }),
  optColumnObject({
    id: 'status',
    label: 'Status',
    variant: 'api-lookup',
    properties: {
      keyId: 'name',
      valueId: 'value',
      display: 'value-as-tooltip',
      lookupHook: useGetPolStatusQuery,
    },
  }),
  optColumnObject({
    id: 'itemCode',
    label: 'Item code',
    variant: 'text',
  }),
  optColumnObject({
    id: 'quantity',
    label: 'Quantity ordered',
    variant: 'number',
    align: 'right',
    properties: {
      dashIfZero: true,
    },
  }),
  optColumnObject({
    id: 'unitCode',
    label: 'Unit',
    variant: 'text',
  }),
  optColumnObject({
    id: 'expectedAt',
    label: 'Expected',
    variant: 'date-time',
  }),
  optColumnObject({
    id: 'qtyReceived',
    label: 'Quantity received',
    variant: 'number',
    align: 'right',
    properties: {
      decimals: 2,
      dashIfZero: true,
    },
  }),
  optColumnObject({
    id: 'qtyRemaining',
    label: 'Quantity remaining',
    variant: 'number',
    align: 'right',
    properties: {
      mathFunc: (rowData) => rowData.quantity + rowData.qtyReceived,
      dashIfZero: true,
      decimals: 2,
    },
  }),
  optColumnObject({
    id: 'surplusQuantity',
    label: 'Surplus quantity',
    variant: 'number',
    align: 'right',
    properties: {
      mathFunc: (rowData) => rowData.qtyReceived - rowData.baseQuantity,
      decimals: 2,
      dashIfZero: true,
    },
  }),
  optColumnObject({
    id: 'lineValue',
    label: 'Line value',
    variant: 'number',
    align: 'right',
    properties: {
      dashIfZero: true,
      decimals: 2,
    },
  }),
  optColumnObject({
    id: 'productGroup',
    label: 'Item analysis',
    variant: 'api-lookup',
    properties: {
      keyId: 'code',
      valueId: 'name',
      display: 'code-as-tooltip',
      lookupHook: useGetItemAnalysisLookupQuery,
    },
  }),
];
