import { FormattedMessage } from 'react-intl';
import { IconTable, IconPoint } from '@tabler/icons-react';

const icons = {
  IconTable,
  IconPoint,
};

const dataflex = {
  id: 'dataflex',
  title: 'Dataflex',
  icon: icons.IconTable,
  type: 'group',
  collapsable: true,
  children: [
    {
      id: 'dataflex-invoices',
      title: 'Invoice Data',
      type: 'item',
      url: '/information-centre/dataflex/invoices',
      icon: icons.IconPoint,
      breadcrumbs: false,
    },
  ],
};

export default dataflex;
