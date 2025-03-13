'use client';

import { useAuth } from 'src/contexts/jwt-context';
import { useState } from 'react';
import OptTable from 'src/components/OptTable';
import { optViewCellProps } from 'src/utils/utility-functions';
import { columns, filterControls } from './config';
import {
  useGetItemsListQuery,
  useGetMaterialsOutworkListDefaultSearchParamsQuery,
} from 'src/store/api/ItemApis/itemSearchServerApi';
import { useOptimusLocal } from '../../../../hooks/useOptimusLocal';

const MaterialsOutworkList = () => {
  // const navigate = useNavigate();
  const auth = useAuth();
  const { isAvailable, postToOptimus } = useOptimusLocal();
  const [rows, setRows] = useState([]);
  const initialFilters = () => {
    const initParams = {};
    return initParams;
  };

  const [filters, setFilters] = useState(initialFilters());

  const { data: defaultFilterParams = {} } =
    useGetMaterialsOutworkListDefaultSearchParamsQuery();
  const {
    // eslint-disable-next-line no-empty-pattern
    data: materialsOutworkItems = [],
    isLoading,
    isSuccess,
    isError,
  } = useGetItemsListQuery(filters);

  console.log(`materials params: ${JSON.stringify(filters)}`);
  console.log(`materials: ${JSON.stringify(materialsOutworkItems)}`);

  if (isSuccess) {
    if (rows !== materialsOutworkItems) setRows(materialsOutworkItems);
  } else if (isError) {
    console.log(
      `Exception loading issues: ${JSON.stringify(materialsOutworkItems)}`,
    );
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
    const params = ['-s', auth.details.corbaIor];

    postToOptimus({ exe: 'stockEnq.exe', params });
  };

  const searchParams = {
    searchLabel: 'Search Materials and Outwork Data',
    searchFields: columns.map((column) => column.id),
  };

  const filterParams = {
    filterTitle: 'Filter Materials and Outwork Data',
    filterControls,
    defaultParameters: defaultFilterParams,
    onFiltering: handleFiltering,
  };

  // const exportParams = {
  //     fileName: 'issueData'
  // };
  //
  const addParams = {
    addLabel: 'Add Material & Outwork',
    onAdd: handleAdd,
  };

  // console.log(`search fields: ${JSON.stringify(searchParams)}`);

  // const handleView = (ids) => {
  //     // navigate(`jobDetails/${ids[1]}`);
  // };

  const handleOptimus = (ids) => {
    const params = ['-itmId', `${ids[0]}`, '-s', auth.details.corbaIor];

    postToOptimus({ exe: 'stockenq.exe', params });
  };

  return (
    <OptTable
      rowId="code"
      data={materialsOutworkItems}
      onFiltering={handleFiltering}
      initialOrderBy="code"
      // viewColumn={optViewCellProps({ idFields: ['code'], onClick: handleView })}
      optimusColumn={optViewCellProps({
        idFields: ['code'],
        onClick: handleOptimus,
      })}
      searchParams={searchParams}
      filterParams={filterParams}
      addParams={isAvailable && addParams}
      isLoading={isLoading}
      canPrint
      mainColumns={columns}
    />
  );
};

export default MaterialsOutworkList;
