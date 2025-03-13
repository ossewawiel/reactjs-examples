import {
  IconDashboard,
  IconDeviceAnalytics,
  IconReportAnalytics,
  IconRobot,
} from '@tabler/icons-react';
import { FormattedMessage } from 'react-intl';

const icons = {
  IconDashboard,
  IconReportAnalytics,
  IconDeviceAnalytics,
  IconRobot,
};

export const generalDashboard = {
  id: 'default',
  title: 'Dashboard',
  type: 'item',
  url: '/information-centre/dashboard',
  icon: icons.IconDeviceAnalytics,
};

export const aiDashboard = {
  id: 'ai-dashboard',
  title: 'Ask Optimus',
  type: 'item',
  url: '/information-centre/ai-dashboard',
  icon: icons.IconRobot,
};
