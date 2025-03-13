import {
  Button,
  Card,
  CardMedia,
  Grid,
  TableCell,
  Typography,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useState } from 'react';
import { gridSpacing } from 'src/store/constant';
import ChatBubbleTwoToneIcon from '@mui/icons-material/ChatBubbleTwoTone';
import NotInterestedTwoToneIcon from '@mui/icons-material/NotInterestedTwoTone';
import CalendarMonthTwoToneIcon from '@mui/icons-material/CalendarMonthTwoTone';
import {
  FormattedDate,
  FormattedMessage,
  FormattedNumber,
  FormattedTime,
  useIntl,
} from 'react-intl';
import AccessTimeTwoToneIcon from '@mui/icons-material/AccessTimeTwoTone';
import * as React from 'react';
import { useAuth } from 'src/contexts/jwt-context';
import { LOCALE_CURRENCY } from 'src/constants';

export const OptHeaderCardItem = ({ label, value, type }) => (
  <Grid item xs={3}>
    <Typography variant="caption">
      <FormattedMessage id={label} />
    </Typography>
    <Typography variant="h6">{value}</Typography>
  </Grid>
);

export const OptHeaderCardImage = ({ height, image }) => (
  <Grid item xs={12}>
    <Card>
      <CardMedia
        component="img"
        sx={{
          height: '210px',
          width: '100%',
        }}
        image={image}
      />
    </Card>
  </Grid>
);

export const OptHeaderCardYesNoItem = ({ label, value, type }) => (
  <Grid item xs={3}>
    <Typography variant="caption">
      <FormattedMessage id={label} />
    </Typography>
    <Typography variant="h6">{value === true ? 'Yes' : 'No'}</Typography>
  </Grid>
);

export const OptHeaderCardWithCodeItem = ({ label, value, code, type }) => (
  <Grid item xs={3}>
    <Typography variant="caption">
      <FormattedMessage id={label} />
    </Typography>
    <Typography variant="h6">{`${value}(${code})`}</Typography>
  </Grid>
);

export const OptHeaderCurrencyCard = ({ label, value }) => {
  const intl = useIntl();
  // console.log(`Currency info code: ${JSON.stringify(currencyInfo.currentData.currencyCode)}`);
  const { details } = useAuth();
  const code = details.currencyCode;

  const number = (
    <FormattedNumber
      value={value}
      style="currency"
      currency={code || LOCALE_CURRENCY[intl.locale] || 'USD'}
    />
  );
  return <OptHeaderCardItem label={label} value={number} />;
};

export const CodeLookupHeaderItem = ({ label, value, useName, query }) => {
  const { data: response = [], isSuccess, isError, error } = query();
  let val = '...';
  if (isSuccess) {
    const tmp = response.filter(
      (item) => item[useName ? 'name' : 'code'] === value,
    );
    // console.log(`code lookup stuff ${JSON.stringify(tmp)}`);
    val = tmp[0].name;
  }
  return (
    <Grid item xs={3}>
      <Typography variant="caption">{label}</Typography>
      <br />
      <Typography variant="h6">{val}</Typography>
    </Grid>
  );
};

export const CodeLookupWithCodeHeaderItem = ({
  label,
  value,
  useName,
  query,
}) => {
  const { data: response = [], isSuccess, isError, error } = query();
  let val = '...';
  let code = '...';
  if (isSuccess) {
    const tmp = response.filter((item) => item.code === value);
    console.log(`code lookup stuff ${JSON.stringify(tmp)}`);
    val = tmp[0]?.name || value;
    code = tmp[0]?.code;
  }
  return (
    <Grid item xs={3}>
      <Typography variant="caption">
        <FormattedMessage id={label} />
      </Typography>
      <br />
      <Typography variant="h6">{`${val} (${code})`}</Typography>
    </Grid>
  );
};

export const NameLookupHeaderItem = ({ label, value, useName, query }) => {
  // console.log(`Name value : ${query}`);
  const { data: response = [], isSuccess, isError, error } = query();
  let val = '...';
  if (isSuccess) {
    const tmp = response.filter((obj) => obj.name === value);
    // const tmp = response.filter((item) => item[useName ? 'name' : 'value'] === value);
    // console.log(`name lookup stuff ${JSON.stringify(tmp)} ${JSON.stringify(response)}`);
    val = tmp[0].value;
  }
  return (
    <Grid item xs={3}>
      <Typography variant="caption">
        <FormattedMessage id={label} />
      </Typography>
      <br />
      <Typography variant="h6">{val}</Typography>
    </Grid>
  );
};

export const NameLookupItem = ({ label, value, useName, query }) => {
  // console.log(`Name value : ${query}`);
  const { data: response = [], isSuccess, isError, error } = query();
  let val = '...';
  if (isSuccess) {
    const tmp = response.filter((obj) => obj.name === value);
    // const tmp = response.filter((item) => item[useName ? 'name' : 'value'] === value);
    // console.log(`name lookup stuff ${JSON.stringify(tmp)} ${JSON.stringify(response)}`);
    val = tmp[0].value;
  }
  return <Typography variant="h5">{`${label} - ${val}`}</Typography>;
};

export const NameLookupWithCodeHeaderItem = ({
  label,
  value,
  useName,
  query,
}) => {
  // console.log(`Name value : ${query}`);
  const { data: response = [], isSuccess, isError, error } = query();
  let val = '...';
  let code = '...';
  if (isSuccess) {
    const tmp = response.filter((obj) => obj.name === value);
    // const tmp = response.filter((item) => item[useName ? 'name' : 'value'] === value);
    // console.log(`name lookup stuff ${JSON.stringify(tmp)} ${JSON.stringify(response)}`);
    val = tmp[0].value;
    code = tmp[0].name;
  }
  return (
    <Grid item xs={3}>
      <Typography variant="caption">{label}</Typography>
      <br />
      <Typography variant="h6">{`${val} (${code})`}</Typography>
    </Grid>
  );
};

export const OptHeaderCardNameLookupItem = ({ label, value, query }) => {
  // console.log(`Name value : ${query}`);
  const { data: response = [], isSuccess, isError, error } = query();
  let val = '...';
  if (isSuccess) {
    const tmp = response.filter((obj) => obj.name === value);
    // const tmp = response.filter((item) => item[useName ? 'name' : 'value'] === value);
    // console.log(`name lookup stuff ${JSON.stringify(tmp)} ${JSON.stringify(response)}`);
    val = tmp[0].value;
  }
  return (
    <Grid item xs={3}>
      <Typography variant="caption">{label}</Typography>
      <br />
      <Typography variant="h6">
        <FormattedMessage id={val} />
      </Typography>
    </Grid>
  );
};

export const OptHeaderCardCodeLookupItem = ({ label, value, type }) => (
  <Grid item xs={3}>
    <Typography variant="caption">
      <FormattedMessage id={label} />
    </Typography>
    <br />
    <Typography variant="code-lookup">{`(${value})`}</Typography>
  </Grid>
);

export const OptHeaderCardDateTime = ({ label, value }) => (
  <Grid item xs={3}>
    <Typography variant="caption">
      <FormattedMessage id={label} />
    </Typography>
    <Typography variant="h6">
      <Grid container direction="column">
        <Grid item>
          <Grid container direction="row" alignItems="center" spacing={1}>
            <Grid item>
              <CalendarMonthTwoToneIcon sx={{ fontSize: '0.9rem' }} />
            </Grid>
            <Grid item>
              <FormattedDate
                value={value}
                year="numeric"
                month="short"
                day="2-digit"
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Grid container direction="row" alignItems="center" spacing={1}>
            <Grid item>
              <AccessTimeTwoToneIcon sx={{ fontSize: '0.9rem' }} />
            </Grid>
            <Grid item>
              <FormattedTime value={value} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Typography>
  </Grid>
);

export const OptHeaderCard = ({
  icon,
  title,
  subtitle,
  description,
  children,
  bottomGrid,
  image,
}) => {
  const theme = useTheme();

  const [anchorEl, setAnchorEl] = useState(null);

  return (
    <Card
      sx={{
        p: 2,
        background:
          theme.palette.mode === 'dark'
            ? theme.palette.dark.main
            : theme.palette.grey[50],
        border:
          theme.palette.mode === 'dark'
            ? '1px solid transparent'
            : `1px solid${theme.palette.grey[100]}`,
        '&:hover': {
          borderColor: theme.palette.primary.main,
        },
      }}
    >
      <Grid container spacing={gridSpacing}>
        <Grid item xs={12}>
          <Grid container direction="row" spacing={gridSpacing}>
            <Grid item>{icon}</Grid>
            <Grid item>
              <Typography variant="h3" component="div">
                {title}
              </Typography>
              <Typography variant="subtitle1">{subtitle}</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Typography
            variant="subtitle2"
            sx={{ color: theme.palette.grey[700] }}
          >
            {description}
          </Typography>
        </Grid>
        <Grid item xs={image ? 8 : 12}>
          <Grid container spacing={gridSpacing}>
            {children}
          </Grid>
        </Grid>
        {image ? (
          <Grid item xs={4}>
            <Grid container spacing={image ? gridSpacing : 0}>
              <OptHeaderCardImage image={image} />
            </Grid>
          </Grid>
        ) : null}
        <Grid item xs={12}>
          <Grid container justifyContent="center" spacing={1}>
            {bottomGrid}
          </Grid>
        </Grid>
      </Grid>
    </Card>
  );
};
