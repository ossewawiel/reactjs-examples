import { FormattedDate, useIntl } from 'react-intl';
import SubCard from '../../ui/component/cards/SubCard';
import { CardContent, Grid, Typography } from '@mui/material';
import { gridSpacing } from '../../../store/constant';
import * as React from 'react';
import _ from 'lodash';
import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined';
import MainCard from '../../ui/component/cards/MainCard';
import Avatar from '../../../ui-component/extended/Avatar';
import TwitterIcon from '@mui/icons-material/Twitter';
import EventAvailableOutlinedIcon from '@mui/icons-material/EventAvailableOutlined';
import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  timelineContentClasses,
  TimelineDot,
  TimelineItem,
  TimelineOppositeContent,
  timelineOppositeContentClasses,
  TimelineSeparator,
} from '@mui/lab';

export const optEventData = ({ date, label, detail, icon }) => {
  const dateObj = new Date(date);
  return {
    utcDate: date,
    dateTime: dateObj,
    label,
    detail,
    icon,
  };
};

export default function OptTimeLineCard({ events, title, showNow }) {
  const intl = useIntl();
  const l10n = (val) => intl.formatMessage({ id: val });

  const now = new Date();
  if (showNow) {
    events.push(
      optEventData({
        date: now,
        label: 'Today',
        icon: <DownloadOutlinedIcon />,
      }),
    );
  }

  events.sort((a, b) => {
    if (a.dateTime < b.dateTime) return -1;
    if (a.dateTime > b.dateTime) return 1;
    return 0;
  });

  const colorScheme = (event) => {
    if (showNow && event.dateTime > now) {
      return 'secondary';
    }
    if (showNow && event.label === 'Today') {
      return 'info';
    }

    return 'primary';
  };

  return (
    <SubCard title={l10n(title)} content={false}>
      <CardContent>
        <Timeline
          sx={{
            [`& .${timelineOppositeContentClasses.root}`]: {
              flex: 0.2,
            },
          }}
        >
          {events.map((event, index) => (
            <TimelineItem key={index}>
              <TimelineOppositeContent align="right">
                <Typography component="span" noWrap>
                  <FormattedDate dateStyle="medium" value={event.utcDate} />
                </Typography>
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineDot color={colorScheme(event)} />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent>
                <Typography>{l10n(event.label) || l10n('Event')}</Typography>
              </TimelineContent>
            </TimelineItem>
          ))}
        </Timeline>
      </CardContent>
    </SubCard>
  );
}
