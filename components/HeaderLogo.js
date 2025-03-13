import { useTheme } from '@mui/material/styles';

import logoDark from '../../public/assets/images/optimus-logo-dark.png';
import logo from '../../public/assets/images/InfoCentre2.png';
// import logoSmall from 'src/assets/images/optimus-logo-small.png';

// ==============================|| LOGO SVG ||============================== //

export const BigLogo = () => {
  const theme = useTheme();

  return (
    <img
      src={theme.palette.mode === 'dark' ? logoDark : logo}
      alt="Optimus"
      width="200"
    />
  );
};

const HeaderLogo = () => {
  const theme = useTheme();

  return (
    <img
      src={`${process.env.PUBLIC_URL}/InfoCentre2.png`}
      alt="Optimus"
      width="300"
    />
  );
};

export default HeaderLogo;
