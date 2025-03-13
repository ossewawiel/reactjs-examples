import { IconClock2, IconPoint } from '@tabler/icons-react';

const icons = {
  IconClock2,
  IconPoint,
};

const dataCollection = {
  id: 'data-collection',
  title: 'Data Collection',
  icon: icons.IconClock2,
  type: 'group',
  children: [
    {
      id: 'timesheet-explorer',
      title: 'Timesheet Explorer',
      type: 'item',
      url: '/underpressure',
      icon: icons.IconPoint,
      permissions: ['VIEW_TIME'],
      breadcrumbs: false,
    },
    {
      id: 'bad-timesheets',
      title: 'Bad Timesheets',
      type: 'item',
      url: '/underpressure',
      icon: icons.IconPoint,
      permissions: ['VIEW_TIME'],
      breadcrumbs: false,
    },
    {
      id: 'daily-timesheets',
      title: 'Daily Timesheets',
      type: 'item',
      url: '/underpressure',
      permissions: ['VIEW_TIME'],
      icon: icons.IconPoint,
      breadcrumbs: false,
    },
    {
      id: 'remote-data-collection',
      title: 'Remote Data Collection',
      type: 'item',
      url: '/underpressure',
      icon: icons.IconPoint,
      breadcrumbs: false,
    },
    {
      id: 'staff-timesheetss',
      title: 'Staff Timesheets',
      type: 'item',
      url: '/underpressure',
      icon: icons.IconPoint,
      permissions: ['VIEW_TIME'],
      breadcrumbs: false,
    },
    {
      id: 'data-collection-reports',
      title: 'Reports',
      type: 'item',
      url: '/underpressure',
      icon: icons.IconPoint,
      breadcrumbs: false,
    },
  ],
};

export default dataCollection;
