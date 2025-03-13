import { FormattedMessage } from 'react-intl';
import { IconCalculator, IconPoint } from '@tabler/icons-react';
const icons = {
  IconCalculator,
  IconPoint,
};

const dynamicItems = [
  {
    id: 'job-details',
    title: <FormattedMessage id="Job No: [val]" />,
    links: [
      {
        to: '/information-centre/jobs',
        title: <FormattedMessage id="Jobs" />,
      },
    ],
    patternUrl: /\/information-centre\/jobs\/\d+/g,
    icon: icons.IconPoint,
    breadcrumbs: true,
  },
];

export default dynamicItems;
