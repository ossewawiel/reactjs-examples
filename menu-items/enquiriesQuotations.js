import { FormattedMessage } from 'react-intl';
import { IconCalculator, IconPoint } from '@tabler/icons-react';

const icons = {
  IconCalculator,
  IconPoint,
};

const enquiriesQuatations = {
  id: 'enquiries-quotations',
  title: 'Enquiries & Quotations',
  icon: icons.IconCalculator,
  type: 'group',
  collapsable: true,
  children: [
    {
      id: 'customer-service',
      title: 'Customer Service',
      type: 'item',
      url: 'http://localhost:3001',
      icon: icons.IconPoint,
      external: true,
      target: true,
    },
    {
      id: 'quotes',
      title: 'Quotes',
      type: 'item',
      url: '/information-centre/enquiry-headers',
      icon: icons.IconPoint,
      permissions: ['ENQ_VIEW'],
    },
    // {
    //     id: 'estimations',
    //     title: <FormattedMessage id="Estimations" />,
    //     type: 'collapse',
    //     icon: icons.IconPoint,
    //     children: [
    //         {
    //             id: 'new-estimation',
    //             title: <FormattedMessage id="New Estimation" />,
    //             type: 'item',
    //             url: '/underpressure',
    //             icon: icons.IconPoint,
    //             breadcrumbs: false
    //         },
    //         {
    //             id: 'view-estimations',
    //             title: <FormattedMessage id="View Estimations" />,
    //             type: 'item',
    //             url: '/underpressure',
    //             icon: icons.IconPoint,
    //             breadcrumbs: false
    //         }
    //     ]
    // },
    // {
    //     id: 'reports',
    //     title: <FormattedMessage id="Reports" />,
    //     type: 'item',
    //     url: '/underpressure',
    //     icon: icons.IconPoint,
    //     breadcrumbs: false
    // },
    // {
    //     id: 'other',
    //     title: <FormattedMessage id="More..." />,
    //     type: 'collapse',
    //     icon: icons.IconPoint,
    //     children: [
    //         {
    //             id: 'web-site-orders',
    //             title: <FormattedMessage id="Web Site Orders" />,
    //             type: 'item',
    //             url: '/underpressure',
    //             icon: icons.IconPoint,
    //             breadcrumbs: false
    //         },
    //         {
    //             id: 'job-csv-import',
    //             title: <FormattedMessage id="Import Job from CSV" />,
    //             type: 'item',
    //             url: '/underpressure',
    //             icon: icons.IconPoint,
    //             breadcrumbs: false
    //         },
    //         {
    //             id: 'run-gvm',
    //             title: <FormattedMessage id="Run GVM" />,
    //             type: 'item',
    //             url: '/underpressure',
    //             icon: icons.IconPoint,
    //             breadcrumbs: false
    //         }
    //     ]
    // }
  ],
};

export default enquiriesQuatations;
