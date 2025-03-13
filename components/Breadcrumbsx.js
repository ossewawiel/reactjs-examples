'use client';

import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useParams } from 'next/navigation';
// material-ui
import { useTheme } from '@mui/material/styles';
import { Avatar, Box, Card, Divider, Grid, Typography } from '@mui/material';
import MuiBreadcrumbs from '@mui/material/Breadcrumbs';

// project imports
import navigation from 'src/menu-items';
import hiddenItems from '../menu-items/dynamic';

// assets
import { IconChevronRight, IconTallymark1 } from '@tabler/icons-react';
import AccountTreeTwoToneIcon from '@mui/icons-material/AccountTreeTwoTone';
import HomeIcon from '@mui/icons-material/Home';
import HomeTwoToneIcon from '@mui/icons-material/HomeTwoTone';
import { FormattedMessage, useIntl } from 'react-intl';
import { ReceiptOutlined } from '@mui/icons-material';
import { DASHBOARD_PATH } from '../config';
import { RenderFormattedMessage } from '../utils/utility-functions';

// ==============================|| BREADCRUMBS TITLE ||============================== //

const BTitle = ({ title }) => (
  <Grid item>
    <Typography variant="h3" sx={{ fontWeight: 500 }}>
      {title}
    </Typography>
  </Grid>
);

BTitle.propTypes = {
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};

// ==============================|| BREADCRUMBS ||============================== //

const Breadcrumbsx = ({
  card,
  custom = false,
  divider = false,
  heading,
  icon = true,
  icons,
  maxItems,
  rightAlign = true,
  separator = IconChevronRight,
  title = true,
  titleBottom,
  sx,
  ...others
}) => {
  const theme = useTheme();
  const pathname = usePathname();
  const params = useParams();
  const intl = useIntl();
  const l10n = (val, options) => intl.formatMessage({ id: val, ...options });
  const [crumbs, setCrumbs] = useState([]);
  const [item, setItem] = useState();

  const iconSX = {
    marginRight: 6,
    marginTop: -2,
    width: '1rem',
    height: '1rem',
    color: theme.palette.secondary.main,
  };

  const linkSX = {
    display: 'flex',
    color: 'grey.900',
    textDecoration: 'none',
    alignContent: 'center',
    alignItems: 'center',
  };

  const customLocation = pathname;
  // console.log(`Pathname: ${pathname}`);
  // const currentCrumb = crumbs.pop();
  // const Icon = currentCrumb?.icon;
  // const headerIcon = currentCrumb?.icon ? <Icon stroke={1.5} size="28px" /> : null;

  // set active item state
  const parseMenu = (menu) => {
    // console.log(`colappse triggered`);
    if (menu.children) {
      menu.children.filter((collapse) => {
        // console.log(`collapse: ${JSON.stringify(collapse)}`);
        if (collapse.type && collapse.type === 'collapse') {
          parseMenu(collapse);
        } else if (
          collapse.type &&
          (collapse.type === 'item' || collapse.type === 'pattern')
        ) {
          // console.log(`Patternmatch for item: ${customLocation} with ${menu.id}`);
          if (
            collapse.breadcrumbs &&
            collapse.breadcrumbs.patternUrl &&
            customLocation.match(collapse.breadcrumbs.patternUrl)
          ) {
            // console.log(`Matched with : ${collapse.breadcrumbs.patternUrl}`);
            // console.log(`Params: ${JSON.stringify(params)}`);
            setCrumbs(collapse.breadcrumbs.crumbs);
            setItem(collapse);
          } else if (collapse.children && collapse.children.length > 0) {
            parseMenu(collapse);
          }
        }
        return false;
      });
    }
  };

  useEffect(() => {
    // console.log(`useEffect triggered`);
    navigation?.items?.map((menu) => {
      if (menu.type && (menu.type === 'group' || menu.type === 'collapse')) {
        // console.log(`parseMenu ${menu.id}`);
        parseMenu(menu);
      } else {
        // console.log(`Patternmatch for item: ${customLocation} with ${menu.id}`);
        if (
          menu.breadcrumbs &&
          menu.breadcrumbs.patternUrl &&
          menu.breadcrumbs.patternUrl.match(customLocation)
        ) {
          // console.log(`Matched with : ${menu.breadcrumbs.patternUrl}`);
          setCrumbs(menu.breadcrumbs.crumbs);
          setItem(menu);
        } else if (menu.children && menu.children.length > 0) {
          parseMenu(menu);
        }
      }
      return false;
    });
  });

  // item separator
  const SeparatorIcon = separator;
  const separatorIcon = separator ? (
    <SeparatorIcon stroke={1.5} size="16px" />
  ) : (
    <IconTallymark1 stroke={1.5} size="16px" />
  );

  let mainContent;
  let itemContent;
  let breadcrumbContent = <Typography />;
  let itemTitle = '';
  let CollapseIcon;
  let ItemIcon;

  // items
  if (
    item &&
    item.breadcrumbs &&
    (item.type === 'pattern' || item.type === 'item')
  ) {
    itemTitle = RenderFormattedMessage({ id: item.title, values: params });

    ItemIcon = item?.icon ? item.icon : AccountTreeTwoToneIcon;
    itemContent = (
      <Typography
        variant="subtitle1"
        sx={{ ...linkSX, color: 'text.secondary' }}
      >
        {icons && <ItemIcon style={iconSX} />}
        {itemTitle}
      </Typography>
    );

    console.log(`Crumbs: ${JSON.stringify(crumbs)}`);

    let tempContent = (
      <MuiBreadcrumbs
        aria-label="breadcrumb"
        maxItems={maxItems || 8}
        separator={separatorIcon}
        sx={{
          '& .MuiBreadcrumbs-separator': { width: 16, ml: 1.25, mr: 1.25 },
        }}
      >
        <Typography
          component={Link}
          href={DASHBOARD_PATH}
          color="textSecondary"
          variant="subtitle1"
          sx={linkSX}
        >
          {icons && <HomeTwoToneIcon style={iconSX} />}
          {icon && !icons && <HomeIcon style={{ ...iconSX, marginRight: 0 }} />}
          {(!icon || icons) && 'Dashboard'}
        </Typography>
        {crumbs?.map((crumb, index) => {
          CollapseIcon = crumb.icon ? crumb.icon : AccountTreeTwoToneIcon;
          const crumbTitle = RenderFormattedMessage({
            id: crumb.title,
            values: params,
          });
          return (
            <Typography
              key={index}
              {...(crumb.to && { component: Link, href: crumb.to })}
              variant="subtitle1"
              sx={linkSX}
              color={!crumb.to ? 'text.primary' : 'text.secondary'}
            >
              {crumb.icon && <CollapseIcon style={iconSX} />}
              {crumbTitle}
            </Typography>
          );
        })}
        {itemContent}
      </MuiBreadcrumbs>
    );

    // main
    if (item?.breadcrumbs !== false) {
      // console.log(`breadcrump scenario 2`);
      breadcrumbContent = (
        <Card
          sx={
            card === false
              ? { mb: 3, bgcolor: 'transparent', ...sx }
              : { mb: 3, bgcolor: 'background.default', ...sx }
          }
          {...others}
        >
          <Box sx={{ p: 2, pl: card === false ? 0 : 2 }}>
            <Grid
              container
              direction={rightAlign ? 'row' : 'column'}
              justifyContent={rightAlign ? 'space-between' : 'flex-start'}
              alignItems={rightAlign ? 'center' : 'flex-start'}
              spacing={1}
            >
              {title && !titleBottom && (
                <BTitle title={custom ? heading : itemTitle} />
              )}
              <Grid item>{tempContent}</Grid>
              {title && titleBottom && (
                <BTitle title={custom ? heading : itemTitle} />
              )}
            </Grid>
          </Box>
          {card === false && divider !== false && <Divider sx={{ mt: 2 }} />}
        </Card>
      );
    }
  }

  return breadcrumbContent;
};

Breadcrumbsx.propTypes = {
  card: PropTypes.bool,
  divider: PropTypes.bool,
  custom: PropTypes.bool,
  heading: PropTypes.string,
  icon: PropTypes.bool,
  icons: PropTypes.bool,
  links: PropTypes.array,
  maxItems: PropTypes.number,
  rightAlign: PropTypes.bool,
  separator: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  title: PropTypes.bool,
  titleBottom: PropTypes.bool,
  sx: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
};

export default Breadcrumbsx;
