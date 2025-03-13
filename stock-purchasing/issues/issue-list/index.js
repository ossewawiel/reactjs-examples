'use client';
import { useNavigate } from 'react-router-dom';
import { useAuth } from 'src/contexts/jwt-context';
import { useState } from 'react';
import OptTable from 'src/components/OptTable';
import { optViewCellProps } from 'src/utils/utility-functions';
import { columns, filterControls } from './config';
import { isElectron } from 'src/electron/channels';
import { useRouter } from 'next/navigation';
import {
  useGetDefaultIssueSearchParamsQuery,
  useGetIssuesQuery,
} from '../../../../store/api/issueApis/issueSearchApi';
import { useOptimusLocal } from 'src/hooks/useOptimusLocal';

const IssueList = () => {
  const router = useRouter();
  const auth = useAuth();
  const { isAvailable, postToOptimus } = useOptimusLocal();
  const [rows, setRows] = useState([]);
  const initialFilters = () => {
    const initParams = {};
    return initParams;
  };

  const [filters, setFilters] = useState(initialFilters());

  const { data: defaultFilterParams = {} } =
    useGetDefaultIssueSearchParamsQuery();
  const {
    // eslint-disable-next-line no-empty-pattern
    data: issues = [],
    isLoading,
    isSuccess,
    isError,
  } = useGetIssuesQuery(filters);

  if (isSuccess) {
    if (rows !== issues) setRows(issues);
  } else if (isError) {
    console.log(`Exception loading issues: ${JSON.stringify(issues)}`);
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
    const params = ['-issList', '-s', auth.details.corbaIor];

    postToOptimus({ exe: 'stockenq.exe', params });
  };

  const searchParams = {
    searchLabel: 'Search Issue Data',
    searchFields: columns.map((column) => column.id),
  };

  const filterParams = {
    filterTitle: 'Filter Issue Data',
    filterControls,
    defaultParameters: defaultFilterParams,
    onFiltering: handleFiltering,
  };

  const exportParams = {
    fileName: 'issueData',
  };

  const addParams = {
    addLabel: 'Add Issue',
    onAdd: handleAdd,
  };

  const handleView = (ids) => {
    const issue = issues.find((i) => i.id === ids[1]);
    const issueType =
      issue.issueTo === 'SALES_ORDER' ? 'sales-order' : 'works-order';
    router.push(`${issueType}/${ids[1]}`);
  };

  const handleOptimus = (ids) => {
    const params = ['-issId', ids[0], '-s', auth.details.corbaIor];

    window.electronApi.getApp({ exe: 'stockenq.exe', params });
  };

  return (
    <OptTable
      rowId="id"
      data={issues}
      searchParams={searchParams}
      filterParams={filterParams}
      exportParams={exportParams}
      addParams={isAvailable && addParams}
      canPrint
      mainColumns={columns}
      initialOrderBy="itemCode"
      viewColumn={optViewCellProps({
        idFields: ['issueTo', 'id'],
        onClick: handleView,
      })}
      optimusColumn={optViewCellProps({
        idFields: ['id'],
        onClick: handleOptimus,
      })}
      isLoading={isLoading}
    />
  );
};

export default IssueList;
