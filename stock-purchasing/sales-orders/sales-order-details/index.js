'use client';
import OptTabsWrapper from 'src/components/OptTabsWrapper';
import FormatAlignJustifyIcon from '@mui/icons-material/FormatAlignJustify';
import AccountCircleTwoToneIcon from '@mui/icons-material/AccountCircleTwoTone';
import { useGetPurchaseOrderDetailsQuery } from 'src/store/api/purchaseOrderApis/purchaseOrderServerApi';
import { useParams } from 'next/navigation';
import { useGetSalesOrderDetailsQuery } from '../../../../store/api/salesOrderApis/salesOrderServerApi';
import SalesOrderDetailsGeneral from './SalesOrderDetailsGeneral';
import SalesOrderDetailsText from "./SalesOrderDetailsText";

const SalesOrderDetails = () => {
  const params = useParams();
  const soNum = params.number;
  const {
    data: soInfo = {},
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetSalesOrderDetailsQuery({ soNum: soNum });
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
      page: <SalesOrderDetailsGeneral soInfo={soInfo} />,
    },
    {
      label: 'Text',
      icon: <FormatAlignJustifyIcon sx={{ fontSize: '1.3rem' }} />,
      page: <SalesOrderDetailsText text={soInfo.props.text} />,
    }
  ];

  // return <OptTabsWrapper tabsOption={tabsOption} tabButtons={showButtons} />;
  return <OptTabsWrapper tabsOption={tabsOption} />;
};

export default SalesOrderDetails;
