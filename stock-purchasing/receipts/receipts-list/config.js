import { optColumnObject, optFilterObject } from 'src/utils/utility-functions';
import {
  useGetItemClassLookupQuery,
  useGetLocationLookupQuery,
} from 'src/store/api/codeLookupApi';
import { useGetPurchaseOrderLineListQuery } from 'src/store/api/purchaseOrderApis/purchaseOrderLineSearchServerApi';
import { useGetItemListQuery } from 'src/store/api/ItemApis/itemSearchServerApi';
import {
  useGetInvoicedStatusQuery,
  useGetReceiptTypeQuery,
  useGetReturnsStatusQuery,
} from 'src/store/api/receiptSearchServerApi';

export const columns = [
  optColumnObject({
    id: 'itemCode',
    label: 'Item Code',
    variant: 'text',
    align: 'left',
  }),
  optColumnObject({
    id: 'dateReceived',
    label: 'Received',
    variant: 'date-time',
  }),
  optColumnObject({
    id: 'quantity',
    label: 'Quantity',
    variant: 'number',
    properties: {
      decimals: 2,
    },
  }),
  optColumnObject({
    id: 'unitCode',
    label: 'Unit',
    variant: 'text',
  }),
  optColumnObject({
    id: 'totalValue',
    label: 'Total Value',
    variant: 'number',
  }),
  optColumnObject({
    id: 'locationCode',
    label: 'Location',
    variant: 'text',
  }),
  optColumnObject({
    id: 'receiptSourceDescription',
    label: 'Source',
    variant: 'text',
  }),
  optColumnObject({
    id: 'creator',
    label: 'Creator',
    variant: 'text',
    properties: {
      dashIfEmpty: true,
    },
  }),
  optColumnObject({
    id: 'id',
    label: 'Id',
    variant: 'number',
  }),
  optColumnObject({
    id: 'quantityIssued',
    label: 'Issued',
    variant: 'number',
    properties: {
      decimals: 2,
    },
  }),
  optColumnObject({
    id: 'quantityReturned',
    label: 'Returned',
    variant: 'number',
    properties: {
      decimals: 2,
    },
  }),
  optColumnObject({
    id: 'barcode',
    label: 'Barcode',
    variant: 'text',
  }),
];

export const filterControls = [
  {
    name: 'Page 1',
    children: [
      optFilterObject({
        id: 'receivedDates',
        label: 'Received between',
        variant: 'date-range',
        properties: {
          idFrom: 'dateReceivedFrom',
          idTo: 'dateReceivedTo',
        },
      }),
      optFilterObject({
        id: 'itemCode',
        label: 'Item Code',
        variant: 'api-lookup',
        properties: {
          keyId: 'code',
          valueId: 'description',
          hook: useGetItemListQuery,
          list: true,
        },
      }),
      optFilterObject({
        id: 'poLine',
        label: 'P/O Line',
        variant: 'api-lookup',
        md: 6,
        properties: {
          keyId: 'poNum',
          valueId: 'itemCode',
          hook: useGetPurchaseOrderLineListQuery,
          list: true,
        },
      }),
      optFilterObject({
        id: 'itemClassCode',
        label: 'Item class code',
        variant: 'api-lookup',
        md: 6,
        properties: {
          keyId: 'code',
          valueId: 'name',
          hook: useGetItemClassLookupQuery,
        },
      }),
      optColumnObject({
        id: 'locationCode',
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
        id: 'batchRefPattern',
        label: 'Batch ref. pattern',
        variant: 'text',
      }),
      optFilterObject({
        id: 'barcodePattern',
        label: 'Barcode ref. pattern',
        variant: 'text',
      }),
      optFilterObject({
        id: 'source',
        label: 'Source of items',
        variant: 'api-lookup',
        properties: {
          keyId: 'name',
          valueId: 'value',
          allowEmpty: false,
          hook: useGetReceiptTypeQuery,
        },
      }),
    ],
  },
  {
    name: 'Page 2',
    children: [
      // optFilterObject({
      //     id: 'qtyGreater',
      //     label: 'Quantity',
      //     variant: 'yes-no'
      // }),
      // optFilterObject({
      //     id: 'quantity',
      //     label: '',
      //     variant: 'number'
      // }),
      // optFilterObject({
      //     id: 'unitCode',
      //     label: '',
      //     variant: 'text',
      //     disable: (values) => values.itemClassCode === '' && values.itemCode === '',
      //     unitFunc: (values) => {
      //         if (values.itemCode === '') {
      //             // eslint-disable-next-line react-hooks/rules-of-hooks
      //             const { data: unit = {} } = useGetUnitLookupQuery({ code: values.itemClassCode });
      //             return unit.code;
      //         }
      //         // eslint-disable-next-line react-hooks/rules-of-hooks
      //         const { data: unit = {} } = useGetUnitLookupQuery({ code: values.itemCode });
      //         return unit.code;
      //     }
      // }),
      optFilterObject({
        id: 'partlyIssuedOnly',
        label: 'Not fully issued only',
        variant: 'yes-no',
      }),
      optFilterObject({
        id: 'wantReturns',
        label: 'Returns status',
        variant: 'api-lookup',
        properties: {
          keyId: 'name',
          valueId: 'value',
          allowEmpty: false,
          hook: useGetReturnsStatusQuery,
        },
      }),
      optFilterObject({
        id: 'wantInvoiced',
        label: 'Invoiced status',
        variant: 'api-lookup',
        properties: {
          keyId: 'name',
          valueId: 'value',
          allowEmpty: false,
          hook: useGetInvoicedStatusQuery,
        },
      }),
      optFilterObject({
        id: 'wantNonConfirmedOnly',
        label: 'Unconfirmed prices only',
        variant: 'yes-no',
      }),
      optFilterObject({
        id: 'partlyIssuedOnly',
        label: 'Not fully issued only',
        variant: 'yes-no',
      }),
    ],
  },
];
export const searchFields = ['orderNum'];
