'use client';

import { useAuth } from 'src/contexts/jwt-context';
import { useState } from 'react';
import OptTable from 'src/components/OptTable';
import { optViewCellProps } from 'src/utils/utility-functions';
import { columns, filterControls } from './config';
import { isElectron } from 'src/electron/channels';
import {
  useGetRequisitionsDefaultSearchParamsQuery,
  useGetRequisitionsListQuery,
} from 'src/store/api/reqSearchServerApi';

const RequisitionsList = () => {
  // const navigate = useNavigate();
  const auth = useAuth();
  const [rows, setRows] = useState([]);
  const initialFilters = () => {
    const initParams = {};
    return initParams;
  };

  const [filters, setFilters] = useState(initialFilters());

  const { data: defaultFilterParams = {} } =
    useGetRequisitionsDefaultSearchParamsQuery();
  const {
    // eslint-disable-next-line no-empty-pattern
    data: requisitions = [],
    isLoading,
    isSuccess,
    isError,
  } = useGetRequisitionsListQuery(filters);

  if (isSuccess) {
    if (rows !== requisitions) setRows(requisitions);
  } else if (isError) {
    console.log(`Exception loading issues: ${JSON.stringify(requisitions)}`);
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
    const params = ['-reqList', '-s', auth.details.corbaIor];

    window.electronApi.getApp({ exe: 'stockenq.exe', params });
  };

  const searchParams = {
    searchLabel: 'Search Requisitions Data',
    searchFields: columns.map((column) => column.id),
  };

  const filterParams = {
    filterTitle: 'Filter Requisitions Data',
    filterControls,
    defaultParameters: defaultFilterParams,
    onFiltering: handleFiltering,
  };

  // const exportParams = {
  //     fileName: 'issueData'
  // };
  //
  const addParams = {
    addLabel: 'Add Requisition',
    onAdd: handleAdd,
  };

  console.log(`search fields: ${JSON.stringify(filterControls)}`);

  // const handleView = (ids) => {
  //     // navigate(`jobDetails/${ids[1]}`);
  // };

  const handleOptimus = (ids) => {
    const params = ['-reqId', ids[0], '-s', auth.details.corbaIor];

    window.electronApi.getApp({ exe: 'stockenq.exe', params });
  };

  return (
    <OptTable
      rowId="id"
      data={requisitions}
      onFiltering={handleFiltering}
      initialOrderBy="id"
      // viewColumn={optViewCellProps({ idFields: ['id'], onClick: handleView })}
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

export default RequisitionsList;
