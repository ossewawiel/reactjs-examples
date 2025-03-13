import { IconBuildingFactory, IconPoint } from '@tabler/icons-react';

const icons = {
  IconBuildingFactory,
  IconPoint,
};

const jobProofTracking = {
  id: 'job-proof-tracking',
  title: 'Job & Proof Tracking',
  icon: icons.IconBuildingFactory,
  type: 'group',
  children: [
    {
      id: 'jobs',
      title: 'Jobs',
      type: 'item',
      url: '/information-centre/jobs',
      icon: icons.IconPoint,
    },
    {
      id: 'proof-list',
      title: 'Proofs',
      type: 'item',
      url: '/information-centre/proofs',
      icon: icons.IconPoint,
    },
    // {
    //     id: 'reports',
    //     title: <FormattedMessage id="Reports" />,
    //     type: 'item',
    //     url: '/unknown',
    //     icon: icons.IconPoint,
    //     breadcrumbs: false
    // }
  ],
};

export default jobProofTracking;
