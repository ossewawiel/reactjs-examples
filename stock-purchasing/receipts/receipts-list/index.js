'use client';

import { useAuth } from 'src/contexts/jwt-context';
import { useState } from 'react';
import OptTable from 'src/components/OptTable';
import { optViewCellProps } from 'src/utils/utility-functions';
import { columns, filterControls } from './config';
import {
  useGetReceiptsDefaultSearchParamsQuery,
  useGetReceiptsListQuery,
} from 'src/store/api/receiptSearchServerApi';
import { isElectron } from 'src/electron/channels';

const ReceiptList = () => {
  // const navigate = useNavigate();
  const auth = useAuth();
  const [rows, setRows] = useState([]);
  const initialFilters = () => {
    const initParams = {};
    return initParams;
  };

  const [filters, setFilters] = useState(initialFilters());

  const { data: defaultFilterParams = {} } =
    useGetReceiptsDefaultSearchParamsQuery();
  const {
    // eslint-disable-next-line no-empty-pattern
    data: receipts = [],
    isLoading,
    isSuccess,
    isError,
  } = useGetReceiptsListQuery(filters);

  //console.log(`Exception loading receipts: ${JSON.stringify(receipts)}`);

  if (isSuccess) {
    if (rows !== receipts) setRows(receipts);
  } else if (isError) {
    console.log(`Exception loading receipts: ${JSON.stringify(receipts)}`);
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
    const params = ['-recList', '-s', auth.details.corbaIor];

    window.electronApi.getApp({ exe: 'stockenq.exe', params });
  };

  const searchParams = {
    searchLabel: 'Search Receipts Data',
    searchFields: columns.map((column) => column.id),
  };

  const filterParams = {
    filterTitle: 'Filter Receipts Data',
    filterControls,
    defaultParameters: defaultFilterParams,
    onFiltering: handleFiltering,
  };

  // const exportParams = {
  //     fileName: 'issueData'
  // };
  //
  const addParams = {
    addLabel: 'Add Receipt',
    onAdd: handleAdd,
  };

  // console.log(`search fields: ${JSON.stringify(searchParams)}`);

  // const handleView = (ids) => {
  //     // navigate(`jobDetails/${ids[1]}`);
  // };

  const handleOptimus = (ids) => {
    const params = ['-recId', ids[0], '-s', auth.details.corbaIor];

    window.electronApi.getApp({ exe: 'stockenq.exe', params });
  };

  return (
    <OptTable
      rowId="id"
      data={receipts}
      onFiltering={handleFiltering}
      initialOrderBy="id"
      // viewColumn={optViewCellProps({ idFields: ['orderNum'], onClick: handleView })}
      optimusColumn={optViewCellProps({
        idFields: ['id'],
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

export default ReceiptList;
