'use client';
import OptTabsWrapper from 'src/components/OptTabsWrapper';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import AccountCircleTwoToneIcon from '@mui/icons-material/AccountCircleTwoTone';
import { useGetPurchaseOrderDetailsQuery } from 'src/store/api/purchaseOrderApis/purchaseOrderServerApi';
import PurchaseOrderDetailsGeneral from './PurchaseOrderDetailsGeneral';
import PurchaseOrderLinesList from './po-lines/list';
import { useParams } from 'next/navigation';

const PurchaseOrderDetails = () => {
  const params = useParams();
  const {
    data: poInfo = {},
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetPurchaseOrderDetailsQuery({ poNum: params.orderNum });

  console.log(`data : ${JSON.stringify(poInfo)}`);
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
      page: <PurchaseOrderDetailsGeneral poInfo={poInfo} />,
    },
    {
      label: 'Lines',
      icon: <FormatListBulletedIcon sx={{ fontSize: '1.3rem' }} />,
      page: <PurchaseOrderLinesList lines={poInfo.lines} />,
    },
  ];

  // return <OptTabsWrapper tabsOption={tabsOption} tabButtons={showButtons} />;
  return <OptTabsWrapper tabsOption={tabsOption} />;
};

export default PurchaseOrderDetails;
