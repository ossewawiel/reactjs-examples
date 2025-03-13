import NextLink from 'next/link';

// material-ui
import { Link } from '@mui/material';

// project imports
import { DASHBOARD_PATH } from 'src/config';
import Logo from 'src/components/ui/component/Logo';

// ==============================|| MAIN LOGO ||============================== //

const LogoSection = () => (
  <NextLink href={DASHBOARD_PATH} aria-label="optimus logo">
    <Logo />
  </NextLink>
);

export default LogoSection;
