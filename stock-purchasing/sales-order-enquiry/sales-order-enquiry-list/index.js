'use client';

import { useAuth } from 'src/contexts/jwt-context';
import { useState } from 'react';
import OptTable from 'src/components/OptTable';
import { optViewCellProps } from 'src/utils/utility-functions';
import { columns, filterControls } from './config';
import { isElectron } from 'src/electron/channels';
import {
  useGetSalesOrderDefaultSearchParamsQuery,
  useGetSalesOrderListQuery,
} from 'src/store/api/salesOrderApis/salesOrderSearchServerApi';

const SalesOrderEnquiryList = () => {
  // const navigate = useNavigate();
  const auth = useAuth();
  const [rows, setRows] = useState([]);
  const initialFilters = () => {
    const initParams = {};
    return initParams;
  };

  const [filters, setFilters] = useState(initialFilters());

  const { data: defaultFilterParams = {} } =
    useGetSalesOrderDefaultSearchParamsQuery();
  const {
    // eslint-disable-next-line no-empty-pattern
    data: salesOrders = [],
    isLoading,
    isSuccess,
    isError,
  } = useGetSalesOrderListQuery(filters);

  if (isSuccess) {
    if (rows !== salesOrders) setRows(salesOrders);
  } else if (isError) {
    console.log(`Exception loading issues: ${JSON.stringify(salesOrders)}`);
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
    const params = ['-addSo', '-s', auth.details.corbaIor];

    window.electronApi.getApp({ exe: 'stockenq.exe', params });
  };

  const searchParams = {
    searchLabel: 'Search Sales orders enquiry Data',
    searchFields: columns.map((column) => column.id),
  };

  const filterParams = {
    filterTitle: 'Filter Sales orders Enquiry Data',
    filterControls,
    defaultParameters: defaultFilterParams,
    onFiltering: handleFiltering,
  };

  // const exportParams = {
  //     fileName: 'issueData'
  // };
  //
  const addParams = {
    addLabel: 'Add Sales Order Enquiry',
    onAdd: handleAdd,
  };

  // console.log(`search fields: ${JSON.stringify(searchParams)}`);

  // const handleView = (ids) => {
  //     // navigate(`jobDetails/${ids[1]}`);
  // };

  const handleOptimus = (ids) => {
    const params = ['-soId', ids[0], '-s', auth.details.corbaIor];

    window.electronApi.getApp({ exe: 'stockenq.exe', params });
  };

  return (
    <OptTable
      rowId="number"
      data={salesOrders}
      onFiltering={handleFiltering}
      initialOrderBy="number"
      // viewColumn={optViewCellProps({ idFields: ['number'], onClick: handleView })}
      optimusColumn={optViewCellProps({
        idFields: ['number'],
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

export default SalesOrderEnquiryList;
