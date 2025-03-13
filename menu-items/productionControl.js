import { IconCalendarStats, IconPoint } from '@tabler/icons-react';
import { FormattedMessage } from 'react-intl';

const icons = {
  IconCalendarStats,
  IconPoint,
};

const productionControl = {
  id: 'production-control',
  title: 'Production Control',
  icon: icons.IconCalendarStats,
  type: 'group',
  children: [
    {
      id: 'active-work',
      title: <FormattedMessage id="Active Work" />,
      type: 'item',
      url: '/underpressure',
      icon: icons.IconPoint,
      permissions: ['VIEW_REMOTE'],
    },
    {
      id: 'prestige-scheduling',
      title: <FormattedMessage id="Prestige Scheduling" />,
      type: 'item',
      url: '/underpressure',
      icon: icons.IconPoint,
      permissions: ['SCH_VIEWONLY'],
    },
    {
      id: 'task-diary',
      title: <FormattedMessage id="Task Diary" />,
      type: 'item',
      url: '/underpressure',
      icon: icons.IconPoint,
      permissions: ['TASK_DIARY_VIEW'],
    },
    {
      id: 'production-control-reports',
      title: <FormattedMessage id="Reports" />,
      type: 'item',
      url: '/underpressure',
      icon: icons.IconPoint,
    },
  ],
};

export default productionControl;
