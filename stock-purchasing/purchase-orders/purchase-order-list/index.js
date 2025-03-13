'use client';

import { useAuth } from 'src/contexts/jwt-context';
import { useState } from 'react';
import OptTable from 'src/components/OptTable';
import { optViewCellProps } from 'src/utils/utility-functions';
import { columns, filterControls } from './config';
import { isElectron } from 'src/electron/channels';
import {
  useGetPurchaseOrderDefaultSearchParamsQuery,
  useGetPurchaseOrderListQuery,
} from 'src/store/api/purchaseOrderApis/purchaseOrderSearchServer';
import { useRouter } from 'next/navigation';

const PurchaseOrderList = () => {
  const router = useRouter();
  const auth = useAuth();
  const [rows, setRows] = useState([]);
  const initialFilters = () => {
    const initParams = {};
    return initParams;
  };

  const [filters, setFilters] = useState(initialFilters());

  const { data: defaultFilterParams = {} } =
    useGetPurchaseOrderDefaultSearchParamsQuery();
  const {
    // eslint-disable-next-line no-empty-pattern
    data: purchaseOrders = [],
    isLoading,
    isSuccess,
    isError,
  } = useGetPurchaseOrderListQuery(filters);

  if (isSuccess) {
    if (rows !== purchaseOrders) setRows(purchaseOrders);
  } else if (isError) {
    console.log(`Exception loading issues: ${JSON.stringify(purchaseOrders)}`);
  }

  const handleFiltering = (values) => {
    // clean filters
    // eslint-disable-next-line no-restricted-syntax
    for (const value in values) {
      if (values[value] === '') {
        delete values[value];
      }
    }
    if (filters !== initialFilters()) setFilters(values);
  };

  const handleAdd = () => {
    const params = ['-as_new', '-s', auth.details.corbaIor];

    window.electronApi.getApp({ exe: 'poexplorer.exe', params });
  };

  const searchParams = {
    searchLabel: 'Search Purchase orders Data',
    searchFields: columns.map((column) => column.id),
  };

  const filterParams = {
    filterTitle: 'Filter Purchase orders Data',
    filterControls,
    defaultParameters: defaultFilterParams,
    onFiltering: handleFiltering,
  };

  // const exportParams = {
  //     fileName: 'issueData'
  // };
  //
  const addParams = {
    addLabel: 'Add Purchase order',
    onAdd: handleAdd,
  };

  // console.log(`search fields: ${JSON.stringify(searchParams)}`);

  const handleView = (ids) => {
    router.push(`${ids[0]}`);
  };

  const handleOptimus = (ids) => {
    const params = ['-po', ids[0], '-s', auth.details.corbaIor];

    window.electronApi.getApp({ exe: 'poexplorer.exe', params });
  };

  return (
    <OptTable
      rowId="orderNum"
      data={purchaseOrders}
      onFiltering={handleFiltering}
      initialOrderBy="orderNum"
      viewColumn={optViewCellProps({
        idFields: ['orderNum'],
        onClick: handleView,
      })}
      optimusColumn={optViewCellProps({
        idFields: ['orderNum'],
        onClick: handleOptimus,
      })}
      searchParams={searchParams}
      filterParams={filterParams}
      addParams={isElectron() && addParams}
      isLoading={isLoading}
      canPrint
      mainColumns={columns}
    />
  );
};

export default PurchaseOrderList;
