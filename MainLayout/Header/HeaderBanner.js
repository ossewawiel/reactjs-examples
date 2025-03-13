import NextLink from 'next/link';
import Image from 'next/image';
import { DASHBOARD_PATH } from 'src/config';

const HeaderBanner = () => (
  <NextLink href={DASHBOARD_PATH} aria-label="optimus logo">
    <Image
      src={`/assets/images/InfoCentre2.png`}
      alt="Optimus"
      width={300}
      height={53}
    />
  </NextLink>
);

export default HeaderBanner;
