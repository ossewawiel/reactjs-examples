'use client';
import OptTabsWrapper from 'src/components/OptTabsWrapper';
import FormatAlignJustifyIcon from '@mui/icons-material/FormatAlignJustify';
import AccountCircleTwoToneIcon from '@mui/icons-material/AccountCircleTwoTone';
import { useGetPurchaseOrderDetailsQuery } from 'src/store/api/purchaseOrderApis/purchaseOrderServerApi';
import { useParams } from 'next/navigation';
import {
  useGetSalesOrderDetailsQuery,
  useGetSalesOrderLineDetailsQuery,
} from '../../../../../../store/api/salesOrderApis/salesOrderServerApi';
import SalesOrderLineDetailsGeneral from './SalesOrderLinesDetailsGeneral';
import SalesOrderLinesDetailsText from './SalesOrderLinesDetailsText';
const SalesOrderLineDetails = () => {
  const params = useParams();
  const soNum = params.number;
  const lineNum = params.lineNum;
  const {
    data: lineInfo = {},
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetSalesOrderLineDetailsQuery({ soNum: soNum, lineNum: lineNum });
  console.log(`params: ${JSON.stringify(lineInfo)}`);
  if (isLoading) {
    return 'Loading...';
  }
  if (isSuccess) {
    /* empty */
  } else if (isError) {
    console.log(`Exception loading Enquiry details: ${JSON.stringify(error)}`);
  }

  const tabsOption = [
    {
      label: 'General',
      icon: <AccountCircleTwoToneIcon sx={{ fontSize: '1.3rem' }} />,
      page: <SalesOrderLineDetailsGeneral lineInfo={lineInfo} isLoading={isLoading}/>,
    },
    {
      label: 'Addresses',
      icon: <FormatAlignJustifyIcon sx={{ fontSize: '1.3rem' }} />,
      page: <SalesOrderLinesDetailsText text={lineInfo.props.text} />,
    },
  ];

  return <OptTabsWrapper tabsOption={tabsOption} />;
};

export default SalesOrderLineDetails;
