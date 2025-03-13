import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import { columns } from './config';
import { useAuth } from 'src/contexts/jwt-context';
import useSession from '../../../../../../hooks/useSession';
import { dispatch } from '../../../../../../store';
import { openSnackbar } from '../../../../../../store/slices/snackbar';
import { getApp, isElectron } from '../../../../../../electron/channels';
import OptTable from '../../../../../../components/OptTable';

const PurchaseOrderLinesList = ({ lines }) => {
  const auth = useAuth();
  const params = useParams();
  const [rows, setRows] = useState([]);
  const initialFilters = () => {
    const initParams = {};
    return initParams;
  };

  return (
    <OptTable
      rowId="line"
      data={lines}
      initialOrderBy="line"
      // viewColumn={optViewCellProps({ idFields: ['line'], onClick: handleView })}
      // optimusColumn={optViewCellProps({ idFields: ['hdrNumber'], onClick: handleOptimus })}
      canPrint
      mainColumns={columns}
    />
  );
};

export default PurchaseOrderLinesList;
