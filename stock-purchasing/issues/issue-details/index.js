'use client';
import OptTabsWrapper from 'src/components/OptTabsWrapper';
import { useParams } from 'next/navigation';
import { useGetSalesOrderIssueDetailsQuery } from '../../../../store/api/salesOrderApis/salesOrderServerApi';
import { Typography } from "@mui/material";
import SalesOrderIssueDetailsGeneral from "./SalesOrderIssueDetailsGeneral";
import AccountCircleTwoToneIcon from "@mui/icons-material/AccountCircleTwoTone";
import { useGetWorksOrderIssueDetailsQuery } from "../../../../store/api/issueApis/issueServerApi";
import WorksOrderIssueDetailsGeneral from "./WorksOrderIssueDetailsGeneral";
import TerminalTwoToneIcon from "@mui/icons-material/TerminalTwoTone";
import * as React from "react";

const IssueDetails = () => {
  const params = useParams();
  const issueType = params.issueType;
  const issueNum = params.issueNum;
  let query;
  console.log(`params: ${JSON.stringify(params)}`);
  issueType === 'sales-order'
    ? (query = useGetSalesOrderIssueDetailsQuery({ issueNum: issueNum }))
    : (query = useGetWorksOrderIssueDetailsQuery({ issueNum: issueNum }));
  const { data: issueInfo = {}, isLoading, isSuccess, isError, error } = query;

  if (isLoading) {
    return 'Loading...';
  }
  if (isSuccess) {
    /* empty */
  } else if (isError) {
    console.log(`Exception loading Enquiry details: ${JSON.stringify(error)}`);
  }

  const soTabsOption = [
    {
      label: 'General',
      icon: <AccountCircleTwoToneIcon sx={{ fontSize: '1.3rem' }} />,
      page: <SalesOrderIssueDetailsGeneral issueInfo={issueInfo} isLoading={isLoading}/>,
    },
  ];

  const woTabsOption = [
    {
      label: 'General',
      icon: <AccountCircleTwoToneIcon sx={{ fontSize: '1.3rem' }} />,
      page: <WorksOrderIssueDetailsGeneral issueInfo={issueInfo} isLoading={isLoading}/>,
    },
  ];

  return <OptTabsWrapper tabsOption={issueType === 'sales-order' ? soTabsOption : woTabsOption} />;
};

export default IssueDetails;
